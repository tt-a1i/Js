function deepCopy(obj, map = new WeakMap()) {
	// 检查输入是否为对象
	if (typeof obj !== "object" || obj === null) {
		return obj;
	}

	// 检查对象是否有循环引用，即之前是否已经被拷贝过
	if (map.has(obj)) {
		return map.get(obj); // 如果此对象已被拷贝过，则直接返回之前的拷贝结果
	}

	// 创建数组或对象的拷贝
	let copy;
	if (Array.isArray(obj)) {
		copy = [];
		map.set(obj, copy); // 在映射中存储原始对象与其拷贝的映射关系
		for (let i = 0; i < obj.length; i++) {
			copy[i] = deepCopy(obj[i], map); // 递归拷贝每一个子元素
		}
	} else {
		copy = {};
		map.set(obj, copy);
		for (let key in obj) {
			//hasOwnProperty 确保我们只复制对象自身的属性，而不包括从原型链继承的属性。这可以防止意外复制不应该属于该对象的属性。
			if (obj.hasOwnProperty(key)) {
				copy[key] = deepCopy(obj[key], map); // 递归拷贝每一个属性
			}
		}
	}

	return copy; // 返回拷贝结果
}

// 测试代码
const original = { name: "John", friends: ["Jane", "Bob"] };
original.self = original; // 创建一个循环引用
const clone = deepCopy(original);
console.log(clone);
console.log(clone.self === clone); // true，说明循环引用被正确处理
/*
  要实现一个避免循环引用的深拷贝函数，我们需要创建一个映射来保存已拷贝的对象和其克隆之间的对应关系。
  这样，如果发现对象已被拷贝过，我们可以直接使用其拷贝版本，而不需要再次拷贝，从而避免循环引用。

  在上面的代码中，我们使用了 WeakMap 来存储对象的原始版本和拷贝版本之间的映射。使用 WeakMap 是因为它不会阻止其键（原始对象）被垃圾回收，
  这对于避免内存泄漏非常有帮助。通过递归地检查对象的每一个字段，并且检查是否已被映射（即检查是否已拷贝过），我们可以处理复杂的对象结构，
  包括那些包含循环引用的结构。
    注意，这里展示的 deepCopy 函数目前只处理了对象和数组的深拷贝，并未考虑其他可能需要特殊处理的数据类型（如日期对象、正则表达式对象等），
    在实际应用中可能需要扩展并对这些类型进行特殊处理。
  */
