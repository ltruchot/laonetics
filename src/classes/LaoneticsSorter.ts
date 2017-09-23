// import { vowels } from './../values/vowels';
// import { consonants } from './../values/consonants';
import { graphemes, regInstances, regs } from './../values/phonemes';
import { LaoneticsTranslater } from './LaoneticsTranslater';
// import { IConsonant, IPhonemeReg, ISlicedSyllables } from './../interfaces/interfaces';

export class LaoneticsSorter {
	private translater = new LaoneticsTranslater();
	private leftVowels = new RegExp('[' + graphemes.vLeft + graphemes.vLeftSpecial + ']');
	constructor () {}
	sortArrayByConsonant (words: any[], filter?: string) {
		// console.log('LaoneticsTranslater::sortArrayByConsonant', words);
		const specialຫItems: any[] = [];
		const ambiguousຫItems: any[] = [];
		const ambiguousຂວຄວItems: any[] = [];
		const indexToSplice: number[] = [];
		words.forEach((item: string, index: number) => {
			let modified = false;
			let leadingVowel = '';
			let word = filter ? this.getDeepParam(item, filter) : item;

			if (word[0].match(this.leftVowels)) {
				leadingVowel = word[0];
				word = word.substring(1);
			}

			if (word.substring(0).match(/[ໝໜ]/)) {
				word = this.extendComplexLeading(word);
				modified = true;
			}

			const specialCasesClosure = (arrToSort: any[]) => {
				let specialItem = {
					modified,
					word: leadingVowel ? leadingVowel + word : word
				};
				if (filter) {
					specialItem = this.setDeepParam(Object.assign({}, item), filter, specialItem);
				}
				arrToSort.push(specialItem);
				indexToSplice.unshift(index);
			};

			if (word.substring(0, 2).match(regInstances.specialຫ)) {
				// pure consonnant case (ex: ຫງ)
				if ((leadingVowel + word).length === 2) {
					specialCasesClosure(specialຫItems);
				} else {
					const kk = this.translater.getKaraoke(leadingVowel + word, []);
					let checkableWord = kk.lao[0].replace(new RegExp(`[${graphemes.accents}]`, 'g'), '');
					checkableWord = checkableWord.replace(new RegExp(`${regs.followOnly}`, 'g'), '');
					checkableWord = checkableWord.replace(new RegExp(leadingVowel), '');
					// following consonant like ໂຫງດ, but not ໂຫງ
					if (checkableWord[2]) {
						specialCasesClosure(specialຫItems);
					}
				}

			} else if (word.substring(0, 2).match(regInstances.ambiguousຫ)) {
				if (leadingVowel || !word.match(regInstances.disambiguatedຫວ)) {
					specialCasesClosure(ambiguousຫItems);
				}
			} else if (word.substring(0, 2).match(regInstances.ambiguousຂວຄວ)) {
				if (leadingVowel || !word.match(regInstances.disambiguatedຂວຄວ)) {
					specialCasesClosure(ambiguousຂວຄວItems);
				}
			}
		});
		indexToSplice.forEach((index: number) => {
			words.splice(index, 1);
		});

		// prepare sorter
		const sorterSimple = this.getSorterByAlphabet(filter);
		const sorterComplexe = this.getSorterByAlphabet(filter ? filter + '.word' : 'word');

		// sort everything
		words.sort(sorterSimple);
		const specialຫWords = this.sortWithOptionalFilter(specialຫItems, sorterComplexe, filter);
		const ambiguousຫWords = this.sortWithOptionalFilter(ambiguousຫItems, sorterComplexe, filter);
		const ambiguousຂວຄວWords = this.sortWithOptionalFilter(ambiguousຂວຄວItems, sorterComplexe, filter);

		// combine all words in final state
		words.push(...specialຫWords.concat(ambiguousຫWords, ambiguousຂວຄວWords));
		return words;
	}

	sortWithOptionalFilter (items: any[], sorter: any, filter: string): any[] {
		return items.sort(sorter).map((item: any) => {
			if (filter) {
				const tempItem = this.getDeepParam(item, filter);
				if (tempItem.modified) {
					this.setDeepParam(item, filter, this.shortenComplexLeading(tempItem.word));
				} else {
					this.setDeepParam(item, filter, tempItem.word);
				}
				return item;
			}
			return item.modified ? this.shortenComplexLeading(item.word) : item.word;
		});
	}

	extendComplexLeading (str: string): string {
		if (str[0] === 'ໝ') { str = str.replace('ໝ', 'ຫມ'); }
		if (str[0] === 'ໜ') { str = str.replace('ໜ', 'ຫນ'); }
		return str;
	}

	shortenComplexLeading (str: string): string {
		let leadingVowel = '';
		if (str[0].match(this.leftVowels)) {
				leadingVowel = str[0];
				str = str.substring(1);
		}
		if (str.substring(0, 2) === 'ຫມ') { str = str.replace('ຫມ', 'ໝ'); }
		if (str.substring(0, 2) === 'ຫນ') { str = str.replace('ຫນ', 'ໜ'); }
		return leadingVowel ? leadingVowel + str : str;
	}

	getDeepParam (obj: any, filter: string) {
		const deepness = filter.split('.');
		deepness.forEach((key: string) => {
			obj = obj[key];
		});
		return obj;
	}

	setDeepParam (obj: any, filter: string, value: any) {
		const deepness = filter.split('.');
		let current: any;
		deepness.some((key: string, index: number) => {
			if (index === deepness.length - 1) {
				current[key] = value;
				return true;
			} else {
				current = obj[key];
			}
		});
		return obj;
	}

	getSorterByAlphabet (filter?: string) {
		return (a: any, b: any) => {
			if (filter) {
				const deepness = filter.split('.');
				deepness.forEach((key: string) => {
					a = a[key];
					b = b[key];
				});
			}
			return (a as string).localeCompare(b, 'lo-LA');
		};
	}
}
