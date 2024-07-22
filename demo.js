function parseQueryParams(url) {
  // 创建一个 URL 对象
  const urlObj = new URL(url);

  // 获取 URLSearchParams 对象
  const searchParams = urlObj.searchParams;

  // 创建一个对象来存储解析后的参数
  const params = {};

  // 遍历所有的查询参数
  for (let [key, value] of searchParams) {
    // 解码参数值（处理编码的字符，如 %20）
    value = decodeURIComponent(value);

    // 如果参数已经存在，将其转换为数组
    if (params.hasOwnProperty(key)) {
      if (!Array.isArray(params[key])) {
        params[key] = [params[key]];
      }
      params[key].push(value);
    } else {
      params[key] = value;
    }
  }

  return params;
}

// 使用示例
const url = "https://example.com/path?foo=bar%20baz&amp";
const queryParams = parseQueryParams(url);
console.log(queryParams);