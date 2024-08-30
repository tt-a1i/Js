function log() {
	console.log('a')
}
const debounceFn = debounce(log, 350)//防抖函数

for(let i = 1; i <= 10; i++){
	setTimeout(debounceFn, i * 100)
}
