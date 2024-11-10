function chineseToArabic(chineseNum) {
    const cnNums = { "零": 0, "一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6, "七": 7, "八": 8, "九": 9 };
    const cnUnits = { "十": 10, "百": 100, "千": 1000, "万": 10000, "亿": 100000000 };
    let result = 0;
    let tempNum = 0; // 暂存的数字

    for (let char of chineseNum) {
        if (cnNums[char] !== undefined) {
            tempNum = cnNums[char]; // 读取数字
        } else if (cnUnits[char] !== undefined) {
            tempNum = tempNum || 1; // 如果单位前没有数字，视为 1
            result += tempNum * cnUnits[char];
            tempNum = 0; // 重置暂存数字
        } else {
            throw new Error("无效的字符");
        }
    }

    return result + tempNum;
}

console.log(chineseToArabic("一百二十三")); // 输出: 123
console.log(chineseToArabic("二千零一")); // 输出: 2001
