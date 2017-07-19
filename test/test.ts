import { suite, test, slow, timeout } from 'mocha-typescript';
import { assert } from 'chai';
import { LaoneticsTranslater } from './../src/laonetics';
import { vowels } from './../src/laonetics';
import { consonants } from './../src/laonetics';
import { regs, phonemes, regInstances } from './../src/laonetics';
import { IConsonant, ISlicedSyllables, IPhonemeReg } from './../src/laonetics';
@suite('Check lao phoneme slice process')
class Try {
	private translater = new LaoneticsTranslater();
	constructor () {}
	@test'Check every ຫ ຄ'() {
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
			lo: 'ໃຫຍ', ph: 'ɲaj'
		}, {
			lo: 'ເຫຼືອ', ph: 'lɯːə'
		}, {
			lo: 'ກັນ', ph: 'kan'
		}, {
			lo: 'ເຫລືອກ', ph: 'lɯːək'
		}, {
			lo: 'ເຫຍ', ph: 'hiːə'
		}, ]
		let slicedSyllables: ISlicedSyllables = this.translater.getKaraoke(laoSentence, langs);
		const lao = slicedSyllables.lao;
		const ph = slicedSyllables.roms[0];
		validResults.forEach((item, i) => {
			assert.equal(item.lo, lao[i], `Lao phoneme n°${i + 1} in "${laoSentence}"`);
			assert.equal(item.ph, ph[i], `Phonetic phoneme n°${i + 1} in "${laoSentence}"`);
		});
	}
}





