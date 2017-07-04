import { vowels } from './../values/vowels';
import { consonants } from './../values/consonants';
import { phonemes } from './../values/phonemes';
import { IConsonant, ISlicedSyllables, IPhonetics, IPhonemeReg } from './../interfaces/interfaces';

export class LaoneticsTranslater {
	private accents = '[່້໌໊໋]?';
	private currentLang = 'fr';
	private sep = '-#@#-'; // an arbitrary separation string, to cut the string phoneme by phoneme
	private sentenceLao: string;
	private sentenceKaraoke: string;
	getKaraoke (sentence: string, lang?: string): ISlicedSyllables {
		// register current lang
		this.currentLang = lang || this.currentLang;

		// remove accents in sentence
		this.sentenceLao = sentence.replace(new RegExp(this.accents, 'gi'), '');
		this.sentenceKaraoke = this.sentenceLao;

		// complexity ordered replacement, phoneme by phoneme
		phonemes.forEach((item: IPhonemeReg) => {
			this.replacePart(item);
		})

		// remove last separation
		const lastSep = new RegExp(this.sep + '\s*$');
		this.sentenceLao = this.sentenceLao.replace(lastSep, '')
		this.sentenceKaraoke = this.sentenceKaraoke.replace(lastSep, '')

		// ໆ

		// return fully sliced & replaced sentences, as 2 arrays
		return {
			lao: this.sentenceLao.split(this.sep),
			karaoke: this.sentenceKaraoke.split(this.sep)
		};
	}

	replacePart (item: IPhonemeReg): void {
		const matches = this.sentenceLao.match(new RegExp(item.reg, 'gi')) || [];
		if (item.name === 'trailingFollowX') {
			console.log('trailingFollowX')
			console.log(item.reg)
		}
		matches.forEach(syllable => {
			if (item.name === 'trailingFollowX') {
				console.log(syllable)
			}
			let match = this.toKaraoke(syllable, item.name);
			this.sentenceLao = this.sentenceLao.replace(match.phonemeLao, match.phonemeLao + this.sep);
			this.sentenceKaraoke = this.sentenceKaraoke.replace(match.phonemeLao, match.phonemeKaraoke + this.sep);
		})
	}

	toKaraoke (syllable: string, location: string) {
		// console.log(syllable, location)
		let vowel: string;
		let consonant: string;
		let trailingPart = '';
		let extra: IConsonant;
		// console.log(syllable.split('').join(' / '));
		switch (location) {
			case 'trailingSpecialX':
				vowel = 'x' + (syllable[1] === 'ັ' ? syllable[1] + syllable[2] : syllable[1]) + 'x';
				consonant = syllable[0]
				extra = consonants[syllable[syllable.length - 1]];
				trailingPart = (extra && extra.trailing && extra.trailing[this.currentLang]) || '';
				break;
			case 'trailingLeftX':
				vowel = syllable[2] === 'ັ' ? syllable[0] + 'x' + syllable[2] + 'x' : syllable[0] + 'x';
				consonant = syllable[1]
				extra = consonants[syllable[syllable[2] === 'ັ' ? 3 : 2]];
				trailingPart = (extra && extra.trailing && extra.trailing[this.currentLang]) || '';
				syllable = syllable.substr(0, syllable.length - 1)
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
		// console.log(location, 'c:', consonant, 'v:', vowel, 'ex:', trailingPart);
		let finalConsonant = consonants[consonant] && consonants[consonant].leading[this.currentLang];
		let finalVowel = vowels[vowel] && vowels[vowel][this.currentLang];
		if (typeof finalConsonant === 'undefined' || typeof !finalVowel === 'undefined') {
			console.log(location, 'c:', consonant, 'v:', vowel, 'ex:', trailingPart);
			console.error('ERROR: impossible to understand', syllable, 'c:', finalConsonant, 'v:', finalVowel);
		}
		return {
			phonemeKaraoke: finalConsonant + finalVowel + trailingPart,
			phonemeLao: syllable
		};
	}
};
