import { IPhonemeReg, ISlicedSyllables } from './../interfaces/interfaces';
export declare class LaoneticsTranslater {
    private sep;
    private subSep;
    private sentenceLao;
    private roms;
    private sentences;
    private langs;
    constructor();
    getKaraoke(sentence: string, langs: string[]): ISlicedSyllables;
    getMatches(reg: string): string[];
    replacePart(phoneme: IPhonemeReg): void;
    toKaraoke(syllable: string, phoneme: IPhonemeReg): string[];
    getPhonemesByConsonant(consonant: string): string[];
}
