function strLongestLen(s){
    const map = new Map()
    let start = 0, maxLength = 0
    for(let end = 0; end < s.length; end++){
        if(map.has(s[end])){
            //abba
            start = Math.max(start, map.get(s[end]) + 1)
        }
        map.set(s[end], end)
        maxLength = Math.max(maxLength, end - start + 1)
    }
    return maxLength
}
console.log(strLongestLen("abcabcbb")); // 应该输出 3
console.log(strLongestLen("bbbbb")); // 应该输出 1
console.log(strLongestLen("pwwkew")); // 应该输出 3