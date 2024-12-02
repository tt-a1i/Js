function requestPool(limit) {
    let activeCount = 0;
    const queue = [];
    const next = () => {
        if (queue.length === 0 || activeCount >= limit) {
            return;
        }
        activeCount++;
        const { url, resolve, reject } = queue.shift();
        fetch(url)
            .then((res) => resolve(res))
            .catch((err) => reject(err))
            .finally(() => {
                activeCount--;
                next();
            });
    };
    return function(url){
        return new Promise((resolve, reject) => {
            queue.push({url, resolve, reject})
            next()
        })
    }
}
const request = requestPool(limit);

request(url1).then().catch();
request(url2).then().catch();