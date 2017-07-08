"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphemes = {
    accents: '່້໌໊໋',
    phantoms: '\\u200B\\u2022\\s',
    cLeading: 'ກຄຂງຈສຊຍດຕຖທນບປຜຝພຟມຢຣລວຫອຮໝໜ',
    cTrailing: 'ງກມນຍວດບ',
    cຫ: 'ງຍນມຼລວ',
    vFollow: 'ໍິີຶືຸູາ',
    vLeft: 'ແເໂໄໃ',
    vSpecial: 'ອຽ',
    vFollowComplement: 'ະ\\u0EB3',
};
exports.graphemes = graphemes;
var regs = {
    accents: "[" + graphemes.accents + "]",
    phantoms: "[" + graphemes.phantoms + "]",
    leadingH: "\u0EAB[" + graphemes.cຫ + "]",
    reversedBoundary: "(?![" + graphemes.vFollow + graphemes.vFollowComplement + "])",
    rightBoundary: "[" + graphemes.vLeft + "|" + graphemes.cLeading + "|\\w\\b-]",
    leadingAll: "([" + graphemes.cLeading + "]|\u0EAB[" + graphemes.cຫ + "])"
};
exports.regs = regs;
var phonemes = [
    {
        name: 'trailingSpecialTopLeft',
        reg: "\u0EC0" + regs.leadingAll + "([\u0EB6|\u0EB7]\u0EAD||\u0EBB\u0EB2|)[" + graphemes.cTrailing + "]?" + regs.rightBoundary,
        overlapping: true
    },
    {
        name: 'trailingSpecialX',
        reg: regs.leadingAll + "\u0EB1?[" + graphemes.vSpecial + "][" + graphemes.cTrailing + "]" + regs.rightBoundary,
        overlapping: true
    }, {
        name: 'trailingTopLeftX',
        reg: "\u0EC0" + regs.leadingAll + "[\u0EB4\u0EB5][" + graphemes.cTrailing + "]?" + regs.rightBoundary,
        overlapping: true
    }, {
        name: 'trailingLeftX',
        reg: "[\u0EC1\u0EC0]" + regs.leadingAll + "[" + graphemes.cTrailing + "]\u0EB1?" + regs.rightBoundary,
        overlapping: true
    }, {
        name: 'trailingັົX',
        reg: regs.leadingAll + "[\u0EB1\u0EBB][" + graphemes.cTrailing + "]" + regs.rightBoundary,
        overlapping: true
    }, {
        name: 'trailingFollowX',
        reg: regs.leadingAll + "[" + graphemes.vFollow + "][" + graphemes.cTrailing + "]" + regs.rightBoundary,
        overlapping: true
    }, {
        name: 'topLeft',
        reg: "\u0EC0" + regs.leadingAll + "([\u0EB4\u0EB5\u0EB2]|\u0EBB\u0EB2)"
    }, {
        name: 'topRight',
        reg: regs.leadingAll + "\u0ECD\u0EB2"
    }, {
        name: 'left',
        reg: "[" + graphemes.vLeft + "]" + regs.leadingAll + "\u0EB0?"
    }, {
        name: 'follow',
        reg: regs.leadingAll + "[" + graphemes.vFollow + graphemes.vFollowComplement + "]"
    }
];
exports.phonemes = phonemes;
//# sourceMappingURL=phonemes.js.map