function longestPalindrome(s) {
	let start = 0;
	let maxLength = 1;
	function expandAroundCenter(left, right) {
		while (left >= 0 && right < s.length && s[left] === s[right]) {
			const currentLen = right - left + 1;
			if (currentLen > maxLength) {
				start = left;
				maxLength = currentLen;
			}
			left--;
			right++;
		}
	}
	for (let i = 0; i < s.length; i++) {
    expandAroundCenter(i, i)
    expandAroundCenter(i, i + 1)
  }
  return s.substring(start, start + maxLength)
}
console.log(longestPalindrome("babad")); // 输出 "bab" 或 "aba"
console.log(longestPalindrome("cbbd"));  // 输出 "bb"
console.log(longestPalindrome("a"));     // 输出 "a"
console.log(longestPalindrome("ac"));    // 输出 "a"
