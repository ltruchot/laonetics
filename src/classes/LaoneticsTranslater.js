"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vowels_1 = require("./../values/vowels");
var consonants_1 = require("./../values/consonants");
var phonemes_1 = require("./../values/phonemes");
var LaoneticsTranslater = (function () {
    function LaoneticsTranslater() {
        this.currentLang = 'fr';
        this.sep = '-#@#-';
    }
    LaoneticsTranslater.prototype.getKaraoke = function (sentence, langs) {
        var _this = this;
        this.sentenceLao = sentence;
        this.currentLang = langs[0] || this.currentLang;
        this.sentenceLao = this.sentenceLao.replace(new RegExp(phonemes_1.regs.accents, 'g'), '');
        this.sentenceLao = this.sentenceLao.replace(new RegExp(phonemes_1.regs.phantoms, 'g'), '');
        this.sentenceKaraoke = this.sentenceLao;
        phonemes_1.phonemes.forEach(function (item) {
            _this.replacePart(item);
        });
        this.sentenceLao = this.sentenceLao.replace(this.sep, '');
        this.sentenceKaraoke = this.sentenceKaraoke.replace(this.sep, '');
        return {
            lao: this.sentenceLao.split(this.sep),
            langs: [this.sentenceKaraoke.split(this.sep)]
        };
    };
    LaoneticsTranslater.prototype.replacePart = function (item) {
        var _this = this;
        console.log("-------- " + item.name + " ---------");
        var matches;
        var reg = new RegExp(item.reg, 'gimu');
        if (item.overlapping) {
            matches = this.matchOverlap(this.sentenceKaraoke, reg) || [];
        }
        else {
            matches = this.sentenceKaraoke.match(reg) || [];
        }
        console.log('reg:', reg);
        console.log('karaoke:', this.sentenceKaraoke);
        matches.forEach(function (syllable) {
            var match = _this.toKaraoke(syllable, item.name);
            var regWithSep = "(" + _this.sep + ")?([" + phonemes_1.graphemes.vLeft + "])?" + match.phonemeLao + phonemes_1.regs.reversedBoundary;
            _this.sentenceLao = _this.sentenceLao.replace(new RegExp(regWithSep, 'gimu'), function ($0, $1) {
                return $1 ? $0 : _this.sep + match.phonemeLao;
            });
            _this.sentenceKaraoke = _this.sentenceKaraoke.replace(new RegExp(regWithSep, 'gimu'), function ($0, $1) {
                return $1 ? $0 : _this.sep + match.phonemeKaraoke;
            });
            _this.sentenceKaraoke = _this.sentenceKaraoke.replace(new RegExp(regWithSep, 'gimu'), _this.sep + match.phonemeKaraoke);
        });
    };
    LaoneticsTranslater.prototype.toKaraoke = function (syllable, location) {
        var vowel;
        var consonant;
        var trailingPart = '';
        var extra;
        var isHX = false;
        if (syllable.match(phonemes_1.regs.leadingH)) {
            isHX = true;
            syllable.replace('ຫ', '');
        }
        switch (location) {
            case 'trailingSpecialTopLeft':
                console.log(syllable);
                vowel = syllable[0] + 'x' + syllable[2] + syllable[3];
                consonant = syllable[1];
                extra = syllable[4] ? consonants_1.consonants[syllable[4]] : '';
                trailingPart = (extra && extra.trailing && extra.trailing[this.currentLang]) || '';
                syllable = syllable.substr(0, syllable.length - 1);
                break;
            case 'trailingSpecialX':
                vowel = 'x' + (syllable[1] === 'ັ' ? syllable[1] + syllable[2] : syllable[1]) + 'x';
                consonant = syllable[0];
                extra = consonants_1.consonants[syllable[syllable.length - 2]];
                trailingPart = (extra && extra.trailing && extra.trailing[this.currentLang]) || '';
                syllable = syllable.substr(0, syllable.length - 1);
                break;
            case 'trailingTopLeftX':
                vowel = syllable[0] + 'x' + syllable[2];
                consonant = syllable[1];
                extra = consonants_1.consonants[syllable[syllable[3] === 'າ' ? 4 : 3]];
                trailingPart = (extra && extra.trailing && extra.trailing[this.currentLang]) || '';
                syllable = syllable.substr(0, syllable.length - 1);
                break;
            case 'trailingLeftX':
                vowel = syllable[2] === 'ັ' ? syllable[0] + 'x' + syllable[2] + 'x' : syllable[0] + 'x';
                consonant = syllable[1];
                extra = consonants_1.consonants[syllable[syllable[2] === 'ັ' ? 3 : 2]];
                trailingPart = (extra && extra.trailing && extra.trailing[this.currentLang]) || '';
                syllable = syllable.substr(0, syllable.length - 1);
                break;
            case 'trailingັົX':
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
                syllable = syllable.substr(0, syllable.length - 1);
                break;
            case 'topRight':
                vowel = 'x' + syllable[1] + syllable[2];
                consonant = syllable[0];
                break;
            case 'topLeft':
                vowel = syllable[0] + 'x' + syllable[2] + (syllable[3] === 'າ' ? 'າ' : '');
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
        if (isHX) {
            consonant = 'ຫ' + consonant;
        }
        var finalConsonant = consonants_1.consonants[consonant] && consonants_1.consonants[consonant].leading[this.currentLang];
        var finalVowel = vowels_1.vowels[vowel] && vowels_1.vowels[vowel][this.currentLang];
        if (typeof finalConsonant === 'undefined' || typeof !finalVowel === 'undefined') {
            console.log(location, 'c:', consonant, 'v:', vowel, 'ex:', trailingPart);
            console.error('ERROR: impossible to understand', syllable, 'c:', finalConsonant, 'v:', finalVowel);
        }
        console.log('final syllable', syllable);
        return {
            phonemeKaraoke: finalConsonant + finalVowel + trailingPart,
            phonemeLao: syllable
        };
    };
    LaoneticsTranslater.prototype.matchOverlap = function (input, reg) {
        console.log('LaoneticsTranslater::matchOverlap');
        var matches = [];
        var m;
        while (m = reg.exec(input)) {
            console.log('lastIndex:', reg.lastIndex);
            reg.lastIndex -= (m[0].length - 1);
            matches.push(m[0]);
        }
        return matches;
    };
    return LaoneticsTranslater;
}());
exports.LaoneticsTranslater = LaoneticsTranslater;
;
//# sourceMappingURL=LaoneticsTranslater.js.map