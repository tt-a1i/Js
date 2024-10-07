function asyncOnce(cb) {
    const map = {}
    return (...args) => {
        return new Promise((resolve, reject) => {
            const key = JSON.stringify(args)
            if(!map[key]){
                map[key] = {
                    resolve: [],
                    reject: [],
                    isPending: false
                }
            }
            const state = map[key]
            state.resolve.push(resolve)
            state.reject.push(reject)
            if(state.isPending) return
            cb(...args)
                .then((res) => {
                    state.resolve.forEach((resolve) => resolve(res))
                })
                .catch((err) => {
                    state.reject.forEach((reject) => reject(err))
                })
                .finally(() => {
                    map[key] = null
                })
        });
    };
}
export { asyncOnce }