import { consonants } from './consonants';
import { IConsonant, ISlicedSyllables, IPhonetics, IPhonemeReg } from './../interfaces/interfaces';

const C_LEADING = 'ກຄຂງຈສຊຍດຕຖທນບປຜຝພຟມຢຣລວຫອຮໝໜ';
const C_TRAILING = 'ງກມນຍວດບ';
const V_LEFT = 'ແເໂໄໃ';
const V_FOLLOW = 'ໍິີຶືຸູາ';
const V_SPECIAL = 'ອຽ';
const V_FOLLOW_COMPLEMENT = 'ະຳ' // don't remove this special invisible form of "am"
const REG_BORDER = `[${V_LEFT}|${C_LEADING}|\w\s-]`

const phonemes: Array<IPhonemeReg> = [
	{
		name: 'trailingSpecialX',
		reg: `[${C_LEADING}]ັ?[${V_SPECIAL}][${C_TRAILING}]`
	}, {
		name: 'trailingLeftX',
		reg: `[ແເ][${C_LEADING}][${C_TRAILING}]ັ?${REG_BORDER}`,
		overlapping: true
	}, {
		name: 'trailingOAX',
		reg: `[${C_LEADING}][ັົ][${C_TRAILING}]${REG_BORDER}`,
		overlapping: true
	}, {
		name: 'trailingFollowX',
		reg: `[${C_LEADING}][${V_FOLLOW}][${C_TRAILING}]${REG_BORDER}`,
		overlapping: true
	},  {
		name: 'topLeft',
		reg: `ເ[${C_LEADING}]([ິີາ]|ົາ)`
	}, {
		name: 'topRight',
		reg: `[${C_LEADING}]ໍາ`
	}, {
		name: 'left',
		reg: `[${V_LEFT}][${C_LEADING}]ະ?`
	}, {
		name: 'follow',
		reg: `[${C_LEADING}][${V_FOLLOW}${V_FOLLOW_COMPLEMENT}]`
	}/*, {
		name: 'alone',
		reg: `[${C_LEADING}]`
	}*/
];
export { phonemes };
