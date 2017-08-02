// dependencies
import { IPhonemeReg } from './../interfaces/interfaces';

// exported graphemes
const graphemes: any = {
	accents: '່້໊໋໌',
	authorizedAccents: '່້',
	phantoms: '\\u200B\\u2022\\s\.\,,\-', // word boundaries and punctuation, visible or not in editors
	cLeading: 'ກຄຂງຈສຊຍດຕຖທນບປຜຝພຟມຢຣລວຫອຮໝໜ',
	cTrailing: 'ງກມນຍວດບ',
	cຫ: 'ຫ[ງຍນມລວຼ]',
	cຂ: 'ຂວ',
	cຄ: 'ຄວ',
	vFollow: 'ໍິີຶືຸູາ',
	vLeft: 'ແເໂ',
	vLeftSpecial: 'ໄໃ',
	vFollowComplement: 'ະ\\u0EB3', // 2nd one is a special form of lao grapheme "am", invisible in editors
};
const preRegs: any = {
	cSpecial: `(${graphemes.cຫ}|${graphemes.cຂ}|${graphemes.cຄ})`,
}

// exported regs
const regs: any = {
	boundary: `(?![${graphemes.vFollow}${graphemes.vFollowComplement}ຽັົ])`,
	leadingAll: `(${preRegs.cSpecial}|[${graphemes.cLeading}])`,
	follow1Only: `[${graphemes.vFollow}${graphemes.vFollowComplement}]`,
	accents: `[${graphemes.authorizedAccents}]`
}

const regInstances: any = {
	removables: new RegExp(`[${graphemes.phantoms}]+`, 'g'),
	cSpecial: new RegExp(`${preRegs.cSpecial}`),
	cAlone: new RegExp(`([${graphemes.cLeading}]{2,})`, 'g'),
	accents: new RegExp(`${regs.accents}`, 'g'),
};

// exported phonemes
const phonemes: Array<IPhonemeReg> = [
	{
		location: 'onlyFollow3',
		reg: `${regs.leadingAll}${regs.accents}?ົ${regs.accents}?ວ${regs.accents}?ະ${regs.accents}?`,
		charNbr: 4,
		noAccent: `${regs.leadingAll}ົວະ`
	},
	{
		location: 'trailingFollow2',
		reg: `${regs.leadingAll}${regs.accents}?ັ[ຽອວ]${regs.accents}?[${graphemes.cTrailing}]`,
		charNbr: 4,
		noAccent: `${regs.leadingAll}ັ[ຽອວ][${graphemes.cTrailing}]`
	},
	{
		location: 'onlyFollow2',
		reg: `${regs.leadingAll}${regs.accents}?(ໍ${regs.accents}?າ|ົ${regs.accents}?ວ)${regs.accents}?`,
		charNbr: 3,
		noAccent: `${regs.leadingAll}(ໍາ|ົວ)`
	},
	{
		location: 'specialLeftFollow2',
		reg: `ເ${regs.leadingAll}${regs.accents}?ັຍ${regs.accents}?`,
		charNbr: 4,
		noAccent: `ເ${regs.leadingAll}ັຍ`
	},
	{
		location: 'trailingLeftFollow2',
		reg: `ເ${regs.leadingAll}${regs.accents}?([ຶ|ື]${regs.accents}?ອ)${regs.accents}?[${graphemes.cTrailing}]`,
		charNbr: 4,
		noAccent: `ເ${regs.leadingAll}([ຶ|ື]ອ)[${graphemes.cTrailing}]`
	},
	{
		location: 'onlyLeftFollow2',
		reg: `ເ${regs.leadingAll}${regs.accents}?([ຶ|ື]${regs.accents}?ອ|ົ${regs.accents}?າ|າະ)${regs.accents}?`,
		charNbr: 4,
		noAccent: `ເ${regs.leadingAll}([ຶ|ື]ອ|ົາ|າະ)`
	}, {
		location: 'specialLeftFollow', // needed befor trailingLeftFollow, because "ຍ" match a consonant too
		reg: `ເ${regs.leadingAll}${regs.accents}?ຍ${regs.accents}?`,
		charNbr: 3,
		noAccent: `ເ${regs.leadingAll}ຍ`
	}, {
		location: 'trailingLeftFollow',
		reg: `(ເ${regs.leadingAll}${regs.accents}?[ິີັ]|ແ${regs.leadingAll}ັ)${regs.accents}?[${graphemes.cTrailing}]`,
		charNbr: 4,
		noAccent: `(ເ${regs.leadingAll}[ິີັ]|ແ${regs.leadingAll}ັ)[${graphemes.cTrailing}]`
	}, {
		location: 'onlyLeftFollow',
		reg: `(ເ${regs.leadingAll}${regs.accents}?[ິີ]${regs.accents}?|[${graphemes.vLeft}]${regs.leadingAll}${regs.accents}?ະ${regs.accents}?)`,
		charNbr: 3,
		noAccent: `(ເ${regs.leadingAll}[ິີ]|[${graphemes.vLeft}]${regs.leadingAll}ະ)`
	}, {
		location: 'trailingLeft',
		reg: `[${graphemes.vLeft}]${regs.leadingAll}${regs.accents}?[${graphemes.cTrailing}]`,
		charNbr: 3,
		noAccent: `[${graphemes.vLeft}]${regs.leadingAll}[${graphemes.cTrailing}]`
	}, {
		location: 'onlyLeft',
		reg: `[${graphemes.vLeft}${graphemes.vLeftSpecial}]${regs.leadingAll}${regs.accents}?`,
		charNbr: 2,
		noAccent: `[${graphemes.vLeft}${graphemes.vLeftSpecial}]${regs.leadingAll}`
	},	{
		location: 'trailingFollow1',
		reg: `${regs.leadingAll}${regs.accents}?[ຽອັົວ]${regs.accents}?[${graphemes.cTrailing}]`,
		charNbr: 3,
		noAccent: `${regs.leadingAll}[ຽອັົວ][${graphemes.cTrailing}]`
	}, {
		location: 'trailingFollow',
		reg: `${regs.leadingAll}${regs.accents}?${regs.follow1Only}${regs.accents}?[${graphemes.cTrailing}]`,
		charNbr: 3,
		noAccent: `${regs.leadingAll}${regs.follow1Only}[${graphemes.cTrailing}]`
	}, {
		location: 'onlyFollow',
		reg: `${regs.leadingAll}${regs.accents}?${regs.follow1Only}${regs.accents}?`,
		charNbr: 2,
		noAccent: `${regs.leadingAll}${regs.follow1Only}`
	}
];

// export shared objects
export { graphemes, phonemes, regs, regInstances };
