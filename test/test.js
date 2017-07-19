"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_typescript_1 = require("mocha-typescript");
const chai_1 = require("chai");
const laonetics_1 = require("./../src/laonetics");
let Try = class Try {
    constructor() {
        this.translater = new laonetics_1.LaoneticsTranslater();
    }
    'Check every ຫ ຄ'() {
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
            },];
        let slicedSyllables = this.translater.getKaraoke(laoSentence, langs);
        const lao = slicedSyllables.lao;
        const ph = slicedSyllables.roms[0];
        validResults.forEach((item, i) => {
            chai_1.assert.equal(item.lo, lao[i], `Lao phoneme n°${i + 1} in "${laoSentence}"`);
            chai_1.assert.equal(item.ph, ph[i], `Phonetic phoneme n°${i + 1} in "${laoSentence}"`);
        });
    }
};
__decorate([
    mocha_typescript_1.test
], Try.prototype, "Check every \u0EAB \u0E84", null);
Try = __decorate([
    mocha_typescript_1.suite('Check lao phoneme slice process')
], Try);
//# sourceMappingURL=test.js.map