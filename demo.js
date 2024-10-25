// 递归地创建 Proxy 来监听嵌套对象
function createDeepProxy(target, handler) {
    if (typeof target === 'object' && target !== null) {
        for (let key in target) {
            if (typeof target[key] === 'object' && target[key] !== null) {
                target[key] = createDeepProxy(target[key], handler);
            }
        }
    }
    return new Proxy(target, handler);
}

// 处理程序对象
const handler = {
    get(target, property, receiver) {
        console.log(`Getting property "${property}"`);
        return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
        console.log(`Setting property "${property}" to "${value}"`);
        return Reflect.set(target, property, value, receiver);
    }
};

// 创建一个嵌套对象
const nestedObject = {
    a: 1,
    b: {
        c: 2,
        d: {
            e: 3
        }
    }
};

// 使用 Proxy 监听嵌套对象
const proxiedObject = createDeepProxy(nestedObject, handler);

// 测试
console.log(proxiedObject.a); // 输出: Getting property "a"
console.log(proxiedObject.b.c); // 输出: Getting property "b", Getting property "c"

proxiedObject.b.d.e = 4; // 输出: Setting property "e" to "4"