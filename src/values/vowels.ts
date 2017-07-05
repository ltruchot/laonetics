const vowels = {
	// only x+special+x
	xອx: { en: 'ɔ:', fr: 'ɔ:', ph: 'ɔ:'},
	xັອx: { en: 'ɔ', fr: 'ɔ', ph: 'ɔ'},
	xຽx: { en: 'ia:', fr: 'yâ:', ph: ''},
	xັຽx: { en: 'ia', fr: 'yâ', ph: ''},

	// only left+x+x
	ແxັx: { en: 'ae', fr: 'è', ph: ''},
	ເxັx: { en: 'e', fr: 'é', ph: ''},


	// only x+a+x
	xັx: { en: 'a', fr: 'â', ph: ''},
	xົx: { en: 'o', fr: 'o', ph: ''},

	// left + follow
	ເxີ: { en: 'oe:', fr: 'eu:', ph: ''},
	ເxິ: { en: 'oe', fr: 'eu', ph: ''},
	ເxົາ: { en: 'ao', fr: 'ao', ph: ''},
	ເxາະ: { en: 'ɔ', fr: 'ɔ', ph: ''},

	// only "am"
	xໍາ: { en: 'am', fr: 'âm', ph: ''},
	xຳ: { en: 'am', fr: 'âm', ph: ''}, // here is the combined form of "am", not visible on every text editor

	// left
	ແx: { en: 'ae:', fr: 'è:', ph: 'ɛː'},
	ແxະ: { en: 'ae', fr: 'è', ph: 'ɛ'},
	ເx: { en: 'e:', fr: 'é:', ph: ''},
	ເxະ: { en: 'e', fr: 'é', ph: ''},
	ໂx: { en: 'o:', fr: 'ô:', ph: ''},
	ໂxະ: { en: 'o', fr: 'ô', ph: ''},
	ໄx: { en: 'ai', fr: 'ay', ph: ''},
	ໃx: { en: 'ai', fr: 'ay', ph: ''},

	// follow
	xໍ: { en: 'ɔ:', fr: 'ɔ:', ph: ''},
	xິ: { en: 'ee', fr: 'i', ph: ''},
	xີ: { en: 'ee:', fr: 'i:', ph: ''},
	xຶ: { en: 'ue', fr: 'ü', ph: ''},
	xື: { en: 'ue:', fr: 'ü:', ph: ''},
	xຸ: { en: 'oo', fr: 'ou', ph: ''},
	xູ: { en: 'oo:', fr: 'ou:', ph: ''},
	xາ: { en: 'a:', fr: 'â:', ph: 'aː'},
	xະ: { en: 'a', fr: 'â', ph: ''},

	// alone
	x: { en: '', fr: '', ph: ''}


	// todo
	// ເxຶອ: { en: 'uea', fr: 'üa', ph: ''},
	// ເxືອ: { en: 'ue:a', fr: 'ü:a', ph: ''}
	// ເxຍ
	// ເxັຍ
};
export { vowels };
