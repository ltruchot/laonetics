import {
	ISlicedSyllables,
	LaoneticsSorter,
	LaoneticsTranslater,
	consonants
} from './../../../src/laonetics';

$(document).ready(() => {
	const allConsonants: string[] = Object.keys(consonants);
	const ddlConsonants = $('#ddl-consonants');
	const btnDdlConsonants = $('#btn-ddl-consonants');
	allConsonants.forEach((item: string) => {
		ddlConsonants.append(`<a class="dropdown-item" href="#">${item}</a>`);
	});
	ddlConsonants.on('click', 'a', (event: Event) => {
		btnDdlConsonants.text($(event.target).text());
	});

	const translater = new LaoneticsTranslater();
	const sorter = new LaoneticsSorter();

	const htmlIn: JQuery = $('#in');
	const htmlOutLo: JQuery = $('#out-lo');
	const htmlOutFr: JQuery = $('#out-fr');
	const htmlOutEn: JQuery = $('#out-en');
	const htmlOutPh: JQuery = $('#out-ph');

	romanize();

	const btnRomanize: JQuery = $('#btn-romanize');
	const btnReset: JQuery = $('#btn-reset');
	const btnGenerate: JQuery = $('#btn-generate');
	const cbLo: JQuery = $('#cb-lo');
	const cbFr: JQuery = $('#cb-fr');
	const cbEn: JQuery = $('#cb-en');
	const cbPh: JQuery = $('#cb-ph');
	const blockLo: JQuery = $('#block-lo');
	const blockFr: JQuery = $('#block-fr');
	const blockEn: JQuery = $('#block-en');
	const blockPh: JQuery = $('#block-ph');

	btnRomanize.on('click', romanize);
	btnReset.on('click', reset);
	btnGenerate.on('click', generate);

	cbLo.on('click', () => {
		blockLo.toggle();
	});
	cbFr.on('click', () => {
		blockFr.toggle();
	});
	cbEn.on('click', () => {
		blockEn.toggle();
	});
	cbPh.on('click', () => {
		blockPh.toggle();
	});

	const htmlSorterIn: JQuery = $('#sorter-in');
	const btnSort: JQuery = $('#btn-sort');
	btnSort.on('click', () => {
		const words = htmlSorterIn.val().split(new RegExp(/\s+/));
		sorter.sortArrayByConsonant(words);
		htmlSorterIn.val(words.join(' '));
	});

	function romanize () {
		displayLoading();
		const laoSentence = htmlIn.val();
		const slicedSyllables: ISlicedSyllables = translater.getKaraoke(laoSentence, ['fr', 'en', 'ph']);
		htmlOutLo.html(slicedSyllables.lao.join(' '));
		htmlOutFr.html(slicedSyllables.roms[0].join(' '));
		htmlOutEn.html(slicedSyllables.roms[1].join(' '));
		htmlOutPh.html(slicedSyllables.roms[2].join(' '));
	}

	function reset () {
		htmlIn.val('');
		htmlOutFr.html('');
		htmlOutEn.html('');
		htmlOutLo.html('');
		htmlOutPh.html('');
	}

	function generate () {
		reset();
		displayLoading();
		const phonemes = translater.getPhonemesByConsonant(btnDdlConsonants.text());
		htmlIn.val(phonemes.join(''));
		romanize();
	}

	function displayLoading () {
		const msgLaoding = 'Loading...';
		htmlOutFr.html(msgLaoding);
		htmlOutEn.html(msgLaoding);
		htmlOutLo.html(msgLaoding);
		htmlOutPh.html(msgLaoding);
	}
});
