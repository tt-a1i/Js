const text =
	"Hello, this is a typing effect!Hello, this is a typing effect!Hello, this is a typing effect!Hello, this is a typing effect!Hello, this is a typing effect!";
const typingTextElement = document.getElementById("typing-text");

let index = 0;

// 每隔100毫秒逐字显示
function typeText() {
	if (index < text.length) {
		typingTextElement.textContent += text[index];
		index++;
		setTimeout(typeText, 100); // 调整速度：100ms
	} else {
		// 动态添加样式以隐藏伪元素
		const style = document.createElement("style");
		style.innerHTML = `
			#typing-text::after {
				content: none;
			}`;
		document.head.appendChild(style);
	}
}

// 启动打字效果
typeText();
