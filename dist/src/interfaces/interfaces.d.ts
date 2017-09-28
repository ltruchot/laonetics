export interface IPhonetics {
    [key: string]: any;
    fr: string;
    en: string;
    ph: string;
}
export interface IConsonant {
    leading: IPhonetics;
    trailing?: IPhonetics;
}
export interface ISlicedSyllables {
    lao: string[];
    roms: string[][];
}
export interface IPhonemeReg {
    location: string;
    reg: string;
    charNbr: number;
    noAccent: string;
}
export interface IRegInstances {
    accents: RegExp;
    specialຫ: RegExp;
    ambiguousຫ: RegExp;
    ambiguousຂວຄວ: RegExp;
    disambiguatedຫວ: RegExp;
    disambiguatedຂວຄວ: RegExp;
    cAlone: RegExp;
    cSpecial: RegExp;
    removables: RegExp;
}
