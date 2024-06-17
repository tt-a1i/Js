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

## var的变量提升

```javascript
console.log(n) // undefined
var n = 1
```

==问====var不是有作用域提升吗,为什么这个输出是undefined不是1==

 JavaScript 中，当使用 `var` 声明变量时，确实存在变量提升（hoisting）的行为。变量提升意味着变量的声明部分（不包括赋值）会被提升到其所在作用域的顶部。

对于你的代码：

```javascript
console.log(n); 
var n = 1;
```

变量提升会使其表现得好像是这样写的：

```javascript
var n;            // 声明被提升
console.log(n);   // 此时 n 为 undefined
n = 1;            // 赋值仍然在原来的位置
```

因此，在执行 `console.log(n);` 的时候，变量 `n` 虽然已经被声明，但尚未被赋值，所以其值为 `undefined`。

简单总结：

1. **变量声明提升**：变量的声明（用 `var` 声明的部分）在代码执行前就已经处理，被"提升"到了函数或全局作用域的顶部。
2. **变量初始化不提升**：变量的初始化或赋值仍然保留在原来的位置，并在代码执行到该位置时进行。

这种区分处理声明和赋值的行为是为什么 `n` 在 `console.log` 输出时为 `undefined` 而不是 `1`。

## 立即执行函数表达式

代码 `(function() { ... })()` 可以分两部分来理解：

1. **函数定义**：

   ```javascript
   function() {
     console.log(1);
   }
   ```

   这部分是一个匿名函数（没有函数名的函数）。它定义了一个只包含一条语古的函数，就是打印数字 `1`。

2. **立即执行**：

   ```javascript
   (...)
   ```

   把这个匿名函数用括号 `()` 包围起来，将其转变成一个表达式，然后紧接在后面使用另一对括号 `()` 来进行调用。这种方式可以直接在定义函数后立即执行它。

### 用途和优点

- **封装**：IIFE 可以创建一个独立的作用域。这对于封装变量和函数非常有用，因为在 IIFE 内部声明的任何变量或函数都不会污染全局作用域。
- **安全**：由于所有变量都被限定在函数内部，外界无法直接访问，这对于防止全局变量冲突和增强代码的安全性很有帮助。

### 示例

如果需要定义一些只在初始化时使用的变量，并且不希望这些变量长期存在于全局作用域中，IIFE 就非常适合：

```javascript
(function() {
  var temporary = 'I am temporary';
  console.log(temporary); // 输出: 'I am temporary'
})();
// 试图访问 temporary 将产生一个错误，因为 temporary 不在全局作用域内
console.log(temporary); // Uncaught ReferenceError: temporary is not defined
```

多个立即执行函数之间要用分号隔开

```javascript
(function (){
  console.log(1)
})();
(function (){
  console.log(1)
})()
```



总结：

所以 `(function() { console.log(1); })()` 是一个在定义时就执行的函数，使用 IIFE 可以立即执行某些代码，并且避免污染全局命名空间。

## Object

```javascript
obj = {
  a: 10
}
{a} = obj
```

##### 这样写为什么不对

代码 `{a} = obj` 看起来是尝试进行对象的解构赋值，但它在 JavaScript 中的使用是不正确的，因为它==没有明确地在一个能被解释为语句的上下文中使用==。在 JavaScript 中，花括号 `{}` 被用于块语句，所以 `{a} = obj` 被解析为一个块，里面包含一个标签语句 `a:`，而不是解构赋值。

为了使它正确地执行作为对象的解构赋值，你应该==将整个表达式包裹在圆括号==中，==使其明确变成一个表达式而非块语句==：

```javascript
obj = {
  a: 10
};

({a} = obj); // 正确地使用解构赋值
console.log(a); // 输出: 10
```

把解构赋值的代码部分 `{a} = obj` 放入圆括号中，可以明确地表达这是一个用于赋值的表达式。这样 JavaScript 引擎就不会将其误解析为一个代码块。

### 关键点

