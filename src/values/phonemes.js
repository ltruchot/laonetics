"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// exported graphemes
const graphemes = {
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
    vLikeConsonants: 'ອວ',
    vFollowComplement: 'ະ\\u0EB3',
};
const preRegs = {
    cSpecial: `(${graphemes.cຫ}|${graphemes.cຂ}|${graphemes.cຄ})`
};
// exported regs
const regs = {
    boundary: `(?![${graphemes.vFollow}${graphemes.vFollowComplement}ຽັົ])`,
    leadingAll: `(${preRegs.cSpecial}|[${graphemes.cLeading}])`,
    follow1Only: `[${graphemes.vFollow}${graphemes.vFollowComplement}]`
};
exports.regs = regs;
const regInstances = {
    removables: new RegExp(`[${graphemes.accents}${graphemes.phantoms}]`, 'gimu'),
    cSpecial: new RegExp(`${preRegs.cSpecial}`),
    cAlone: new RegExp(`([${graphemes.cLeading}]{2,})`, 'g')
};
exports.regInstances = regInstances;
// exported phonemes
const phonemes = [
    {
        location: 'onlyFollow3',
        reg: `${regs.leadingAll}ົວະ`,
        charNbr: 4
    },
    {
        location: 'trailingFollow2',
        reg: `${regs.leadingAll}ັ[ຽອ][${graphemes.cTrailing}]`,
        charNbr: 4
    },
    {
        location: 'onlyFollow2',
        reg: `${regs.leadingAll}(ໍາ|ັວ|ົວ)`,
        charNbr: 3
    },
    {
        location: 'specialLeftFollow2',
        reg: `ເ${regs.leadingAll}ັຍ`,
        charNbr: 4
    },
    {
        location: 'trailingLeftFollow2',
        reg: `ເ${regs.leadingAll}([ຶ|ື]ອ)[${graphemes.cTrailing}]`,
        charNbr: 4
    },
    {
        location: 'onlyLeftFollow2',
        reg: `ເ${regs.leadingAll}([ຶ|ື]ອ|ົາ|າະ)`,
        charNbr: 4
    }, {
        location: 'specialLeftFollow',
        reg: `ເ${regs.leadingAll}ຍ`,
        charNbr: 3
    }, {
        location: 'trailingLeftFollow',
        reg: `(ເ${regs.leadingAll}[ິີັ]|ແ${regs.leadingAll}ັ)[${graphemes.cTrailing}]`,
        charNbr: 4
    }, {
        location: 'onlyLeftFollow',
        reg: `(ເ${regs.leadingAll}[ິີະ]|ແ${regs.leadingAll}ະ)`,
        charNbr: 3
    }, {
        location: 'trailingLeft',
        reg: `[${graphemes.vLeft}]${regs.leadingAll}[${graphemes.cTrailing}]`,
        charNbr: 3
    }, {
        location: 'onlyLeft',
        reg: `[${graphemes.vLeft}${graphemes.vLeftSpecial}]${regs.leadingAll}`,
        charNbr: 2
    }, {
        location: 'trailingFollow1',
        reg: `${regs.leadingAll}[ຽອັົວ][${graphemes.cTrailing}]`,
        charNbr: 3
    }, {
        location: 'trailingFollow',
        reg: `${regs.leadingAll}${regs.follow1Only}[${graphemes.cTrailing}]`,
        charNbr: 3
    }, {
        location: 'onlyFollow',
        reg: `${regs.leadingAll}${regs.follow1Only}`,
        charNbr: 2
    }
];
exports.phonemes = phonemes;
//# sourceMappingURL=phonemes.js.map