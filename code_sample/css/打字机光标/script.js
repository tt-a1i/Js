const text = "Hello, this is a typing effect!";
const typingTextElement = document.getElementById("typing-text");
const cursor = document.querySelector('.cursor')

let index = 0;

// 每隔100毫秒逐字显示
function typeText() {
	if (index < text.length) {
		typingTextElement.textContent += text[index];
		index++;
		setTimeout(typeText, 100); // 调整速度：100ms
	}else{
        // 移除光标类，并强制重绘
        cursor.classList.remove('cursor');
        cursor.style.display = 'none'; // 强制隐藏光标
    }
}

// 启动打字效果
typeText();
