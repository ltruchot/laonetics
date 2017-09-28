export declare class LaoneticsSorter {
    private translater;
    private leftVowels;
    constructor();
    sortArrayByConsonant(words: any[], filter?: string): any[];
    sortWithOptionalFilter(items: any[], sorter: any, filter: string): any[];
    extendComplexLeading(str: string): string;
    shortenComplexLeading(str: string): string;
    getDeepParam(obj: any, filter: string): any;
    setDeepParam(obj: any, filter: string, value: any): any;
    getSorterByAlphabet(filter?: string): (a: any, b: any) => number;
}
