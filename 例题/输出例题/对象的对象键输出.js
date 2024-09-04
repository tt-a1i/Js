const a = {}
const b = {key: 'b'}
const c = {key: 'c'}
const d = {key: 'd'}
a[b] = 123
a[c] = 456
a[d] = 678
console.log(a[b]);
/*
在JavaScript中，理解console.log(a[b]);的输出需要了解对象属性访问的机制。

在JavaScript中，对象的键总是被强制转换为字符串或符号（但符号在这里不相关）。当你使用一个对象作为另一个对象的键时，JavaScript会将这个对象转换为字符串。默认情况下，对象转换为字符串时会变为"[object Object]"。

下面是代码的逐步执行过程：

你声明了一个空对象a。
你声明了三个对象b、c和d，每个对象都有一个不同的key属性。
当执行a[b] = 123时，它被转换为a["[object Object]"] = 123。
类似地，a[c] = 456和a[d] = 678分别被转换为a["[object Object]"] = 456和a["[object Object]"] = 678。
因为这些键最终都被转换为相同的字符串"[object Object]"，它们会相互覆盖。最后执行的a[d] = 678将键"[object Object]"的值设置为678。

因此，当你执行console.log(a[b]);时，实际上是在访问a["[object Object]"]，因此会输出678。 */