const handler = {
    get(target, property, receiver) {
        const value = Reflect.get(target, property, receiver);
        //如果属性值是对象，则为其创建一个新的 Proxy
        if (typeof value === 'object' && value !== null) {
            return new Proxy(value, handler);
        }
        return value;
    },
    set(target, property, value, receiver) {
        console.log(`Setting property "${property}" to "${value}"`);
        return Reflect.set(target, property, value, receiver);
    }
};
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
const proxiedObject = new Proxy(nestedObject, {
    get(target, property, receiver) {
        const value = Reflect.get(target, property, receiver);
        //如果属性值是对象，则为其创建一个新的 Proxy
        if (typeof value === 'object' && value !== null) {
            return new Proxy(value, handler);
        }
        return value;
    },
    set(target, property, value, receiver) {
        console.log(`Setting property "${property}" to "${value}"`);
        return Reflect.set(target, property, value, receiver);
    }
});

// 测试
console.log(proxiedObject.a); // 输出: 1
console.log(proxiedObject.b.c); // 输出: 2

proxiedObject.b.d.e = 4; // 输出: Setting property "e" to "4"