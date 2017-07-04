import { consonants } from './consonants';
import { IConsonant, ISlicedSyllables, IPhonetics, IPhonemeReg } from './../interfaces/interfaces';

const C_LEADING = 'ກຄຂງສຊນມປບດຈຕພລຢຍອຫໝໜ';
const C_TRAILING = 'ງກມນຍວດບ';
const V_LEFT = 'ແເໂໄໃ';
const V_FOLLOW = 'ໍິີຶືຸູາ';
const V_SPECIAL = 'ອຽ';
const V_FOLLOW_COMPLEMENT = 'ະຳ' // don't remove this special invisible form of "am"

const phonemes: Array<IPhonemeReg> = [{
	name: 'trailingSpecialX',
	reg: `[${C_LEADING}]ັ?[${V_SPECIAL}][${C_TRAILING}]`
}, {
	name: 'trailingAX',
	reg: `[${C_LEADING}][ັົ][${C_TRAILING}][${V_LEFT}|${C_LEADING}|\w\s]`
}, {
	name: 'trailingLeftX',
	reg: `[ແເ][${C_LEADING}][${C_TRAILING}]ັ?[${V_LEFT}|${C_LEADING}|\w\s]`
}, {
	name: 'trailingFollowX',
	reg: `[${C_LEADING}][${V_FOLLOW}][${C_TRAILING}]`
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
}];
export { phonemes };