- JavaScript 中 `{}` 默认是作为代码块语句解析的。
- 若要在表达式中使用对象字面量（或解构赋值），需要将其包裹在圆括号内，如 `({a} = obj)`。
- 解构赋值允许你从数组或对象中提取数据，并赋值给定义的变量。

### 对象的各种方法

| 方法名                               | 作用描述                                                     |
| :----------------------------------- | :----------------------------------------------------------- |
| `Object.assign()`                    | 用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。   |
| `Object.create()`                    | 创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。 |
| `Object.defineProperty()`            | 在对象上定义新属性或修改现有属性，并返回该对象。             |
| `Object.defineProperties()`          | 在一个对象上定义新的属性或修改现有属性，并返回该对象。       |
| `Object.entries()`                   | 返回一个二维数组，其中的每个子数组都包含对象的一个键值对     |
| `Object.freeze()`                    | 冻结一个对象，使其他代码不能删除或更改任何属性。             |
| `Object.getOwnPropertyDescriptor()`  | 获取指定对象上一个自有属性对应的属性描述符。                 |
| `Object.getOwnPropertyDescriptors()` | 获取一个对象所有自有属性的属性描述符。                       |
| `Object.getOwnPropertyNames()`       | 返回一个由指定对象的所有自有属性的属性名组成的数组。         |
| `Object.getOwnPropertySymbols()`     | 返回一个给定对象自身所有的符号属性。                         |
| `Object.getPrototypeOf()`            | 返回指定对象的原型。                                         |
| `Object.is()`                        | 比较两个值是否相同。所有 NaN 值都相等（这与==和===不同）。   |
| `Object.isExtensible()`              | 判断一个对象是否可扩展（是否可以在其上添加新的属性）。       |
| `Object.isFrozen()`                  | 判断一个对象是否被冻结。                                     |
| `Object.isSealed()`                  | 判断一个对象是否被密封。                                     |
| `Object.keys()`                      | 返回一个由指定对象的所有可枚举自身属性的属性名组成的数组。   |
| `Object.preventExtensions()`         | 防止对象的任何扩展。                                         |
| `Object.seal()`                      | 防止其他代码删除对象的属性。                                 |
| `0Object.setPrototypeOf()`           | 设置一个指定的对象的原型到另一个对象或 `null`。              |
| `Object.values()`                    | 返回一个给定对象自己的所有可枚举属性值的数组。               |

### 方括号的行为分析：

```javascript
let obj = {
    a: 42
};
let propName = 'a';
console.log(obj[prop])
```



- 方括号内部的表达式在访问属性之前总是被先求值。
- 如果你放入一个字符串，JavaScript 将会查看是否有与这个字符串相符的属性名。
- 方括号允许你使用任意字符串作为属性名，包括那些不能作为标识符使用的字符串（例如包含空格或特殊字符的字符串，或者是 JavaScript 关键字，如 `let`、`class` 等）。

## 现代模式，"use strict"

长久以来，JavaScript 不断向前发展且并未带来任何兼容性问题。新的特性被加入，旧的功能也没有改变。

这么做有利于兼容旧代码，但缺点是 JavaScript 创造者的任何错误或不完善的决定也将永远被保留在 JavaScript 语言中。

`**确保 “use strict” 出现在最顶部**`

**没有办法取消 `use strict`**

没有类似于 `"no use strict"` 这样的指令可以使程序返回默认模式。

