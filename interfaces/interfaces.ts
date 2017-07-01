export interface IPhonetics {
	fr: string;
	en: string
};
export interface IConsonant {
	leading: IPhonetics;
	trailing?: IPhonetics;
}
