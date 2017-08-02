export interface IPhonetics {
	[key: string]: any;
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
	roms: Array<Array<string>>;
};
export interface IPhonemeReg {
	location: string;
	reg: string;
	charNbr: number;
	noAccent: string;
}