一旦进入了严格模式，就没有回头路了。

 [开发者控制台](https://zh.javascript.info/devtools) 运行代码时，请注意它==默认是不启动== `use strict` 的

## ``模版字符串

```javascript
let name = "Ilya";

// 表达式为数字 1
alert( `hello ${1}` ); // hello 1

// 表达式是一个字符串 "name"
alert( `hello ${"name"}` ); // hello name

// 表达式是一个变量，嵌入进去了。
alert( `hello ${name}` ); // hello Ilya
```

## 数据类型

1. string 
2. number 
3. symbol 
4. undefined 
5. object 
6. boolean 
7. null 
8. bigInt

```javascript
alert( "6" / "2" ); // 3, string 类型的值被自动转换成 number 类型后进行计算
```



当我们从 string 类型源（如文本表单）中读取一个值，但期望输入一个数字时，通常需要进行显式转换。

如果该字符串不是一个有效的数字，转换的结果会是 `NaN`。例如：

```javascript
let age = Number("an arbitrary string instead of a number");

alert(age); // NaN，转换失败
```



number 类型转换规则：

| 值              | 变成……                                                       |
| :-------------- | :----------------------------------------------------------- |
| `undefined`     | `NaN`                                                        |
| `null`          | `0`                                                          |
| `true 和 false` | `1` and `0`                                                  |
| `string`        | 去掉首尾空白字符（空格、换行符 `\n`、制表符 `\t` 等）后的纯数字字符串中含有的数字。如果剩余字符串为空，则转换结果为 `0`。否则，将会从剩余字符串中“读取”数字。当类型转换出现 error 时返回 `NaN`。 |

```javascript
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN（从字符串“读取”数字，读到 "z" 时出现错误）
alert( Number(true) );        // 1
alert( Number(false) );       // 0
alert(+('3'))                 // 3
```

+修正字符串类型的值为Number类型

Boolean

```javascript
alert( Boolean("0") ); // true
alert( '2' > 1 ); // true，字符串 '2' 会被转化为数字 2
alert( Boolean(" ") ); // 空格，也是 true（任何非空字符串都是 true）
alert( '01' == 1 ); // true，字符串 '01' 会被转化为数字 1
alert( true == 1 ); // true
alert( false == 0 ); // true
```



```javascript
"" + 1 + 0 = "10" // (1)
"" - 1 + 0 = -1 // (2)
true + false = 1
6 / "3" = 2
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5 = "$45"
"4" - 2 = 2
"4px" - 2 = NaN
"  -9  " + 5 = "  -9  5" // (3)
"  -9  " - 5 = -14 // (4)
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
" \t \n" - 2 = -2 // (7)
```

1. 有字符串的加法 `"" + 1`，首先会将数字 `1` 转换为一个字符串：`"" + 1 = "1"`，然后我们得到 `"1" + 0`，再次应用同样的规则得到最终的结果。
2. 减法 `-`（像大多数数学运算一样）只能用于数字，它会使空字符串 `""` 转换为 `0`。
3. 带字符串的加法会将数字 `5` 加到字符串之后。
4. 减法始终将字符串转换为数字，因此它会使 `" -9 "` 转换为数字 `-9`（忽略了字符串首尾的空格）。
5. `null` 经过数字转换之后会变为 `0`。
6. `undefined` 经过数字转换之后会变为 `NaN`。
7. 字符串转换为数字时，会忽略字符串的首尾处的空格字符。在这里，整个字符串由空格字符组成，包括 `\t`、`\n` 以及它们之间的“常规”空格。因此，类似于空字符串，所以会变为 `0`。

null和undefined的比较

```javascript
alert( null === undefined ); // false
alert( null == undefined ); // true
```



## [位运算符](https://zh.javascript.info/operators#wei-yun-suan-fu)

位运算符把运算元当做 32 位整数，并在它们的二进制表现形式上操作。

- 按位与 ( `&` )
- 按位或 ( `|` )
- 按位异或 ( `^` )
- 按位非 ( `~` )
- 左移 ( `<<` )
- 右移 ( `>>` )
- 无符号右移 ( `>>>` )

逗号运算符能让我们处理多个表达式，使用 `,` 将它们分开。每个表达式都运行了，但是只有最后一个的结果会被返回。

举个例子：

```javascript
let a = (1 + 2, 3 + 4);

alert( a ); // 7（3 + 4 的结果）
```

这里，第一个表达式 `1 + 2` 运行了，但是它的结果被丢弃了。随后计算 `3 + 4`，并且该计算结果被返回。

**逗号运算符的优先级非常低**

请注意逗号运算符的`优先级非常低，比 `=` 还要低`，因此上面你的例子中圆括号非常重要。

如果没有圆括号：`a = 1 + 2, 3 + 4` 会先执行 `+`，将数值相加得到 `a = 3, 7`，然后赋值运算符 `=` 执行 `a = 3`，然后逗号之后的数值 `7` 不会再执行，它被忽略掉了。相当于 `(a = 1 + 2), 3 + 4`。

为什么我们需要这样一个运算符，它只返回最后一个值呢？

有时候，人们会使用它把几个行为放在一行上来进行复杂的运算。

举个例子：for循环

```javascript
// 一行上有三个运算符
for (a = 1, b = 3, c = a * b; a < 10; a++) {
 ...
}
```

## ?? 空值运算符

`??` 运算符的优先级与 `||` 相同

```javascript
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// 显示第一个已定义的值：
alert(firstName ?? lastName ?? nickName ?? "匿名"); // Supercoder
```

空值合并运算符 `??` 是最近才被添加到 JavaScript 中的，它的出现是因为人们对 `||` 不太满意。

它们之间重要的区别是：

- `||` 返回第一个 **真** 值。
- `??` 返回第一个 **已定义的** 值。

换句话说，`||` 无法区分 `false`、`0`、空字符串 `""` 和 `null/undefined`。它们都一样 —— 假值（falsy values）。如果其中任何一个是 `||` 的第一个参数，那么我们将得到第二个参数作为结果。

不过在实际中，我们可能只想在变量的值为 `null/undefined` 时使用默认值。也就是说，当该值确实未知或未被设置时。

例如，考虑下面这种情况：

```javascript
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

出于安全原因，JavaScript 禁止将 `??` 运算符与 `&&` 和 `||` 运算符一起使用，除非使用括号明确指定了优先级。

下面的代码会触发一个语法错误：

```javascript
let x = 1 && 2 ?? 3; // Syntax error
```

这个限制无疑是值得商榷的，它被添加到语言规范中是为了避免人们从 `||` 切换到 `??` 时的编程错误。

可以明确地使用括号来解决这个问题：

```javascript
let x = (1 && 2) ?? 3; // 正常工作了

alert(x); // 2
```

## [函数表达式 vs 函数声明](https://zh.javascript.info/function-expressions#han-shu-biao-da-shi-vs-han-shu-sheng-ming)

让我们来总结一下函数声明和函数表达式之间的主要区别。

首先是语法：如何通过代码对它们进行区分。

- **函数声明**：在主代码流中声明为单独的语句的函数：

  ```javascript
  // 函数声明
  function sum(a, b) {
    return a + b;
  }
  ```

- **函数表达式**：在一个表达式中或另一个语法结构中创建的函数。下面这个函数是在赋值表达式 `=` 右侧创建的：

  ```javascript
  // 函数表达式
  let sum = function(a, b) {
    return a + b;
  };
  ```

更细微的差别是，JavaScript 引擎会在 **什么时候** 创建函数。

**函数表达式是在代码执行到达时被创建，并且仅从那一刻起可用。**

一旦代码执行到赋值表达式 `let sum = function…` 的右侧，此时就会开始创建该函数，并且可以从现在开始使用（分配，调用等）。

函数声明则不同。

**在函数声明被定义之前，它就可以被调用。**

例如下面的代码会正常工作：

```javascript
sayHi("John"); // Hello, John

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```

函数声明 `sayHi` 是在 JavaScript 准备运行脚本时被创建的，在这个脚本的任何位置都可见。

……如果它是一个函数表达式，它就不会工作：

```javascript
sayHi("John"); // error!

let sayHi = function(name) {  // (*) no magic any more
  alert( `Hello, ${name}` );
};
```

函数声明只在它所在的代码块中可见。

下面是另一个例子：

```javascript
let age = 16; // 拿 16 作为例子

if (age < 18) {
  welcome();               // \   (运行)
                           //  |
  function welcome() {     //  |
    alert("Hello!");       //  |  函数声明在声明它的代码块内任意位置都可用
  }                        //  |
                           //  |
  welcome();               // /   (运行)

} else {

  function welcome() {
    alert("Greetings!");
  }
}

// 在这里，我们在花括号外部调用函数，我们看不到它们内部的函数声明。


welcome(); // Error: welcome is not defined
```

怎么才能让 `welcome` 在 `if` 外可见呢

正确的做法是使用函数表达式，并将 `welcome` 赋值给在 `if` 外声明的变量，并具有正确的可见性。

下面的代码可以如愿运行：

```javascript
let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Hello!");
  };

} else {

  welcome = function() {
    alert("Greetings!");
  };

}

