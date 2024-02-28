var https = require('https');
var fs = require('fs');

let SONG_DB = require('./songs.json');
let token = "";

async function sendRequest(title, artist) {

    return new Promise((resolve, reject) => {

        //url encode
        title = encodeURIComponent(title);
        artist = encodeURIComponent(artist);

        var options = {
            'method': 'GET',
            'hostname': 'api.discogs.com',
            'path': '/database/search?token=' + TOKEN + '&release_title=' + title + '&artist=' + artist,
            'headers': {
                'User-Agent': 'PianoTest/1.0.0',
            },
            'maxRedirects': 20
        };

        https.get(options, (resp) => {
            let data = '';

            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                let json = JSON.parse(data);
                resolve(json.results);
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
            reject(err);
        });
    });
}

const delay = async (ms) => new Promise(res => setTimeout(res, ms));

async function test() {

    let newDB = [];

    for (let i = 0; i < SONG_DB.length; i++) {

        try {
            let song = SONG_DB[i];
            let name = song.name;
            let artist = song.artists[0];
            let result = await sendRequest(name, artist);
            console.log('Got result for ' + name + ' by ' + artist, result);
            await delay(5000);
            song.discogs = result;
            song._index = i;
            newDB.push(song);

            fs.writeFile('discogs.json', JSON.stringify(newDB), function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
        } catch (e) {
            console.error(e);
        }
    }


}

test();