const obj = {
    a: {
        x: {
            y: 'tom'
        },
        b: {
            c: {
                d: 'jerry'
            }
        }
    }
}
function func(obj, str) {
	let res = null;
	let s = str.split(',')
	for(let i = 0; i < s.length; i++){
		res = res ? res[s[i]] : obj[s[i]]
	}
	return res
}
console.log(func(obj, 'a,x,y')) // 输出'tom'
console.log(func(obj, 'a,b,c,d')) // 输出'jerry'
