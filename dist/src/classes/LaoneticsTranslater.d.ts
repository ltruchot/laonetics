import { ISlicedSyllables, IPhonemeReg } from './../interfaces/interfaces';
export declare class LaoneticsTranslater {
    private sep;
    private subSep;
    private sentenceLao;
    private roms;
    private sentences;
    private langs;
    sortCollectionByConsonant(items: Array<any>, filter: string): any[];
    sortArrayByConsonant(items: Array<string>): string[];
    getSorterByAlphabet(alphabet: Array<string>, filter?: string): (a: any, b: any) => number;
    getKaraoke(sentence: string, langs: Array<string>): ISlicedSyllables;
    getMatches(reg: string): Array<string>;
    replacePart(phoneme: IPhonemeReg): void;
    toKaraoke(syllable: string, phoneme: IPhonemeReg): Array<string>;
    getPhonemesByConsonant(consonant: string): string[];
}
