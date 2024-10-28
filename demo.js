const obj = { a: 1, b: 2, c: 3 };

// 定义一个不可枚举属性
Object.defineProperty(obj, "d", {
	value: 4,
	enumerable: false,
});

for(let key in obj){
    console.log(key, obj[key])
}

console.log('----------------------------------')
// 使用 Object.getOwnPropertyNames() 和 forEach
Object.getOwnPropertyNames(obj).forEach((key) => {
	console.log(`${key}: ${obj[key]}`);
});
