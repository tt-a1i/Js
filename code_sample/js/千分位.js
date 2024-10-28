function formatNumber(num) {
	//不能处理小数版本
	if (num >= 1000) {
		return formatNumber(Math.floor(num / 1000)) + "," + (num % 1000);
	} else {
		return num;
	}
}
console.log(formatNumber(1234567));

function customToLocaleString(num) {
	let parts = num.toString().split("."); // 将整数部分和小数部分分开
	let integerPart = parts[0];
	let decimalPart = parts.length > 1 ? parts[1] : "";

	// 美式格式，以千位逗号分隔
	let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	if (decimalPart) {
		return formattedInteger + "." + decimalPart;
	} else {
		return formattedInteger;
	}
}
console.log(customToLocaleString(1234567.89)); // 输出: 1,234,567.89

const number = 12345678.9;
const formattedNumber = number.toLocaleString(); // 输出：12,345,678.9
console.log(formattedNumber);
