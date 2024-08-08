function countDOMElements() {
    const elementCounts = {};

    function traverse(element) {
        const tagName = element.tagName.toLowerCase();

        elementCounts[tagName] = (elementCounts[tagName] || 0) + 1;

        for (let child of element.children) {
            traverse(child);
        }
    }

    traverse(document.body);

    elementCounts['html'] = 1;
    elementCounts['head'] = 1;

    return elementCounts;
}

// 使用函数并打印结果
console.log(countDOMElements())