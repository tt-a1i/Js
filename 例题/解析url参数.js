function parseQueryParams(url){
  const urlObj = new URL(url)
  const searchParams = urlObj.searchParams
  const params = {}
  for(let [key, value] of searchParams){
    value = decodeURIComponent(value)
    if(params[key]){
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
// 测试用例 1: 基本 URL 参数
console.log(parseQueryParams('https://example.com?name=John&age=30'));

// 测试用例 2: 包含重复键的 URL
console.log(parseQueryParams('https://example.com?fruit=apple&fruit=banana'));

// 测试用例 3: 包含编码字符的 URL
console.log(parseQueryParams('https://example.com?message=Hello%20World'));

// 测试用例 4: 复杂 URL with 多种参数类型
console.log(parseQueryParams('https://example.com?id=123&name=Alice&tags=js&tags=html&search=query%20string'));

// 测试用例 5: 没有查询参数的 URL
console.log(parseQueryParams('https://example.com'));