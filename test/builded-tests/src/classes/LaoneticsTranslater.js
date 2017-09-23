"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vowels_1 = require("./../values/vowels");
var consonants_1 = require("./../values/consonants");
var phonemes_1 = require("./../values/phonemes");
var LaoneticsTranslater = (function () {
    function LaoneticsTranslater() {
        this.sep = '-#@#-';
        this.subSep = '-##@##-';
        this.roms = [];
        this.sentences = [];
    }
    LaoneticsTranslater.prototype.getKaraoke = function (sentence, langs) {
        var _this = this;
        this.sentenceLao = sentence;
        this.langs = langs;
        this.roms = [];
        this.sentences = [];
        this.sentenceLao = this.sentenceLao.replace(phonemes_1.regInstances.removables, '');
        this.sentenceLao = this.sentenceLao.replace(/([\wàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ\(\)]+)/g, this.sep + '$1');
        this.sentenceLao = this.sentenceLao.replace(/ໆ/g, this.sep + 'ໆ');
        this.langs.forEach(function () {
            _this.sentences.push(_this.sentenceLao);
        });
        phonemes_1.phonemes.forEach(function (item) {
            _this.replacePart(item);
        });
        this.sentenceLao = this.sentenceLao.replace(phonemes_1.regInstances.cAlone, this.sep + '$1');
        this.sentenceLao = this.sentenceLao.replace(new RegExp(this.subSep, 'g'), '');
        this.sentenceLao = this.sentenceLao.replace(this.sep, '');
        var phonemesLao = this.sentenceLao.split(this.sep);
        this.sentences.forEach(function (currentSentence, i) {
            _this.sentences[i] = _this.sentences[i].replace(phonemes_1.regInstances.cAlone, _this.sep + '$1');
            _this.sentences[i] = _this.sentences[i].replace(_this.sep, '');
            _this.sentences[i] = _this.sentences[i].replace(/y{2}/g, 'y');
            var romPhonemes = _this.sentences[i].split(_this.sep);
            romPhonemes.forEach(function (phoneme, index) {
                if (phoneme === 'ໆ') {
                    romPhonemes[index] = romPhonemes[index - 1];
                }
            });
            _this.roms.push(romPhonemes);
        });
        return {
            lao: phonemesLao,
            roms: this.roms
        };
    };
    LaoneticsTranslater.prototype.getMatches = function (reg) {
        var searchReg = new RegExp(reg + phonemes_1.regs.boundary, 'gimu');
        return this.sentenceLao.match(searchReg) || [];
    };
    LaoneticsTranslater.prototype.replacePart = function (phoneme) {
        var _this = this;
        this.getMatches(phoneme.reg).forEach(function (syllable) {
            var match = _this.toKaraoke(syllable, phoneme);
            var regWithSep = new RegExp("" + syllable + phonemes_1.regs.boundary);
            var syllableTagged = _this.subSep + syllable.replace(/(.)/ig, '$1' + _this.subSep);
            _this.sentenceLao = _this.sentenceLao.replace(regWithSep, _this.sep + syllableTagged);
            _this.sentences.forEach(function (sentence, i) {
                _this.sentences[i] = sentence.replace(regWithSep, _this.sep + match[i]);
            });
        });
    };
    LaoneticsTranslater.prototype.toKaraoke = function (syllable, phoneme) {
        var location = phoneme.location;
        var minCharNumber = phoneme.charNbr;
        var vowel;
        var consonant;
        var consonantLeftPart;
        var extra;
        var isDoubleConsonant = false;
        var finalMatches = [];
        if (syllable.length > minCharNumber && syllable.match(phonemes_1.regInstances.accents)) {
            syllable = syllable.replace(phonemes_1.regInstances.accents, '');
        }
        if (syllable.length > minCharNumber && syllable.match(phonemes_1.regInstances.cSpecial)) {
            consonantLeftPart = syllable.match(/[ຫຂຄ]/)[0][0];
            isDoubleConsonant = true;
            syllable = syllable.replace(/[ຫຂຄ]/, '');
        }
        switch (location) {
            case 'onlyFollow3':
                vowel = 'x' + syllable[1] + syllable[2] + syllable[3];
                consonant = syllable[0];
                break;
            case 'trailingFollow2':
            case 'onlyFollow2':
                vowel = 'x' + syllable[1] + syllable[2] + (syllable[3] ? 'x' : '');
                consonant = syllable[0];
                extra = syllable[3] ? consonants_1.consonants[syllable[3]] : '';
                break;
            case 'trailingFollow1':
                vowel = 'x' + syllable[1] + 'x';
                consonant = syllable[0];
                extra = consonants_1.consonants[syllable[2]];
                break;
            case 'specialLeftFollow2':
            case 'trailingLeftFollow2':
            case 'onlyLeftFollow2':
                vowel = syllable[0] + 'x' + syllable[2] + syllable[3] + (syllable[4] ? 'x' : '');
                consonant = syllable[1];
                extra = syllable[4] ? consonants_1.consonants[syllable[4]] : '';
                break;
            case 'specialLeftFollow':
            case 'trailingLeftFollow':
            case 'onlyLeftFollow':
                vowel = syllable[0] + 'x' + syllable[2] + (syllable[3] ? 'x' : '');
                consonant = syllable[1];
                extra = syllable[3] ? consonants_1.consonants[syllable[3]] : '';
                break;
            case 'trailingLeft':
            case 'onlyLeft':
                vowel = syllable[0] + 'x' + (syllable[2] ? 'x' : '');
                consonant = syllable[1];
                extra = syllable[2] ? consonants_1.consonants[syllable[2]] : '';
                break;
            case 'trailingFollow':
            case 'onlyFollow':
                vowel = 'x' + syllable[1] + (syllable[2] ? 'x' : '');
                consonant = syllable[0];
                extra = syllable[2] ? consonants_1.consonants[syllable[2]] : '';
                break;
        }
        if (isDoubleConsonant) {
            consonant = consonantLeftPart + consonant;
        }
        this.langs.forEach(function (lang, i) {
            var trailingPart = (extra && extra.trailing && extra.trailing[lang]) || '';
            var finalConsonant = consonants_1.consonants[consonant] && consonants_1.consonants[consonant].leading[lang];
            var finalVowel = vowels_1.vowels[vowel] && vowels_1.vowels[vowel][lang];
            if (typeof finalConsonant === 'undefined' || typeof !finalVowel === 'undefined') {
                console.log(location, 'c:', consonant, 'v:', vowel, 'e:', extra);
                console.error('ERROR: impossible to understand', syllable, 'c:', finalConsonant, 'v:', finalVowel, 'e:', trailingPart);
            }
            finalMatches.push(finalConsonant + finalVowel + trailingPart);
        });
        return finalMatches;
    };
    LaoneticsTranslater.prototype.getPhonemesByConsonant = function (consonant) {
        var phonemes = [];
        var simplePhonemes = [];
        var trailingConsonantPhonemes = [];
        for (var vowel in vowels_1.vowels) {
            if (vowels_1.vowels.hasOwnProperty(vowel)) {
                if (vowel.match(/x/g).length > 1) {
                    trailingConsonantPhonemes.push(vowel);
                }
                else {
                    simplePhonemes.push(vowel);
                }
            }
        }
        simplePhonemes.forEach(function (item) {
            phonemes.push(item.replace(/x/, consonant));
        });
        trailingConsonantPhonemes.forEach(function (item) {
            var phoneme = item.replace(/x/, consonant);
            for (var i = 0; i < phonemes_1.graphemes.cTrailing.length; i++) {
                phonemes.push(phoneme.replace(/x/, phonemes_1.graphemes.cTrailing[i]));
            }
        });
        return phonemes;
    };
    return LaoneticsTranslater;
}());
exports.LaoneticsTranslater = LaoneticsTranslater;
//# sourceMappingURL=LaoneticsTranslater.js.map