"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mocha_typescript_1 = require("mocha-typescript");
var chai_1 = require("chai");
var laonetics_1 = require("./../src/laonetics");
var simples_1 = require("./valid/simples");
var Try = (function () {
    function Try() {
        this.translater = new laonetics_1.LaoneticsTranslater();
        this.allກ = this.translater.getPhonemesByConsonant('ກ');
        this.allກAsStr = this.allກ.join('');
    }
    Try.prototype['check method getPhonemesByConsonant - Generate every possibles phonemes for the given consonant'] = function () {
        chai_1.assert.isArray(this.allກ, 'Method should return an Array');
        chai_1.assert.isString(this.allກ[0], 'It should be an Array of strings');
        chai_1.assert.lengthOf(this.allກAsStr, 743, 'Every strings joined should have a length of 743');
    };
    Try.prototype['check every simple consonants like ກ'] = function () {
        var _this = this;
        var langs = ['ph'];
        var slicedSyllables = this.translater.getKaraoke(this.allກAsStr, langs);
        var lao = slicedSyllables.lao;
        var ph = slicedSyllables.roms[0];
        simples_1.simplePhonemes.forEach(function (item, i) {
            chai_1.assert.equal(item.lo, lao[i], "Lao phoneme n\u00B0" + (i + 1) + " in \"" + _this.allກAsStr + "\"");
            chai_1.assert.equal(item.ph, ph[i], "Phonetic phoneme n\u00B0" + (i + 1) + " in \"" + _this.allກAsStr + "\"");
        });
    };
    Try.prototype['Check every ຫ ຄ'] = function () {
        var laoSentence = 'ແຫງແຫງງງາມຄວາມໃຫຍເຫຼືອກັນເຫລືອກເຫຍ';
        var langs = ['ph'];
        var validResults = [{
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
            }];
        var slicedSyllables = this.translater.getKaraoke(laoSentence, langs);
        var lao = slicedSyllables.lao;
        var ph = slicedSyllables.roms[0];
        validResults.forEach(function (item, i) {
            chai_1.assert.equal(item.lo, lao[i], "Lao phoneme n\u00B0" + (i + 1) + " in \"" + laoSentence + "\"");
            chai_1.assert.equal(item.ph, ph[i], "Phonetic phoneme n\u00B0" + (i + 1) + " in \"" + laoSentence + "\"");
        });
    };
    __decorate([
        mocha_typescript_1.test
    ], Try.prototype, "check method getPhonemesByConsonant - Generate every possibles phonemes for the given consonant", null);
    __decorate([
        mocha_typescript_1.test
    ], Try.prototype, "check every simple consonants like \u0E81", null);
    __decorate([
        mocha_typescript_1.test
    ], Try.prototype, "Check every \u0EAB \u0E84", null);
    Try = __decorate([
        mocha_typescript_1.suite('Class LaoneticsTranslater:')
    ], Try);
    return Try;
}());
//# sourceMappingURL=test.js.map