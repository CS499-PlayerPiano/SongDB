# Songs DB
This repo contains all the songs for the piano to play.

## Schema
* name: `string` - The name of the song.
* artists: `string[]` - The artist(s) of the song.
* tags: `string[]` - A list of tags for the song. **Can be empty**
* midiFile: `string` - The name of the midi file.
* artwork: `string` - The name of the artwork file. **null if there is no artwork.**
* noteCount: `number` - The number of notes in the song. **AUTO GENERATED**
* "songLengthMS": `number` - The length of the song in milliseconds. **AUTO GENERATED**

```json
{
    "name": "It's Been So Long",
    "artists": ["The Living Tombstone"],
    "tags": ["meme song", "FNAF", "Five Nights at Freddy's"],
    "midiFile": "its-been-so-long.mid",
    "artwork": "TheLivingTombstone.jpg",
    "noteCount": 1162,
    "songLengthMS": 171875
}
```

## Checker instructions
Checker is located in the main repo under miscprograms. At somepoint it will be moved to this repo as a built artifact.