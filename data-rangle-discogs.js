let fs = require('fs');
let path = require('path');
let DISCOGS_DATA = require('./discogs.json');

let newData = [];
for (let i = 0; i < DISCOGS_DATA.length; i++) {
    let song = DISCOGS_DATA[i];

    //ORIG
    let name = song.name;
    let artists = song.artists;
    let midiFile = song.midiFile;
    let artwork = song.artwork;
    let tags = song.tags;
    let songLengthMS = song.songLengthMS;
    let noteCount = song.noteCount;

    //NEW
    let discog = song.discogs;
    let genre = [];
    if (discog) {

        if (discog.length > 1) {
            console.log('Multiple Discogs entries for: ' + name);
        }

        let entry = discog[0];
        if (entry) {
            if (entry.genre) {
                for (let i = 0; i < entry.genre.length; i++) {
                    genre.push(entry.genre[i]);
                }
            }

            if (entry.style) {
                for (let i = 0; i < entry.style.length; i++) {
                    genre.push(entry.style[i]);
                }
            }
        }
    }

    let newSong = {
        name: name,
        artists: artists,
        midiFile: midiFile,
        artwork: artwork,
        genre: genre,
        tags: tags,
        songLengthMS: songLengthMS,
        noteCount: noteCount
    }

    newData.push(newSong);

}

let data = JSON.stringify(newData, null, 2);
fs.writeFileSync(path.join(__dirname, 'discogs-rangle.json'), data);