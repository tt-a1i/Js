
function strLongestLen(s) {
  const map = new Map();
  let start = 0, maxLen = 0;
  let maxSubstring = '';

  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      start = Math.max(start, map.get(s[i]) + 1);
    }
    map.set(s[i], i);
    
    if (i - start + 1 > maxLen) {
      maxLen = i - start + 1;
      maxSubstring = s.substring(start, i + 1);
    }
  }

  return maxSubstring;
}
console.log(strLongestLen("abcabcbb")); // 应该输出 3
console.log(strLongestLen("bbbbb")); // 应该输出 1
console.log(strLongestLen("pwwkew")); // 应该输出 3