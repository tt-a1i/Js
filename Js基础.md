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

## Babel

### 核心功能

1. **语法转换**：Babel 可以把使用最新标准编写的 JavaScript 代码转换成老版本浏览器也能执行的代码。
2. **源码映射**：Babel 支持 Source Maps，可以把转换后的代码映射回原始源代码，便于调试。
3. **插件化**：Babel 通过插件系统工作，用户可以根据需要添加或删除特定的转换插件。

### 如何工作

- **解析**：将代码字符串解析成抽象语法树（AST），这一过程涉及词法分析和语法分析。
- **转换**：对 AST 进行遍历，并应用各种转换插件，对树结构进行修改。
- **生成**：将修改后的 AST 转换回代码字符串，同时可以生成 source map。

### 插件和预设

Babel 自身不包含转换规则。转换功能主要依赖于插件实现。这些插件可以单独使用，也可以组合成预设（preset）。例如：

- **@babel/preset-env**：这是最常用的预设之一，它能根据配置的目标环境自动确定需要使用的 Babel 插件。
- **@babel/preset-react**：转换 React 的 JSX 语法。
- **@babel/preset-typescript**：用于转换 TypeScript 代码为 JavaScript。

### 配置 Babel

Babel 的配置可以通过 `.babelrc` 文件或者在 `package.json` 中的 `babel` 属性来进行。常用配置选项包括：

- **presets**：使用的预设列表。
- **plugins**：使用的插件列表。
- **env**：允许配置特定环境的选项。

### 使用场景

- **前端项目构建**：结合 Webpack, Rollup 等构建工具使用，转译新版 JavaScript 使其在旧浏览器上运行。
- **开发框架和库**：React、Vue 等框架在发布版本时，经常使用 Babel 来确保它们的代码可以在多种环境中运行。
- **Node.js 应用**：尽管最新版本的 Node.js 支持较新的 ECMAScript 规范，但在某些情况下仍可能需要转译特定的新特性。

## Polyfill

Polyfill 是一种 JavaScript 代码片段，用于为旧版本的浏览器提供现代浏览器支持的功能。随着 Web 标准的快速发展，新的 API 和 CSS 属性经常被引入。然而，不是所有浏览器都能及时更新支持这些新标准。为了解决这个问题，开发者使用 polyfill 来模拟这些新特性，使得在不支持某些特性的旧浏览器上也能运行使用这些新特性的代码。

### Polyfill 的工作原理

当页面在浏览器中加载时，polyfill 代码会首先检查浏览器是否支持某个特定的功能。如果不支持，polyfill 会添加缺失的功能，让开发者能像在支持该功能的浏览器中那样使用它。这通常涉及到 JavaScript 的功能补充，有时也包括 CSS 的某些方面。

### Polyfill 的使用场景

- **兼容性处理:** 浏览器的兼容性是最主要的使用场景，尤其是在企业环境中，可能仍需要支持旧版Internet Explorer等浏览器。
- **新特性预览:** 开发者可以使用 polyfill 预览并尝试新的 Web 标准特性，即使这些特性尚未在所有浏览器中普遍可用。

### 实施Polyfill

