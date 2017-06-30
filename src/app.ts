import { LaoneticsTranslater} from './../classes/LaoneticsTranslater';
const translater = new LaoneticsTranslater();
const htmlIn = <HTMLInputElement>document.getElementById('in');
const htmlOut = <HTMLSpanElement>document.getElementById('out');
let laoSentence = htmlIn.value;
let kkSentence = translater.replaceSentence(laoSentence, 'fr');
htmlOut.innerText = kkSentence;
