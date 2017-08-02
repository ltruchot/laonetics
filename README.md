# Laonetics


Laonetics is a Typescript/Javascript component to convert lao chars in english/french phonetic forms, aka karaoke.


Install: `npm install --save laonetics`

Import: `import { LaoneticsTranslater, ISlicedSyllables } from 'laonetics';`

Use:
```typescript
const translater = new LaoneticsTranslater();
// exemple with rabbit word in lao: "ກະຕ່າຍ"
let slicedSyllables: ISlicedSyllables = translater.getKaraoke('ກະຕ່າຍ', ['fr', 'en', 'ph']);
/*
'slicedSyllables' now contains an Object with the typescript interface {
	lao: Array<string>;
	roms: Array<Array<string>>;
};
'lao' contains the sliced sentence in lao: ['ກະ', 'ຕາຍ']
'roms' contains an array for each language, ordered like asked: [
	['kâ', 'tâ:y'],	// french
	['ka', 'ta:i'],	// english
	['ka', 'taːɲ']	// IPA phonetics
]
*/
```

Current version: Beta v0.4.0 "Smart lao language karaoke".

Demo running here: [laonetics.io](http://laonetics.io)

Licences: [CC-BY-NC-4.0](https://creativecommons.org/licenses/by-nc/4.0/): you can use/copy/modify any code but only without commercial intentions.


Transparent & agile project management: [Trello](https://trello.com/b/L3XSHsjL/laonetics)

## Development watch && serve

Run `npm run update && npm start` for a dev server. Navigate to `http://localhost:5000/`. The app will automatically reload if you change any of the source files.

Run `npm run update && node server.js` for a prod server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.


