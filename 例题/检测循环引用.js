function detectCircularReference(obj) {
	const seen = new WeakSet();

	function detect(value) {
		if (typeof value !== "object" || value === null) {
			return false;
		}

		if (seen.has(value)) {
			return true; // 发现循环引用
		}

		seen.add(value);

		for (let key in value) {
            /*
            Object.prototype.hasOwnProperty
            这是 JavaScript 中 Object 原型上的一个方法。
            它用于判断一个对象是否包含特定的属性作为其自身属性（而不是继承的属性）。
            返回一个布尔值：如果对象有该自有属性则返回 true，否则返回 false。
            .call 方法

            .call 是 JavaScript 中函数对象的一个方法。
            它允许你调用一个函数，并明确指定函数内 this 的值。
            语法：func.call(thisArg, arg1, arg2, ...)
            thisArg: 在函数运行时使用的 this 值
            arg1, arg2, ...: 传递给函数的参数列表
            为什么使用 call

            安全性：直接使用 value.hasOwnProperty(key) 可能不安全，因为：
            value 可能不继承自 Object.prototype
            value 可能有自己的 hasOwnProperty 方法覆盖了原型上的方法
            通过 call，我们确保使用的是 Object.prototype 上原始的 hasOwnProperty 方法
            */
            /*
            改为 Object.prototype.hasOwnProperty 而不使用 .call 方法可能会导致所有输出都为 false 的原因主要有以下几点：
            上下文问题： 当你直接使用 Object.prototype.hasOwnProperty 而不是 .call 方法时，hasOwnProperty 方法中的 this 不再指向被检查的对象（value），而是指向 Object.prototype。这意味着它实际上在检查 Object.prototype 是否有特定的属性，而不是检查 value 对象。
            属性查找： for...in 循环会遍历对象自身的属性和其原型链上的可枚举属性。当你直接使用 Object.prototype.hasOwnProperty，它总是返回 false，因为你实际上在问 "Object.prototype 是否有名为 [某个属性名] 的自有属性？"，答案几乎总是否定的。
            递归中断： 由于 hasOwnProperty 检查总是返回 false，detect 函数不会递归到对象的嵌套属性中。这意味着即使存在循环引用，函数也无法检测到它，因为它从不深入对象结构。
            丢失安全检查： 使用 .call 的一个重要原因是为了安全地处理可能不继承自 Object.prototype 的对象，或者那些可能覆盖了 hasOwnProperty 方法的对象。去掉 .call 就失去了这层保护。 */
			if (Object.prototype.hasOwnProperty.call(value, key)) {
				if (detect(value[key])) {
					return true;
				}
			}
		}

		return false;
	}

	return detect(obj);
}

// 使用示例
const obj1 = { a: 1, b: 2 };
console.log(detectCircularReference(obj1)); // false

const obj2 = { a: 1 };
obj2.self = obj2;
console.log(detectCircularReference(obj2)); // true

const obj3 = { a: { b: { c: {} } } };
obj3.a.b.c.d = obj3.a;
console.log(detectCircularReference(obj3)); // true
