function func(fn, time, delay){
	let timer = null;
	function recurve(n = 0){
		if(n >= time) {
			clearTimeout(timer)
			return;
		}
		clearTimeout(timer)
		timer = setTimeout(() => {
			fn()
			recurve(n + 1)
		} , delay)
	}
	return recurve
}
const log = () => console.log(1)
let fn = func(log, 3, 1000)
fn()
