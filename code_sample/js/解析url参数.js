function parseQueryParams(url) {
  const params = new URL(url).searchParams;
  const result = {};
  for (const key of params.keys()) {
    const values = params.getAll(key);
    result[key] = values.length > 1 ? values : values[0];
  }
  return result;
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