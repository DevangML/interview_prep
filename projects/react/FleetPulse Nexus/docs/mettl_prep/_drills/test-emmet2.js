const abbr = 'Object.keys()';
const isLikely = /^[.#a-zA-Z]/.test(abbr) && (/[#.>+*\[{]/.test(abbr) || /^(div|span|button|input|label|p|h[1-6]|section|header|footer|nav|aside|main|article|ul|ol|li|table|form|select|option|textarea|img|a)$/i.test(abbr));
console.log(isLikely);
