export interface IPhonetics {
	fr: string;
	en: string
	ph: string;
};
export interface IConsonant {
	leading: IPhonetics;
	trailing?: IPhonetics;
}
export interface ISlicedSyllables {
	lao: Array<string>;
	karaoke: Array<string>;
};
export interface IPhonemeReg {
	name: string;
	reg: string;
	overlapping?: boolean;
}
