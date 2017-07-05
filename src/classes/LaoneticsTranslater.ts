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

		// remove accents in sentence and copy value
		this.sentenceLao = sentence.replace(new RegExp(this.accents, 'gi'), '');
		this.sentenceKaraoke = this.sentenceLao;

		// complexity ordered replacement, phoneme by phoneme
		phonemes.forEach((item: IPhonemeReg) => {
			this.replacePart(item);
		})

		// remove first separation
		this.sentenceLao = this.sentenceLao.replace(this.sep, '')
		this.sentenceKaraoke = this.sentenceKaraoke.replace(this.sep, '')

		// ໆ

		// return fully sliced & replaced sentences, as 2 arrays
		return {
			lao: this.sentenceLao.split(this.sep),
			karaoke: this.sentenceKaraoke.split(this.sep)
		};
	}

	replacePart (item: IPhonemeReg): void {
		let matches: Array<string>;
		let reg = new RegExp(item.reg, 'gi');
		if (item.overlapping) {
			matches = this.matchOverlap(this.sentenceKaraoke, reg) || [];
		} else {
			matches =  this.sentenceKaraoke.match(reg) || [];
		}
		console.log(`----------- ${item.name} ------------`);
		console.log('reg:', reg);
		// console.log('karaoke:', this.sentenceKaraoke);
		// console.log('matches', matches)
		matches.forEach(syllable => {
			// if (item.name === 'trailingOAX') {
			// 	console.log(syllable);
			// }
			let match = this.toKaraoke(syllable, item.name);

			// add separation to sentence lao only for phonems not leading by a sep
			let regWithSep = new RegExp('(' + this.sep + ')?' + match.phonemeLao , 'ig');
			this.sentenceLao = this.sentenceLao.replace(regWithSep, ($0, $1) => {
				return $1 ? $0 : this.sep + match.phonemeLao;
			});
			this.sentenceKaraoke = this.sentenceKaraoke.replace(match.phonemeLao, this.sep + match.phonemeKaraoke);
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
			case 'trailingOAX':
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
				syllable = syllable.substr(0, syllable.length - 1)
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
			case 'alone':
				vowel = 'x';
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
		console.log('syllable', syllable)
		return {
			phonemeKaraoke: finalConsonant + finalVowel + trailingPart,
			phonemeLao: syllable
		};
	}
	/*
		matchOverlap
		reg: MUST be a Regexp "global" (with "/.../g" mark) to avoid infinite loop;
	 */
	matchOverlap (input: string, reg: RegExp): Array<string> {
		let matches = [];
		let m: any;
		while (m = reg.exec(input)) {
				reg.lastIndex -= m[0].length - 1;
				matches.push(m[0]);
		}
		return matches;
	}
};
