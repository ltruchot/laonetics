"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vowels_1 = require("./../values/vowels");
var consonants_1 = require("./../values/consonants");
var phonemes_1 = require("./../values/phonemes");
var LaoneticsTranslater = (function () {
    function LaoneticsTranslater() {
        this.sep = '-#@#-'; // an arbitrary separation string, to cut the string phoneme by phoneme
        this.subSep = '-##@##-';
        this.roms = [];
        this.sentences = [];
    }
    LaoneticsTranslater.prototype.sortCollectionByConsonant = function (items, filter) {
        // console.log('LaoneticsTranslater::sortCollectionByConsonant', items);
        var consonants = phonemes_1.graphemes.cLeading.split('');
        var sorter = this.getSorterByAlphabet(consonants, filter);
        return items.sort(sorter);
    };
    LaoneticsTranslater.prototype.sortArrayByConsonant = function (items) {
        // console.log('LaoneticsTranslater::sortArrayByConsonant', items);
        var consonants = phonemes_1.graphemes.cLeading.split('');
        var sorter = this.getSorterByAlphabet(consonants);
        return items.sort(sorter);
    };
    LaoneticsTranslater.prototype.getSorterByAlphabet = function (alphabet, filter) {
        return function (a, b) {
            var reg = new RegExp('[' + phonemes_1.graphemes.vLeft + phonemes_1.graphemes.vLeftSpecial + ']');
            if (filter) {
                var deepness = filter.split('.');
                deepness.forEach(function (key) {
                    a = a[key];
                    b = b[key];
                });
            }
            a = a.replace(reg, '');
            b = b.replace(reg, '');
            var index_a = alphabet.indexOf(a[0]);
            var index_b = alphabet.indexOf(b[0]);
            if (index_a === index_b) {
                // same first character, sort regular
                if (a < b) {
                    return -1;
                }
                else if (a > b) {
                    return 1;
                }
                return 0;
            }
            else {
                return index_a - index_b;
            }
        };
    };
    LaoneticsTranslater.prototype.getKaraoke = function (sentence, langs) {
        var _this = this;
        this.sentenceLao = sentence;
        this.langs = langs;
        this.roms = [];
        this.sentences = [];
        // remove accents/'phantom unicodes' in sentence and copy value
        this.sentenceLao = this.sentenceLao.replace(phonemes_1.regInstances.removables, '');
        this.sentenceLao = this.sentenceLao.replace(/([\wàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ\(\)]+)/g, this.sep + '$1');
        this.sentenceLao = this.sentenceLao.replace(/ໆ/g, this.sep + 'ໆ');
        // copy a base sentence for every lang
        this.langs.forEach(function (lang) {
            _this.sentences.push(_this.sentenceLao);
        });
        // complexity ordered replacement, phoneme by phoneme
        phonemes_1.phonemes.forEach(function (item) {
            _this.replacePart(item);
        });
        // separate last isolated lao grapheme, remove first separation & manage ໆ and preprare final chopped phonemes
        this.sentenceLao = this.sentenceLao.replace(phonemes_1.regInstances.cAlone, this.sep + '$1');
        this.sentenceLao = this.sentenceLao.replace(new RegExp(this.subSep, 'g'), '');
        this.sentenceLao = this.sentenceLao.replace(this.sep, '');
        var phonemesLao = this.sentenceLao.split(this.sep);
        this.sentences.forEach(function (currentSentence, i) {
            // separate last isolated lao grapheme
            _this.sentences[i] = _this.sentences[i].replace(phonemes_1.regInstances.cAlone, _this.sep + '$1');
            _this.sentences[i] = _this.sentences[i].replace(_this.sep, '');
            // exceptions
            _this.sentences[i] = _this.sentences[i].replace(/y{2}/g, 'y'); // ຢຽມ double y case
            var romPhonemes = _this.sentences[i].split(_this.sep);
            romPhonemes.forEach(function (phoneme, index) {
                if (phoneme === 'ໆ') {
                    romPhonemes[index] = romPhonemes[index - 1];
                }
            });
            _this.roms.push(romPhonemes);
        });
        // FIXME: post treatment needed ?
        // what about "ທຣ" in ກົດ​ອິນທຣິຍສົ້ມ ?
        // what about "ອົາ" in ນຳ​ອົາໝາກ​ສົມ​ພໍດີ
        // return fully sliced & replaced sentences, as 2 arrays
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
        // console.log('LaoneticsTranslater::replacePart', phoneme);
        this.getMatches(phoneme.reg).forEach(function (syllable) {
            var match = _this.toKaraoke(syllable, phoneme);
            // add separation to sentence' only for phonems not leading by a sep
            var regWithSep = new RegExp("" + syllable + phonemes_1.regs.boundary);
            var syllableTagged = _this.subSep + syllable.replace(/(.)/ig, '$1' + _this.subSep);
            _this.sentenceLao = _this.sentenceLao.replace(regWithSep, _this.sep + syllableTagged);
            _this.sentences.forEach(function (sentence, i) {
                _this.sentences[i] = sentence.replace(regWithSep, _this.sep + match[i]);
            });
        });
    };
    LaoneticsTranslater.prototype.toKaraoke = function (syllable, phoneme) {
        // console.log('LaoneticsTranslater::toKaraoke', syllable, phoneme)
        var location = phoneme.location;
        var minCharNumber = phoneme.charNbr;
        var vowel;
        var consonant;
        var consonantLeftPart;
        var extra;
        var isDoubleConsonant = false;
        var finalMatches = [];
        // temporary remove accents
        if (syllable.length > minCharNumber && syllable.match(phonemes_1.regInstances.accents)) {
            syllable = syllable.replace(phonemes_1.regInstances.accents, '');
        }
        // temporary remove ຫ, ຂ, ຄ for "combined consonants": ຫງ, ຫຍ, ຫນ, ຫມ, ຫຼ, ຫລ, ຫວ, ຂວ, ຄວ
        if (syllable.length > minCharNumber && syllable.match(phonemes_1.regInstances.cSpecial)) {
            // console.log('combined consonants found:', syllable)
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
        // replug temporary inhibited ຫ if needed
        if (isDoubleConsonant) {
            consonant = consonantLeftPart + consonant;
        }
        this.langs.forEach(function (lang, i) {
            var trailingPart = (extra && extra.trailing && extra.trailing[lang]) || '';
            var finalConsonant = consonants_1.consonants[consonant] && consonants_1.consonants[consonant].leading[lang];
            var finalVowel = vowels_1.vowels[vowel] && vowels_1.vowels[vowel][lang];
            // console.log('c:', consonant, 'v:', vowel, 'e:', !!extra);
            if (typeof finalConsonant === 'undefined' || typeof !finalVowel === 'undefined') {
                console.log(location, 'c:', consonant, 'v:', vowel, 'e:', extra);
                console.error('ERROR: impossible to understand', syllable, 'c:', finalConsonant, 'v:', finalVowel, 'e:', trailingPart);
            }
            finalMatches.push(finalConsonant + finalVowel + trailingPart);
        });
        return finalMatches;
    };
    /*
        Generate every possibles phonemes for the given consonant
     */
    LaoneticsTranslater.prototype.getPhonemesByConsonant = function (consonant) {
        var phonemes = [];
        var simplePhonemes = [];
        var trailingConsonantPhonemes = [];
        // get every vowels
        for (var vowel in vowels_1.vowels) {
            if (vowels_1.vowels.hasOwnProperty(vowel)) {
                if (vowel.match(/x/g).length > 1) {
                    // store vowels with trailing consonant (like xອx)
                    trailingConsonantPhonemes.push(vowel);
                }
                else {
                    // store simple vowels (like ແx or xຳ)
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
;
//# sourceMappingURL=LaoneticsTranslater.js.map