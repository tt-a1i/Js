## parseInt和parseFloat

只能识别数字开头的,否则为`NaN`

```javascript
console.log(parseInt(3.33)) // 3

console.log(parseFloat(3)) // 3

console.log(parseInt('3.3as')) // 3

console.log(parseFloat('3.32px')) // 3.32

console.log(parseInt('abc12')) // NaN
```

## typeof

==不能识别null和array==,结果都为==object==

```javascript
console.log(typeof (0)) // number
console.log(typeof ('0')) // string
console.log(typeof ({})) // object
console.log(typeof (undefined)) // undefined
console.log(typeof (null)) // object
console.log(typeof [1]) // object
console.log(typeof (+ '0')) // number
```

## 数组方法

| 方法名        | 作用                                                         | 返回值             |
| :------------ | :----------------------------------------------------------- | :----------------- |
| `push`        | 向数组末尾添加一个或多个元素，并返回新的长度。               | 新数组的长度       |
| `pop`         | 删除数组的最后一个元素，并返回被删除的元素。                 | 被删除的元素       |
| `shift`       | 删除数组的第一个元素，并返回被删除的元素。                   | 被删除的元素       |
| `unshift`     | 向数组开头添加一个或多个元素，并返回新的长度。               | 新数组的长度       |
| `slice`       | 返回数组的一个片段或子数组。                                 | 新数组             |
| `splice`      | 通过删除和/或添加新元素来修改数组，并返回被删除的元素数组。  | 被删除的元素的数组 |
| `map`         | 创建新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。 | 新数组             |
| `forEach`     | 数组的每个元素执行一次提供的函数，无返回值（undefined）。    | undefined          |
| `filter`      | 创建一个新数组，包含通过所提供函数实现的测试的所有元素。     | 新数组             |
| `reduce`      | 对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。 | 单一的结果值       |
| `reduceRight` | 与`reduce`相似，但从数组的末尾向前工作。                     | 单一的结果值       |
| `find`        | 返回数组中满趀提供的测试函数的第一个元素的值，否则返回`undefined`。 | 元素或undefined    |
| `findIndex`   | 返回数组中满足提供的测试函数的第一个元素的索引，否则返回`-1`。 | 索引或-1           |
| `some`        | 测试数组中的某些元素是否通过由提供的函数实现的测试。         | 布尔值             |
| `every`       | 测试数组的所有元素是否都通过由提供的函数实现的测试。         | 布尔值             |
| `concat`      | 用于连接两个或更多数组/值，并返回一个新数组。                | 新数组             |
| `join`        | 将数组中的所有元素连接成一个字符串并返回这个字符串。         | 字符串             |
| `indexOf`     | 返回数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。 | 索引或-1           |
| `lastIndexOf` | 返回数组中可以找到一个给定元素的最后一个索引，如果不存在，则返回-1。 | 索索引或-1         |
| `reverse`     | 颠倒数组中元素的顺序。                                       | 原数组(已颠倒)     |
| `sort`        | 对数组元素进行排序，并返回数组。默认排序顺序为按字母升序。   | 原数组(已排序)     |
| `includes`    | 判断数组是否包含一个指定的值，根据情况返回 true 或 false。   | 布尔值             |
| `flat`        | 将所有嵌套数组的元素连接成一个新数组。                       | 新数组             |
