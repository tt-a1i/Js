const pendingRequests = new Map();

function mergeAPICalls(url, options = {}) {
    const key = `${url}:${JSON.stringify(options)}`;

    if (pendingRequests.has(key)) {
        return pendingRequests.get(key);
    }

    const fetchPromise = fetch(url, options)
        .then(response => response.json())
        .finally(() => {
            pendingRequests.delete(key);
        });

    pendingRequests.set(key, fetchPromise);
    return fetchPromise;
}