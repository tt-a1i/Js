function getRandomColor() {
    // 生成一个包含6个字符的十六进制数
    let color = Math.floor(Math.random() * 0xFFFFFF).toString(16);
    // 如果生成的颜色字符串长度不足6位，用0补齐
    return `#${color.padStart(6, '0')}`;
}

// 使用例子
console.log(getRandomColor());