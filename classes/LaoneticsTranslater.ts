export class LaoneticsTranslater {
	private vowels = {
		arround: {
			all: 'ເ',
			follow: '[ິີ]',
			ເxີ: { en: 'oe:', fr: 'eu:'},
			ເxິ: { en: 'oe', fr: 'eu'},
		},
		left: {
			all: '[ແເໂໄໃ]',
			ແx: { en: 'ae:', fr: 'è:'},
			ແxະ: { en: 'ae', fr: 'è'},
			ເx: { en: 'e:', fr: 'é:'},
			ເxະ: { en: 'e', fr: 'é'},
			ໂx: { en: 'o:', fr: 'ô:'},
			ໂxະ: { en: 'o', fr: 'ô'},
			ໄx: { en: 'ai', fr: 'ay'},
			ໃx: { en: 'ai', fr: 'ay'}
		},
		top: {
			all: '[ໍິີຶືົ]'
		}
	}
	private consonants = {
		all: '[ນມບດ]',
		ນ: { en: 'n', fr: 'n' },
		ມ: { en: 'm', fr: 'm' },
		ບ: { en: 'b', fr: 'b' },
		ດ: { en: 'd', fr: 'd' },
	};
	private accents = '[່້໌]?';
	private shortMark = 'ະ?';
	private lang = 'fr';
	replaceSentence (sentence: string, lang?: string): string {
		sentence = sentence.replace(new RegExp(this.accents, 'gi'), '')
		sentence = this.replacePart(sentence, 'arround');
		sentence = this.replacePart(sentence, 'left');
		return sentence;
	}
	replacePart (sentence: string, location: string): string {
		const vowels = this.vowels[location];
		let syllables = vowels.all + this.consonants.all + (vowels.follow || '');
		let reg = new RegExp(syllables + this.shortMark, 'gi');
		const matches = sentence.match(reg) || [];
		matches.forEach(syllable => {
			let kk = this.toKaraoke(syllable, location);
			sentence = sentence.replace(syllable, kk);
		})
		return sentence;
	}
	toKaraoke(syllable: string, location: string): string {
		// console.log(syllable, location)
		let vowel: string;
		let consonant: string;
		let shortMark: boolean;
		switch (location) {
			case 'arround':
				vowel = syllable[0] + 'x' + syllable[2]
				consonant = syllable[1]
				shortMark = true
				break;
			case 'left':
				vowel = syllable[0] + 'x' + (syllable[2] || '');
				consonant = syllable[1];
				break;
		}
		console.log(vowel, consonant);
		let finalConsonant = this.consonants[consonant] && this.consonants[consonant][this.lang];
		let finalVowel = this.vowels[location][vowel] && this.vowels[location][vowel][this.lang];
		if (!finalConsonant || !finalVowel) {
			console.error('ERROR: impossible to understand', syllable);
		}
		return finalConsonant + finalVowel;
	}
};
