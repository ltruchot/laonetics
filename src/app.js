"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LaoneticsTranslater_1 = require("./classes/LaoneticsTranslater");
(function () {
    var translater = new LaoneticsTranslater_1.LaoneticsTranslater();
    var htmlIn = document.getElementById('in');
    var htmlOutFr = document.getElementById('out-fr');
    var htmlOutEn = document.getElementById('out-en');
    var htmlOutLo = document.getElementById('out-lo');
    function translate() {
        var msgLaoding = 'Loading...';
        htmlOutFr.innerText = msgLaoding;
        htmlOutEn.innerText = msgLaoding;
        htmlOutLo.innerText = msgLaoding;
        var laoSentence = htmlIn.value;
        var karoake = translater.getKaraoke(laoSentence, ['fr']);
        var kkSentenceFr = translater.getKaraoke(laoSentence, ['fr']);
        htmlOutFr.innerText = kkSentenceFr.karaoke.join(' - ');
        htmlOutLo.innerText = kkSentenceFr.lao.join(' - ');
    }
    translate();
    var btnTranslate = document.getElementById('btn-translate');
    btnTranslate.onclick = translate;
})();
//# sourceMappingURL=app.js.map