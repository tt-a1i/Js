function longestPalindrome(s) {
    let start = 0, maxLen = 0

    function expandAroundCenter(l, r) {
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            const curLen = r - l + 1
            if (curLen > maxLen) {
                start = l
                maxLen = curLen
            }
            l--
            r++
        }
    }

    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i)
        expandAroundCenter(i, i + 1)
    }
    return s.substring(start, start + maxLen)
}

console.log(longestPalindrome("babad")); // 输出 "bab" 或 "aba"
console.log(longestPalindrome("cbbd")); // 输出 "bb"
console.log(longestPalindrome("a")); // 输出 "a"
console.log(longestPalindrome("ac")); // 输出 "a"