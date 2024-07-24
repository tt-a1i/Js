function strLongestLen(s){
  const map = new Map()
  let start = 0, maxLen = 0;
  for(let i = 0; i < s.length; i++){
    let c = s[i];
    if(map.has(c)){
      start = Math.max(start, map.get(c) + 1)
    }
    map.set(c, i)
    maxLen = Math.max(maxLen, i - start + 1)
  }
  return maxLen
}
console.log(strLongestLen("abcabcbb")); // 应该输出 3
console.log(strLongestLen("bbbbb")); // 应该输出 1
console.log(strLongestLen("pwwkew")); // 应该输出 3