//递归
function flat1(arr, depth = 1) {
	return depth > 0
		? arr.reduce(
				(acc, cur) =>
					acc.concat(Array.isArray(cur) ? flat1(cur, depth - 1) : cur),
				[]
		  )
		: arr.slice();
}
let arr = [1, 2, [3, 4, [5]]];
console.log(flat1(arr, 1));

//循环
function flat2(arr, depth = 1) {
	if (depth <= 0) {
		return arr.slice();
	}
	const res = [],
		stack = [...arr.map((item) => [item, depth])];
    while(stack.length > 0){
        const [top, depth] = stack.pop()
        if(depth > 0 && Array.isArray(top)){
            stack.push(...top.map(item => [item, depth-1]))
        }else{
            res.push(top)
        }
    }
    return res.reverse()
}
console.log(flat2(arr, 2))
