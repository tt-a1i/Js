// rem.js

// 设置根字体大小
function setRem() {
    const baseSize = 16; // 默认根字体大小为16px
    const screenWidth = window.innerWidth; // 获取当前视口宽度
    const remSize = screenWidth / 375 * baseSize; // 假设设计稿宽度为375px
    document.documentElement.style.fontSize = `${remSize}px`; // 设置根字体大小
}

// 初始化 rem 设置
setRem();

// 监听窗口大小变化
window.addEventListener('resize', setRem);

// 转换 px 为 rem
function pxToRem(px) {
    const baseSize = 16; // 默认根字体大小为16px
    return `${px / baseSize}rem`;
}

// 示例：使用 pxToRem 函数
console.log(pxToRem(32)); // 输出 "2rem"
