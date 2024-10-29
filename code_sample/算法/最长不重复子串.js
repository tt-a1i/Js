function lengthOfLongestSubstring(str) {
	let currStr = [],
		maxStr = [];
    for(let c of str){
        if(currStr.includes(c)){
            maxStr = maxStr.length > currStr ? maxStr : currStr
            while(currStr.includes(c)) currStr = currStr.slice(1)
        }
        currStr.push(c)
    }
    return maxStr.length > currStr.length ? maxStr : currStr
}

let str = "pwwkew"
console.log(lengthOfLongestSubstring(str).join(''))
