"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphemes = {
    accents: '່້໊໋໌',
    authorizedAccents: '່້',
    phantoms: '\\u200B\\u2022\\s\.\,,\-',
    cLeading: 'ກຂຄງຈສຊຍດຕຖທນບປຜຝພຟມຢຣລວຫອຮໝໜ',
    cTrailing: 'ງກມນຍວດບ',
    cຫ: 'ຫ[ງຍນມລຼ]',
    cAmbiguousຫ: 'ຫວ',
    cAmbiguousຂວຄວ: 'ຂວ|ຄວ',
    vFollow: 'ໍິີຶືຸູາ',
    vLeft: 'ແເໂ',
    vLeftSpecial: 'ໄໃ',
    vFollowComplement: 'ະ\\u0EB3'
};
exports.graphemes = graphemes;
var preRegs = {
    cSpecial: "(" + graphemes.cAmbiguousຂວຄວ + "|" + graphemes.cຫ + ")"
};
var regs = {
    boundary: "(?![" + graphemes.vFollow + graphemes.vFollowComplement + "\u0EBD\u0EB1\u0EBB])",
    leadingAll: "(" + preRegs.cSpecial + "|[" + graphemes.cLeading + "])",
    follow1Only: "[" + graphemes.vFollow + graphemes.vFollowComplement + "]",
    accents: "[" + graphemes.authorizedAccents + "]"
};
exports.regs = regs;
var regInstances = {
    removables: new RegExp("[" + graphemes.phantoms + "]+", 'g'),
    specialຫ: new RegExp("" + graphemes.cຫ),
    ambiguousຫ: new RegExp("" + graphemes.cAmbiguousຫ),
    ambiguousຂວຄວ: new RegExp("(" + graphemes.cAmbiguousຂວຄວ + ")"),
    disambiguatedຫວ: new RegExp(graphemes.cAmbiguousຫ + "[" + graphemes.cTrailing + "]" + regs.boundary),
    disambiguatedຂວຄວ: new RegExp("(" + graphemes.cAmbiguousຂວຄວ + ")[" + graphemes.cTrailing + "]" + regs.boundary),
    cAlone: new RegExp("([" + graphemes.cLeading + "]{2,})", 'g'),
    cSpecial: new RegExp("" + preRegs.cSpecial),
    accents: new RegExp("" + regs.accents, 'g')
};
exports.regInstances = regInstances;
var phonemes = [
    {
        location: 'onlyFollow3',
        reg: "" + regs.leadingAll + regs.accents + "?\u0EBB" + regs.accents + "?\u0EA7" + regs.accents + "?\u0EB0" + regs.accents + "?",
        charNbr: 4,
        noAccent: regs.leadingAll + "\u0EBB\u0EA7\u0EB0"
    },
    {
        location: 'trailingFollow2',
        reg: "" + regs.leadingAll + regs.accents + "?\u0EB1[\u0EBD\u0EAD\u0EA7]" + regs.accents + "?[" + graphemes.cTrailing + "]",
        charNbr: 4,
        noAccent: regs.leadingAll + "\u0EB1[\u0EBD\u0EAD\u0EA7][" + graphemes.cTrailing + "]"
    },
    {
        location: 'onlyFollow2',
        reg: "" + regs.leadingAll + regs.accents + "?(\u0ECD" + regs.accents + "?\u0EB2|\u0EBB" + regs.accents + "?\u0EA7)" + regs.accents + "?",
        charNbr: 3,
        noAccent: regs.leadingAll + "(\u0ECD\u0EB2|\u0EBB\u0EA7)"
    },
    {
        location: 'specialLeftFollow2',
        reg: "\u0EC0" + regs.leadingAll + regs.accents + "?\u0EB1\u0E8D" + regs.accents + "?",
        charNbr: 4,
        noAccent: "\u0EC0" + regs.leadingAll + "\u0EB1\u0E8D"
    },
    {
        location: 'trailingLeftFollow2',
        reg: "\u0EC0" + regs.leadingAll + regs.accents + "?([\u0EB6|\u0EB7]" + regs.accents + "?\u0EAD)" + regs.accents + "?[" + graphemes.cTrailing + "]",
        charNbr: 4,
        noAccent: "\u0EC0" + regs.leadingAll + "([\u0EB6|\u0EB7]\u0EAD)[" + graphemes.cTrailing + "]"
    },
    {
        location: 'onlyLeftFollow2',
        reg: "\u0EC0" + regs.leadingAll + regs.accents + "?([\u0EB6|\u0EB7]" + regs.accents + "?\u0EAD|\u0EBB" + regs.accents + "?\u0EB2|\u0EB2\u0EB0)" + regs.accents + "?",
        charNbr: 4,
        noAccent: "\u0EC0" + regs.leadingAll + "([\u0EB6|\u0EB7]\u0EAD|\u0EBB\u0EB2|\u0EB2\u0EB0)"
    }, {
        location: 'specialLeftFollow',
        reg: "\u0EC0" + regs.leadingAll + regs.accents + "?\u0E8D" + regs.accents + "?",
        charNbr: 3,
        noAccent: "\u0EC0" + regs.leadingAll + "\u0E8D"
    }, {
        location: 'trailingLeftFollow',
        reg: "(\u0EC0" + regs.leadingAll + regs.accents + "?[\u0EB4\u0EB5\u0EB1]|\u0EC1" + regs.leadingAll + "\u0EB1)" + regs.accents + "?[" + graphemes.cTrailing + "]",
        charNbr: 4,
        noAccent: "(\u0EC0" + regs.leadingAll + "[\u0EB4\u0EB5\u0EB1]|\u0EC1" + regs.leadingAll + "\u0EB1)[" + graphemes.cTrailing + "]"
    }, {
        location: 'onlyLeftFollow',
        reg: "(\u0EC0" + regs.leadingAll + regs.accents + "?[\u0EB4\u0EB5]" + regs.accents + "?|[" + graphemes.vLeft + "]" + regs.leadingAll + regs.accents + "?\u0EB0" + regs.accents + "?)",
        charNbr: 3,
        noAccent: "(\u0EC0" + regs.leadingAll + "[\u0EB4\u0EB5]|[" + graphemes.vLeft + "]" + regs.leadingAll + "\u0EB0)"
    }, {
        location: 'trailingLeft',
        reg: "[" + graphemes.vLeft + "]" + regs.leadingAll + regs.accents + "?[" + graphemes.cTrailing + "]",
        charNbr: 3,
        noAccent: "[" + graphemes.vLeft + "]" + regs.leadingAll + "[" + graphemes.cTrailing + "]"
    }, {
        location: 'onlyLeft',
        reg: "[" + graphemes.vLeft + graphemes.vLeftSpecial + "]" + regs.leadingAll + regs.accents + "?",
        charNbr: 2,
        noAccent: "[" + graphemes.vLeft + graphemes.vLeftSpecial + "]" + regs.leadingAll
    }, {
        location: 'trailingFollow1',
        reg: "" + regs.leadingAll + regs.accents + "?[\u0EBD\u0EAD\u0EB1\u0EBB\u0EA7]" + regs.accents + "?[" + graphemes.cTrailing + "]",
        charNbr: 3,
        noAccent: regs.leadingAll + "[\u0EBD\u0EAD\u0EB1\u0EBB\u0EA7][" + graphemes.cTrailing + "]"
    }, {
        location: 'trailingFollow',
        reg: "" + regs.leadingAll + regs.accents + "?" + regs.follow1Only + regs.accents + "?[" + graphemes.cTrailing + "]",
        charNbr: 3,
        noAccent: "" + regs.leadingAll + regs.follow1Only + "[" + graphemes.cTrailing + "]"
    }, {
        location: 'onlyFollow',
        reg: "" + regs.leadingAll + regs.accents + "?" + regs.follow1Only + regs.accents + "?",
        charNbr: 2,
        noAccent: "" + regs.leadingAll + regs.follow1Only
    }
];
exports.phonemes = phonemes;
//# sourceMappingURL=phonemes.js.map