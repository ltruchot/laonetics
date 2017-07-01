import { vowels } from './../data/vowels';
import { consonants } from './../data/consonants';
import { IConsonant } from './../interfaces/interfaces';
console.log(consonants.all + vowels.trailingAX.followPart)
console.log(consonants.all + vowels.trailingƆX.followPart)

export class LaoneticsTranslater {
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
		sentence = this.replacePart(sentence, 'trailingAX');
		sentence = this.replacePart(sentence, 'trailingFollowX');
		sentence = this.replacePart(sentence, 'topLeft');
		sentence = this.replacePart(sentence, 'topRight');
		sentence = this.replacePart(sentence, 'left');
		sentence = this.replacePart(sentence, 'follow');

		// return fully replaced sentence
		return sentence;
	}

	replacePart (sentence: string, location: string): string {
		const currentVowels = vowels[location];
		const leftPart = currentVowels.leftPart || ''
		const followPart = currentVowels.followPart || ''
		let regSyllables = leftPart + consonants.all + followPart;
		let reg = new RegExp(regSyllables + this.shortMark, 'gi');
		const matches = sentence.match(reg) || [];
		console.log('matches', matches)
		matches.forEach(syllable => {
			let match = this.toKaraoke(syllable, location);
			sentence = sentence.replace(match.syllable, match.karaoke);
		})
		return sentence;
	}

	toKaraoke(syllable: string, location: string) {
		// console.log(syllable, location)
		let vowel: string;
		let consonant: string;
		let trailingPart = '';
		let extra: IConsonant;
		// console.log(syllable.split('').join(' / '));
		switch (location) {
			case 'trailingƆX':
				vowel = 'x' + (syllable[1] === 'ັ' ? syllable[1] + syllable[2] : syllable[1]) + 'x';
				consonant = syllable[0]
				extra = consonants[syllable[syllable.length - 1]];
				trailingPart = (extra && extra.trailing && extra.trailing[this.currentLang]) || '';
				break;
			case 'trailingAX':
				vowel = 'x' + syllable[1] + 'x';
				consonant = syllable[0]
				extra = consonants[syllable[2]];
				trailingPart = (extra && extra.trailing && extra.trailing[this.currentLang]) || '';
				syllable = syllable.substr(0, syllable.length - 1)
				break;
			case 'trailingFollowX':
				vowel = 'x' + syllable[1];
				consonant = syllable[0]
				extra = consonants[syllable[2]];
				trailingPart = (extra && extra.trailing && extra.trailing[this.currentLang]) || '';
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
		console.log('c:', consonant, 'v:', vowel, 'ex:', trailingPart);
		location = vowels[location].base || location;
		let finalConsonant = consonants[consonant] && consonants[consonant].leading[this.currentLang];
		let finalVowel = vowels[location][vowel] && vowels[location][vowel][this.currentLang];
		if (!finalConsonant || !finalVowel) {
			console.error('ERROR: impossible to understand', syllable, finalConsonant, finalVowel);
		}
		return {
			karaoke: finalConsonant + finalVowel + trailingPart +  ' - ',
			syllable: syllable
		};
	}
};
