/*
初始猜测：从一个初始值开始（通常可以是 n/2）。
迭代计算：使用公式 x_{n+1} = (x_n + n / x_n) / 2 进行迭代，直到达到所需的精度。
格式化结果：确保结果精确到两位小数。*/
function sqrtToTwoDecimalPlaces(num) {
    if (typeof num !== 'number' || num < 0) {
        throw new Error('Invalid input: must be a non-negative number');
    }

    // 牛顿迭代法初始值
    let x = num / 2;
    const tolerance = 1e-9;  // 设定一个精度，用于判断迭代何时停止

    while (true) {
        let x_next = (x + num / x) / 2;

        if (Math.abs(x - x_next) < tolerance) {
            break;
        }
        
        x = x_next;
    }

    // 将结果精确到两位小数
    return x.toFixed(2);
}

// 示例
const input = 2.56;
const result = sqrtToTwoDecimalPlaces(input);
console.log(`平方根：${result}`);  // 输出：平方根：1.60