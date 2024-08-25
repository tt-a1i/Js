## JSX和JS的区别

JSX 和 JavaScript (JS) 是在 React 开发中常常被提及的两个概念，它们在用途和特性上有一些明显的区别。

### JSX

1. **定义**：
   - JSX（JavaScript XML）是一种 JavaScript 的语法扩展。

2. **特性**：
   - **类 XML/HTML 的语法**：JSX 看起来很像 HTML 或 XML。这使得在 JavaScript 文件中编写用户界面布局变得直观。
   - **更加直观的 UI 构建**：用 JSX 可以直接在 JavaScript 中描述 UI 组件树，使得 UI 与逻辑紧密结合。
   - **转译阶段**：JSX 并不是原生支持的 JavaScript 代码。它需要通过 Babel 等工具转译成标准的 JavaScript 代码。这是因为浏览器不能直接理解 JSX 语法。
   - **表达式**：在 JSX 中可以嵌入 JavaScript 表达式，通过大括号 `{}` 包裹。
   - **组件树**：在 React 中，JSX 被用来描述组件树，利用类似 HTML 的语法定义 React 组件结构。

3. **示例**：
   ```jsx
   const element = <h1>Hello, world!</h1>;
   ```
   上面的 JSX 代码将被转译成类似如下的 JavaScript：
   ```js
   const element = React.createElement('h1', null, 'Hello, world!');
   ```

### JavaScript (JS)

1. **定义**：
   - JavaScript 是一种常规的编程语言，用于 web 开发，也适用于服务器端和桌面应用程序开发。

2. **特性**：
   - **基础语言**：它是现代 Web 浏览器中本地支持的脚本语言，用于实现动态功能。
   - **全面性**：JavaScript 拥有各种语法和特性，比如变量、条件语句、循环、函数、对象等等。
   - **与 DOM 交互**：JavaScript 可以直接操作 DOM，处理用户交互，做出动态响应。
   - **面向对象编程**：它支持原型继承和面向对象编程。
   - **无语法扩展限制**：它没有 XHTML/HTML 那样的嵌套语法限制。

3. **示例**：
   ```js
   const greeting = 'Hello, world!';
   console.log(greeting);
   ```

### 总结

- **用途**：JSX 专门用于 React 中用来描述 UI，提供了一种编写直观且紧密结合用户界面的方式。而 JavaScript 是通用编程语言，广泛应用于 web 开发。
  
- **执行**：JSX 需要转译为 JavaScript 才能被浏览器执行，而 JavaScript 可以直接运行在浏览器之中。

- **语法**：JSX 引入了类 HTML/XML 的结构到 JavaScript 中，而 JavaScript 本身则不具备这种结构。

理解这两者的差别以及 JSX 在 React 框架中的独特作用，可以帮助更有效编写和维护 React 应用程序。

## babel处理JSX的原理

Babel 是一个广泛使用的 JavaScript 编译器，它的主要功能之一是将 JSX 代码转译为纯 JavaScript，以便浏览器能够理解和执行。理解 Babel 如何处理 JSX 的过程可以帮助我们更好地理解 React 应用程序的工作原理。

### Babel 处理 JSX 的原理

1. **输入 JSX**：
   - 开发者在 React 项目中使用 JSX 来编写组件，它包含类似 HTML 的语法嵌入在 JavaScript 代码中。
   - 例如：
     ```jsx
     const element = <h1>Hello, world!</h1>;
     ```

2. **转译为 `React.createElement` 调用**：
   - Babel 通过插件（通常是 `@babel/preset-react`）将 JSX 转换为 JavaScript 函数调用。默认情况下，这些函数调用是 `React.createElement`。
   - 上面示例的 JSX 代码被转换为：
     ```js
     const element = React.createElement('h1', null, 'Hello, world!');
     ```
   - `React.createElement` 是 React 提供的一个 API，用于创建虚拟 DOM 元素。它接收三个参数：
     1. 元素类型：`'h1'` 表示 HTML 标签名。
     2. 属性（或 props）：`null` 表示没有传递任何属性。
     3. 子元素：`'Hello, world!'` 是这个元素的文本内容，也可以是其他子元素。

3. **生成更高版本 JavaScript**：
   - 随着 React 17 的推出，React 团队还引入了一种新的 JSX 转译 pragma，不再需要显式地引入 `React` 来使用 JSX。这种新方式通过 JSX 自动导入函数来促进代码的进行阶段性优化。这可以在 Babel 配置中通过选项来设置。
   - 例如，在 React 17 及以后通过 Babel 的新配置，`React.createElement` 调用会被优化为：
     ```js
     import { jsx as _jsx } from 'react/jsx-runtime';
     const element = _jsx('h1', { children: 'Hello, world!' });
     ```

4. **将转换后的代码插入产物**：
   - 完成对 JSX 的转译后，Babel 将生成的 JavaScript 插入到最终编译产物中。这些代码可以被现代浏览器直接理解和执行，懒获取和创建虚拟 DOM 节点。

