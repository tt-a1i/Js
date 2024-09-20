function longestPalindrome(s) {
	if (s.length < 2) return s;
	let maxLen = 1,
		start = 0;
	function expandAroundCeter(left, right) {
		while (left >= 0 && right < s.length && s[left] === s[right]) {
			if (right - left + 1 > maxLen) {
				maxLen = right - left + 1;
				start = left;
			}
			left--;
			right++;
		}
	}
	for (let i = 0; i < s.length; i++) {
		expandAroundCeter(i, i);
		expandAroundCeter(i, i + 1);
	}
	return s.substring(start, start + maxLen)
}
console.log(longestPalindrome("babad")); // 输出 "bab" 或 "aba"
console.log(longestPalindrome("cbbd")); // 输出 "bb"
console.log(longestPalindrome("a")); // 输出 "a"
console.log(longestPalindrome("ac")); // 输出 "a"
