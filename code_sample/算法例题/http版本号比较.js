function compareHTTPVersions(v1, v2){
    const edition1 = v1.split('/')[1]
    const edition2 = v2.split('/')[1]
    return +edition1 > +edition2 ? 1 : +edition1 == +edition2 ? 0 : -1
}
// 使用示例
console.log(compareHTTPVersions('HTTP/1.1', 'HTTP/1.0')); // 1
console.log(compareHTTPVersions('HTTP/2.0', 'HTTP/1.1')); // 1
console.log(compareHTTPVersions('HTTP/1.1', 'HTTP/1.1')); // 0
console.log(compareHTTPVersions('HTTP/3', 'HTTP/2.0'));   // 1
console.log(compareHTTPVersions('HTTP/0.9', 'HTTP/1.0')); // -1