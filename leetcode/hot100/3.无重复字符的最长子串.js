var lengthOfLongestSubstring = function (s) {
    let arr = [], len = 0
    for(let i = 0; i < s.length; i++){
        if(!arr.includes(s[i])){
            arr.push(s[i])
        }else{
            len = Math.max(len, arr.length)
            while(arr.includes(s[i])) arr.shift()
            arr.push(s[i])
        }
    }
    return arr.length > len ? arr.length : len
}