async function fetchWithTimeout(url, options = {}, timeout = 5000){
    const controller = new AbortController()
    const signal = controller.signal

    const timeoutId = setTimeout(() => {
        controller.abort()
    }, timeout)

    try{
        const response = await fetch(url, {...options, signal})
        clearTimeout(timeoutId)
        if(!response.ok){
            throw new Error(`请求失败, 状态码: ${response.status}`)
        }
        return await response.json()
    }catch(error){
        if(error.name === 'AbortController'){
            throw new Error('请求超时')
        }else{
            throw error
        }
    }
}

fetchWithTimeout('https://api.example.com/data', {}, 5000)
    .then(data => console.log('请求成功', data))
    .catch(error => console.error('请求失败', error.message));