welcome(); // 现在可以了
```

或者我们可以使用问号运算符 `?` 来进一步对代码进行简化：

```javascript
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  function() { alert("Hello!"); } :
  function() { alert("Greetings!"); };

welcome(); // 现在可以了
```

## 箭头函数

```javascript
let func = (arg1, arg2, ..., argN) => expression;
```

这里创建了一个函数 `func`，它接受参数 `arg1..argN`，然后使用参数对右侧的 `expression` 求值并返回其结果。

换句话说，它是下面这段代码的更短的版本：

```javascript
let func = function(arg1, arg2, ..., argN) {
  return expression;
};
```

具体的例子：

```javascript
let sum = (a, b) => a + b;

/* 这个箭头函数是下面这个函数的更短的版本：

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3
```

如果我们只有一个参数，还可以省略掉参数外的圆括号，使代码更短。

例如：

```javascript
let double = n => n * 2;
// 差不多等同于：let double = function(n) { return n * 2 }

alert( double(3) ); // 6
```

如果没有参数，括号则是空的（但括号必须保留）：

```javascript
let sayHi = () => alert("Hello!");

sayHi();
```

##  [StandardJS](https://standardjs.com/) 

StandardJS，通常称为“Standard”，是一个流行的JavaScript代码风格规范，同时也是一个可执行的命令行程序，用于检查代码格式是否遵从这一特定风格规范。它提倡的是一种统一的编码标准，以减少开发者在编码过程中需要做的风格选择，目的是让代码看起来如同是由一个人编写的一样，从而提高代码的可读性和可维护性。

以下是StandardJS的几个主要特点：

1. **无需配置**：使用StandardJS时，你不需要配置文件来决定代码应如何格式化。这降低了项目的设置复杂性并推广代码一致性。
2. **自动修正**：StandardJS配有一个自动修正（auto-fix）功能，可以自动修复大多数格式错误。这可以节省开发者的时间，让他们专注于解决更复杂的问题。
3. **广泛的社区接受度**：许多开源项目采用了StandardJS作为其代码风格指南，包括许多知名的Node.js模块。

标准不仅约束如空格、缩进、分号的使用，也涉及某些编码实践，比如变量声明放置的位置等。不使用分号以及使用两个空格作为缩进是其最为显著的风格标志。

要在项目中使用StandardJS，开发者可以通过NPM安装StandardJS包，并运行它来检查和修复JavaScript代码：

```sh
npm install standard --save-dev
```

然后在项目的代码上运行它，例如：

```sh
npx standard
```

如果代码有不符合规范的地方，Standard会输出相应的错误和警告；可以通过运行以下命令来自动修复某些错误：

```sh
npx standard --fix
```

通过这种方式，StandardJS 帮助团队或个人开发者保持代码风格的一致性，简化代码审查过程。

`风格指南`

- [Google JavaScript 风格指南](https://google.github.io/styleguide/jsguide.html)
- [Airbnb JavaScript 风格指南](https://github.com/airbnb/javascript)
- [Idiomatic.JS](https://github.com/rwaldron/idiomatic.js)
- [StandardJS](https://standardjs.com/)
