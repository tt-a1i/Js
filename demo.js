function parseQueryParams(url){
    const urlObj = new URL(url)
    const searchParams = urlObj.searchParams
    const params = {}
    for(let [key, value] of searchParams){
        value = decodeURIComponent(value)
        if(params.hasOwnProperty(key)){
            if(!Array.isArray(params[key])){
                params[key] = [params[key]]
            }
            params[key].push(value)
        }else{
            params[key] = value
        }
    }
    return params
}
console.log("测试 1: 基本参数");
console.log(parseQueryParams("https://example.com/path?name=John&age=30"));

console.log("测试 2: 重复参数");
console.log(parseQueryParams("https://example.com/search?tag=javascript&tag=programming"));

console.log("测试 3: 编码参数");
console.log(parseQueryParams("https://example.com/profile?name=John%20Doe&city=New%20York"));

console.log("测试 4: 无参数");
console.log(parseQueryParams("https://example.com/page"));