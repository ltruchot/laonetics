import { vowels } from './../values/vowels';
import { consonants } from './../values/consonants';
import { graphemes, phonemes, regInstances, regs } from './../values/phonemes';
import { IConsonant, IPhonemeReg, ISlicedSyllables } from './../interfaces/interfaces';

export class LaoneticsTranslater {
	private sep = '-#@#-'; // an arbitrary separation string, to cut the string phoneme by phoneme
	private subSep = '-##@##-';
	private sentenceLao: string;
	private roms: string[][] = [];
	private sentences: string[] = [];
	private langs: string[];
	constructor () {}

	getKaraoke (sentence: string, langs: string[]): ISlicedSyllables {
		this.sentenceLao = sentence;
		this.langs = langs;
		this.roms = [];
		this.sentences = [];

		// remove accents/'phantom unicodes' in sentence and copy value
		this.sentenceLao = this.sentenceLao.replace(regInstances.removables, '');
		this.sentenceLao = this.sentenceLao.replace(/([\wàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ\(\)]+)/g, this.sep + '$1');
		this.sentenceLao = this.sentenceLao.replace(/ໆ/g, this.sep + 'ໆ');

		// copy a base sentence for every lang
		this.langs.forEach(() => {
			this.sentences.push(this.sentenceLao);
		});

		// complexity ordered replacement, phoneme by phoneme
		phonemes.forEach((item: IPhonemeReg) => {
			this.replacePart(item);
		});

		// separate last isolated lao grapheme, remove first separation & manage ໆ and preprare final chopped phonemes
		this.sentenceLao = this.sentenceLao.replace(regInstances.cAlone, this.sep + '$1');
		this.sentenceLao = this.sentenceLao.replace(new RegExp(this.subSep, 'g'), '');
		this.sentenceLao = this.sentenceLao.replace(this.sep, '');
		const phonemesLao = this.sentenceLao.split(this.sep);

		this.sentences.forEach((currentSentence, i) => {
			// separate last isolated lao grapheme
			this.sentences[i] = this.sentences[i].replace(regInstances.cAlone, this.sep + '$1');
			this.sentences[i] = this.sentences[i].replace(this.sep, '');
			// exceptions
			this.sentences[i] = this.sentences[i].replace(/y{2}/g, 'y'); // ຢຽມ double y case
			const romPhonemes = this.sentences[i].split(this.sep);
			romPhonemes.forEach((phoneme, index) => {
				if (phoneme === 'ໆ') {
					romPhonemes[index] = romPhonemes[index - 1];
				}
			});
			this.roms.push(romPhonemes);
		});

		// FIXME: post treatment needed ?
		// what about "ທຣ" in ກົດ​ອິນທຣິຍສົ້ມ ?
		// what about "ອົາ" in ນຳ​ອົາໝາກ​ສົມ​ພໍດີ

		// return fully sliced & replaced sentences, as 2 arrays
		return {
			lao: phonemesLao,
			roms: this.roms
		};
	}

	getMatches (reg: string): string[] {
		const searchReg = new RegExp(reg + regs.boundary, 'gimu');
		return this.sentenceLao.match(searchReg) || [];
	}

	replacePart (phoneme: IPhonemeReg): void {
		// console.log('LaoneticsTranslater::replacePart', phoneme);
		this.getMatches(phoneme.reg).forEach(syllable => {
			const match = this.toKaraoke(syllable, phoneme);
			// add separation to sentence' only for phonems not leading by a sep
			const regWithSep = new RegExp(`${syllable}${regs.boundary}`);
			const syllableTagged = this.subSep + syllable.replace(/(.)/ig, '$1' + this.subSep);
			this.sentenceLao = this.sentenceLao.replace(regWithSep, this.sep + syllableTagged);
			this.sentences.forEach((sentence, i) => {
				this.sentences[i] = sentence.replace(regWithSep, this.sep + match[i]);
			});
		});
	}

