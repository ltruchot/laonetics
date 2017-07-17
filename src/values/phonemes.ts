// dependencies
import { IPhonemeReg } from './../interfaces/interfaces';

// exported graphemes
const graphemes: any = {
	accents: '່້໌໊໋',
	phantoms: '\\u200B\\u2022\\s\.\,\(\)', // word boundaries, visible or notinvisible in editors
	cLeading: 'ກຄຂງຈສຊຍດຕຖທນບປຜຝພຟມຢຣລວຫອຮໝໜ',
	cTrailing: 'ງກມນຍວດບ',
	cຫ: 'ງຍນມລວຼ',
	cຂ: 'ວ',
	cຄ: 'ວ',
	vFollow: 'ໍິີຶືຸູາ',
	vLeft: 'ແເໂໄໃ',
	vSpecial: 'ອຽ',
	vFollowComplement: 'ະ\\u0EB3', // 2nd one is a special form of lao grapheme "am", invisible in editors
};
const regCombinations: any = {
	cSpecial: `(ຫ[${graphemes.cຫ}]|ຂ[${graphemes.cຂ}]|ຄ[${graphemes.cຄ}])`
}

// exported regs
const regs: any = {
	removables: `[${graphemes.accents}${graphemes.phantoms}]`,
	doubleConsonants: `${regCombinations.cSpecial}`,
	boundary: `(?![${graphemes.vFollow}${graphemes.vFollowComplement}])`,
	leadingAll: `(${regCombinations.cSpecial}|[${graphemes.cLeading}])`,
	follow1Only: `[${graphemes.vFollow}${graphemes.vFollowComplement}]`
}

// exported phonemes
const phonemes: Array<IPhonemeReg> = [
	{
		name: 'onlyFollow3',
		reg: `${regs.leadingAll}ົວະ`
	},
	{
		name: 'trailingFollow2',
		reg: `${regs.leadingAll}ັ[${graphemes.vSpecial}ອ][${graphemes.cTrailing}]`
	},
	{
		name: 'onlyFollow2',
		reg: `${regs.leadingAll}(ໍາ|ັວ|ົວ)`
	},
	{
		name: 'specialLeftFollow2',
		reg: `ເ${regs.leadingAll}ັຍ`
	},
	{
		name: 'trailingLeftFollow2',
		reg: `ເ${regs.leadingAll}([ຶ|ື]ອ)[${graphemes.cTrailing}]`
	},
	{
		name: 'onlyLeftFollow2',
		reg: `ເ${regs.leadingAll}([ຶ|ື]ອ|ົາ|າະ)`
	}, {
		name: 'onlyLeftFollow',
		reg: `ເ${regs.leadingAll}ຍ` // needed befor trailingLeftFollow, because "ຍ" match a consonant too
	}, {
		name: 'trailingLeftFollow',
		reg: `(ເ${regs.leadingAll}[ິີັ]|ແ${regs.leadingAll}ັ)[${graphemes.cTrailing}]`
	}, {
		name: 'onlyLeftFollow',
		reg: `(ເ${regs.leadingAll}[ິີະ]|ແ${regs.leadingAll}ະ)`
	}, {
		name: 'trailingLeft',
		reg: `[${graphemes.vLeft}]${regs.leadingAll}[${graphemes.cTrailing}]`
	}, {
		name: 'onlyLeft',
		reg: `[${graphemes.vLeft}]${regs.leadingAll}`
	},	{
		name: 'trailingFollow1',
		reg: `${regs.leadingAll}[${graphemes.vSpecial}ັົວ][${graphemes.cTrailing}]`
	}, {
		name: 'trailingFollow',
		reg: `${regs.leadingAll}${regs.follow1Only}[${graphemes.cTrailing}]`
	}, {
		name: 'onlyFollow',
		reg: `${regs.leadingAll}${regs.follow1Only}`
	}/* , {
		name: 'alone',
		reg: `${regs.leadingAll}`
	}*/
];

// export shared objects
export { phonemes, graphemes, regs };
