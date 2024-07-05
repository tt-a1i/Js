var lengthOfLongestSubstring = function (s) {
	let arr = [],
		len = 0;
	for (let i = 0; i < s.length; i++) {
		if (!arr.includes(s[i])) {
			arr.push(s[i]);
		} else {
			len = Math.max(len, arr.length);
			while (arr.includes(s[i])) arr.shift();
			arr.push(s[i]);
		}
	}
	return arr.length > len ? arr.length : len;
};

var lengthOfLongestSubstring2 = function (s) {
	let str = "";
	let len = 0;
	for (let c of s) {
		if (!str.includes(c)) {
			str += c;
			if (str.length > len) len = str.length;
		} else {
			str = str.substring(str.indexOf(c) + 1) + c;
		}
	}
    return len
}; 
let s = "pwwkew"
console.log(lengthOfLongestSubstring(s));
console.log(lengthOfLongestSubstring2(s));
