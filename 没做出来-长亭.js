const menu = [
    {
        zh: '第一章',
        en: 'cate 1',
        children: [
            {
                zh: 'test',
                en: 'cate 1.1',
            },
        ],
    },
];
function fn(target, list) {
    for (let item of list) {
        console.log(item.zh, item.zh === target)
        if (item.zh === target) {
            return item.en;
        } else if (!item.children) {
            continue;
        } else {
            return fn(target, item.children);
        }
    }
}
console.log(fn('test',menu))