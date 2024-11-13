大家应该都用过JSON.stringfy配合JSON.parse来做深拷贝, 但是对于这种方式实现深拷贝的缺点可能不是十分清楚, 下面直接上代码

这是一段对一个对象做深拷贝的代码,对象中包括了各种的数据类型

```javascript
const original = {
	a: 1,
	b: [2, 3],
	c: {
		d: 4,
		func: function () {
			console.log("Function");
		},
	},
	e: undefined,
	f: NaN,
	g: Infinity,
	h: Symbol("h"),
	i: { j: undefined, k: NaN, l: Infinity, m: Symbol("m") },
	o: new Date()
};

// 创建循环引用
// original.i.n = original;

const stringified = JSON.stringify(original);
const parsed = JSON.parse(stringified);

console.log(parsed);
```

输出:

```javascript
{
  a: 1,
  b: [ 2, 3 ],
  c: { d: 4 },
  f: null,
  g: null,
  i: { k: null, l: null },
  o: '2024-11-12T01:53:57.026Z'
}
```

对比输入输出, 我们发现

1. 函数类型会被直接忽略
2. undefined被直接忽略
3. NaN被转换为null
4. Infinity被转换为null
5. Symbol被直接忽略
6. 日期对象会被转为普通字符串
7. 循环引用会直接报错