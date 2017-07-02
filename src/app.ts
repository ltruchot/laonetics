import { LaoneticsTranslater} from './classes/LaoneticsTranslater';
import { IConsonant, ISlicedSyllables, IPhonetics } from './interfaces/interfaces';

const translater = new LaoneticsTranslater();

const htmlIn = <HTMLTextAreaElement>document.getElementById('in');
const htmlOutFr = <HTMLSpanElement>document.getElementById('out-fr');
const htmlOutEn = <HTMLSpanElement>document.getElementById('out-en');

function translate () {
	let laoSentence = htmlIn.value;
	let kkSentenceFr: ISlicedSyllables = translater.getKaraoke(laoSentence, 'fr');
	let kkSentenceEn: ISlicedSyllables = translater.getKaraoke(laoSentence, 'en');
	htmlOutFr.innerText = kkSentenceFr.karaoke.join(' - ');
	htmlOutEn.innerText = kkSentenceEn.karaoke.join(' - ');
}

translate();
const btnTranslate = <HTMLButtonElement>document.getElementById('btn-translate');
btnTranslate.onclick = translate;
