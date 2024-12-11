function render(template, data) {
    return template.replace(/{\s*([^}]+)\s*}/g, (match, key) => {
        const trimmedKey = key.trim();
        console.log('Captured key:', trimmedKey); // 调试用
        return trimmedKey in data ? data[trimmedKey] : match;
    });
}

const result = render('Welcome to { companyName }', { companyName: 'FutureGene' });
console.log(result); // 应输出: Welcome to FutureGene