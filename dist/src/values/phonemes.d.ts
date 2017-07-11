import { IPhonemeReg } from './../interfaces/interfaces';
declare const graphemes: any;
declare const regs: {
    removables: string;
    leadingH: string;
    boundary: string;
    leadingAll: string;
    follow1Only: string;
};
declare const phonemes: Array<IPhonemeReg>;
export { phonemes, graphemes, regs };
