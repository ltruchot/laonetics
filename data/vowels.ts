import { consonants } from './consonants';
const vowels = {
	trailingƆX: {
		followPart: 'ັ?ອ[ງກມນຍວດບ]',
		xອx: { en: 'ɔ:', fr: 'ɔ:'},
		xັອx: { en: 'ɔ', fr: 'ɔ'}
	},
	trailingAX: {
		followPart: 'ັ[' + consonants.trailing + '][ແເໂໄໃ|' + consonants.leading + '|\w\s]',
		xັx: { en: 'a', fr: 'â'}
	},
	trailingFollowX: {
		followPart: '[ິີຶືຸູ][ງກມນຍວດບ]',
		base: 'follow'
	},
	topLeftConsonant: {
		todo: 'ເxຶອ|ເxືອ|ເxຍ|ເxັຍ',
		ເxຶອ: { en: 'uea', fr: 'üa'},
		ເxືອ: { en: 'ue:a', fr: 'ü:a'}
	},
	topLeft: {
		leftPart: 'ເ',
		followPart: '([ິີາ]|ົາ)',
		ເxີ: { en: 'oe:', fr: 'eu:'},
		ເxິ: { en: 'oe', fr: 'eu'},
		ເxົາ: { en: 'ao', fr: 'ao'},
		ເxາະ: { en: 'ɔ', fr: 'ɔ'}
	},
	topRight: {
		followPart: 'ໍາ',
		xໍາ: { en: 'am', fr: 'âm'}
	},
	left: {
		leftPart: '[ແເໂໄໃ]',
		ແx: { en: 'ae:', fr: 'è:'},
		ແxະ: { en: 'ae', fr: 'è'},
		ເx: { en: 'e:', fr: 'é:'},
		ເxະ: { en: 'e', fr: 'é'},
		ໂx: { en: 'o:', fr: 'ô:'},
		ໂxະ: { en: 'o', fr: 'ô'},
		ໄx: { en: 'ai', fr: 'ay'},
		ໃx: { en: 'ai', fr: 'ay'}
	},
	follow: {
		followPart: '[ໍິີຶືຸູາະ]',
		xໍ: { en: 'ɔ:', fr: 'ɔ:'},
		xິ: { en: 'ee', fr: 'i'},
		xີ: { en: 'ee:', fr: 'i:'},
		xຶ: { en: 'ue', fr: 'ü'},
		xື: { en: 'ue:', fr: 'ü:'},
		xຸ: { en: 'oo', fr: 'ou'},
		xູ: { en: 'oo:', fr: 'ou:'},
		xາ: { en: 'a:', fr: 'â:'},
		xະ: { en: 'a', fr: 'â'}
	}
}
export { vowels };
