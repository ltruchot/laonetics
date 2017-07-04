const vowels = {
	// only x+special+x
	xອx: { en: 'ɔ:', fr: 'ɔ:'},
	xັອx: { en: 'ɔ', fr: 'ɔ'},
	xຽx: { en: 'ia:', fr: 'yâ:'},
	xັຽx: { en: 'ia', fr: 'yâ'},

	// only left+x+x
	ແxັx: { en: 'ae', fr: 'è'},
	ເxັx: { en: 'e', fr: 'é'},


	// only x+a+x
	xັx: { en: 'a', fr: 'â'},
	xົx: { en: 'o', fr: 'o'},

	// left + follow
	ເxີ: { en: 'oe:', fr: 'eu:'},
	ເxິ: { en: 'oe', fr: 'eu'},
	ເxົາ: { en: 'ao', fr: 'ao'},
	ເxາະ: { en: 'ɔ', fr: 'ɔ'},

	// only "am"
	xໍາ: { en: 'am', fr: 'âm'},
	xຳ: { en: 'am', fr: 'âm'}, // here is the combined form of "am", not visible on every text editor

	// left
	ແx: { en: 'ae:', fr: 'è:'},
	ແxະ: { en: 'ae', fr: 'è'},
	ເx: { en: 'e:', fr: 'é:'},
	ເxະ: { en: 'e', fr: 'é'},
	ໂx: { en: 'o:', fr: 'ô:'},
	ໂxະ: { en: 'o', fr: 'ô'},
	ໄx: { en: 'ai', fr: 'ay'},
	ໃx: { en: 'ai', fr: 'ay'},

	// follow
	xໍ: { en: 'ɔ:', fr: 'ɔ:'},
	xິ: { en: 'ee', fr: 'i'},
	xີ: { en: 'ee:', fr: 'i:'},
	xຶ: { en: 'ue', fr: 'ü'},
	xື: { en: 'ue:', fr: 'ü:'},
	xຸ: { en: 'oo', fr: 'ou'},
	xູ: { en: 'oo:', fr: 'ou:'},
	xາ: { en: 'a:', fr: 'â:'},
	xະ: { en: 'a', fr: 'â'}

	// todo
	// xາx: { en: 'a:', fr: 'â:'}
	// ເxຶອ: { en: 'uea', fr: 'üa'},
	// ເxືອ: { en: 'ue:a', fr: 'ü:a'}
	// ເxຍ
	// ເxັຍ
};
export { vowels };
