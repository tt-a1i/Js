function maxLenSubStr(s){
	const map = new Map()
	let start = 0, maxLen = 0
	for(let end = 0; end < s.length; end++){
		if(map.has(s[end])) start = Math.max(start, map.get(s[end]) + 1)
		else{
			map.set(s[end], end)
			maxLen = Math.max(maxLen, end - start + 1)
		}
	}
	return maxLen
}
console.log(maxLenSubStr('acdaa'));