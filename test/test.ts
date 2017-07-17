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
	@test'Check every ຫ'() {
		const laoSentence = 'ແຫງແຫງງງາມ';
		const langs = ['ph'];
		const validResults = ['ແຫງ', 'ແຫງງ', 'ງາມ']
		let slicedSyllables: ISlicedSyllables = this.translater.getKaraoke(laoSentence, langs);
		const lao = slicedSyllables.lao;
		validResults.forEach((item, i) => {
			assert.equal(item, lao[i], `Phoneme n°${i + 1} in "${laoSentence}"`);
		});
	}
}





