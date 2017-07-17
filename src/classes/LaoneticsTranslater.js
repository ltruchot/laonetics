"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vowels_1 = require("./../values/vowels");
const consonants_1 = require("./../values/consonants");
const phonemes_1 = require("./../values/phonemes");
class LaoneticsTranslater {
    constructor() {
        this.sep = '-#@#-'; // an arbitrary separation string, to cut the string phoneme by phoneme
        this.subSep = '-##@##-';
        this.roms = [];
        this.sentences = [];
    }
    getKaraoke(sentence, langs) {
        this.sentenceLao = sentence;
        this.langs = langs;
        this.roms = [];
        this.sentences = [];
        // remove accents/'phantom unicodes' in sentence and copy value
        this.sentenceLao = this.sentenceLao.replace(phonemes_1.regInstances.removables, '');
        this.sentenceLao = this.sentenceLao.replace(/([\wàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ\(\)]+)/g, this.sep + '$1');
        this.sentenceLao = this.sentenceLao.replace(/ໆ/g, this.sep + 'ໆ');
        // copy a base sentence for every lang
        this.langs.forEach(lang => {
            this.sentences.push(this.sentenceLao);
        });
        // complexity ordered replacement, phoneme by phoneme
        phonemes_1.phonemes.forEach((item) => {
            this.replacePart(item);
        });
        // remove first separation & manage ໆ and preprare final chopped phonemes
        this.sentenceLao = this.sentenceLao.replace(new RegExp(this.subSep, 'g'), '');
        this.sentenceLao = this.sentenceLao.replace(this.sep, '');
        const phonemesLao = this.sentenceLao.split(this.sep);
        this.sentences.forEach((currentSentence, i) => {
            this.sentences[i] = currentSentence.replace(this.sep, '');
            // exceptions
            this.sentences[i] = this.sentences[i].replace(/y{2}/g, 'y'); // ຢຽມ double y case
            const romPhonemes = this.sentences[i].split(this.sep);
            romPhonemes.forEach((phoneme, index) => {
                if (phoneme === 'ໆ') {
                    romPhonemes[index] = romPhonemes[index - 1];
                }
            });
            this.roms.push(romPhonemes);
        });
        // FIXME: post treatment needed
        // exceptionList: `([${graphemes.vLeft}]ຫ[${graphemes.cຫ}]`,
        // return fully sliced & replaced sentences, as 2 arrays
        return {
            lao: phonemesLao,
            roms: this.roms
        };
    }
    replacePart(phoneme) {
        // console.log('LaoneticsTranslater::replacePart', phoneme);
        let reg = new RegExp(phoneme.reg + phonemes_1.regs.boundary, 'gimu');
        let matches = this.sentenceLao.match(reg) || [];
        matches.forEach(syllable => {
            let match = this.toKaraoke(syllable, phoneme);
            // add separation to sentence' only for phonems not leading by a sep
            let regWithSep = new RegExp(`${syllable}${phonemes_1.regs.boundary}`, 'gimu');
            let syllableTagged = this.subSep + syllable.replace(/(.)/ig, '$1' + this.subSep);
            this.sentenceLao = this.sentenceLao.replace(regWithSep, this.sep + syllableTagged);
            this.sentences.forEach((sentence, i) => {
                this.sentences[i] = sentence.replace(regWithSep, this.sep + match[i]);
            });
        });
    }
    toKaraoke(syllable, phoneme) {
        // console.log('LaoneticsTranslater::toKaraoke', syllable, phoneme)
        const location = phoneme.name;
        let vowel;
        let consonant;
        let consonantLeftPart;
        let extra;
        let isDoubleConsonant = false;
        let finalMatches = [];
        // temporary remove ຫ for "combined consonants": ຫງ, ຫຍ, ຫນ, ຫມ, ຫຼ, ຫລ, ຫວ
        // FIXME: what about ຂວາ ? <= 3 graphemes...
        if (syllable.length > 3 && syllable.match(phonemes_1.regInstances.cSpecial)) {
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
                vowel = 'x' + syllable[1] + syllable[2];
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
                vowel = syllable[0] + 'x' + syllable[2] + syllable[3];
                consonant = syllable[1];
                extra = syllable[4] ? consonants_1.consonants[syllable[4]] : '';
                break;
            case 'specialLeftFollow':
            case 'trailingLeftFollow':
            case 'onlyLeftFollow':
                vowel = syllable[0] + 'x' + syllable[2];
                consonant = syllable[1];
                extra = syllable[3] ? consonants_1.consonants[syllable[3]] : '';
                break;
            case 'trailingLeft':
            case 'onlyLeft':
                vowel = syllable[0] + 'x';
                consonant = syllable[1];
                extra = syllable[2] ? consonants_1.consonants[syllable[2]] : '';
                break;
            case 'trailingFollow':
            case 'onlyFollow':
                vowel = 'x' + syllable[1];
                consonant = syllable[0];
                extra = syllable[2] ? consonants_1.consonants[syllable[2]] : '';
                break;
        }
        // replug temporary inhibited ຫ if needed
        if (isDoubleConsonant) {
            consonant = consonantLeftPart + consonant;
        }
        this.langs.forEach((lang, i) => {
            let trailingPart = (extra && extra.trailing && extra.trailing[lang]) || '';
            let finalConsonant = consonants_1.consonants[consonant] && consonants_1.consonants[consonant].leading[lang];
            let finalVowel = vowels_1.vowels[vowel] && vowels_1.vowels[vowel][lang];
            // console.log('c:', consonant, 'v:', vowel, 'e:', !!extra);
            if (typeof finalConsonant === 'undefined' || typeof !finalVowel === 'undefined') {
                console.log(location, 'c:', consonant, 'v:', vowel, 'e:', extra);
                console.error('ERROR: impossible to understand', syllable, 'c:', finalConsonant, 'v:', finalVowel, 'e:', trailingPart);
            }
            finalMatches.push(finalConsonant + finalVowel + trailingPart);
        });
        return finalMatches;
    }
}
exports.LaoneticsTranslater = LaoneticsTranslater;
;
//# sourceMappingURL=LaoneticsTranslater.js.map