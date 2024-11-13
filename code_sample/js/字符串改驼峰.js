function toLowerCamelCase(str) {
	// 使用正则表达式匹配所有的单词，并将每个单词的首字母转换为大写
	return str
	//全局匹配标志 /g 通常用于 match、replace 等方法，它会使得正则表达式在字符串中进行多次匹配，
	//而不是只匹配一次。但在 split 方法中，全局匹配标志 /g 是不必要的，
	//因为 split 方法会自动遍历整个字符串并进行分割。
		.split(/[\s-_]+/) // 按空格、下划线或连字符分割字符串
		.map((word, index) => {
			if (index === 0) {
				// 第一个单词保持原样（首字母小写）
				return word.toLowerCase();
			}
			// 后续单词首字母大写
			return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
		})
		.join(""); // 将单词重新组合成一个字符串
}

// 示例
console.log(toLowerCamelCase("hello world")); // 输出: helloWorld
console.log(toLowerCamelCase("user-name")); // 输出: userName
console.log(toLowerCamelCase("first_name")); // 输出: firstName
