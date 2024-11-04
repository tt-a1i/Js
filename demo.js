function limitConcurrency(requests, limit){
	let activeCount = 0
	let currIdx = 0
	const results = []
	return new Promise(resolve => {
		function next(){
			if(activeCount === 0 && currIdx === requests.length){
				resolve(results)
			}
			while(activeCount < limit && currIdx < requests.length){
				activeCount++
				const request = requests[currIdx++]
				request()
					.then(res => results.push(res))
					.catch(err => results.push(err))
					.finally(() => {
						activeCount--
						next()
					})
			}
		}
		next()
	})
}

const request = (i) => () => new Promise(resolve => {
	console.log(`Request ${i} started`)
	setTimeout(() => {
		console.log(`Request ${i} completed`)
		resolve(`Request ${i} completed`)
	}, Math.random() * 1000);
})

const requests = Array.from({length: 10}, (_, i) => request(i))
limitConcurrency(requests, 2)
	.then(res => console.log(`Requests all completed`, res))