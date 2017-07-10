import { vowels } from './../values/vowels';
import { consonants } from './../values/consonants';
import { graphemes, regs, phonemes } from './../values/phonemes';
import { IConsonant, ISlicedSyllables, IPhonetics, IPhonemeReg } from './../interfaces/interfaces';

export class LaoneticsTranslater {
	private sep = '-#@#-'; // an arbitrary separation string, to cut the string phoneme by phoneme
	private sentenceLao: string;
	private roms: Array<Array<string>> = [];
	private sentences: Array<string> = [];
	private langs: Array<string>;
	getKaraoke (sentence: string, langs: Array<string>): ISlicedSyllables {
		this.sentenceLao = sentence;
		this.langs = langs;
		this.roms = [];
		this.sentences = [];

		// remove accents/'phantom unicodes' in sentence and copy value
		this.sentenceLao = this.sentenceLao.replace(new RegExp(regs.removables, 'gimu'), '');
		this.sentenceLao = this.sentenceLao.replace(/(\w+)/g, this.sep + '$1')
		this.sentenceLao = this.sentenceLao.replace(/ໆ/g, this.sep + 'ໆ');

		// copy a base sentence for every lang
		this.langs.forEach(lang => {
			this.sentences.push(this.sentenceLao);
		});

		// complexity ordered replacement, phoneme by phoneme
		phonemes.forEach((item: IPhonemeReg) => {
			this.replacePart(item);
		})

		// remove first separation & manage ໆ and preprare final chopped phonemes
		this.sentenceLao = this.sentenceLao.replace(this.sep, '');

		const phonemesLao = this.sentenceLao.split(this.sep);
		this.sentences.forEach((currentSentence, i) => {
			this.sentences[i] = currentSentence.replace(this.sep, '');
			// exceptions
			this.sentences[i] = this.sentences[i].replace(/y{2}/g, 'y'); // ຢຽມ double y case
			const romPhonemes = this.sentences[i].split(this.sep);
			romPhonemes.forEach((phoneme, index) => {
				if (phoneme === 'ໆ') {
					romPhonemes[index] = romPhonemes[index - 1]
				}
			});
			this.roms.push(romPhonemes)
		});

		// return fully sliced & replaced sentences, as 2 arrays
		return {
			lao: phonemesLao,
			roms: this.roms
		};
	}

	replacePart (phoneme: IPhonemeReg): void {
		// console.log('LaoneticsTranslater::replacePart', phoneme);
		let reg = new RegExp(phoneme.reg + regs.boundary, 'gimu');
		let matches: Array<string> = this.sentenceLao.match(reg) || [];
		matches.forEach(syllable => {
			let match = this.toKaraoke(syllable, phoneme);
			// add separation to sentence only for phonems not leading by a sep
			let regWithSep = new RegExp(`(${this.sep})?([${graphemes.vLeft}])?${syllable}${regs.boundary}`, 'gimu');
			this.sentenceLao = this.sentenceLao.replace(regWithSep, this.sep + syllable);
			this.sentences.forEach((sentence, i) => {
				this.sentences[i] = sentence.replace(regWithSep, this.sep + match[i]);
			})
		})
	}

	toKaraoke (syllable: string, phoneme: IPhonemeReg) {
		// console.log('LaoneticsTranslater::toKaraoke', syllable, phoneme)
		const location = phoneme.name;
		let vowel: string;
		let consonant: string;
		let extra: IConsonant;
		let isHX = false;
		let finalMatches = [];

		// remove useless last boundary group for overlapping phonemes then copy final syllable is ready
		// syllable = syllable.substr(0, syllable.length - 1);
		// console.log('before treatment syllables', syllable);

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
		this.langs.forEach((lang, i) => {
			let trailingPart = (extra && extra.trailing && extra.trailing[lang]) || '';
			let finalConsonant = consonants[consonant] && consonants[consonant].leading[lang];
			let finalVowel = vowels[vowel] && vowels[vowel][lang];
			// console.log(finalSyllable, 'c:', consonant, 'v:', vowel, 'ex:', trailingPart);
			if (typeof finalConsonant === 'undefined' || typeof !finalVowel === 'undefined') {
				console.log(location, 'c:', consonant, 'v:', vowel, 'e:', extra);
				console.error('ERROR: impossible to understand', syllable, 'c:', finalConsonant, 'v:', finalVowel, 'e:', trailingPart);
			}
			finalMatches.push(finalConsonant + finalVowel + trailingPart)
		});
		return finalMatches;
	}
};
