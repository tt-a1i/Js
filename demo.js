
setTimeout(() => {
	console.log(3);
}, 0);
Promise.resolve().then(() => {
	console.log(1);
	Promise.resolve().then(() => {
		console.log(2);
	});
});
console.log(4)
