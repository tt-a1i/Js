function longestNoRepeatSubStr(s){
    const map = new Map()
    let res = '', start = 0;
    for(let i = 0; i < s.length; i++){
        const c = s[i]
        if(map.has(c)){
            start = Math.max(start + 1, map.get(c))
        }
        map.set(c, i)
        if(i - start > res.length){
            res = s.slice(start, i + 1)
        }
    }
    return res
}