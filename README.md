# Songs DB
This repo contains all the songs for the piano to play.

## Schema
* name: `string` - The name of the song.
* artists: `string[]` - The artist(s) of the song.
* tags: `string[]` - A list of tags for the song. **Can be empty**
* midiFile: `string` - The name of the midi file.
* artwork: `string` - The name of the artwork file. **null if there is no artwork.**

```json
{
    "name": "It's Been So Long",
    "artists": ["The Living Tombstone"],
    "tags": ["meme song", "FNAF", "Five Nights at Freddy's"],
    "midiFile": "its-been-so-long.mid",
    "artwork": "TheLivingTombstone.jpg",
}
```