5. **执行 React 机制**：
   - 转译为 JavaScript 的代码在浏览器中执行时，React 会根据 `React.createElement` （或新的 `_jsx`）调用生成虚拟 DOM 树，并通过它来进行页面的更新或 UI 的交互。

### 小结

通过 Babel 将 JSX 语法转译成 `React.createElement` 调用后，整个 React 应用的编写变得高效、直观。它使得开发者可以用更加贴近 HTML 的 JSX 语法构建以组件为单位的 UI 结构，同时确保代码可以在现代浏览器中高效运行。Babel 在这种转译流程中起到了关键作用，使得开发体验和实际代码执行效果都得到了优化。

## HTML解析过程中它里面的什么操作脚本文件会阻塞DOM的树的渲染

在 HTML 解析过程中，内嵌在 `<script>` 标签中的脚本文件会阻塞 DOM 树的渲染。具体的机制如下：

1. **解析过程**：浏览器从上到下顺序解析 HTML 文档。当遇到 `<script>` 标签时，默认情况下会暂停解析，先下载并执行脚本，然后再继续解析后续内容。

2. **阻塞原因**：因为 JavaScript 可以通过操控 DOM 来改动页面结构，浏览器需要先执行这些脚本以确保页面按预期展示。比如，脚本可能会插入新的元素或者修改现有元素的属性。

3. **同步（默认）脚本**：没有任何属性标记的普通 `<script>` 标签会导致阻塞行为，因为浏览器必须等待脚本执行完毕。

为了解决脚本阻塞的问题，可以考虑以下优化方案：

- **`defer` 属性**：对于 `<script>` 标签，添加 `defer` 属性，意味着脚本会在文档解析完毕后执行，而顺序执行多个含 `defer` 的脚本。`defer` 适用于不依赖 DOM 内容就绪的脚本。

- **`async` 属性**：添加 `async` 属性让脚本异步加载和执行。它表示脚本与文档的解析是并行进行的，适用独立于其他脚本的脚本任务。然而，脚本的执行顺序不固定。

通过合理使用 `defer` 和 `async`，可以减少脚本对页面渲染的阻塞影响，从而提升页面加载性能。

## typeof底层原理、instanceof原理

在 JavaScript 中，`typeof` 和 `instanceof` 是两种用于检查数据类型的操作符。它们在底层是如何工作的，可以从标准和实现的角度来理解。

### `typeof`

`typeof` 是一个操作符，用于返回一个字符串，表示未定义或基本类型的数值类型或对象的类型。其基本工作原理如下：

1. **基本数据类型**：对于基本数据类型，`typeof` 返回以下字符串：
   - `typeof undefined` 返回 `"undefined"`
   - `typeof 'string'` 返回 `"string"`
   - `typeof 42` 返回 `"number"`
   - `typeof true` 返回 `"boolean"`
   - `typeof Symbol()` 返回 `"symbol"`
   - `typeof BigInt(12345678901234567890n)` 返回 `"bigint"`

2. **特殊情况**：对于 `null`，`typeof` 返回 `"object"`。这是历史遗留问题，是因为在 JavaScript 初期的实现中，使用了固定大小的标签存储对象类型，而 `null` 被认为是零标签对象。

3. **函数**：对于函数，`typeof` 返回 `"function"`。

4. **对象**：对于其他对象，`typeof` 一律返回 `"object"`。这包括对象字面量、数组、日期对象等。

底层实现上，`typeof` 并不深入查看对象的结构，仅依据类型标记进行基本的判断。

### `instanceof`

`instanceof` 操作符用于测试一个对象在其原型链中是否存在某个构造函数的 `prototype` 属性。其工作原理如下：

1. **语法**：`object instanceof Constructor` 语法用于判断对象的原型链中是否有 `Constructor.prototype`。

2. **基本原理**：
   - 当 `instanceof` 被用在表达式中，首先会获取构造函数的 `prototype` 属性。
   - 然后，顺着对象的原型链（通过 `Object.getPrototypeOf` 或 `__proto__`），对比每一层对象的原型是否等于 `Constructor.prototype`。
   - 如果匹配成功，则返回 `true`，否则继续向上查找直到原型链的末端。
   - 如果到达 `null` 仍未匹配到，则返回 `false`。

3. **特殊情况**：如果用于检测非对象类型，比如基本数据类型数字、字符串等，`instanceof` 会返回 `false`，因为这些类型没有原型链。

在 JavaScript 引擎中，`instanceof` 操作主要依赖对象和构造函数原型之间的环状数据结构比较，确保对象是由特定构造函数创建，这样可以有效支持面向对象的编程风格在动态类型语言的应用。

总结以上：`typeof` 主要用于基本类型的检测，而 `instanceof` 更适用于对象所属类的检测。这两者在 JavaScript 编程中发挥不同但关键的作用。