function runMicroTask(fn) {
    if (typeof Promise === 'function') {
        Promise.resolve().then(fn)
        return
    }
    if (typeof MutationObserver === 'function') {
        const ob = new MutationObserver()
        const node = document.createTextNode('')
        ob.observe(node, {characterData: true})
        node.data = 1
        return;
    }
    if (process && typeof process.$nextTick === 'function') {
        process.$nextTick(fn)
        return;
    }
    if (typeof setImmediate === 'function') {
        setImmediate(fn)
        return;
    }
    setTimeout(fn)
}