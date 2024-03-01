# Songs DB
This repo contains all the songs for the piano to play.

## Schema
* name: `string` - The name of the song.
* artists: `string[]` - The artist(s) of the song.
* tags: `string[]` - A list of tags for the song. **Can be empty**
* genre: `string[]` - A list of genres for the song. **Can be empty**
* midiFile: `string` - The name of the midi file.
* artwork: `string` - The name of the artwork file. **null if there is no artwork.**
* favorite: `boolean` - If we think it works very well on piano.
* noteCount: `number` - The number of notes in the song. **AUTO GENERATED**
* songLengthMS: `number` - The length of the song in milliseconds. **AUTO GENERATED**

```json
{
    "name": "It's Been So Long",
    "artists": ["The Living Tombstone"],
    "tags": ["meme song", "FNAF", "Five Nights at Freddy's"],
    "genre": [],
    "midiFile": "its-been-so-long.mid",
    "artwork": "TheLivingTombstone.jpg",
    "favorite": false,
    "noteCount": 1162,
    "songLengthMS": 171875
}
```

## Commands
### Help
```bash
java -jar PianoController.jar

java -jar PianoController.jar help
```

### Run server
```bash
java -jar PianoController.jar run-server
```

### Convert MIDI to Piano file
```bash
java -jar PianoController.jar parse-midi --input input.mid --output output.piano
java -jar PianoController.jar parse-midi -i input.mid -o output.piano

# Version defaults to latest
java -jar PianoController.jar parse-midi --input input.mid --output output.piano --version 6
java -jar PianoController.jar parse-midi -i input.mid -o output.piano -v 6
```

### SongDB Verification
```bash
java -jar PianoController.jar songdb-verification

#Githb action changes the working directory
java -jar PianoController.jar songdb-verification --github-action
java -jar PianoController.jar songdb-verification -ga
```