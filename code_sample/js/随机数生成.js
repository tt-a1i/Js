function getRandomNumber(min, max) {
  /*
	Math.random()：生成一个0到1之间的随机浮点数（不包括1）。
	Math.random() * (max - min + 1)：将随机数的范围扩大到0到(max - min + 1)之间。
	Math.floor(...)：对随机数进行向下取整，得到一个0到(max - min)之间的整数。
	+ min：将取整后的结果加上min，使得最终结果在min到max之间（包括min和max）。
	*/
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 示例用法
let randomNum = getRandomNumber(1, 10);
console.log(randomNum); // 输出 1 到 10 之间的随机数