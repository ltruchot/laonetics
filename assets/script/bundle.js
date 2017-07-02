/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LaoneticsTranslater_1 = __webpack_require__(1);
var translater = new LaoneticsTranslater_1.LaoneticsTranslater();
var htmlIn = document.getElementById('in');
var htmlOutFr = document.getElementById('out-fr');
var htmlOutEn = document.getElementById('out-en');
function translate() {
    var laoSentence = htmlIn.value;
    var kkSentenceFr = translater.getKaraoke(laoSentence, 'fr');
    var kkSentenceEn = translater.getKaraoke(laoSentence, 'en');
    htmlOutFr.innerText = kkSentenceFr.karaoke.join(' - ');
    htmlOutEn.innerText = kkSentenceEn.karaoke.join(' - ');
}
translate();
var btnTranslate = document.getElementById('btn-translate');
btnTranslate.onclick = translate;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vowels_1 = __webpack_require__(2);
var consonants_1 = __webpack_require__(3);
var phonemes_1 = __webpack_require__(4);
var LaoneticsTranslater = (function () {
    function LaoneticsTranslater() {
        this.accents = '[່້໌]?';
        this.currentLang = 'fr';
        this.sep = '-#@#-';
    }
    LaoneticsTranslater.prototype.getKaraoke = function (sentence, lang) {
        var _this = this;
        this.currentLang = lang || this.currentLang;
        this.sentenceLao = sentence.replace(new RegExp(this.accents, 'gi'), '');
        this.sentenceKaraoke = this.sentenceLao;
        phonemes_1.phonemes.forEach(function (item) {
            _this.replacePart(item);
        });
        var lastSep = new RegExp(this.sep + '\s*$');
        this.sentenceLao = this.sentenceLao.replace(lastSep, '');
        this.sentenceKaraoke = this.sentenceKaraoke.replace(lastSep, '');
        return {
            lao: this.sentenceLao.split(this.sep),
            karaoke: this.sentenceKaraoke.split(this.sep)
        };
    };
    LaoneticsTranslater.prototype.replacePart = function (item) {
        var _this = this;
        var matches = this.sentenceLao.match(new RegExp(item.reg, 'gi')) || [];
        matches.forEach(function (syllable) {
            var match = _this.toKaraoke(syllable, item.name);
            _this.sentenceLao = _this.sentenceLao.replace(match.phonemeLao, match.phonemeLao + _this.sep);
            _this.sentenceKaraoke = _this.sentenceKaraoke.replace(match.phonemeLao, match.phonemeKaraoke + _this.sep);
        });
    };
    LaoneticsTranslater.prototype.toKaraoke = function (syllable, location) {
        var vowel;
        var consonant;
        var trailingPart = '';
        var extra;
        switch (location) {
            case 'trailingƆX':
                vowel = 'x' + (syllable[1] === 'ັ' ? syllable[1] + syllable[2] : syllable[1]) + 'x';
                consonant = syllable[0];
                extra = consonants_1.consonants[syllable[syllable.length - 1]];
                trailingPart = (extra && extra.trailing && extra.trailing[this.currentLang]) || '';
                break;
            case 'trailingAX':
                vowel = 'x' + syllable[1] + 'x';
                consonant = syllable[0];
                extra = consonants_1.consonants[syllable[2]];
                trailingPart = (extra && extra.trailing && extra.trailing[this.currentLang]) || '';
                syllable = syllable.substr(0, syllable.length - 1);
                break;
            case 'trailingFollowX':
                vowel = 'x' + syllable[1];
                consonant = syllable[0];
                extra = consonants_1.consonants[syllable[2]];
                trailingPart = (extra && extra.trailing && extra.trailing[this.currentLang]) || '';
                break;
            case 'topRight':
                vowel = 'x' + syllable[1] + syllable[2];
                consonant = syllable[0];
                break;
            case 'topLeft':
                vowel = syllable[0] + 'x' + syllable[2] + (syllable[3] || '');
                consonant = syllable[1];
                break;
            case 'left':
                vowel = syllable[0] + 'x' + (syllable[2] || '');
                consonant = syllable[1];
                break;
            case 'follow':
                vowel = 'x' + syllable[1];
                consonant = syllable[0];
                break;
        }
        console.log(location, 'c:', consonant, 'v:', vowel, 'ex:', trailingPart);
        var finalConsonant = consonants_1.consonants[consonant] && consonants_1.consonants[consonant].leading[this.currentLang];
        var finalVowel = vowels_1.vowels[vowel] && vowels_1.vowels[vowel][this.currentLang];
        if (!finalConsonant || !finalVowel) {
            console.error('ERROR: impossible to understand', syllable, finalConsonant, finalVowel);
        }
        return {
            phonemeKaraoke: finalConsonant + finalVowel + trailingPart,
            phonemeLao: syllable
        };
    };
    return LaoneticsTranslater;
}());
exports.LaoneticsTranslater = LaoneticsTranslater;
;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vowels = {
    xອx: { en: 'ɔ:', fr: 'ɔ:' },
    xັອx: { en: 'ɔ', fr: 'ɔ' },
    xັx: { en: 'a', fr: 'â' },
    ເxີ: { en: 'oe:', fr: 'eu:' },
    ເxິ: { en: 'oe', fr: 'eu' },
    ເxົາ: { en: 'ao', fr: 'ao' },
    ເxາະ: { en: 'ɔ', fr: 'ɔ' },
    xໍາ: { en: 'am', fr: 'âm' },
    ແx: { en: 'ae:', fr: 'è:' },
    ແxະ: { en: 'ae', fr: 'è' },
    ເx: { en: 'e:', fr: 'é:' },
    ເxະ: { en: 'e', fr: 'é' },
    ໂx: { en: 'o:', fr: 'ô:' },
    ໂxະ: { en: 'o', fr: 'ô' },
    ໄx: { en: 'ai', fr: 'ay' },
    ໃx: { en: 'ai', fr: 'ay' },
    xໍ: { en: 'ɔ:', fr: 'ɔ:' },
    xິ: { en: 'ee', fr: 'i' },
    xີ: { en: 'ee:', fr: 'i:' },
    xຶ: { en: 'ue', fr: 'ü' },
    xື: { en: 'ue:', fr: 'ü:' },
    xຸ: { en: 'oo', fr: 'ou' },
    xູ: { en: 'oo:', fr: 'ou:' },
    xາ: { en: 'a:', fr: 'â:' },
    xະ: { en: 'a', fr: 'â' }
};
exports.vowels = vowels;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var consonants = {
    ກ: { leading: { en: 'k', fr: 'k' }, trailing: { en: 'k', fr: 'k' } },
    ງ: { leading: { en: 'ng', fr: 'ng' }, trailing: { en: 'ng', fr: 'ng' } },
    ສ: { leading: { en: 's', fr: 's' } },
    ນ: { leading: { en: 'n', fr: 'n' }, trailing: { en: 'n', fr: 'n' } },
    ມ: { leading: { en: 'm', fr: 'm' }, trailing: { en: 'm', fr: 'm' } },
    ບ: { leading: { en: 'b', fr: 'b' }, trailing: { en: 'b', fr: 'p' } },
    ດ: { leading: { en: 'd', fr: 'd' }, trailing: { en: 'd', fr: 't' } },
    ຈ: { leading: { en: 'ch', fr: 'tj' } },
    ຕ: { leading: { en: 't', fr: 't' } },
    ພ: { leading: { en: 'ph', fr: 'ph' } },
    ລ: { leading: { en: 'l', fr: 'l' } },
    ຢ: { leading: { en: 'y', fr: 'y' } },
    ປ: { leading: { en: 'p', fr: 'p' } },
    ຍ: { leading: { en: 'ny', fr: 'ny' }, trailing: { en: 'i', fr: 'y' } },
    ຫ: { leading: { en: 'h', fr: 'h' } },
    ໝ: { leading: { en: 'm', fr: 'm' } }
};
exports.consonants = consonants;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var C_LEADING = 'ກງສນມປບດຈຕພລຢຍຫໝ';
var C_TRAILING = 'ງກມນຍວດບ';
var V_LEFT = 'ແເໂໄໃ';
var V_FOLLOW = 'ໍິີຶືຸູາະ';
var phonemes = [{
        name: 'trailingƆX',
        reg: "[" + C_LEADING + "]\u0EB1?\u0EAD[" + C_TRAILING + "]"
    }, {
        name: 'trailingAX',
        reg: "[" + C_LEADING + "][\u0EB1][" + C_TRAILING + "][" + V_LEFT + "|" + C_LEADING + "|ws]"
    }, {
        name: 'trailingFollowX',
        reg: "[" + C_LEADING + "][" + V_FOLLOW + "][C_TRAILING]"
    }, {
        name: 'topLeft',
        reg: "\u0EC0[" + C_LEADING + "]([\u0EB4\u0EB5\u0EB2]|\u0EBB\u0EB2)"
    }, {
        name: 'topRight',
        reg: "[" + C_LEADING + "]\u0ECD\u0EB2"
    }, {
        name: 'left',
        reg: "[" + V_LEFT + "][" + C_LEADING + "]\u0EB0?"
    }, {
        name: 'follow',
        reg: "[" + C_LEADING + "][" + V_FOLLOW + "]"
    }];
exports.phonemes = phonemes;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map