function countDOMElements() {
    // 初始化一个对象来存储元素计数
    const elementCounts = {};

    // 递归函数来遍历 DOM 树
    function traverse(element) {
        // 获取元素的标签名（转换为小写以保持一致性）
        const tagName = element.tagName.toLowerCase();

        // 更新计数
        elementCounts[tagName] = (elementCounts[tagName] || 0) + 1;

        // 遍历所有子元素
        for (let child of element.children) {
            traverse(child);
        }
    }

    // 从 document.body 开始遍历
    traverse(document.body);

    // 特殊处理：手动添加 <html> 和 <head> 元素的计数
    elementCounts['html'] = 1;
    elementCounts['head'] = 1;

    return elementCounts;
}

// 使用函数并打印结果
console.log(countDOMElements());