"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LaoneticsTranslater = (function () {
    function LaoneticsTranslater() {
        this.vowels = {
            arround: {
                all: 'ເ',
                follow: '[ີ]'
            },
            left: {
                all: '[ແເໂໄໃ]',
                ແx: { en: 'ae', fr: 'è' },
                ເx: { en: 'e', fr: 'é' },
                ໂx: { en: 'o', fr: 'ô' },
                ໄx: { en: 'ai', fr: 'ay' },
                ໃx: { en: 'ai', fr: 'ay' }
            },
            top: {
                all: '[ໍິີຶືົ]'
            }
        };
        this.consonants = {
            all: '[ນມບດ]',
            ນ: { en: 'n', fr: 'n' },
            ມ: { en: 'm', fr: 'm' },
            ບ: { en: 'b', fr: 'b' },
            ດ: { en: 'd', fr: 'd' },
        };
        this.accents = '[່້໌]?';
        this.shortMark = 'ະ?';
        this.lang = 'fr';
    }
    LaoneticsTranslater.prototype.replaceSentence = function (sentence, lang) {
        sentence = sentence.replace(new RegExp(this.accents, 'gi'), '');
        sentence = this.replacePart(sentence, 'arround');
        sentence = this.replacePart(sentence, 'left');
        return sentence;
    };
    LaoneticsTranslater.prototype.replacePart = function (sentence, location) {
        var _this = this;
        var vowels = vowels;
        var syllables = this.vowels[location].all + this.consonants.all + ;
        var reg = new RegExp(syllables + this.shortMark, 'gi');
        var matches = sentence.match(reg) || [];
        matches.forEach(function (syllable) {
            var kk = _this.toKaraoke(syllable, location);
            sentence = sentence.replace(syllable, kk);
        });
        return sentence;
    };
    LaoneticsTranslater.prototype.toKaraoke = function (syllable, location) {
        var vowel;
        var consonant;
        var shortMark;
        switch (location) {
            case 'left':
                vowel = syllable[0] + 'x';
                consonant = syllable[1];
                shortMark = !!syllable[2];
                break;
        }
        var finalConsonant = this.consonants[consonant][this.lang];
        var finalVowel = this.vowels[location][vowel][this.lang];
        return finalConsonant + finalVowel + (shortMark ? '' : ':');
    };
    return LaoneticsTranslater;
}());
exports.LaoneticsTranslater = LaoneticsTranslater;
;
//# sourceMappingURL=LaoneticsTranslater.js.map