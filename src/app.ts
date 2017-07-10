import { LaoneticsTranslater} from './classes/LaoneticsTranslater';
import { IConsonant, ISlicedSyllables, IPhonetics } from './interfaces/interfaces';

(() => {
	const translater = new LaoneticsTranslater();

	const htmlIn = <HTMLTextAreaElement>document.getElementById('in');
	const htmlOutLo = <HTMLSpanElement>document.getElementById('out-lo');
	const htmlOutFr = <HTMLSpanElement>document.getElementById('out-fr');
	const htmlOutEn = <HTMLSpanElement>document.getElementById('out-en');
	const htmlOutPh = <HTMLSpanElement>document.getElementById('out-ph');

	function translate () {
		const msgLaoding = 'Loading...';
		htmlOutFr.innerText = msgLaoding;
		htmlOutEn.innerText = msgLaoding;
		htmlOutLo.innerText = msgLaoding;
		let laoSentence = htmlIn.value;
		let slicedSyllables: ISlicedSyllables = translater.getKaraoke(laoSentence, ['fr', 'en', 'ph']);
		htmlOutLo.innerText = slicedSyllables.lao.join(' - ');
		htmlOutFr.innerText = slicedSyllables.roms[0].join(' - ');
		htmlOutEn.innerText = slicedSyllables.roms[1].join(' - ');
		htmlOutPh.innerText = '/' + slicedSyllables.roms[2].join('/ - /') + '/';
	}

	translate();
	const btnTranslate = <HTMLButtonElement>document.getElementById('btn-translate');
	btnTranslate.addEventListener('click', translate, false);
})();

