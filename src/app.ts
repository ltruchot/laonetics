import { LaoneticsTranslater} from './classes/LaoneticsTranslater';
import { IConsonant, ISlicedSyllables, IPhonetics } from './interfaces/interfaces';

(function () {
	const translater = new LaoneticsTranslater();

	const htmlIn = <HTMLTextAreaElement>document.getElementById('in');
	const htmlOutFr = <HTMLSpanElement>document.getElementById('out-fr');
	const htmlOutEn = <HTMLSpanElement>document.getElementById('out-en');
	const htmlOutLo = <HTMLSpanElement>document.getElementById('out-lo');

	function translate () {
		const msgLaoding = 'Loading...';
		htmlOutFr.innerText = msgLaoding;
		htmlOutEn.innerText = msgLaoding;
		htmlOutLo.innerText = msgLaoding;
		let laoSentence = htmlIn.value;
		let karoake = translater.getKaraoke(laoSentence, ['fr']);
		let kkSentenceFr: ISlicedSyllables = translater.getKaraoke(laoSentence, ['fr']);
		// let kkSentenceEn: ISlicedSyllables = translater.getKaraoke(laoSentence, 'en');
		htmlOutFr.innerText = karoake.langs[0].join(' - ');
		htmlOutEn.innerText = '';
		htmlOutLo.innerText = kkSentenceFr.lao.join(' - ');

	}

	translate();
	const btnTranslate = <HTMLButtonElement>document.getElementById('btn-translate');
	btnTranslate.onclick = translate;
})();

// questions:
// ເxົາx ?
// ຢ້ຽມ ?
