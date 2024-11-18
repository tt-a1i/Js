function longestSubstring(s) {
	const map = new Map();
	let start = 0,
		maxStr = "";
	for (let i = 0; i < s.length; i++) {
		const c = s[i];
		if (map.has(c)) {
			start = Math.max(start, map.get(c) + 1);
		}
		map.set(c, i);
		if (i - start + 1 > maxStr.length) {
			maxStr = s.slice(start, i + 1);
		}
	}
	return maxStr;
}
/*
start = Math.max(map.get(c) + 1, start) 这一行的目的是确保 start 始终指向当前无重复字符子串的起始位置。让我们详细解释一下为什么需要使用 Math.max 函数。
考虑以下两种情况：

map.get(c) + 1 大于 start：

这意味着当前字符 c 上一次出现的位置在 start 之后。我们需要将 start 更新为 map.get(c) + 1，以跳过这个重复的字符。

例如，假设当前字符串是 "abba"，当我们遍历到第二个 b 时，start 是 0，map.get('b') 是 1。此时，map.get('b') + 1 是 2，大于 start，所以我们需要将 start 更新为 2。

map.get(c) + 1 小于或等于 start：

这意味着当前字符 c 上一次出现的位置在 start 之前或等于 start。此时，start 不需要更新，因为它已经在正确的位置。

例如，假设当前字符串是 "abba"，当我们遍历到第二个 a 时，start 是 2，map.get('a') 是 0。此时，map.get('a') + 1 是 1，小于 start，所以我们不需要更新 start。
*/
// 测试用例 1: 基本测试
console.log(longestSubstring("abcabcbb")); // 预期输出: "abc"

// 测试用例 2: 所有字符唯一
console.log(longestSubstring("abcdef")); // 预期输出: "abcdef"

// 测试用例 3: 所有字符相同
console.log(longestSubstring("aaaaaa")); // 预期输出: "a"

// 测试用例 4: 末尾有重复字符
console.log(longestSubstring("abccba")); // 预期输出: "abc"

// 测试用例 5: 空字符串
console.log(longestSubstring("")); // 预期输出: ""

// 测试用例 6: 单字符字符串
console.log(longestSubstring("a")); // 预期输出: "a"

// 测试用例 7: 长字符串
console.log(longestSubstring("pwwkew")); // 预期输出: "wke"

// 测试用例 8: 字符串中间有重复字符
console.log(longestSubstring("dvdf")); // 预期输出: "vdf"

// 测试用例 9: 字符串中有空格
console.log(longestSubstring("a b c a b c")); // 预期输出: "a b"

// 测试用例 10: 字符串中有特殊字符
console.log(longestSubstring("a!@#a!@#")); // 预期输出: "a!@#"
