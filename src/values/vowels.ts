const vowels: any = {
	// FIXME: manage abbreviation for 3 alone consonants (warning xວx, xອx)
	// FIXME: difference between ​ແຫງ (hèng) ​ແຫງງ (ngèng)
	// only left 1 follow 2
	ເxຶອ: { en: 'uea', fr: 'üa', ph: 'ɯə'},
	ເxືອ: { en: 'ue:a', fr: 'ü:a', ph: 'ɯːə'},
	ເxົາ: { en: 'ao', fr: 'ao', ph: 'aw'},
	ເxາະ: { en: 'ɔ', fr: 'ɔ', ph: 'ɔ'},
	ເxັຍ: { en: 'ia', fr: 'yâ', ph: 'iə'},

	// trailing follow 2
	xັອx: { en: 'ɔ', fr: 'ɔ', ph: 'ɔ'},
	xັຽx: { en: 'ia', fr: 'yâ', ph: 'iə'},
	xັວx: { en: 'ooa', fr: 'oua', ph: 'uə'},

	// only left+x+x
	ແxັ: { en: 'ae', fr: 'è', ph: 'ɛ'},
	ເxັ: { en: 'e', fr: 'é', ph: 'e'},


	// trailing follow 1
	xຽx: { en: 'i:a', fr: 'y:â', ph: 'iːə'},
	xອx: { en: 'ɔ:', fr: 'ɔ:', ph: 'ɔ:'},
	xວx: { en: 'oo:a', fr: 'ou:a', ph: 'uːə'},
	xັx: { en: 'a', fr: 'â', ph: 'a'},
	xົx: { en: 'o', fr: 'ô', ph: 'o'},

	// left + follow
	ເxີ: { en: 'oe:', fr: 'eu:', ph: 'ɤː'},
	ເxິ: { en: 'oe', fr: 'eu', ph: 'ɤ'},
	ເxຍ: { en: 'i:a', fr: 'y:â', ph: 'iːə'},
	ແxະ: { en: 'ae', fr: 'è', ph: 'ɛ'},
	ເxະ: { en: 'e', fr: 'é', ph: 'e'},
	ໂxະ: { en: 'o', fr: 'ô', ph: 'o'},

	// only follow 3
	xົວະ: { en: 'ooa', fr: 'oua', ph: 'uə'},

	// only follow 2
	xົວ: { en: 'oo:a', fr: 'ou:a', ph: 'uːə'},
	xໍາ: { en: 'am', fr: 'âm', ph: 'am'},

	// only "am"
	xຳ: { en: 'am', fr: 'âm', ph: 'am'}, // here is the combined form of "am", not visible on every text editor

	// left
	ແx: { en: 'ae:', fr: 'è:', ph: 'ɛː'},
	ເx: { en: 'e:', fr: 'é:', ph: 'e'},
	ໂx: { en: 'o:', fr: 'ô:', ph: 'o'},
	ໄx: { en: 'ai', fr: 'ay', ph: 'aj'},
	ໃx: { en: 'ai', fr: 'ay', ph: 'aj'},

	// follow
	xໍ: { en: 'ɔ:', fr: 'ɔ:', ph: 'ɔː'},
	xິ: { en: 'ee', fr: 'i', ph: 'i'},
	xີ: { en: 'ee:', fr: 'i:', ph: 'i:'},
	xຶ: { en: 'ue', fr: 'ü', ph: 'ɯ'},
	xື: { en: 'ue:', fr: 'ü:', ph: 'ɯː'},
	xຸ: { en: 'oo', fr: 'ou', ph: 'u'},
	xູ: { en: 'oo:', fr: 'ou:', ph: 'uː'},
	xາ: { en: 'a:', fr: 'â:', ph: 'aː'},
	xະ: { en: 'a', fr: 'â', ph: 'a'},

	// alone
	x: { en: '', fr: '', ph: ''}

};
export { vowels };
