"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phonemes_1 = require("./../values/phonemes");
var LaoneticsTranslater_1 = require("./LaoneticsTranslater");
var LaoneticsSorter = (function () {
    function LaoneticsSorter() {
        this.translater = new LaoneticsTranslater_1.LaoneticsTranslater();
        this.leftVowels = new RegExp('[' + phonemes_1.graphemes.vLeft + phonemes_1.graphemes.vLeftSpecial + ']');
    }
    LaoneticsSorter.prototype.sortArrayByConsonant = function (words, filter) {
        var _this = this;
        var specialຫItems = [];
        var ambiguousຫItems = [];
        var ambiguousຂວຄວItems = [];
        var indexToSplice = [];
        words.forEach(function (item, index) {
            var modified = false;
            var leadingVowel = '';
            var word = filter ? _this.getDeepParam(item, filter) : item;
            if (word[0].match(_this.leftVowels)) {
                leadingVowel = word[0];
                word = word.substring(1);
            }
            if (word.substring(0).match(/[ໝໜ]/)) {
                word = _this.extendComplexLeading(word);
                modified = true;
            }
            var specialCasesClosure = function (arrToSort) {
                var specialItem = {
                    modified: modified,
                    word: leadingVowel ? leadingVowel + word : word
                };
                if (filter) {
                    specialItem = _this.setDeepParam(Object.assign({}, item), filter, specialItem);
                }
                arrToSort.push(specialItem);
                indexToSplice.unshift(index);
            };
            if (word.substring(0, 2).match(phonemes_1.regInstances.specialຫ)) {
                if ((leadingVowel + word).length === 2) {
                    specialCasesClosure(specialຫItems);
                }
                else {
                    var kk = _this.translater.getKaraoke(leadingVowel + word, []);
                    var checkableWord = kk.lao[0].replace(new RegExp("[" + phonemes_1.graphemes.accents + "]", 'g'), '');
                    checkableWord = checkableWord.replace(new RegExp("" + phonemes_1.regs.followOnly, 'g'), '');
                    checkableWord = checkableWord.replace(new RegExp(leadingVowel), '');
                    if (checkableWord[2]) {
                        specialCasesClosure(specialຫItems);
                    }
                }
            }
            else if (word.substring(0, 2).match(phonemes_1.regInstances.ambiguousຫ)) {
                if (leadingVowel || !word.match(phonemes_1.regInstances.disambiguatedຫວ)) {
                    specialCasesClosure(ambiguousຫItems);
                }
            }
            else if (word.substring(0, 2).match(phonemes_1.regInstances.ambiguousຂວຄວ)) {
                if (leadingVowel || !word.match(phonemes_1.regInstances.disambiguatedຂວຄວ)) {
                    specialCasesClosure(ambiguousຂວຄວItems);
                }
            }
        });
        indexToSplice.forEach(function (index) {
            words.splice(index, 1);
        });
        var sorterSimple = this.getSorterByAlphabet(filter);
        var sorterComplexe = this.getSorterByAlphabet(filter ? filter + '.word' : 'word');
        words.sort(sorterSimple);
        var specialຫWords = this.sortWithOptionalFilter(specialຫItems, sorterComplexe, filter);
        var ambiguousຫWords = this.sortWithOptionalFilter(ambiguousຫItems, sorterComplexe, filter);
        var ambiguousຂວຄວWords = this.sortWithOptionalFilter(ambiguousຂວຄວItems, sorterComplexe, filter);
        words.push.apply(words, specialຫWords.concat(ambiguousຫWords, ambiguousຂວຄວWords));
        return words;
    };
    LaoneticsSorter.prototype.sortWithOptionalFilter = function (items, sorter, filter) {
        var _this = this;
        return items.sort(sorter).map(function (item) {
            if (filter) {
                var tempItem = _this.getDeepParam(item, filter);
                if (tempItem.modified) {
                    _this.setDeepParam(item, filter, _this.shortenComplexLeading(tempItem.word));
                }
                else {
                    _this.setDeepParam(item, filter, tempItem.word);
                }
                return item;
            }
            return item.modified ? _this.shortenComplexLeading(item.word) : item.word;
        });
    };
    LaoneticsSorter.prototype.extendComplexLeading = function (str) {
        if (str[0] === 'ໝ') {
            str = str.replace('ໝ', 'ຫມ');
        }
        if (str[0] === 'ໜ') {
            str = str.replace('ໜ', 'ຫນ');
        }
        return str;
    };
    LaoneticsSorter.prototype.shortenComplexLeading = function (str) {
        var leadingVowel = '';
        if (str[0].match(this.leftVowels)) {
            leadingVowel = str[0];
            str = str.substring(1);
        }
        if (str.substring(0, 2) === 'ຫມ') {
            str = str.replace('ຫມ', 'ໝ');
        }
        if (str.substring(0, 2) === 'ຫນ') {
            str = str.replace('ຫນ', 'ໜ');
        }
        return leadingVowel ? leadingVowel + str : str;
    };
    LaoneticsSorter.prototype.getDeepParam = function (obj, filter) {
        var deepness = filter.split('.');
        deepness.forEach(function (key) {
            obj = obj[key];
        });
        return obj;
    };
    LaoneticsSorter.prototype.setDeepParam = function (obj, filter, value) {
        var deepness = filter.split('.');
        var current;
        deepness.some(function (key, index) {
            if (index === deepness.length - 1) {
                current[key] = value;
                return true;
            }
            else {
                current = obj[key];
            }
        });
        return obj;
    };
    LaoneticsSorter.prototype.getSorterByAlphabet = function (filter) {
        return function (a, b) {
            if (filter) {
                var deepness = filter.split('.');
                deepness.forEach(function (key) {
                    a = a[key];
                    b = b[key];
                });
            }
            return a.localeCompare(b, 'lo-LA');
        };
    };
    return LaoneticsSorter;
}());
exports.LaoneticsSorter = LaoneticsSorter;
//# sourceMappingURL=LaoneticsSorter.js.map