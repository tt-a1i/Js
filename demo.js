function fetchWithTimeout(url, options = {}, timeout = 5000) {
	//const fetchPromise = fetch(url, options)
	const fetchPromise = new Promise((resolve, reject) => {
		setTimeout(() => {
            clearTimeout(timer)
			resolve({ data: "success" });
		}, 5000);
	});
    let timer = null
	const timeoutPromise = new Promise((_, reject) => {
		timer = setTimeout(() => {
			reject("request timeout");
		}, timeout);
	});

	return Promise.race([fetchPromise, timeoutPromise]);
}
fetchWithTimeout("http://example.com/data", {}, 4000)
	.then((res) => console.log(`request success: ${JSON.stringify(res)}`))
	.catch((err) => console.log(`request failed: ${err}`));
