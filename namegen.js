const prefixes = [
    "Glo", "Zar", "Fla", "Kri", "Dro", "Quo", "Vor", "Myn", "Thra", "Bliz",
    "Ska", "Bru", "Cha", "Gra", "Twi", "Vex", "Sli", "Xyl", "Pha", "Nix"
];
const roots = [
    "mora", "kran", "zula", "vexis", "dara", "glon", "phyra", "tano", "squar", "niris",
    "blorn", "garn", "trina", "flyn", "mikon", "trax", "vryn", "droth", "kynar", "lyric"
];
const suffixes = [
    "oid", "ith", "ark", "on", "ar", "us", "an", "is", "oth", "ix",
    "ess", "or", "ium", "ack", "arok", "ul", "eth", "en", "ath", "ixis"
];

function generateName() {
    const prefix = pickRandom(prefixes);
    const root = pickRandom(roots);
    const suffix = pickRandom(suffixes);
    const creatureName = prefix + root + suffix;
    return creatureName;
}