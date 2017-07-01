import { vowels } from './../data/vowels';
import { consonants } from './../data/consonants';
import { IConsonant } from './../interfaces/interfaces';

export class LaoneticsTranslater {
	private vowels = vowels;
	private consonants = consonants;
	private accents = '[່້໌]?';
	private shortMark = 'ະ?';
	private currentLang = 'fr';
	getKaraoke (sentence: string, lang?: string): string {
		// register current lang
		this.currentLang = lang || this.currentLang;

		// remove accents
		sentence = sentence.replace(new RegExp(this.accents, 'gi'), '')

		// complexity ordered replacement, syllables by syllables
		sentence = this.replacePart(sentence, 'trailingƆX');
		sentence = this.replacePart(sentence, 'trailingFollowX');
		sentence = this.replacePart(sentence, 'topLeft');
		sentence = this.replacePart(sentence, 'topRight');
		sentence = this.replacePart(sentence, 'left');
		sentence = this.replacePart(sentence, 'follow');

		// return fully replaced sentence
		return sentence;
	}

	replacePart (sentence: string, location: string): string {
		const vowels = this.vowels[location];
		const leftPart = vowels.leftPart || ''
		const followPart = vowels.followPart || ''
		let regSyllables = leftPart + this.consonants.all + followPart;
		console.log(regSyllables);
		let reg = new RegExp(regSyllables + this.shortMark, 'gi');
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
		let trailingPart = '';
		let consonant2: IConsonant;
		console.log(syllable.split('').join(' / '));
		switch (location) {
			case 'trailingƆX':
				vowel = 'x' + (syllable[1] === 'ັ' ? syllable[1] + syllable[2] : syllable[1]) + 'x';
				consonant = syllable[0]
				consonant2 = this.consonants[syllable[syllable.length - 1]];
				trailingPart = (consonant2 && consonant2.trailing && consonant2.trailing[this.currentLang]) || '';
				break;
			case 'trailingFollowX':
				vowel = 'x' + syllable[1];
				consonant = syllable[0]
				consonant2 = this.consonants[syllable[2]];
				console.log('consonant2', consonant2)
				trailingPart = (consonant2 && consonant2.trailing && consonant2.trailing[this.currentLang]) || '';
				break;
			case 'topRight':
				vowel = 'x' + syllable[1] + syllable[2]
				consonant = syllable[0]
				break;
			case 'topLeft':
				vowel = syllable[0] + 'x' + syllable[2] + (syllable[3] || '');
				consonant = syllable[1];
				break;
			case 'left':
				vowel = syllable[0] + 'x' + (syllable[2] || '');
				consonant = syllable[1];
				break;
			case 'follow':
				vowel = 'x' + syllable[1];
				consonant = syllable[0];
				break;
		}
		console.log('c:', consonant, 'v:', vowel);
		location = this.vowels[location].base || location;
		let finalConsonant = this.consonants[consonant] && this.consonants[consonant].leading[this.currentLang];
		let finalVowel = this.vowels[location][vowel] && this.vowels[location][vowel][this.currentLang];
		if (!finalConsonant || !finalVowel) {
			console.error('ERROR: impossible to understand', syllable, finalConsonant, finalVowel);
		}
		return finalConsonant + finalVowel + trailingPart +  ' ';
	}
};
