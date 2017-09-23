import { suite, test/*, slow, timeout*/ } from 'mocha-typescript';
import { assert } from 'chai';
import { LaoneticsSorter, LaoneticsTranslater } from './../src/laonetics';
// import { vowels } from './../src/laonetics';
// import { consonants } from './../src/laonetics';
// import { regs, phonemes, regInstances } from './../src/laonetics';
import { /*IConsonant, */ISlicedSyllables/*, IPhonemeReg*/ } from './../src/laonetics';
import { simplePhonemes } from './valid/simples';
import { wordsToSort } from './valid/wordsToSort';
@suite('Class LaoneticsTranslater:')
class Try {
	private allກ: string[];
	private allກAsStr: string;
	private translater = new LaoneticsTranslater();
	private sorter = new LaoneticsSorter();
	constructor () {
		this.allກ = this.translater.getPhonemesByConsonant('ກ');
		this.allກAsStr = this.allກ.join('');
	}
	@test'check method getPhonemesByConsonant - Generate every possibles phonemes for the given consonant' () {
		assert.isArray(this.allກ, 'Method should return an Array');
		assert.isString(this.allກ[0], 'It should be an Array of strings');
		assert.lengthOf(this.allກAsStr, 743, 'Every strings joined should have a length of 743');
	}
	@test'check every simple consonants like ກ' () {
		const langs = ['ph'];
		const slicedSyllables: ISlicedSyllables = this.translater.getKaraoke(this.allກAsStr, langs);
		const lao = slicedSyllables.lao;
		const ph = slicedSyllables.roms[0];
		simplePhonemes.forEach((item, i) => {
			assert.equal(item.lo, lao[i], `Lao phoneme n°${i + 1} in "${this.allກAsStr}"`);
			assert.equal(item.ph, ph[i], `Phonetic phoneme n°${i + 1} in "${this.allກAsStr}"`);
		});
	}
	@test'Check every ຫ ຄ' () {
		const laoSentence = 'ແຫງແຫງງງາມຄວາມໃຫຍເຫຼືອກັນເຫລືອກເຫຍ';
		const langs = ['ph'];
		const validResults = [{
			lo: 'ແຫງ', ph: 'hɛːŋ'
		}, {
			lo: 'ແຫງງ', ph: 'ŋɛːŋ'
		}, {
			lo: 'ງາມ', ph: 'ŋaːm'
		}, {
			lo: 'ຄວາມ', ph: 'kʰwaːm'
		}, {
			lo: 'ໃຫຍ', ph: 'ɲay'
		}, {
			lo: 'ເຫຼືອ', ph: 'lɯːə'
		}, {
			lo: 'ກັນ', ph: 'kan'
		}, {
			lo: 'ເຫລືອກ', ph: 'lɯːək'
		}, {
			lo: 'ເຫຍ', ph: 'hiːə'
		}];
		const slicedSyllables: ISlicedSyllables = this.translater.getKaraoke(laoSentence, langs);
		const lao = slicedSyllables.lao;
		const ph = slicedSyllables.roms[0];
		validResults.forEach((item, i) => {
			assert.equal(item.lo, lao[i], `Lao phoneme n°${i + 1} in "${laoSentence}"`);
			assert.equal(item.ph, ph[i], `Phonetic phoneme n°${i + 1} in "${laoSentence}"`);
		});
	}

	@test'Check lao aphabetical orderers' () {
		const orderedConsonants = this.sorter.sortArrayByConsonant(wordsToSort.consonants.unsorted);
		assert.deepEqual(orderedConsonants, wordsToSort.consonants.sorted);
		const oreredWords = this.sorter.sortArrayByConsonant(wordsToSort.words.unsorted);
		assert.deepEqual(oreredWords, wordsToSort.words.sorted);
		const orderedItems = this.sorter.sortArrayByConsonant(wordsToSort.items.unsorted, 'lo.wrd');
		assert.deepEqual(orderedItems, wordsToSort.items.sorted);
	}
}
