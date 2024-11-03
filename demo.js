function fetchWithTimeout(url, options = {}, timeout = 5000) {
    //const fetchPromise = fetch(url, options);
    //模拟超时
	const fetchPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ok: true, json: () => Promise.resolve({data: 'success'})})
        }, 4000) 
    });

	const timeoutPromise = new Promise((_, reject) => {
		setTimeout(() => {
			reject(new Error("Request timeout"));
		}, timeout);
	});

	return Promise.race([fetchPromise, timeoutPromise])
		.then((res) => {
			if (!res.ok) {
				throw new Error(`request failed with status ${res.status}`);
			}
			return res.json();
		})
		.catch((err) => {
			console.log(`Error: ${err.message}`);
			throw err;
		});
}

fetchWithTimeout("https://api.example.com/data", {}, 5000) // Adjusted timeout to 5000ms
	.then((data) => {
		console.log("Request succeeded:", data);
	})
	.catch((error) => {
		console.error("Request failed:", error.message);
	});