	toKaraoke (syllable: string, phoneme: IPhonemeReg): string[] {
		// console.log('LaoneticsTranslater::toKaraoke', syllable, phoneme)
		const location = phoneme.location;
		const minCharNumber = phoneme.charNbr;
		let vowel: string;
		let consonant: string;
		let consonantLeftPart: string;
		let extra: IConsonant;
		let isDoubleConsonant = false;
		const finalMatches: string[] = [];

		// temporary remove accents

		if (syllable.length > minCharNumber && syllable.match(regInstances.accents)) {
			syllable = syllable.replace(regInstances.accents, '');
		}

		// temporary remove ຫ, ຂ, ຄ for "combined consonants": ຫງ, ຫຍ, ຫນ, ຫມ, ຫຼ, ຫລ, ຫວ, ຂວ, ຄວ
		if (syllable.length > minCharNumber && syllable.match(regInstances.cSpecial)) {
			// console.log('combined consonants found:', syllable)
			consonantLeftPart = syllable.match(/[ຫຂຄ]/)[0][0];
			isDoubleConsonant = true;
			syllable = syllable.replace(/[ຫຂຄ]/, '');
		}
		switch (location) {
			case 'onlyFollow3':
				vowel = 'x' + syllable[1] + syllable[2] + syllable[3];
				consonant = syllable[0];
				break;
			case 'trailingFollow2':
			case 'onlyFollow2':
				vowel = 'x' + syllable[1] + syllable[2] + (syllable[3] ? 'x' : '');
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
				vowel = syllable[0] + 'x' + syllable[2] +  syllable[3] + (syllable[4] ? 'x' : '');
				consonant = syllable[1];
				extra = syllable[4] ? consonants[syllable[4]] : '';
				break;
			case 'specialLeftFollow':
			case 'trailingLeftFollow':
			case 'onlyLeftFollow':
				vowel = syllable[0] + 'x' + syllable[2] + (syllable[3] ? 'x' : '');
				consonant = syllable[1];
				extra = syllable[3] ? consonants[syllable[3]] : '';
				break;
			case 'trailingLeft':
			case 'onlyLeft':
				vowel =  syllable[0] + 'x' + (syllable[2] ? 'x' : '');
				consonant = syllable[1];
				extra = syllable[2] ? consonants[syllable[2]] : '';
				break;
			case 'trailingFollow':
			case 'onlyFollow':
				vowel = 'x' + syllable[1] + (syllable[2] ? 'x' : '');
				consonant = syllable[0];
				extra = syllable[2] ? consonants[syllable[2]] : '';
				break;
			// case 'alone':
			// 	vowel = 'x';
			// 	consonant = syllable[0];
			// 	break;
		}

		// replug temporary inhibited ຫ if needed
		if (isDoubleConsonant) {
			consonant = consonantLeftPart + consonant;
		}
		this.langs.forEach((lang, i) => {
			const trailingPart = (extra && extra.trailing && extra.trailing[lang]) || '';
			const finalConsonant = consonants[consonant] && consonants[consonant].leading[lang];
			const finalVowel = vowels[vowel] && vowels[vowel][lang];
			// console.log('c:', consonant, 'v:', vowel, 'e:', !!extra);
			if (typeof finalConsonant === 'undefined' || typeof !finalVowel === 'undefined') {
				console.log(location, 'c:', consonant, 'v:', vowel, 'e:', extra);
				console.error('ERROR: impossible to understand', syllable,
					'c:', finalConsonant, 'v:', finalVowel, 'e:', trailingPart);
			}
			finalMatches.push(finalConsonant + finalVowel + trailingPart);
		});
		return finalMatches;
	}

	/*
		Generate every possibles phonemes for the given consonant
	 */
	getPhonemesByConsonant (consonant: string) {
		const phonemes: string[] = [];
		const simplePhonemes: string[] = [];
		const trailingConsonantPhonemes: string[] = [];

		// get every vowels
		for (const vowel in vowels) {
			if (vowels.hasOwnProperty(vowel)) {
				if (vowel.match(/x/g).length > 1) {
					// store vowels with trailing consonant (like xອx)
					trailingConsonantPhonemes.push(vowel);
				} else {
					// store simple vowels (like ແx or xຳ)
					simplePhonemes.push(vowel);
				}
			}
		}
		simplePhonemes.forEach(item => {
			phonemes.push(item.replace(/x/, consonant))
		});
		trailingConsonantPhonemes.forEach(item => {
			const phoneme = item.replace(/x/, consonant);
			for (let i = 0; i < graphemes.cTrailing.length; i++) {
				phonemes.push(phoneme.replace(/x/, graphemes.cTrailing[i]))
			}
		});
		return phonemes;
	}
}
