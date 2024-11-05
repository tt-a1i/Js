function largestNumber(str) {
    const strNums = str.map(String)
    strNums.sort((a, b) => (b + a).localeCompare(a + b))
    console.log(strNums)
    if (strNums[0] === 0) return '0'
    return strNums.join('')
}

let nums = [3, 30, 34, 5, 9];
console.log(largestNumber(nums)); // 输出 "9534330"
console.log(largestNumber([0, 0, 0]))