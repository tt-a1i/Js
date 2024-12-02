function get(obj, ...paths) {
    const res = [];
    paths.forEach((path) => {
        let keys = [],
            currentKey = '';
        for (let char of path) {
            if (char === '.') {
                if (currentKey) {
                    keys.push(currentKey);
                    currentKey = '';
                }
            } else if (char === '[') {
                if (currentKey) {
                    keys.push(currentKey);
                    currentKey = '';
                }
            } else if ((char === ']')) {
                if (currentKey) {
                    keys.push(currentKey);
                    currentKey = '';
                }
            }else{
                currentKey += char;
            }
        }
        if (currentKey) {
            keys.push(currentKey);
        }
        let current = obj;
        for (let key of keys) {
            if (current === undefined || current === null) {
                current = undefined;
                break;
            }
            current = current[key];
        }
        res.push(current);
    });
    return res;
}
const obj = {
    layer1: {
        layer2: {
            val: 1,
        },
    },
    target: [1, 2, { ok: 1 }],
};

console.log(get(obj, 'layer1.layer2.val', 'target[0]', 'target[2].ok')); // 输出: [1, 1, 1]