1. **确定需求:** 确定需要Polyfill的特定功能。这通常基于目标用户群体所使用的浏览器种类和版本。
2. **查找或创建适当的 Polyfill:** 网上有许多开源的 polyfill 脚本，例如 [Polyfill.io](https://polyfill.io/) 是一个动态的服务，根据用户的浏览器自动提供所需的 polyfill。
3. **集成到项目中:** 将 polyfill 脚本包含在你的项目中。这可以通过直接将代码添加到你的 JavaScript 文件中，或者通过使用模块导入。
4. **测试:** 在不同的浏览器和设备上进行测试，确保 polyfill 正确工作并不会引入新的问题。

### 优缺点

**优点：**

- **提高兼容性:** 允许开发者使用最新的 Web 技术，同时保持对旧浏览器的支持。
- **灵活性高:** 开发者可以选择只包含他们需要的特性。

**缺点：**

- **增加负载:** 引入 polyfill 可能会增加页面的加载时间和执行时间，因为需要加载额外的代码。
- **可能的冲突和错误:** Polyfill 可能与现有的代码或其他库冲突，导致错误或不预期的行为。

Polyfill 是现代前端开发中不可或缺的工具，尤其是在需要支持多种浏览器的情况下。通过合理使用polyfill，可以确保 web 应用或网站达到更广泛的用户兼容性和更好的用户体验。

## Objerct

#### [计算属性](https://zh.javascript.info/object#ji-suan-shu-xing)

当创建一个对象时，我们可以在对象字面量中使用方括号。这叫做 **计算属性**。

例如：

```javascript
let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
  [fruit]: 5, // 属性名是从 fruit 变量中得到的
};

alert( bag.apple ); // 5 如果 fruit="apple"
```

可以在方括号中使用更复杂的表达式：

```javascript
let fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5 // bag.appleComputers = 5
};
```

#### [属性值简写](https://zh.javascript.info/object#shu-xing-zhi-jian-xie)

```javascript
function makeUser(name, age) {
  return {
    name, // 与 name: name 相同
    age,  // 与 age: age 相同
    // ...
  };
}
```

```javascript
let user = {
  name,  // 与 name:name 相同
  age: 30
};
```

#### [属性名称限制](https://zh.javascript.info/object#shu-xing-ming-cheng-xian-zhi)

变量名不能是编程语言的某个保留字，如 “for”、“let”、“return” 等……

但对象的属性名并不受此限制：

```javascript
// 这些属性都没问题
let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6
```

属性名可以是任何字符串或者 symbol（一种特殊的标志符类型，将在后面介绍）。

其他类型会被自动地转换为字符串。

例如，当数字 `0` 被用作对象的属性的键时，会被转换为字符串 `"0"`：

```javascript
let obj = {
  0: "test" // 等同于 "0": "test"
};

// 都会输出相同的属性（数字 0 被转为字符串 "0"）
alert( obj["0"] ); // test
alert( obj[0] ); // test (相同的属性)
```

这里有个小陷阱：一个名为 `__proto__` 的属性。我们不能将它设置为一个非对象的值：

```javascript
let obj = {};
obj.__proto__ = 5; // 分配一个数字
alert(obj.__proto__); // [object Object] —— 值为对象，与预期结果不同
```

对象有顺序吗？换句话说，如果我们遍历一个对象，我们获取属性的顺序是和属性添加时的顺序相同吗？这靠谱吗？

简短的回答是：“有特别的顺序”：整数属性会被进行排序，其他属性则按照创建的顺序显示。

```javascript
let codes = {
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  // ..,
  "1": "USA"
};

for(let code in codes) {
  alert(code); // 1, 41, 44, 49
}
```

### 深拷贝

在JavaScript中，实现深度克隆（deep cloning）的功能并不是内置的，但可以通过多种方式实现，比如使用递归、库函数等。克隆一个对象时，主要问题是如何处理非原始值（即对象或数组），以及如何避免循环引用导致的无限递归。以下是几种实现 `cloneDeep` 方法的方式：

#### 方法 1: 使用递归

这是一种直接的方式，通过递归来遍历对象或数组的所有键，依次克隔它们的值。这种方法需要特别处理数组和对象，同时要注意避免循环引用。

```javascript
function cloneDeep(obj, hash = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (obj instanceof Date) {
        return new Date(obj);
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }

    // 检查是否有循环引用
    if (hash.has(obj)) {
        return hash.get(obj);
    }
    
    // 处理数组和对象
    let cloneObj = new obj.constructor();
    hash.set(obj, cloneObj);

    Object.keys(obj).forEach(key => {
        cloneObj[key] = cloneDeep(obj[key], hash);
    });

    return cloneObj;
}
```

##### 函数定义

```javascript
function cloneDeep(obj, hash = new WeakMap()) {
```

这是函数声明。函数名为 `cloneDeep`，接受两个参数：`obj`（要克隆的对象）和 `hash`（默认参数为一个新的 `WeakMap` 对象）。 `WeakMap` 用于跟踪原始对象到克隆对象的映射，这有助于处理循环引用的问题。

##### 判断基本条件

```javascript
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
```

如果传入的 `obj` 是 `null` 或者不是对象类型（比如数字、字符串或布尔值等），函数直接返回该值。因为这些类型在JavaScript中是按值传递，不需要深拷贝。

##### 特殊对象处理

```javascript
    if (obj instanceof Date) {
 ==        return new Date(obj);
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }
```

对于日期和正则表达式对象，需要用特定的方式来创建一个新的实例。对于 `Date` 对象，使用其构造函数并传入原始日期对象；对于 `RegExp` 对象，也通过其构造函数来创建一个新的相同表达式的实例。

##### 检查循环引用

```javascript
    if (hash.has(obj)) {
        return hash.get(obj);
    }
```

这里检查 `hash`（一个 `WeakMap`）是否已经包含了当前对象。如果是，说明之前已经访问过这个对象，存在循环引用，函数直接返回之前存储的克隆对象，避免无限递归。

##### 克隆对象或数组

```javascript
    let cloneObj = new obj.constructor();
    hash.set(obj, cloneObj);
```

通过调用对象原来的构造函数创建一个新的空对象（或数组），保持原对象的原型链。然后将原始对象和新创建的克隆对象存储到 `hash` 中，以便后续的循环引用检测。

##### 属性拷贝

```javascript
    Object.keys(obj).forEach(key => {
        cloneObj[key] = cloneDeep(obj[key], hash);
    });
```

使用 `Object.keys()` 获取原对象的所有自身属性（不包括原型链上的属性）。对每个属性，递归调用 `cloneDeep` 函数来确保属性值也被深拷贝，然后将拷贝后的值赋给新对象的相应属性。

##### 返回结果

```javascript
    return cloneObj;
}
```

函数返回新创建的克隆对象。



#### 方法 2: 使用 `JSON.parse` 和 `JSON.stringify`

这是实现深拷贝的一种非常简单的方法，但是它有一些限制，比如不能复制函数、RegExp、Date、循环引用等。

```javascript
function cloneDeep(obj) {
    return JSON.parse(JSON.stringify(obj));
}
```

#### 方法 3: 使用库

如果你在一个大型项目中，可能会考虑使用成熟的第三方库来处理复杂的深拷贝情况，例如 `lodash`。

```javascript
// 使用 lodash 的 cloneDeep 方法
import cloneDeep from 'lodash/cloneDeep';
let newObj = cloneDeep(oldObj);
```

`lodash` 的 `cloneDeep()` 方法已经非常优化且处理了很多边缘情况，包拧循环引用、特殊对象等。

#### 总结

- 对于简单的情况，可以使用 `JSON.parse` 和 `JSON.stringify`，但要注意其限制。
- 对于更复杂的数据结构或需要处理函数、日期等数据类型，使用递归方法或 `lodash` 等库会更适合。
- 总是考虑到循环引用的问题，使用 `WeakMap` 或其他方法来避免这种情况。

## 如何让 a == 1 && a == 2 && a==3 的值为true？

在 JavaScript 中，对象与基本数据类型比较时，对象将通过内部方法转换为基本类型。方法取决于运算的具体场景，包括 `valueOf`、`toString` 和 `Symbol.toPrimitive`。这个特性可以被用来实现类似 `a==1 && a==2 && a==3` 为 `true` 的情况。下面我会详细解释这三种实现方式。

### 使用 Symbol.toPrimitive

```javascript
var a = { value : 0 };
a[Symbol.toPrimitive] = function(hint) {
    console.log(hint); // default
    return this.value += 1;
}
console.log(a == 1 && a == 2 && a == 3); // true
```

- `Symbol.toPrimitive` 是一个内置的 Symbol 值，它是一个可以指定对象被转换为原始值时的行为的函数。
- 当对象 `a` 在表达式任何需要原始类型的场合被使用时（例如和数字比较时），JS 引擎会调用 `a[Symbol.toPrimitive]`。
- `hint` 参数通常有三个值："number"、"string" 和 "default"。在这里因为和数字进行比较，所以它通常是 "default"。
- 在函数内部，我们使 `this.value` 自增（先返回后增加），所以每次比较 `a` 与一个数时，`a` 的值依次为 1、2、3，使得表达式 `a == 1 && a == 2 && a == 3` 返回 `true`。

### 使用 valueOf

```javascript
var a = { value : 0 };
a.valueOf = function() {
    return this.value += 1;
};
console.log(a == 1 && a == 2 && a == 3); // true
```

- `valueOf` 方法定义了对象如何被转换到相应的原始值。
- 类似于 `Symbol.toPrimitive` 的情况，`a.valueOf()` 被调用来将 `a` 转换为一个原始值进行比较。
- 每次对象 `a` 比较时，由于调用 `valueOf` 方法，`this.value` 自增，所以依次返回 1, 2, 3。

### 使用 toString

```javascript
var a = { value : 0 };
a.toString = function() {
    return this.value += 1;
};
console.log(a == 1 && a == 2 && a == 3); // true
```

- 当 JavaScript 需要将一个对象表示为字符串时，会调用 `toString` 方法。
- 尽管我们通常考虑 `toString` 用于生成字符串，但这里我们利用它来返回一个增加的数字。
- 因此，每次比较时，`toString` 方法被调用，使得 `this.value` 像之前的示例一样依次自增。

以上三种方法都利用了 JavaScript 在进行类型强制转换时，对象会尝试转换为相应的原始类型的特性。这些特性可以让我们在 `a` 被比较时，控制它的值以通过连续不同的比较。

## 数据类型

一个原始值：

- 是原始类型中的一种值。
- 在 JavaScript 中有 7 种原始类型：`string`，`number`，`bigint`，`boolean`，`symbol`，`null` 和 `undefined`。

一个对象：

- 能够存储多个值作为属性。



```javascript
let str = "Hello";

alert( str.toUpperCase() ); // HELLO
```

很简单，对吧？以下是 `str.toUpperCase()` 中实际发生的情况：

1. 字符串 `str` 是一个原始值。因此，在访问其属性时，会创建一个包含字符串字面值的特殊对象，并且具有可用的方法，例如 `toUpperCase()`。
2. 该方法运行并返回一个新的字符串（由 `alert` 显示）。
3. 特殊对象被销毁，只留下原始值 `str`。

所以原始类型可以提供方法，但它们依然是轻量级的。

JavaScript 引擎高度优化了这个过程。它甚至可能跳过创建额外的对象。但是它仍然必须遵守规范，并且表现得好像它创建了一样。



```javascript
let str = "Hello";

str.test = 5; // (*)

alert(str.test);
```

根据你是否开启了严格模式 `use strict`，会得到如下结果：

1. `undefined`（非严格模式）
2. 报错（严格模式）。

为什么？让我们看看在 `(*)` 那一行到底发生了什么：

1. 当访问 `str` 的属性时，一个“对象包装器”被创建了。
2. 在严格模式下，向其写入内容会报错。
3. 否则，将继续执行带有属性的操作，该对象将获得 `test` 属性，但是此后，“对象包装器”将消失，因此在最后一行，`str` 并没有该属性的踪迹。

### 数字类型

#### 数字的两种类型

1. 常规数字以 64 位的格式 [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754) 存储，也被称为“双精度浮点数”
2. BigInt 用于表示任意长度的整数。常规整数不能安全地超过 `(253-1)` 或小于 `-(253-1)`

假如我们需要表示 10 亿。显然，我们可以这样写：

```javascript
let billion = 1000000000;
```

我们也可以使用下划线 `_` 作为分隔符：

```javascript
let billion = 1_000_000_000;
```

这里的下划线 `_` 扮演了“[语法糖](https://en.wikipedia.org/wiki/Syntactic_sugar)”的角色，使得数字具有更强的可读性。JavaScript 引擎会直接忽略数字之间的 `_`，所以 上面两个例子其实是一样的。

##### `num.toString(base)` 

返回在给定 `base` 进制数字系统中 `num` 的字符串表示形式,默认是10。

举个例子：

```javascript
let num = 255;

alert( num.toString(16) );  // ff
alert( num.toString(2) );   // 11111111
```



2个点调用方法

```javascript
123..toString(8) // '173'
```

如果我们放置一个点：`123.toString(8)`，那么就会出现一个 error，因为 JavaScript 语法隐含了第一个点之后的部分为小数部分。如果我们再放一个点，那么 JavaScript 就知道小数部分为空，现在使用该方法。

也可以写成 `(123).toString(8)`

#### 舍入

```
Math.floor
```

向下舍入：`3.1` 变成 `3`，`-1.1` 变成 `-2`。

```
Math.ceil
```

向上舍入：`3.1` 变成 `4`，`-1.1` 变成 `-1`。

```
Math.round
```

向最近的整数舍入：`3.1` 变成 `3`，`3.6` 变成 `4`，中间值 `3.5` 变成 `4`。

`Math.trunc`（IE 浏览器不支持这个方法）

移除小数点后的所有内容而没有舍入：`3.1` 变成 `3`，`-1.1` 变成 `-1`。



将数字舍入到小数点后两位，我们可以将数字乘以 `100`，调用舍入函数，然后再将其除回。

```javascript
let num = 1.23456;

alert( Math.round(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
```

函数 [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) 将数字舍入到小数点后 `n` 位，并以==字符串==形式返回结果

如果小数部分比所需要的短，则在结尾添加零

```javascript
let num = 12.34;
alert( num.toFixed(5) ); // "12.34000"，在结尾添加了 0，以达到小数点后五位
```

我们可以使用一元加号或 `Number()` 调用，将其转换为数字，例如 `+ num.toFixed(5)`



#### `Object.is`

它类似于 `===` 一样对值进行比较，但它对于两种边缘情况更可靠：

1. 它适用于 `NaN`：`Object.is(NaN, NaN) === true`，这是件好事。
2. 值 `0` 和 `-0` 是不同的：`Object.is(0, -0) === false`，从技术上讲这是对的，因为在内部，数字的符号位可能会不同，即使其他所有位均为零。

在所有其他情况下，`Object.is(a, b)` 与 `a === b` 相同。

#### **parseInt(str, radix) 的第二个参数**

`parseInt()` 函数具有可选的第二个参数。它指定了数字系统的基数，因此 `parseInt` 还可以解析十六进制数字、二进制数字等的字符串：

```javascript
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255，没有 0x 仍然有效

alert( parseInt('2n9c', 36) ); // 123456
```

### 字符串

`length` **是一个属性**

请注意 `str.length` 是一个数字属性，而不是函数。后面不需要添加括号。

#### 字符串中查找子字符串

#####  [str.indexOf(substr, pos)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)。

它从给定位置 `pos` 开始，在 `str` 中查找 `substr`，如果没有找到，则返回 `-1`，否则返回匹配成功的位置。

可选的第二个参数允许我们从一个给定的位置开始检索。

```javascript
let str = 'Widget with id';

alert( str.indexOf('Widget') ); // 0，因为 'Widget' 一开始就被找到
alert( str.indexOf('widget') ); // -1，没有找到，检索是大小写敏感的

alert( str.indexOf("id") ); // 1，"id" 在位置 1 处（……idget 和 id）
```



##### [str.lastIndexOf(substr, position)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf)

它从字符串的末尾开始搜索到开头



##### [按位（bitwise）NOT 技巧](https://zh.javascript.info/string#an-wei-bitwisenot-ji-qiao)

这里使用的一个老技巧是 [bitwise NOT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT) `~` 运算符。它将数字转换为 32-bit 整数（如果存在小数部分，则删除小数部分），然后对其二进制表示形式中的所有位均取反。

实际上，这意味着一件很简单的事儿：对于 32-bit 整数，`~n` 等于 `-(n+1)`。

例如：

```javascript
alert( ~2 ); // -3，和 -(2+1) 相同
alert( ~1 ); // -2，和 -(1+1) 相同
alert( ~0 ); // -1，和 -(0+1) 相同
alert( ~-1 ); // 0，和 -(-1+1) 相同
```

正如我们看到这样，只有当 `n == -1` 时，`~n` 才为零（适用于任何 32-bit 带符号的整数 `n`）。

因此，仅当 `indexOf` 的结果不是 `-1` 时，检查 `if ( ~str.indexOf("...") )` 才为真。换句话说，当有匹配时。

人们用它来简写 `indexOf` 检查：

```javascript
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Found it!' ); // 正常运行
}
```



##### [str.includes(substr, pos)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/String/includes)

 根据 `str` 中是否包含 `substr` 来返回 `true/false`

`str.includes` 的第二个可选参数是开始搜索的起始位置



##### [str.startsWith](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith) 和 [str.endsWith](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith) 

功能与其名称所表示的意思相同：

```javascript
alert( "Widget".startsWith("Wid") ); // true，"Widget" 以 "Wid" 开始
alert( "Widget".endsWith("get") ); // true，"Widget" 以 "get" 结束
```



#### [获取子字符串](https://zh.javascript.info/string#huo-qu-zi-zi-fu-chuan)

##### str.slice(start , end)

返回字符串从 `start` 到（但不包括）`end` 的部分。

例如：

```javascript
let str = "stringify";
alert( str.slice(0, 5) ); // 'strin'，从 0 到 5 的子字符串（不包括 5）
alert( str.slice(0, 1) ); // 's'，从 0 到 1，但不包括 1，所以只有在 0 处的字符
```

如果没有第二个参数，`slice` 会一直运行到字符串末尾：

```javascript
let str = "stringify";
alert( str.slice(2) ); // 从第二个位置直到结束
```

`start/end` 也有可能是负值。它们的意思是起始位置从字符串结尾计算：

```javascript
let str = "stringify";

// 从右边的第四个位置开始，在右边的第一个位置结束
alert( str.slice(-4, -1) ); // 'gif'
```



##### str.substring(start , end)

返回字符串从 `start` 到（但不包括）`end` 的部分。

这与 `slice` 几乎相同，但它允许 `start` 大于 `end`。

例如：

```javascript
let str = "stringify";

// 这些对于 substring 是相同的
alert( str.substring(2, 6) ); // "ring"
alert( str.substring(6, 2) ); // "ring"

// ……但对 slice 是不同的：
alert( str.slice(2, 6) ); // "ring"（一样）
alert( str.slice(6, 2) ); // ""（空字符串）
```

不支持负参数（不像 slice），它们被视为 `0`。



##### str.substr(start , length)

返回字符串从 `start` 开始的给定 `length` 的部分。

与以前的方法相比，这个允许我们指定 `length` 而不是结束位置：

```javascript
let str = "stringify";
alert( str.substr(2, 4) ); // 'ring'，从位置 2 开始，获取 4 个字符
```

第一个参数可能是负数，从结尾算起：

```javascript
let str = "stringify";
alert( str.substr(-4, 2) ); // 'gi'，从第 4 位获取 2 个字符
```



##### 对比

| 方法                    | 选择方式……                                | 负值参数            |
| :---------------------- | :---------------------------------------- | :------------------ |
| `slice(start, end)`     | 从 `start` 到 `end`（不含 `end`）         | 允许                |
| `substring(start, end)` | 从 `start` 到 `end`（不含 `end`）         | 负值被视为 `0`      |
| `substr(start, length)` | 从 `start` 开始获取长为 `length` 的字符串 | 允许 `start` 为负数 |

### 数组

#### [使用 “at” 获取最后一个元素](https://zh.javascript.info/array#shi-yong-at-huo-qu-zui-hou-yi-ge-yuan-su)

```javascript
let fruits = ["Apple", "Orange", "Plum"];

// 与 fruits[fruits.length-1] 相同
alert( fruits.at(-1) ); // Plum
```

`arr.at(i)`：

- 如果 `i >= 0`，则与 `arr[i]` 完全相同。
- 对于 `i` 为负数的情况，它则从数组的尾部向前数。

`push` 和 `unshift` 方法都可以一次添加多个元素

本质上讲，数组仍然是一个对象,JavaScript 引擎尝试把这些元素一个接一个地存储在连续的内存区域，而且还有一些其它的优化，以使数组运行得非常快

#### [toString](https://zh.javascript.info/array#tostring)

数组有自己的 `toString` 方法的实现，会返回以逗号隔开的元素列表。

例如：

```javascript
let arr = [1, 2, 3];

alert( arr ); // 1,2,3
alert( String(arr) === '1,2,3' ); // true
```

#### 动态规划最大子数组

```javascript
let nums = [-1, 2, 3, -9, 11]
function getMaxSubSum(nums) {
  if (nums.length === 0) return 0;

  const dp = new Array(nums.length);
  dp[0] = nums[0]; // base case
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(nums[i], nums[i] + dp[i - 1]);
  }
  return Math.max(...dp, 0);
}

console.log(getMaxSubSum(nums))
```

#### splice

[arr.splice](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) 方法可以说是处理数组的瑞士军刀。它可以做所有事情：添加，删除和插入元素。

语法是：

```javascript
arr.splice(start[, deleteCount, elem1, ..., elemN])
```

它从索引 `start` 开始修改 `arr`：删除 `deleteCount` 个元素并在当前位置插入 `elem1, ..., elemN`。最后返回被删除的元素所组成的数组。

让我们从删除开始：

```javascript
let arr = ["I", "study", "JavaScript"];

arr.splice(1, 1); // 从索引 1 开始删除 1 个元素

alert( arr ); // ["I", "JavaScript"]
```

简单，对吧？从索引 `1` 开始删除 `1` 个元素。（译注：当只填写了 `splice` 的 `start` 参数时，将删除从索引 `start` 开始的所有数组项）

删除了 3 个元素，并用另外两个元素替换它们：

```javascript
let arr = ["I", "study", "JavaScript", "right", "now"];

// 删除数组的前三项，并使用其他内容代替它们
arr.splice(0, 3, "Let's", "dance");

alert( arr ) // 现在 ["Let's", "dance", "right", "now"]
```

`splice` 返回了被删除的元素所组成的数组

```javascript
let arr = ["I", "study", "JavaScript", "right", "now"];

// 删除前两个元素
let removed = arr.splice(0, 2);
```

splice改变原数组



我们可以将 `deleteCount` 设置为 `0`，`splice` 方法就能够插入元素而不用删除任何元素：

```javascript
let arr = ["I", "study", "JavaScript"];

// 从索引 2 开始
// 删除 0 个元素
// 然后插入 "complex" 和 "language"
arr.splice(2, 0, "complex", "language");

alert( arr ); // "I", "study", "complex", "language", "JavaScript"
```

负向索引都是被允许的。它们从数组末尾计算位置，如下所示：

```javascript
let arr = [1, 2, 5];

// 从索引 -1（尾端前一位）,尾端插入直接arr.length
// 删除 0 个元素，
// 然后插入 3 和 4
arr.splice(-1, 0, 3, 4);

alert( arr ); // 1,2,3,4,5
```

#### [slice](https://zh.javascript.info/array-methods#slice)

[arr.slice](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) 方法比 `arr.splice` 简单得多。

语法是：

```javascript
arr.slice([start], [end])
```

它会返回一个新数组，将所有从索引 `start` 到 `end`（不包括 `end`）的数组项复制到一个新的数组。`start` 和 `end` 都可以是负数，在这种情况下，从末尾计算索引。

它和字符串的 `str.slice` 方法有点像，就是把子字符串替换成子数组。

例如：

```javascript
let arr = ["t", "e", "s", "t"];

alert( arr.slice(1, 3) ); // e,s（复制从位置 1 到位置 3 的元素）

alert( arr.slice(-2) ); // s,t（复制从位置 -2 到尾端的元素）
```

我们也可以不带参数地调用它：`arr.slice()` 会创建一个 `arr` 的副本。其通常用于获取副本，以进行不影响原始数组的进一步转换。

#### [遍历：forEach](https://zh.javascript.info/array-methods#bian-li-foreach)

[arr.forEach](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) 方法允许为数组的每个元素都运行一个函数。

语法：

```javascript
arr.forEach(function(item, index, array) {
  // ... do something with item
});
```



方法 `includes` 

的一个次要但值得注意的特性是，它可以正确处理 `NaN`，这与 `indexOf` 不同：

```javascript
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1（错，应该为 0）
alert( arr.includes(NaN) );// true（正确）
```

这是因为 `includes` 是在比较晚的时候才被添加到 JavaScript 中的，并且在内部使用了更新了的比较算法。

#### [arr.find](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

```javascript
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

let user = users.find(item => item.id == 1);

alert(user.name); // John
```



`find` 方法搜索的是使函数返回 `true` 的第一个（单个）元素。

如果需要匹配的有很多，我们可以使用

#### [arr.filter(fn)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

```javascript
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

// 返回前两个用户的数组
let someUsers = users.filter(item => item.id < 3);

alert(someUsers.length); // 2
```

#### [arr.map](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 

对数组的每个元素都调用函数，并返回结果数组。

```javascript
let result = arr.map(function(item, index, array) {
  // 返回新值而不是当前元素
})
```

例如，在这里我们将每个元素转换为它的字符串长度：

```javascript
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6
```

#### [arr.sort](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

对数组进行 **原位（in-place）** 排序，更改元素的顺序。(译注：原位是指在此数组内，而非生成一个新数组。)

默认按每位字符大小排序

```javascript
arr.sort( (a, b) => a - b );
a - b 升序
b - a 降序
```

#### [arr.reverse](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse) 

方法用于颠倒 `arr` 中元素的顺序

修改原数组

#### split

```javascript
let names = 'Bilbo, Gandalf, Nazgul';

let arr = names.split(', ');

for (let name of arr) {
  alert( `A message to ${name}.` ); // A message to Bilbo（和其他名字）
}
```

`split` 方法有一个可选的第二个数字参数 —— 对数组长度的限制。如果提供了，那么额外的元素会被忽略。但实际上它很少使用：

```javascript
let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);

alert(arr); // Bilbo, Gandalf
```

**拆分为字母**

调用带有空参数 `s` 的 `split(s)`，会将字符串拆分为字母数组：

```javascript
let str = "test";

alert( str.split('') ); // t,e,s,t
```

#### [arr.join(glue)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Array/join) 

与 `split` 相反。它会在它们之间创建一串由 `glue` 粘合的 `arr` 项。

例如：

```javascript
let arr = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = arr.join(';'); // 使用分号 ; 将数组粘合成字符串

alert( str ); // Bilbo;Gandalf;Nazgul
```

#### [reduce/reduceRight](https://zh.javascript.info/array-methods#reducereduceright)

#### 练习题

##### [将 border-left-width 转换成 borderLeftWidth](https://zh.javascript.info/array-methods#jiang-borderleftwidth-zhuan-huan-cheng-borderleftwidth)

```javascript
function camelize (str) {
  return str.split('-').map((arr, index) => index === 0 ? arr : arr[0].toUpperCase() + arr.slice(1)).join('')
}
```



##### [过滤范围](https://zh.javascript.info/array-methods#guo-lv-fan-wei)

```javascript
function filterRangeInPlace(arr, a, b){
  for (let i = 0; i < arr.length; i++) {
    if(!(arr[i] >= a && arr[i] <= b)){
      arr.splice(i, 1)
      i--;
    }
  }
}
```

##### [创建一个可扩展的 calculator](https://zh.javascript.info/array-methods#chuang-jian-yi-ge-ke-kuo-zhan-de-calculator)



##### [获取平均年龄](https://zh.javascript.info/array-methods#huo-qu-ping-jun-nian-ling)

```javascript
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr = [ john, pete, mary ];
function getAverageAge(arr){
  return arr.reduce((sum, curr) => {
    return sum + curr.age;//写成大括号的形式要return,也可以箭头函数不带大括号,会自动return
  }, 0) / arr.length
}

console.log( getAverageAge(arr) ); 
```



##### ==[从数组创建键（值）对象](https://zh.javascript.info/array-methods#cong-shu-zu-chuang-jian-jian-zhi-dui-xiang)==

```javascript
假设我们收到了一个用户数组，形式为：{id:..., name:..., age:... }。

创建一个函数 groupById(arr) 从该数组创建对象，以 id 为键（key），数组项为值。

例如:

let users = [
  {id: 'john', name: "John Smith", age: 20},
  {id: 'ann', name: "Ann Smith", age: 24},
  {id: 'pete', name: "Pete Peterson", age: 31},
];

let usersById = groupById(users);

/*
// 调用函数后，我们应该得到：

usersById = {
  john: {id: 'john', name: "John Smith", age: 20},
  ann: {id: 'ann', name: "Ann Smith", age: 24},
  pete: {id: 'pete', name: "Pete Peterson", age: 31},
}
*/
```

```javascript
function groupById(array) {
  return array.reduce((obj, value) => {
    obj[value.id] = value;
    return obj;
  }, {})
}
```



### Map and Set（映射和集合）

[Map](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Map) 是一个带键的数据项的集合，就像一个 `Object` 一样。 但是它们最大的差别是 `Map` 允许任何类型的键（key）。

#### 它的方法和属性如下：

- `new Map()` —— 创建 map。
- `map.set(key, value)` —— 根据键存储值。
- `map.get(key)` —— 根据键来返回值，如果 `map` 中不存在对应的 `key`，则返回 `undefined`。
- `map.has(key)` —— 如果 `key` 存在则返回 `true`，否则返回 `false`。
- `map.delete(key)` —— 删除指定键的值。
- `map.clear()` —— 清空 map。
- `map.size` —— 返回当前元素个数。

#### [Map 迭代](https://zh.javascript.info/map-set#map-die-dai)

如果要在 `map` 里使用循环，可以使用以下三个方法：

- `map.keys()` —— 遍历并返回一个包含所有键的可迭代对象，
- `map.values()` —— 遍历并返回一个包含所有值的可迭代对象，
- `map.entries()` —— 遍历并返回一个包含所有实体 `[key, value]` 的可迭代对象，`for..of` 在默认情况下使用的就是这个。

#### `Map` 和 `Set` 区别

是 JavaScript 中两种不同的内置对象,它们有以下区别:

1. 存储方式:
   - `Map` 对象存储的是键值对,每个键对应一个值。键可以是任意类型,包括对象、函数等。
   - `Set` 对象存储的是唯一的值,不允许重复。`Set` 中的元素没有特定的顺序。
2. 键的类型:
   - `Map` 对象的键可以是任意类型,包括对象、函数等。
   - `Set` 对象的元素本身就是键,不存在单独的键。
3. 元素的顺序:
   - `Map` 对象中的元素按照插入顺序进行存储和迭代。
   - `Set` 对象中的元素没有特定的顺序,每次迭代的顺序可能不同。
4. 方法和属性:
   - `Map` 对象提供了一些方法和属性,如 `set(key, value)`、`get(key)`、`has(key)`、`delete(key)`、`clear()`、`size` 等。
   - `Set` 对象提供了一些方法和属性,如 `add(value)`、`has(value)`、`delete(value)`、`clear()`、`size` 等。
5. 用途:
   - `Map` 对象适用于需要存储键值对、进行快速查找、更新和删除操作的场景。
   - `Set` 对象适用于需要存储唯一值、进行快速成员检查和删除操作的场景。

### [WeakMap](https://zh.javascript.info/weakmap-weakset#weakmap)

`WeakMap` 和 `Map` 的第一个不同点就是，`WeakMap` 的键必须是对象，不能是原始值：

```javascript
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // 正常工作（以对象作为键）

// 不能使用字符串作为键
weakMap.set("test", "Whoops"); // Error，因为 "test" 不是一个对象
```

`WeakMap` 的主要应用场景是 **额外数据的存储**。

假如我们正在处理一个“属于”另一个代码的一个对象，也可能是第三方库，并想存储一些与之相关的数据，那么这些数据就应该与这个对象共存亡 —— 这时候 `WeakMap` 正是我们所需要的利器。

如果我们在 weakMap 中使用一个对象作为键，并且没有其他对这个对象的引用 —— 该对象将会被从内存（和map）中自动清除。

`WeakMap` 不支持迭代以及 `keys()`，`values()` 和 `entries()` 方法。所以没有办法获取 `WeakMap` 的所有键或值。

我们将这些数据放到 `WeakMap` 中，并使用该对象作为这些数据的键，那么当该对象被垃圾回收机制回收后，这些数据也会被自动清除。

另外一个常见的例子是缓存。我们可以存储（“缓存”）函数的结果，以便将来对同一个对象的调用可以重用这个结果。

### WeakSet

`WeakSet` 的表现类似：

- 与 `Set` 类似，但是我们只能向 `WeakSet` 添加对象（而不能是原始值）。
- 对象只有在其它某个（些）地方能被访问的时候，才能留在 `WeakSet` 中。
- 跟 `Set` 一样，`WeakSet` 支持 `add`，`has` 和 `delete` 方法，但不支持 `size` 和 `keys()`，并且不可迭代。

变“弱（weak）”的同时，它也可以作为额外的存储空间。但并非针对任意数据，而是针对“是/否”的事实。`WeakSet` 的元素可能代表着有关该对象的某些信息。

#### [总结](https://zh.javascript.info/weakmap-weakset#zong-jie)

`WeakMap` 是类似于 `Map` 的集合，它仅允许对象作为键，并且一旦通过其他方式无法访问这些对象，垃圾回收便会将这些对象与其关联值一同删除。

`WeakSet` 是类似于 `Set` 的集合，它仅存储对象，并且一旦通过其他方式无法访问这些对象，垃圾回收便会将这些对象删除。

它们的主要优点是它们对对象是弱引用，所以被它们引用的对象很容易地被垃圾收集器移除。

这是以不支持 `clear`、`size`、`keys`、`values` 等作为代价换来的……

`WeakMap` 和 `WeakSet` 被用作“主要”对象存储之外的“辅助”数据结构。一旦将对象从主存储器中删除，如果该对象仅被用作 `WeakMap` 或 `WeakSet` 的键，那么该对象将被自动清除。

## [Object.keys，values，entries ](https://zh.javascript.info/keys-values-entries)



## 解构赋值

[解构赋值 (javascript.info)](https://zh.javascript.info/destructuring-assignment)

可以通过添加额外的逗号来丢弃数组中不想要的元素：

```javascript
// 不需要第二个元素
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert( title ); // Consul
```

在上面的代码中，数组的第二个元素被跳过了，第三个元素被赋值给了 `title` 变量。数组中剩下的元素也都被跳过了（因为在这没有对应给它们的变量）。

**等号右侧可以是任何可迭代对象**

……实际上，我们可以将其与任何可迭代对象一起使用，而不仅限于数组：

```javascript
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```

**交换变量值的技巧**

使用解构赋值来交换两个变量的值是一个著名的技巧：

```javascript
let guest = "Jane";
let admin = "Pete";

// 让我们来交换变量的值：使得 guest = Pete，admin = Jane
[guest, admin] = [admin, guest];

alert(`${guest} ${admin}`); // Pete Jane（成功交换！）
```

如果数组比左边的列表长，那么“其余”的数组项会被省略

如果我们还想收集其余的数组项 —— 我们可以使用三个点 `"..."` 来再加一个参数以获取其余数组项：

```javascript
let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
```

如果数组比左边的变量列表短，这里不会出现报错。缺少对应值的变量都会被赋 `undefined`：

```javascript
let [firstName, surname] = [];
```

如果我们想要一个“默认”值给未赋值的变量，我们可以使用 `=` 来提供：

```javascript
// 默认值
let [name = "Guest", surname = "Anonymous"] = ["Julius"];

alert(name);    // Julius（来自数组的值）
alert(surname); // Anonymous（默认值被使用了）
```

变量的顺序并不重要，下面这个代码也是等价的：

```javascript
// 改变 let {...} 中元素的顺序
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
console.log(height) // 200
console.log(width) // 100
console.log(title) // Menu
```

如果我们想把一个属性赋值给另一个名字的变量，比如把 `options.width` 属性赋值给名为 `w` 的变量，那么我们可以使用冒号来设置变量名称：

```javascript
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

// { sourceProperty: targetVariable }
let {width: w, height: h, title} = options;

// width -> w
// height -> h
// title -> title

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

## JSON 方法

[JSON 方法，toJSON (javascript.info)](https://zh.javascript.info/json)

JSON (JavaScript Object Notation) 是一种轻量级的数据交换格式。它具有以下特点和用途：

1. 定义：
   - 由Douglas Crockford提出，源于JavaScript，但现在已是语言无关的格式。
   - 使用人类可读的文本来传输由键值对构成的数据对象。
2. 语法：
   - 数据在名称/值对中
   - 数据由逗号分隔
   - 花括号保存对象
   - 方括号保存数组
3. 数据类型：
   - 数字（整数或浮点数）
   - 字符串（在双引号中）
   - 布尔值（true 或 false）
   - 数组（在方括号中）
   - 对象（在花括号中）
   - null
4. 优点：
   - 轻量级和易读
   - 易于解析和生成
   - 语言无关，可用于多种编程语言
   - 数据格式比XML更小
5. 应用场景：
   - Web API的数据传输
   - 配置文件
   - 数据存储（如NoSQL数据库）
   - 前后端数据交换
6. 相关方法（在JavaScript中）：
   - JSON.stringify(): 将JavaScript对象转换为JSON字符串
   - JSON.parse(): 将JSON字符串解析为JavaScript对象
7. 安全性：
   - 不执行代码，只是数据格式，因此比执行JavaScript更安全
8. 限制：
   - 不支持函数、日期、undefined
   - 不能表示循环引用的数据结构

如果在对象内定义toJson方法,对对象调用JSON.stringfy会使用toJson方法



编写 `replacer` 函数，移除引用 `meetup` 的属性，并将其他所有属性序列化：

```javascript
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

room.occupiedBy = meetup;
meetup.self = meetup;

alert( JSON.stringify(meetup, function replacer(key, value) {
  return (key != "" && value == meetup) ? undefined : value;
}));

/*
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```

在这个 `replacer` 函数中，`key != ""` 的检查是为了避免将整个 `meetup` 对象替换为 `undefined`。这是因为当 `JSON.stringify` 开始处理顶级对象时，它会首先调用 `replacer` 函数，此时的 `key` 是一个空字符串，`value` 是整个 `meetup` 对象。

让我们详细解释一下：

1. `JSON.stringify` 在开始序列化时，会首先调用 `replacer` 函数，传入一个空字符串作为 key，和整个要序列化的对象作为 value。
2. 如果没有 `key != ""` 这个条件，当处理顶级对象时，`replacer` 函数会返回 `undefined`，因为 `value == meetup` 为真。
3. 返回 `undefined` 会导致整个对象被跳过，结果就是什么都不会被序列化。
4. 通过添加 `key != ""` 条件，我们确保只有在处理对象的属性时才考虑循环引用的问题，而不会影响到顶级对象本身。

所以，这个条件的作用是：

- 当 `key` 是空字符串时（即处理顶级对象），直接返回 `value`。
- 当 `key` 不是空字符串时（即处理对象的属性），检查是否存在循环引用，如果存在则返回 `undefined`。

这样，我们就可以正确地处理循环引用，同时保留顶级对象的结构。

## [Rest 参数 `...`](https://zh.javascript.info/rest-parameters-spread#rest-can-shu)

**Rest 参数必须放到参数列表的末尾**

Rest 参数会收集剩余的所有参数，因此下面这种用法没有意义，并且会导致错误：

```javascript
function f(arg1, ...rest, arg2) { // arg2 在 ...rest 后面？！
  // error
}
```

`...rest` 必须写在参数列表最后。

## [“arguments” 变量](https://zh.javascript.info/rest-parameters-spread#arguments-bian-liang)

有一个名为 `arguments` 的特殊类数组对象可以在函数中被访问，该对象以参数在参数列表中的索引作为键，存储所有参数。

例如：

```javascript
function showName() {
  alert( arguments.length );
  alert( arguments[0] );
  alert( arguments[1] );

  // 它是可遍历的
  // for(let arg of arguments) alert(arg);
}

// 依次显示：2，Julius，Caesar
showName("Julius", "Caesar");

// 依次显示：1，Ilya，undefined（没有第二个参数）
showName("Ilya");
```

在过去，JavaScript 中不支持 rest 参数语法，而使用 `arguments` 是获取函数所有参数的唯一方法。现在它仍然有效，我们可以在一些老代码里找到它。

但缺点是，尽管 `arguments` 是一个类数组，也是可迭代对象，但它终究不是数组。它不支持数组方法，因此我们不能调用 `arguments.map(...)` 等方法。

此外，它始终包含所有参数，我们不能像使用 rest 参数那样只截取参数的一部分。

因此，当我们需要这些功能时，最好使用 rest 参数。

**箭头函数没有 `"arguments"`**

## [Spread 语法](https://zh.javascript.info/rest-parameters-spread#spread-syntax)

```javascript
let arr = [3, 5, 1];

alert( Math.max(...arr) ); // 5（spread 语法把数组转换为参数列表）
```

我们甚至还可以将 spread 语法与常规值结合使用：

```javascript
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
```

我们还可以使用 spread 语法来合并数组：

```javascript
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

let merged = [0, ...arr, 2, ...arr2];

alert(merged); // 0,3,5,1,2,8,9,15（0，然后是 arr，然后是 2，然后是 arr2）
```

可以用 spread 语法这样操作任何可迭代对象。

例如，在这儿我们使用 spread 语法将字符串转换为字符数组：

```javascript
let str = "Hello";

alert( [...str] ); // H,e,l,l,o
```

还可以使用 `Array.from` 来实现，因为该方法会将一个可迭代对象（如字符串）转换为数组：

```javascript
let str = "Hello";

// Array.from 将可迭代对象转换为数组
alert( Array.from(str) ); // H,e,l,l,o
```

运行结果与 `[...str]` 相同。

不过 `Array.from(obj)` 和 `[...obj]` 存在一个细微的差别：

- `Array.from` 适用于类数组对象也适用于可迭代对象。
- Spread 语法只适用于可迭代对象。

因此，对于将一些“东西”转换为数组的任务，`Array.from` 往往更通用。



==类数组对象==（Array-like object）的概念：

类数组对象是指那些看起来像数组，但实际上不是数组的对象。它们具有以下特征：

1. 有 length 属性，表示元素的数量。
2. 可以通过索引访问元素（如 obj[0], obj[1] 等）。
3. 不具有数组的内置方法（如 push, pop, forEach 等）。

常见的类数组对象例子包括：

1. DOM 方法返回的 NodeList（如 document.querySelectorAll('div')）。
2. 函数内部的 arguments 对象。
3. 字符串（虽然它是可迭代的，但也可以被视为类数组对象）。

使用...进行深拷贝,创建新的副本不会影响拷贝对象的属性

[复制 array/object](https://zh.javascript.info/rest-parameters-spread#fu-zhi-arrayobject)

## 闭包 [函数大军](https://zh.javascript.info/closure#han-shu-da-jun)

## var

var只有全局作用域和函数作用域

声明提升

可以先使用再声明

```javascript
function sayHi() {
  phrase = "Hello";

  alert(phrase);

  var phrase;
}
sayHi();
```



声明会提升,赋值不会被提升

## js中下划线_proto_和__proto__的区别

在 JavaScript 中，`_proto_` 和 `__proto__` 是两个不同的概念，尽管它们看起来很相似。让我们来解释一下它们的区别：

1. `__proto__`

   - `__proto__` 是对象实例上的一个属性，指向该对象的原型。
   - 它是非标准的，但大多数现代浏览器都支持它。
   - 它允许你直接访问和修改对象的原型链。
   - 在现代 JavaScript 中，推荐使用 `Object.getPrototypeOf()` 和 `Object.setPrototypeOf()` 来替代直接使用 `__proto__`。

   例子：

   ```javascript
   let obj = {};
   console.log(obj.__proto__ === Object.prototype); // true
   ```

2. `_proto_`

   - `_proto_` 只是一个普通的属性名，没有特殊的语言意义。
   - 它可以用作对象的普通属性，没有内置的特殊行为。
   - 使用单下划线前缀通常是一种命名约定，表示这是一个"私有"或内部使用的属性，但这只是一种习惯，并不提供真正的私有性。

   例子：

   ```javascript
   let obj = {
     _proto_: 'This is just a regular property'
   };
   console.log(obj._proto_); // 'This is just a regular property'
   ```

主要区别：

1. 特殊性：`__proto__` 是一个特殊的属性，用于访问对象的原型；而 `_proto_` 只是一个普通的属性名。
2. 功能：`__proto__` 用于原型链操作；`_proto_` 没有特殊功能。
3. 标准化：`__proto__` 虽然广泛支持，但不是 ECMAScript 标准的一部分；`_proto_` 作为属性名完全符合标准。
4. 使用场景：`__proto__` 用于原型操作（虽然不推荐直接使用）；`_proto_` 可能被用作命名约定中的"私有"属性。
5. 双下划线 vs 单下划线：`__proto__` 使用双下划线；`_proto_` 使用单下划线。

总之，`__proto__` 是一个特殊的属性，用于原型链操作，而 `_proto_` 只是一个普通的属性名，没有特殊意义。在实际开发中，应避免直接使用 `__proto__`，而是使用 `Object.getPrototypeOf()` 等标准方法。

## Promise

[Promise API (javascript.info)](https://zh.javascript.info/promise-api)

`Promise` 类有 6 种静态方法：

1. `Promise.all(promises)` —— 等待所有 promise 都 resolve 时，返回存放它们结果的数组。如果给定的任意一个 promise 为 reject，那么它就会变成 `Promise.all` 的 error，所有其他 promise 的结果都会被忽略。

2. ```
   Promise.allSettled(promises)
   ```

   （ES2020 新增方法）—— 等待所有 promise 都 settle 时，并以包含以下内容的对象数组的形式返回它们的结果：

   - `status`: `"fulfilled"` 或 `"rejected"`
   - `value`（如果 fulfilled）或 `reason`（如果 rejected）。

3. `Promise.race(promises)` —— 等待第一个 settle 的 promise，并将其 result/error 作为结果返回。

4. `Promise.any(promises)`（ES2021 新增方法）—— 等待第一个 fulfilled 的 promise，并将其结果作为结果返回。如果所有 promise 都 rejected，`Promise.any` 则会抛出 [`AggregateError`](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/AggregateError) 错误类型的 error 实例。

5. `Promise.resolve(value)` —— 使用给定 value 创建一个 resolved 的 promise。

6. `Promise.reject(error)` —— 使用给定 error 创建一个 rejected 的 promise。

## 模块

#### [重新导出](https://zh.javascript.info/import-export#zhong-xin-dao-chu)

```none
auth/
    index.js
    user.js
    helpers.js
    tests/
        login.js
    providers/
        github.js
        facebook.js
        ...
```

我们希望通过单个入口暴露包的功能。

换句话说，想要使用我们的包的人，应该只从“主文件” `auth/index.js` 导入。

像这样：

```javascript
import {login, logout} from 'auth/index.js'
```

“主文件”，`auth/index.js` 导出了我们希望在包中提供的所有功能。

这样做是因为，其他使用我们包的开发者不应该干预其内部结构，不应该搜索我们包的文件夹中的文件。我们只在 `auth/index.js` 中导出必要的部分，并保持其他内容“不可见”。

由于实际导出的功能分散在 package 中，所以我们可以将它们导入到 `auth/index.js`，然后再从中导出它们：

```javascript
// 📁 auth/index.js

// 导入 login/logout 然后立即导出它们
import {login, logout} from './helpers.js';
export {login, logout};

// 将默认导出导入为 User，然后导出它
import User from './user.js';
export {User};
...
```

现在使用我们 package 的人可以 `import {login} from "auth/index.js"`。

语法 `export ... from ...` 只是下面这种导入-导出的简写：

```javascript
// 📁 auth/index.js
// 重新导出 login/logout
export {login, logout} from './helpers.js';

// 将默认导出重新导出为 User
export {default as User} from './user.js';
...
```

`export ... from` 与 `import/export` 相比的显着区别是重新导出的模块在当前文件中不可用。所以在上面的 `auth/index.js` 示例中，我们不能使用重新导出的 `login/logout` 函数。

#### [重新导出默认导出](https://zh.javascript.info/import-export#zhong-xin-dao-chu-mo-ren-dao-chu)

重新导出时，默认导出需要单独处理。

## Proxy

一个 `Proxy` 对象包装另一个对象并拦截诸如读取/写入属性和其他操作，可以选择自行处理它们，或者透明地允许该对象处理它们。

#### get捕捉器

```javascript
let dictionary = {
  'Hello': 'Hola',
  'Bye': 'Adiós'
};

dictionary = new Proxy(dictionary, {
  get(target, phrase) { // 拦截读取属性操作
    if (phrase in target) { //如果词典中有该短语
      return target[phrase]; // 返回其翻译
    } else {
      // 否则返回未翻译的短语
      return phrase;
    }
  }
});

// 在词典中查找任意短语！
// 最坏的情况也只是它们没有被翻译。
alert( dictionary['Hello'] ); // Hola
alert( dictionary['Welcome to Proxy']); // Welcome to Proxy（没有被翻译）
```

#### set捕捉器

```javascript
let numbers = [];

numbers = new Proxy(numbers, { // (*)
  set(target, prop, val) { // 拦截写入属性操作
    if (typeof val == 'number') {
      target[prop] = val;
      return true;
    } else {
      return false;
    }
  }
});

numbers.push(1); // 添加成功
numbers.push(2); // 添加成功
alert("Length is: " + numbers.length); // 2

numbers.push("test"); // TypeError（proxy 的 'set' 返回 false）

alert("This line is never reached (error in the line above)");
```

## [Reflect](https://zh.javascript.info/proxy#reflect)

`Reflect` 是一个内建对象，可简化 `Proxy` 的创建。

## 自定义数据属性

自定义数据属性（Custom Data Attributes）是 HTML5 引入的一个特性，允许开发者在 HTML 元素上存储额外的信息。这些属性非常灵活，可以用于各种目的，比如存储配置信息、状态数据或者用于 JavaScript 操作的标识符。

以下是关于自定义数据属性的详细解释：

1. 语法：

   - 所有的自定义数据属性都以 "data-" 前缀开始
   - 后面跟随自定义的名称
   - 例如：`data-user-id`, `data-color`, `data-size`

2. 命名规则：

   - 属性名应该全部小写
   - 可以包含字母、数字、连字符（-）、点（.）、冒号（:）和下划线（_）
   - 不应该包含任何大写字母

3. 使用示例：

   ```html
   <div id="user" data-user-id="123" data-role="admin">John Doe</div>
   ```

4. 在 JavaScript 中访问：

   - 使用

      

     ```
     getAttribute()
     ```

      

     方法：

     ```javascript
     let el = document.getElementById('user');
     let userId = el.getAttribute('data-user-id');
     ```

   - 使用

      

     ```
     dataset
     ```

      

     属性（更现代的方法）：

     ```javascript
     let el = document.getElementById('user');
     let userId = el.dataset.userId;
     ```

     注意：使用

      

     ```
     dataset
     ```

      

     时，属性名会被转换为驼峰命名法

5. 在 CSS 中使用： 可以使用属性选择器来选择具有特定数据属性的元素：

   ```css
   [data-role="admin"] {
     background-color: yellow;
   }
   ```

6. 优点：

   - 允许存储自定义数据而不违反 HTML 标准
   - 提供了一种清晰的方式来区分自定义属性和标准 HTML 属性
   - 可以轻松地通过 JavaScript 访问
   - 不会影响页面的呈现

7. 常见用途：

   - 存储元素的初始状态或配置
   - 用于 JavaScript 库或框架的数据绑定
   - 存储用于动画或交互效果的参数
   - 为 A/B 测试存储变体信息

8. 注意事项：

   - 不应用于存储敏感或安全相关的数据，因为它们在 HTML 中是可见的
   - 过度使用可能导致 HTML 变得臃肿和难以维护

9. 浏览器支持： 几乎所有现代浏览器都支持自定义数据属性

自定义数据属性提供了一种灵活、标准化的方式来在 HTML 元素上附加额外信息，这些信息可以被 JavaScript 和 CSS 轻松访问和操作，使得前端开发更加灵活和强大。

## 事件委托

事件委托（Event Delegation）是一种常用的 JavaScript 事件处理模式。它利用了事件冒泡的机制，允许我们将事件监听器添加到一个父元素上，来管理所有子元素（甚至是动态添加的子元素）的某类事件。这种方法可以大大简化我们的代码，提高性能，并且使动态元素的事件处理变得更加容易。

下面我们来详细介绍事件委托：

1. 工作原理

事件委托的工作原理基于事件冒泡。当一个事件在 DOM 元素上触发时，它会首先在该元素上触发，然后冒泡到其父元素，一直到达文档的根节点。

通过在父元素上设置事件监听器，我们可以捕获子元素上发生的事件，并根据需要进行处理。

1. 优点

   a. 内存占用更少：不需要为每个子元素都添加事件监听器。 b. 动态元素处理：可以处理动态添加的元素，无需为新元素单独绑定事件。 c. 代码更简洁：减少了重复的事件绑定代码。 d. 提高性能：减少了事件监听器的数量，尤其在有大量子元素的情况下更明显。

2. 实现方法

基本的实现步骤如下：

a. 在父元素上添加事件监听器。 b. 在事件处理函数中，使用 event.target 确定实际触发事件的元素。 c. 根据需要对特定的子元素进行操作。

1. 示例代码

```html
<ul id="parent-list">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>

<script>
document.getElementById('parent-list').addEventListener('click', function(e) {
  if(e.target && e.target.nodeName == "LI") {
    console.log("List item ", e.target.textContent, " was clicked!");
  }
});
</script>
```

在这个例子中，我们在父元素 `<ul>` 上添加了点击事件监听器，而不是在每个 `<li>` 上都添加。当任何列表项被点击时，事件会冒泡到 `<ul>`，然后我们检查 `event.target` 是否是一个 `<li>` 元素，如果是，我们就知道一个列表项被点击了。

1. 注意事项

   a. 并非所有事件都冒泡（如 focus、blur 等），对这些事件使用事件委托可能会失效。 b. 过度使用可能导致代码复杂化，特别是当需要处理多层嵌套和复杂的条件判断时。 c. 在处理大量事件或复杂 DOM 结构时，可能需要考虑性能影响。

2. 应用场景

   a. 列表项的点击处理 b. 表格行的事件处理 c. 动态添加的元素的事件处理 d. 表单中多个相似输入框的验证

总之，事件委托是一种强大的事件处理模式，能够简化代码、提高性能，特别适用于需要处理大量相似元素或动态

## 判断是否整数

```javascript
Number.isInteger()
```

