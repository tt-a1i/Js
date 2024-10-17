window.addEventListener('click', () => {
	Promise.resolve().then(() => {
		setTimeout(() => {
			console.log(1);
		})
	})
})
window.addEventListener('click', () => {
	setTimeout(() => {
		Promise.resolve().then(() => {
			console.log(2)
		})
	})
})