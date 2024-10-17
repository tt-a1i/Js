function factorial(n) {
	const result = [1]; // 数组存储结果，初始为 1

	// 从 2 到 n，逐步相乘
	for (let i = 2; i <= n; i++) {
		multiply(result, i);
	}

	// 将数组结果拼接成字符串
	return result.reverse().join("");
}

// 逐位相乘，并处理进位
function multiply(result, num) {
	let carry = 0; // 进位

	// 遍历数组中的每一位，进行乘法运算
	for (let i = 0; i < result.length; i++) {
		const product = result[i] * num + carry;
		result[i] = product % 10; // 保留当前位
		carry = Math.floor(product / 10); // 更新进位
	}

	// 处理剩余的进位
	while (carry > 0) {
		result.push(carry % 10);
		carry = Math.floor(carry / 10);
	}
}

// 计算 10000 的阶乘
console.log(factorial(10000));
