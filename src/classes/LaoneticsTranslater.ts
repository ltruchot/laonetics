import { vowels } from './../values/vowels';
import { consonants } from './../values/consonants';
import { graphemes, regs, phonemes } from './../values/phonemes';
import { IConsonant, ISlicedSyllables, IPhonetics, IPhonemeReg } from './../interfaces/interfaces';

export class LaoneticsTranslater {
	private currentLang = 'fr';
	private sep = '-#@#-'; // an arbitrary separation string, to cut the string phoneme by phoneme
	private sentenceLao: string;
	private sentenceKaraoke: string;
	getKaraoke (sentence: string, langs?: Array<string>): ISlicedSyllables {
		this.sentenceLao = sentence;
		// register current lang
		this.currentLang = langs[0] || this.currentLang;

		// remove accents/'phantom unicodes' in sentence and copy value
		this.sentenceLao = this.sentenceLao.replace(new RegExp(regs.accents, 'g'), '');
		this.sentenceLao = this.sentenceLao.replace(new RegExp(regs.phantoms, 'g'), '');
		this.sentenceKaraoke = this.sentenceLao;

		// complexity ordered replacement, phoneme by phoneme
		phonemes.forEach((item: IPhonemeReg) => {
			this.replacePart(item);
		})

		// remove first separation
		this.sentenceLao = this.sentenceLao.replace(this.sep, '');
		this.sentenceKaraoke = this.sentenceKaraoke.replace(this.sep, '');

		// manage ໆ and preprare final chopped phonemes
		this.sentenceLao = this.sentenceLao.replace(/ໆ/g, this.sep + 'ໆ');
		this.sentenceKaraoke = this.sentenceKaraoke.replace(/ໆ/g, this.sep + 'ໆ');
		const phonemesLao = this.sentenceLao.split(this.sep);
		const phonemesKaroke = this.sentenceKaraoke.split(this.sep);
		phonemesKaroke.forEach((phoneme, index) => {
			if (phoneme === 'ໆ') {
				phonemesKaroke[index] = phonemesKaroke[index - 1]
			}
		});

		// return fully sliced & replaced sentences, as 2 arrays
		return {
			lao: phonemesLao,
			langs: [phonemesKaroke]
		};
	}

	replacePart (phoneme: IPhonemeReg): void {
		// console.log('LaoneticsTranslater::replacePart', phoneme);
		// console.log(`-------- ${phoneme.name} ---------`);
		let matches: Array<string>;
		let reg = new RegExp(phoneme.reg + regs.rightBoundary, 'gimu');
		matches = this.matchOverlap(this.sentenceKaraoke, reg) || [];

		// console.log('reg:', reg);
		// console.log('karaoke:', this.sentenceKaraoke);
		// console.log('lao:', this.sentenceLao);

		matches.forEach(syllable => {
			let match = this.toKaraoke(syllable, phoneme);
			// add separation to sentence lao only for phonems not leading by a sep
			let regWithSep = `(${this.sep})?([${graphemes.vLeft}])?${match.phonemeLao}${regs.reversedBoundary}`;
			this.sentenceLao = this.sentenceLao.replace(new RegExp(regWithSep, 'gimu'), ($0, $1) => {
				return $1 ? $0 : this.sep + match.phonemeLao;
			});
			this.sentenceKaraoke = this.sentenceKaraoke.replace(new RegExp(regWithSep, 'gimu'), ($0, $1) => {
				return $1 ? $0 : this.sep + match.phonemeKaraoke;
			});
		})
	}

	toKaraoke (syllable: string, phoneme: IPhonemeReg) {
		// console.log('LaoneticsTranslater::toKaraoke', syllable, phoneme)
		const location = phoneme.name;
		let finalSyllable: string;
		let vowel: string;
		let consonant: string;
		let extra: IConsonant;
		let trailingPart = '';
		let isHX = false;

		// remove useless last boundary group for overlapping phonemes then copy final syllable is ready
		syllable = syllable.substr(0, syllable.length - 1);
		// console.log('before treatment syllables', syllable);
		finalSyllable = syllable;

		// temporary remove ຫ for "combined consonants": ຫງ, ຫຍ, ຫນ, ຫມ, ຫຼ, ຫລ, ຫວ
		if (syllable.match(regs.leadingH)) {
			isHX = true;
			syllable = syllable.replace('ຫ', '');
		}
		switch (location) {
			case 'onlyFollow3':
				vowel = 'x' + syllable[1] + syllable[2] + syllable[3];
				consonant = syllable[0];
				break
			case 'trailingFollow2':
			case 'onlyFollow2':
				vowel = 'x' + syllable[1] + syllable[2];
				consonant = syllable[0];
				extra = syllable[3] ? consonants[syllable[3]] : '';
				break;
			case 'trailingFollow1':
				vowel = 'x' + syllable[1] + 'x';
				consonant = syllable[0];
				extra = consonants[syllable[2]];
				break;
			case 'specialLeftFollow2':
			case 'trailingLeftFollow2':
			case 'onlyLeftFollow2':
				vowel = syllable[0] + 'x' + syllable[2] +  syllable[3];
				consonant = syllable[1];
				extra = syllable[4] ? consonants[syllable[4]] : '';
				break;
			case 'specialLeftFollow' :
			case 'trailingLeftFollow':
			case 'onlyLeftFollow':
				vowel = syllable[0] + 'x' + syllable[2];
				consonant = syllable[1];
				extra = syllable[3] ? consonants[syllable[3]] : '';
				break;
			case 'trailingLeft':
			case 'onlyLeft':
				vowel =  syllable[0] + 'x';
				consonant = syllable[1]
				extra = syllable[2] ? consonants[syllable[2]] : '';
				break;
			case 'trailingFollow':
			case 'onlyFollow':
				vowel = 'x' + syllable[1];
				consonant = syllable[0]
				extra = syllable[2] ? consonants[syllable[2]] : '';
				break;
			// case 'alone':
			// 	vowel = 'x';
			// 	consonant = syllable[0];
			// 	break;
		}

		// replug temporary inhibited ຫ if needed
		if (isHX) {
			consonant = 'ຫ' + consonant;
		}
		trailingPart = (extra && extra.trailing && extra.trailing[this.currentLang]) || '';
		// console.log(finalSyllable, 'c:', consonant, 'v:', vowel, 'ex:', trailingPart);
		let finalConsonant = consonants[consonant] && consonants[consonant].leading[this.currentLang];
		let finalVowel = vowels[vowel] && vowels[vowel][this.currentLang];
		if (typeof finalConsonant === 'undefined' || typeof !finalVowel === 'undefined') {
			console.log(location, 'c:', consonant, 'v:', vowel, 'ex:', trailingPart);
			console.error('ERROR: impossible to understand', syllable, 'c:', finalConsonant, 'v:', finalVowel);
		}
		// console.log('final syllable', syllable)
		return {
			phonemeKaraoke: finalConsonant + finalVowel + trailingPart,
			phonemeLao: finalSyllable
		};
	}
	/*
		matchOverlap
		reg: MUST be a Regexp "global" (with "/.../g" mark) to avoid infinite loop;
	 */
	matchOverlap (input: string, reg: RegExp): Array<string> {
		// console.log('LaoneticsTranslater::matchOverlap')
		let matches = [];
		let m: any;
		while (m = reg.exec(input)) {
			reg.lastIndex -= (m[0].length - 1);
			matches.push(m[0]);
		}
		return matches;
	}
};
