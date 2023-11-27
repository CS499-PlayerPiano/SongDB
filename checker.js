const fs = require('fs');
const path = require('path');

const DB = require('./songs.json');

const SONGS_FOLDER = path.join(__dirname, 'songs');
const ARTWORK_FOLDER = path.join(__dirname, 'artwork');

const chalk = require('chalk');

console.log(chalk.magenta("Checking songs..."));

let errorCount = 0;
let warningCount = 0;
let fixCount = 0;

// Check the following:
// 1. All songs that are in the songs folder are in the DB
// 2. All songs that are in the DB are in the songs folder
// 3. All songs that are in the DB have artwork in the artwork folder if they should
// 4. Check song DB json to make sure it is not malformed
checkSongsInSongFolderAreInTheDB();
checkSongsInTheDBAreInSongFolder();
checkArtworkExistsForSongsThatShouldHaveArtwork();
fixDBIfMalformed();
printResults();

function checkSongsInSongFolderAreInTheDB() {
    fs.readdirSync(SONGS_FOLDER).forEach(fileName => {

        let songData = DB.filter((song) => song.midiFile === fileName)[0];

        if (songData === undefined) {
            printError("Song not in DB", fileName);
            return;
        }

    });
}

function checkSongsInTheDBAreInSongFolder() {

    DB.forEach((songData) => {

        try {
            fs.accessSync(path.join(SONGS_FOLDER, songData.midiFile), fs.constants.R_OK);
        }
        catch (err) {
            printError("Song not in folder", songData.midiFile);
            return;
        }

    });

}

function checkArtworkExistsForSongsThatShouldHaveArtwork() {
    fs.readdirSync(SONGS_FOLDER).forEach(fileName => {

        let songData = DB.filter((song) => song.midiFile === fileName)[0];

        // Check if the song is in the DB
        if (songData === undefined) {
            return;
        }

        if (songData.artwork !== null) {

            // check if artwork exists, we said it should.
            try {
                fs.accessSync(path.join(ARTWORK_FOLDER, songData.artwork), fs.constants.R_OK);
            } catch (err) {
                printError("Artwork not in folder", songData.artwork);
                return;
            }

        }

    });
}

function fixDBIfMalformed() {
    DB.forEach((songData) => {

        printLog("Checking song: " + songData.midiFile);
        //----------------- TITLE --------------
        // if no title is defined, set it to the midi file name.
        if (songData.name === undefined) {
            songData.name = songData.midiFile;
            printFix("Song title not defined", songData.midiFile);
        }


        //----------- ARTIST ------------
        // if no artist is defined, set it to an empty array.
        if (songData.artists === undefined || songData.artists === null) {
            songData.artists = [];
            printFix("Song artists not defined in JSON", songData.midiFile);
        }

        // If artist is defined as a string, split it into an array by comma.
        if (typeof songData.artists === "string") {
            songData.artists = songData.artists.split(",");
            printFix("Converted artist from string to array", songData.midiFile);
        }

        //Check if any artists have been defined
        if (songData.artists.length === 0) {
            printWarning("No artists defined", songData.midiFile);
        }

        // Sort artists alphabetically
        //printLog("Sorting artists for song: " + songData.midiFile);
        songData.artists.sort();

        //----------- TAGS ------------
        // If no tags are defined, set it to an empty array.
        if (songData.tags === undefined) {
            songData.tags = [];
            printFix("Song tags not defined", songData.midiFile);
        }

        // If tags is defined as a string, split it into an array by comma.
        if (typeof songData.tags === "string") {
            songData.tags = songData.tags.split(",");
            printFix("Converted tags from string to array", songData.midiFile);
        }

        // Check if any tags have been defined
        // if (songData.tags.length === 0) {
        //     printWarning("Tags list is empty", songData.midiFile);
        // }

        // Sort tags alphabetically
        //printLog("Sorting tags for song: " + songData.midiFile);
        songData.tags.sort();

        //----------- ARTWORK ------------
        //Artwork should be null if it is undefined or empty string
        if (songData.artwork === undefined || songData.artwork === "") {
            songData.artwork = null;
            printFix("Song artwork not defined", songData.midiFile);
        }

    });

    // ----------- SORT BY NAME ------------
    printLog("Sorting songs by name.")
    DB.sort((a, b) => a.name.localeCompare(b.name));

    // -------- WRITE TO FILE -----------
    printLog("Writing to songs-new.json");

    //backup old file
    fs.copyFileSync(path.join(__dirname, 'songs.json'), path.join(__dirname, 'songs.backup'));
    fs.writeFileSync(path.join(__dirname, 'songs.json'), JSON.stringify(DB, null, 4));
}

function printResults() {
    console.log(chalk.magenta("Finished checking songs: "));
    console.log(chalk.white("  - ") + chalk.red("Errors: ") + chalk.white(errorCount));
    console.log(chalk.white("  - ") + chalk.yellow("Warnings: ") + chalk.white(warningCount));
    console.log(chalk.white("  - ") + chalk.blue("Fixes: ") + chalk.white(fixCount));

}

function printLog(log) {
    console.log(chalk.gray(log));
}

function printError(error, songName) {
    console.log(chalk.red("Error > " + error + " for song: ") + chalk.white(songName));
    errorCount++;
}

function printWarning(warning, songName) {
    console.log(chalk.yellow("Warning > " + warning + " for song: ") + chalk.white(songName));
    warningCount++;
}

function printFix(fix, songName) {
    console.log(chalk.blue("Automatic Fixed > " + fix + " for song: ") + chalk.white(songName));
    fixCount++;
}