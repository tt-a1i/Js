function func(num) {
	let arr = String(num).split("");
	let res = "";
	arr.forEach((item, index) => {
		res += item;
		if ((index + 1) % 3 === 0) {
			res += ",";
		}
	});
	return res;
}
console.log(func(123456));

