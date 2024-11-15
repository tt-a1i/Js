function parseCookies(cookieString) {
	const cookies = {}; // 初始化一个空对象来存储解析后的键值对

	if (!cookieString) return cookies;

	const cookieArray = cookieString.split(";");
	for (let i = 0; i < cookieArray.length; i++) {
		let cookiePair = cookieArray[i].trim();

		let keyValue = cookiePair.split("=");

		let key = keyValue[0];
		let value = keyValue.length > 1 ? keyValue.slice(1).join("=") : "";

		cookies[key] = decodeURIComponent(value);
	}

	return cookies;
}

// 示例使用
const cookieString =
	"username=JohnDoe; age=25; city=NewYork; hobby=coding=programming";
const parsedCookies = parseCookies(cookieString);
console.log(parsedCookies);
// 输出: { username: 'JohnDoe', age: '25', city: 'NewYork', hobby: 'coding=programming' }
