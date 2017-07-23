"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// exported graphemes
var graphemes = {
    accents: '່້໊໋໌',
    phantoms: '\\u200B\\u2022\\s\.\,\-',
    cLeading: 'ກຄຂງຈສຊຍດຕຖທນບປຜຝພຟມຢຣລວຫອຮໝໜ',
    cTrailing: 'ງກມນຍວດບ',
    cຫ: 'ຫ[ງຍນມລວຼ]',
    cຂ: 'ຂວ',
    cຄ: 'ຄວ',
    vFollow: 'ໍິີຶືຸູາ',
    vLeft: 'ແເໂ',
    vLeftSpecial: 'ໄໃ',
    vFollowComplement: 'ະ\\u0EB3',
};
exports.graphemes = graphemes;
var preRegs = {
    cSpecial: "(" + graphemes.cຫ + "|" + graphemes.cຂ + "|" + graphemes.cຄ + ")"
};
// exported regs
var regs = {
    boundary: "(?![" + graphemes.vFollow + graphemes.vFollowComplement + "\u0EBD\u0EB1\u0EBB])",
    leadingAll: "(" + preRegs.cSpecial + "|[" + graphemes.cLeading + "])",
    follow1Only: "[" + graphemes.vFollow + graphemes.vFollowComplement + "]"
};
exports.regs = regs;
var regInstances = {
    removables: new RegExp("[" + graphemes.accents + graphemes.phantoms + "]", 'gimu'),
    cSpecial: new RegExp("" + preRegs.cSpecial),
    cAlone: new RegExp("([" + graphemes.cLeading + "]{2,})", 'g')
};
exports.regInstances = regInstances;
// exported phonemes
var phonemes = [
    {
        location: 'onlyFollow3',
        reg: regs.leadingAll + "\u0EBB\u0EA7\u0EB0",
        charNbr: 4
    },
    {
        location: 'trailingFollow2',
        reg: regs.leadingAll + "\u0EB1[\u0EBD\u0EAD\u0EA7][" + graphemes.cTrailing + "]",
        charNbr: 4
    },
    {
        location: 'onlyFollow2',
        reg: regs.leadingAll + "(\u0ECD\u0EB2|\u0EBB\u0EA7)",
        charNbr: 3
    },
    {
        location: 'specialLeftFollow2',
        reg: "\u0EC0" + regs.leadingAll + "\u0EB1\u0E8D",
        charNbr: 4
    },
    {
        location: 'trailingLeftFollow2',
        reg: "\u0EC0" + regs.leadingAll + "([\u0EB6|\u0EB7]\u0EAD)[" + graphemes.cTrailing + "]",
        charNbr: 4
    },
    {
        location: 'onlyLeftFollow2',
        reg: "\u0EC0" + regs.leadingAll + "([\u0EB6|\u0EB7]\u0EAD|\u0EBB\u0EB2|\u0EB2\u0EB0)",
        charNbr: 4
    }, {
        location: 'specialLeftFollow',
        reg: "\u0EC0" + regs.leadingAll + "\u0E8D",
        charNbr: 3
    }, {
        location: 'trailingLeftFollow',
        reg: "(\u0EC0" + regs.leadingAll + "[\u0EB4\u0EB5\u0EB1]|\u0EC1" + regs.leadingAll + "\u0EB1)[" + graphemes.cTrailing + "]",
        charNbr: 4
    }, {
        location: 'onlyLeftFollow',
        reg: "(\u0EC0" + regs.leadingAll + "[\u0EB4\u0EB5]|[" + graphemes.vLeft + "]" + regs.leadingAll + "\u0EB0)",
        charNbr: 3
    }, {
        location: 'trailingLeft',
        reg: "[" + graphemes.vLeft + "]" + regs.leadingAll + "[" + graphemes.cTrailing + "]",
        charNbr: 3
    }, {
        location: 'onlyLeft',
        reg: "[" + graphemes.vLeft + graphemes.vLeftSpecial + "]" + regs.leadingAll,
        charNbr: 2
    }, {
        location: 'trailingFollow1',
        reg: regs.leadingAll + "[\u0EBD\u0EAD\u0EB1\u0EBB\u0EA7][" + graphemes.cTrailing + "]",
        charNbr: 3
    }, {
        location: 'trailingFollow',
        reg: "" + regs.leadingAll + regs.follow1Only + "[" + graphemes.cTrailing + "]",
        charNbr: 3
    }, {
        location: 'onlyFollow',
        reg: "" + regs.leadingAll + regs.follow1Only,
        charNbr: 2
    }
];
exports.phonemes = phonemes;
//# sourceMappingURL=phonemes.js.map