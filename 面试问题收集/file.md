## 左侧固定宽度100px,右侧宽度占满空间,可以通过什么方式实现

#### Flexbox 布局

```javascript
<div class="container">
  <div class="left">Left</div>
  <div class="right">Right</div>
</div>
.container {
  display: flex;
}
.left {
  width: 100px;
  flex-shrink: 0;
}
.right {
  flex-grow: 1;
}
```

#### Grid 布局

```html
<div class="container">
  <div class="left">Left</div>
  <div class="right">Right</div>
</div>
.container {
  display: grid;
  grid-template-columns: 100px 1fr;
}
```

#### Float 布局

```html
<div class="container">
  <div class="left">Left</div>
  <div class="right">Right</div>
</div>
.container {
  overflow: hidden;
}
.left {
  float: left;
  width: 100px;
}
.right {
  margin-left: 100px;
}
```

#### 绝对定位

```html
<div class="container">
  <div class="left">Left</div>
  <div class="right">Right</div>
</div>
.container {
  position: relative;
}
.left {
  position: absolute;
  width: 100px;
}
.right {
  margin-left: 100px;
}
```

#### Table 布局

```html
<div class="container">
  <div class="left">Left</div>
  <div class="right">Right</div>
</div>
.container {
  display: table;
  width: 100%;
}
.left, .right {
  display: table-cell;
}
.left {
  width: 100px;
}
```

## flex属性

1. flex-grow

- 定义：决定 flex 项目相对于容器中其他 flex 项目如何增长。
- 取值：非负数字，默认为 0。
- 作用：当容器有多余空间时，flex-grow 值越大的项目会获得更多的剩余空间。

例如：

```css
.item1 { flex-grow: 1; }
.item2 { flex-grow: 2; }
```

在这个例子中，如果有多余空间，item2 会比 item1 获得两倍的额外空间。

1. flex-shrink

- 定义：决定 flex 项目相对于容器中其他 flex 项目如何收缩。
- 取值：非负数字，默认为 1。
- 作用：当容器空间不足时，flex-shrink 值越大的项目会收缩得更多。

例如：

```css
.item1 { flex-shrink: 1; }
.item2 { flex-shrink: 2; }
```

在这个例子中，如果空间不足，item2 会比 item1 收缩得更多。

1. flex-basis

- 定义：指定 flex 项目在主轴方向上的初始大小。
- 取值：长度值（如 px、em）、百分比或 auto（默认）。
- 作用：设置 flex 项目的基准尺寸，然后再应用 flex-grow 或 flex-shrink。

例如：

```css
.item { flex-basis: 200px; }
```

这会给项目一个 200px 的初始宽度（如果主轴是水平方向）。

flex 简写：

flex 属性是这三个属性的简写，顺序为 flex-grow、flex-shrink、flex-basis。

例如：

```css
.item { flex: 1 1 auto; }
```

常用的简写值：

- `flex: 1;` 等同于 `flex: 1 1 0%;`，允许项目增长和收缩。
- `flex: auto;` 等同于 `flex: 1 1 auto;`，类似于上面，但考虑项目的内容尺寸。
- `flex: none;` 等同于 `flex: 0 0 auto;`，创建不可伸缩的项目。
- `flex: 0 auto;` 或 `flex: initial;` 等同于 `flex: 0 1 auto;`，是默认值。

## 怎么算选择器权重

选择器权重的计算方法：

1. 内联样式：1000 分
2. ID 选择器：100 分
3. 类选择器、属性选择器、伪类：10 分
4. 元素选择器、伪元素：1 分
5. 通配符(*)、组合器（如 >、+、~）：0 分

计算步骤：

1. 统计选择器中每种类型的数量
2. 按照上述分值计算总分
3. 比较不同选择器的总分

例子：

1. `#nav .list li a:hover`
   - 1 个 ID 选择器：100
   - 1 个类选择器：10
   - 2 个元素选择器：2
   - 1 个伪类：10 总分：100 + 10 + 2 + 10 = 122
2. `body #content .data img:hover`
   - 1 个 ID 选择器：100
   - 1 个类选择器：10
   - 2 个元素选择器：2
   - 1 个伪类：10 总分：100 + 10 + 2 + 10 = 122
3. `div p .class`
   - 1 个类选择器：10
   - 2 个元素选择器：2 总分：10 + 2 = 12

注意事项：

1. `!important `声明会覆盖所有其他声明，应谨慎使用。
2. 如果`权重相同`，`后面`的规则会`覆盖前面`的规则。
3. `继承`的样式`没有权重`。
4. `通用选择器`（*）、`组合器`（+、>、~、空格）和`否定伪类`（:not()）`对优先级没有影响`。

## 怎么判断变量是否为数组

1. `Array.isArray()` 方法

这是最推荐的方法，因为它是专门用来检测数组的。

```javascript
Array.isArray([1, 2, 3]);  // 返回 true
Array.isArray({});         // 返回 false
```

1. `instanceof `操作符

```javascript
let arr = [1, 2, 3];
arr instanceof Array;  // 返回 true
```

注意：这种方法在跨窗口或跨框架的情况下可能会失效。

1. `Object.prototype.toString.call()`

这是一种更通用的方法，可以检测多种类型。

```javascript
Object.prototype.toString.call([1, 2, 3]) === '[object Array]';  // 返回 true
```

1. 检查 `constructor` 属性

```javascript
let arr = [1, 2, 3];
arr.constructor === Array;  // 返回 true
```

1. 检查 length 属性和数字索引（不太可靠）

```javascript
function isArray(obj) {
    return obj && 
           typeof obj === 'object' && 
           typeof obj.length === 'number' && 
           !(obj.propertyIsEnumerable('length'));
}
```

这种方法不太可靠，因为类数组对象也可能通过这个测试。

1. ES6+ 的扩展运算符

```javascript
const isArray = obj => !!obj && obj.constructor === Array;
```

## 304

HTTP 304 状态码代表`"Not Modified"（未修改）`，这是一个非常重要的优化相关的状态码。它主要`用于缓存验证`，其含义和用途如下： 

1. 含义： 304 状态码表示`客户端 `发送了一个`条件性GET请求`，服务器判断`请求的资源未被修改`，可以直接使用客户端`已缓存的版本`。
2. 工作原理：
   - 客户端在`请求头中包含条件验证信息`（如` If-Modified-Since `或 If-None-Match）。
   - `服务器检查`资源`是否被修改`。
   - 如果资源`未被修改`，服务器`返回 304` 状态码，`不返回资源`内容。
   - 客户端`收到 304 `响应后，`使用本地缓存`的版本。
3. 主要用途：
   - 减少网络传输：避免重复传输未修改的资源。
   - 提高加载速度：使用本地缓存比重新下载更快。
   - 节省带宽：减少不必要的数据传输。
4. 相关的`请求头`：
   - `If-Modified-Since`：`基于时间的验证`。
   - If-None-Match：基于 ETag 的验证。
5. 相关的`响应头`：
   - `Last-Modified`：`资源的最后修改时间`。
   - `ETag`：`资源的唯一标识符`。
6. `流程`：
   - 浏览器`首次请求一个页面`。
   - 服务器`返回页面内容`，并`包含 Last-Modified` 或 `ETag 头`。
   - 浏览器`缓存这个页面`。
   - `下次请求同一页面时`，`浏览器发送`包含 `If-Modified-Since 或 If-None-Match` 的请求。
   - 如果`页面未修改`，服务器`返回 304 状态码`。
   - 浏览器`使用缓存的版本`。
7. 优点：
   - 提高网站性能和响应速度。
   - 减少服务器负载。
   - 节省带宽和流量费用。
8. 注意事项：
   - 304 响应通常不包含响应体。
   - 即使返回 304，也可能更新缓存相关的头信息。
9. 实现：
   - 服务器端需要正确实现条件请求的处理逻辑。
   - 客户端（如浏览器）需要正确处理 304 响应。

总之，HTTP 304 状态码是一种重要的性能优化机制，通过有效利用客户端缓存来减少不必要的数据传输，从而提高 Web 应用的整体性能和用户体验。

## TCP和UDP的区别

TCP和UDP的主要区别：

1. 连接：
   - TCP: `面向连接`，需要`先建立连接`再`传输数据`
   - UDP: `无连接`，`直接发送`数据
2. 可靠性：
   - TCP: `可靠`传输，保证`数据完整性`和`顺序`
   - UDP:` 不保证可靠`传输，可能`丢包`、`乱序`
3. 传输速度：
   - TCP: 相对`较慢`，因为有`各种控制机制`
   - UDP: `较快`，没有额外的控制开销
4. 数据边界：
   - TCP: 面向`字节流`，不保留数据边界
   - UDP: 面向`报文`，保留数据边界
5. 流量控制：
   - TCP: 有流量控制机制
   - UDP: 无流量控制
6. 拥塞控制：
   - TCP: 有拥塞控制机制
   - UDP: 无拥塞控制
7. 错误检测：
   - TCP: 有错误检测和纠正机制
   - UDP: 仅有简单的错误检测，不进行纠正
8. 应用场景：
   - TCP: `适用于`要求`可靠传输`的应用，如网页浏览、`文件传输`、`电子邮件`等
   - UDP: 适用于`实时性`要求高、`允许少量丢包`的应用，如`视频流`、`在线游戏`、VoIP等
9. 首部开销：
   - TCP: `首部至少20字节`
   - UDP: 首部仅`8字节`，开销小
10. 数据传输方式：
    - TCP: `全双工`，`双向传输`
    - UDP: 支持`一对一`、`一对多`、`多对一`和`多对多`交互通信
11. 状态维护：
    - TCP: 需要在端系统中维护连接状态
    - UDP: 无状态

## 事件循环例题

```javascript
async function async1(){
    console.log('async1 start');
    await async2()
    console.log('async1 end');
}

async function async2(){
    console.log('async2');
}

console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0)

async1()

new Promise(function (resolve){
    console.log('promise1');
    resolve()
}).then(function(){
    console.log('promise2');
})

console.log('script end');
```

这段代码涉及到 JavaScript 的事件循环、宏任务、微任务以及 async/await 的执行机制。让我们逐步分析输出顺序：

首先执行同步代码：

打印 "script start"

遇到 setTimeout，将其回调函数放入宏任务队列

调用 async1 函数：

打印 "async1 start"

遇到 await async2()，执行 async2 函数

打印 "async2"

async2 函数结束，返回一个 Promise

await 使 async1 函数剩余部分被放入微任务队列

遇到 new Promise，执行其中的同步代码：

打印 "promise1"

调用 resolve()，将 then 中的回调放入微任务队列

执行最后一行同步代码：

打印 "script end"

同步代码执行完毕，开始执行微任务队列：

执行 async1 函数剩余部分，打印 "async1 end"

执行 Promise 的 then 回调，打印 "promise2"

微任务队列清空，执行宏任务队列：

执行 setTimeout 的回调，打印 "setTimeout"

因此，最终的输出顺序是：

script start

async1 start

async2

promise1

script end

async1 end

promise2

setTimeout

这个顺序反映了 JavaScript 的事件循环机制：先执行同步代码，然后执行微任务，最后执行宏任务。

async/await 本质上是 Promise 的语法糖，await 后面的代码相当于放在 Promise.then 中执行，因此也是作为微任务处理的。 

## Vue3的响应式是如何实现的

Vue3的响应式系统是基于`ES6`的`Proxy`实现的，这是一个重大改进，相比`Vue2`使用的`Object.defineProperty()`方法有很多`优势`

#### Proxy 代理：

Vue3 使用 `Proxy` 来`创建响应式对象`。Proxy 可以`拦截对象的基本操作`，如`属性读取`、`赋值`、`删除`等。

Vue3使用`Proxy`来`创建`一个`对原始对象的代理`。这个`代理可以拦截`并`处理各种操作`，如`属性读取`、`设置`、`删除`等。

1. 基本原理

- 当你`访问或修改响应式对象的属性`时，`Proxy的get和set`陷阱会`被触发`。
- `在get陷阱中`，Vue会`追踪依赖`（即记录`哪些效果或计算属性依赖于这个属性`）。
- 在`set陷阱中`，Vue会`触发更新`，`通知所有依赖于这个属性的效果重新运行`。

1. 嵌套对象的处理

Vue3`能够自动地、递归地将嵌套对象转换为响应式`，这是通过在get陷阱中按需转换实现的。

1. `集合类型的支持`

Vue3还为Map、Set、WeakMap和WeakSet提供了完全的响应式支持。

#### 相比Vue2，Vue3的响应式系统有以下优势：

- 可以`检测到属性的添加和删除`
- 可以`检测数组索引和长度`的变化
- 可以`支持Map、Set`等数据结构
- `性能更好`，尤其是对于大型对象
- 消除了Vue2中的一些边缘情况和限制

#### 为什么性能更好

1. Proxy `可以直接监听整个对象`，而不需要递归遍历每个属性
2. `惰性观察`策略,一个`嵌套对象被访问时`，它`才会被转换为响应式`
3. `依赖跟踪更精确`，可以精确到 `property 级别`,`数据变化时`，`只有直接相关的组件会更新`，而`不是整个组件树`
4. `更好`的 `Tree-shaking` 支持
5. 更好的`类型推断`
6. `编译优化`,Vue3 的`模板编译器`能生成`更优化的渲染函数`。

## 盒子模型

描述了 HTML `元素`在`文档布局中`所`占空间`的`计算方式`。`每个 HTML 元素都可以被视为一个盒子`，由以下部分组成：

1. `内容`区域（Content）：包含元素的实际内容，如文本、图像等。
2. `内边距`（Padding）：内容区域与边框之间的空间。
3. `边框`（Border）：围绕在内边距和内容区域外的边界。
4. `外边距`（Margin）：盒子与其他元素之间的空间。

盒子模型有两种主要类型：

1. `标准盒子模型`（Standard Box Model）：
   - 元素的宽度和高度只包括内容区域。
   - 总宽度 = `width `+ `padding `+ `border `+ `margin`
   - 总高度 = height + padding + border + margin
2. IE 盒子模型（IE Box Model）或`怪异盒子模型`：
   - 元素的宽度和高度包括内容、内边距和边框。
   - 总宽度 = `width `(包含 padding 和 border) + `margin`
   - 总高度 = height (包含 padding 和 border) + margin

即`IE盒模型`的`width`为`content `+ `padding `+ `border`

在 CSS3 中，可以使用 `box-sizing` 属性来控制盒子模型的类型：

- box-sizing: ` content-box;` （默认值）使用`标准`盒子模型
- box-sizing: `border-box;` 使用` IE `盒子模型

## 浏览器的事件循环

浏览器的`事件循环`（`Event Loop`）是 JavaScript `运行时环境`中`处理异步操作`的`机制`。它确保了 JavaScript 的`单线程`执行模型能够高效地`处理异步任务`，而`不`会`阻塞主线程`。以下是事件循环的主要组成部分和工作原理：

1. 调用栈（Call Stack）：
   - 用于存储正在执行的函数调用。
   - 遵循后进先出（LIFO）的原则。
2. 堆（Heap）：
   - 用于存储对象，是内存分配发生的地方。
3. 任务队列（Task Queue）：
   - 也称为`宏任务队列`（Macrotask Queue）。
   - 存储待执行的任务（如 `setTimeout`、`setInterval `的回调、`DOM 事件`等）。
4. `微任务队列`（Microtask Queue）：
   - 存储优先级更高的任务（如 `Promise `的回调、`MutationObserver `等）。

事件循环的工作`流程`：

1. `执行调用栈`中的`同步代码`。
2. `调用栈为空`时，`检查微任务队列`：
   - 如果`微任务队列不为空`，`依次执行`所有`微任务`。
   - 执行`过程中`新`产生的微任务`也会被`添加到队列末尾`并`执行`。
3. `微任务队列清空后`，从任务队列中取出一个宏任务执行。
4. 重复步骤 2-3，直到both3. 微任务队列清空后，从任务队列中取出一个任务执行。
5. 重复步骤 2-3，直到所有队列都为空。

重要概念：

1. `宏任务`（Macrotasks）：
   - `setTimeout`, `setInterval`, `setImmediate`
   - `I/O 操作`
   - `UI 渲染`
   - `requestAnimationFrame`
2. `微任务`（Microtasks）：
   - `Promise`.then(), Promise.catch(), Promise.finally()
   - `MutationObserver`
   - queueMicrotask()
   - `process.nextTick` (Node.js)
3. 任务`优先级`： `微任务`==总是在==`下一个宏任务之前`==执行==。
4. `渲染时机`： `浏览器`通常会在`执行完一个宏任务`和`所有可用的微任务`后`进行页面渲染`。
5. 事件循环与异步编程： `事件循环`==使得 JavaScript 能够执行`非阻塞`的异步操作==。
6. 单线程模型： 尽管 JavaScript 是单线程的，但==通过事件循环可以模拟并发==。

示例：

```javascript
console.log('1'); // 同步代码

setTimeout(() => {
    console.log('2'); // 宏任务
}, 0);

Promise.resolve().then(() => {
    console.log('3'); // 微任务
});

console.log('4'); // 同步代码

// 输出顺序：1, 4, 3, 2
```

理解事件循环对于编写高效的异步代码和理解 JavaScript 的执行顺序至关重要。它帮助开发者避免阻塞主线程，提高应用的响应性和性能。

## 浏览器输入url之后发生了什么

1. - `URL 解析`

   - 浏览器`解析` URL 的`各个部分`：`协议`、`域名`、路径等。
   - 检查 HSTS（HTTP严格传输安全）列表。

   1. `DNS 解析`

   - 浏览器`检查本地 DNS 缓存`。
   - `如果`缓存中`没有`，`向 DNS 服务器`发起`请求`，`获取 IP 地址`。

   1. `TCP 连接`

   - 与`目标 IP 地址`建立 `TCP 连接`（三次握手）。
   - 如果是` HTTPS`，还需要进行 `TLS 握手`。

   1. `发送 HTTP 请求`

   - `浏览器``构造 HTTP 请求报文`。
   - `添加请求头`，如 User-Agent、`Cookie `等。

   1. `服务器处理请求并返回 HTTP 响应`

   - 服务器处理请求，可能涉及数据库查询、业务逻辑处理等。
   - 服务器`返回 HTTP 响应`，包含`状态码`、`响应头`和`响应体`。

   1. `浏览器处理响应`

   - `根据响应头`中的 `Content-Type `解析`响应体`。
   - 如果是重定向（3xx），则重新发起新的请求。

   1. `解析 HTML`

   - `构建 DOM`（文档对象模型）`树`。
   - `遇到外部资源`（如 `CSS`、`JavaScript`、`图片`）时，`发起新的请求`。

   1. `解析 CSS`

   - `构建 CSSOM`（CSS 对象模型）`树`。
   - `结合 DOM 树和 CSSOM 树`，`生成渲染树`（Render Tree）。

   1. `布局`（Layout）

   - `计算`每个`可见元素`的`精确位置`和`大小`。

   1. `绘制`（Paint）

   - 将`渲染树`中的`各个节点`绘制到`屏幕上`。

   1. 合成（Compositing）

   - 将`不同`的`绘制层合成到一起`。

   1. JavaScript 执行

   - `解析并执行 JavaScript 代码`。
   - `可能会修改 DOM 和 CSSOM`，`触发`重新布局、`绘制或合成`。

   1. 加载完成

   - 触发 window.onload 事件。

## 浏览器是如何渲染网页的

浏览器渲染网页是一个复杂的过程，主要包括以下几个关键步骤：

1. `解析 HTM`L（Parsing HTML）
   - 浏览器从服务器接收到HTML文档后，开始解析HTML。
   - `构建DOM`（Document Object Model）`树`，表示文档的结构。
2. `解析 CSS`（Parsing CSS）
   - 解析外部CSS文件和<style>标签中的样式。
   - `构建CSSOM`（CSS Object Model）`树`。
3. `构建渲染树`（Render Tree Construction）
   - 将D`OM和CSSOM结合`，`创建渲染树`。
   - 渲染树只包含需要显示的节点及其样式信息。
4. 布局（Layout）
   - `计算`每个`可见元素`的`精确位置`和`大小`。
   - 这个过程也称为"`回流`"（Reflow）。
5. 绘制（Painting）
   - 将`渲染树中的各个节点`绘制到`屏幕`上。
   - 这个过程涉及填充像素的过程。
6. 合成（Compositing）
   - 将`页面的不同部分分层`，`分别进行绘制`，然后在`屏幕上进行合成`。

## 垃圾回收机制

#### 标记清理

1. `从根对象`（如程序的全局变量、当前执行栈中的变量等）开始，通过`递归`的方式`遍历并标记`所有`可达对象`。可达对象是指从根对象出发，`通过引用关系可以访问到的对象`。
2. **清理阶段（Sweep Phase）**：对堆内存进行线性扫描，`未被标记的对象即为垃圾对象`，将这些垃圾对象所占用的内存`空间回收`。
3. `可以处理循环引用`的情况

#### 引用计数

1. 为每个对象`维护一个引用计数器`，当`有新的引用指向该对象`时，引用`计数器加 1`；当某个引用`不再指向`该对象时，引用计`数器减 1`。当对象的引用计数器变`为 0 时`，该对象就被`认定为垃圾对象`，其占用的内存可以被回收。
2. 可以`实时进行`，不需要暂停整个应用程序的执行
3. `无法处理循环引用`问题

## 宏任务与微任务



## 进程和线程的区别和联系

`进程`：是计算机中的程序关于某数据集合上的一次运行活动，是`系统进行资源分配和调度`的`基本单位`。

`线程`：是进程的一个`执行流`，是`CPU调度和分派的基本单位`。一个`进程`可以`包含多个线程`。

#### 主要区别：

##### 资源占用：

- 进程是`资源分配`的`最小单位`，每个`进程`都有`自己`的`独立内存空间`。
- 线程是`CPU调度`的`最小单位`，`同一进程中`的`多个线程共享`该`进程的内存空间`。

##### 开销：

- `进程`的`创建`、`切换`和`销毁`的`开销较大`。
- `线程`的`创建`、`切换`和`销毁`的`开销较小`。

##### 通信：

- 进程间`通信相对复杂`，需要使用IPC（进程间通信）机制。
- `同一进程内`的`线程通信更简单`，可以`直接读写进程数据`。

#### 安全性：

- `进程间相互独立`，`一个进程崩溃不会影响其他进程`。
- `线程间`共`享进程资源`，`一个线程崩溃`可能`导致整个进程崩溃`。

#### 在前端开发中的应用：

##### 浏览器架构：

- 现代浏览器通常采用多进程架构。主要包括`浏览器进程`、`渲染进程`、`插件进程`等。
- 在`渲染进程`中，包含`多个线程`，如`JS引擎线程`、`渲染线程`、`事件触发线程`等。

##### JavaScript的单线程：

- `JavaScript是单线程执行的`，这意味着在`同一时间`只能`执行一个任务`。
- 虽然JavaScript是单线程的，但`浏览器是多线程`的，这使得`异步操作成为可能`。

##### Web Workers：

- `Web Workers 允许`在`浏览器中创建后台线程`，`执行耗时的计算`而`不影响用户界面`。
- 虽然称为"workers"，但它们实际上是`轻量级的进程`，而`不是线程`。

#### 联系：

- `线程是进程内的执行单元`，`每个进程至少包含一个线程`。
- `进程和线程`都是`操作系统进行任务调度`的`基本单位`，只是`粒度不同`。

## 进程之间的通信有哪些

1. 管道（Pipe）和命名管道（Named Pipe）:
   - `管道`是最简单的 IPC 方式，通常用于`父子进程间通信`。
   - 在前端开发中，我们可能在使用 Node.js 的 child_process 模块时遇到管道通信。
2. `消息队列`（Message Queue）:
   - 进程可以`向队列写入消息`，`其他进程`可以`读取`。
   - Web 应用中的消息队列概念（如 Service Worker 的消息传递）与此类似，但实现方式不同。
3. `共享内存`（Shared Memory）:
   - `多个进程`可以`访问同一块内存区域`。
   - 在 Web 中，SharedArrayBuffer API 提供了类似的功能，允许在主线程和 Web Worker 之间共享二进制数据。
4. `信号`（Signal）:
   - 用于`通知接收进程`某个`事件已经发生`。
   - 在浏览器环境中没有直接对应，但可以类比为事件系统。
5. 套接字（Socket）:
   - 可用于同一机器上的进程通信，也可用于网络通信。
   - Web Sockets 在概念上类似，允许浏览器与服务器之间进行全双工通信。
6. 远程过程调用（RPC）:
   - 允许一个进程调用另一个进程的子程序。
   - 在 Web 开发中，可以类比为 AJAX 请求或 gRPC-Web。

## 为什么TCP需要三次握手才能建立连接

#### TCP 三次握手的主要目的：

1. `确保双方的发送和接收能力都正常`。
2. 同步双方的序列号和确认号。
3. 协商一些参数（如窗口大小）。

#### 三次握手的过程：

1. 第一次握手（SYN）：
   - 客户端发送一个 SYN（同步）包到服务器。
   - 这个包包含客户端的初始序列号（ISN）。
2. 第二次握手（SYN + ACK）：
   - 服务器收到 SYN 包后，回复一个 SYN-ACK 包。
   - 这个包确认了客户端的 SYN，并包含服务器自己的 SYN（初始序列号）。
3. 第三次握手（ACK）：
   - 客户端收到 SYN-ACK 后，回复一个 ACK 包。
   - 这个包确认了服务器的 SYN。

#### 为什么需要三次握手：

`第一次握手`:`客户端向服务器`发送,`客户端`可以`确认`自己`发送能力正常`,`服务端`能`确认`自己`接受能力正常`

`第二次握手`:`服务端`向`客户端`发送,到此次发送后,`客户端`能确认自己`接受正常`,`发送正常`,`服务端`确认自己`接受能力正常`,但是`还不知道客户端有没有接收到,``不能确认`自己`发送能力正常`

`第三次握手`:`客户端`发送,`服务器收到后`能`确认`自己`发送能力也正常`,此时`双方都能确认发送和接受正常`

1. 防止旧的重复连接初始化造成混乱：
   - 如果网络中存在延迟的重复 SYN 包，三次握手可以防止旧的无效连接请求被接受。
2. 同步双方的初始序列号：
   - 双方都需要告知对方自己的初始序列号，并确认收到对方的序列号。
3. 防止资源浪费：
   - 如果只有两次握手，服务器在发送 SYN-ACK 后就认为连接建立，而客户端可能并未收到。这会导致服务器浪费资源等待不会到来的连接。
4. 确保双向通信：
   - `三次握手保证了双方都有发送和接收的能力`。

## 为什么TCP需要四次挥手

1. **第一次挥手**：`客户端`向`服务器`发送一个`结束信号`（FIN），`表示客户端没有数据发送了`，但`仍能接收`数据。
2. **第二次挥手**：`服务端`接收到`客户端`的FIN之后，发送一个`确认信号`（ACK）。不过，此时`服务端可能仍有数据需要发送给客户端`，所以`连接仍需保持开放状态直至服务端数据全部发送`完成。
3. **第三次挥手**：`服务端`数据`发送完毕后`，向`客户端`发送一个`结束信号`（FIN），表示`服务器端也没有数据要发送`了，`准备关闭连接`。
4. **第四次挥手**：`客户端`收到`服务端`的FIN后，发送一个`确认信号`（ACK），`结束`整个通信过程。

四次挥手确保了在TCP连接中，`双方能够独立地关闭自己的发送和接收通道`。由于TCP连接是`全双工`的，意味着双方的发送和接收操作是独立的。因此，每一方在结束它们的发送操作后，必须独立地接收对方的确认，这就是为何断开连接需要四次挥手的原因。这个过程`保证了数据传输的完整性`和`正确关闭连接的确认动作`。

## 什么是全双工

全双工（Full Duplex）是指通信网络中的一种数据传输方式，其中`通信双方可以同时发送和接收信息`，而`不会互相干扰`。在全双工模式下，数据可以在两个方向上同时流动，`类似于两条独立的单向通道`。

### 全双工的主要特点：

1. **双向同时通信**：全双工允许在两个方向上同时进行数据发送和接收，因此，通信设备`一边发送数据`，`同时也能够接收对方的数据`。
2. **高效的数据流动**：由于允许同时双向通信，全双工通常提供较高的通信效率和速度，尤其适用于需要高速双向数据交换的应用。
3. **独立的传输通道**：全双工系统通常有两个独立的信道，一个用于发送，另一个用于接收，或者通过技术手段在同一信道上同时处理发送和接收的数据。

### 应用案例

- **`电话通话`**：在电话通话中，两个用户可以同时说话和听话，而不需要等对方停止说话之后才能开始说话。
- **网络交换器（Switch）和`路由器`**：这些网络设备通常支持全双工，可以提高网络的数据传输效率和速度。

### 与半双工和单工的比较

- **`单工`（Simplex）**：数据`只能在一个方向上流动`，如传统的`广播电视`，`只有发送端到接收端`的单向传输。
- **`半双工`（Half Duplex）**：数据`能在两个方向上传输`，`但在任何给定时刻只能在一个方向上进行`。通信设备使用同一个信道交替进行发送和接收。例如，`对讲机`就是典型的半双工通信设备。

全双工模式因其能有效提升通信效率而广泛应用于现代通信系统中，特别是在那些对时延和速度要求较高的场合。



## OSI 七层模型每一层是什么,分别做了什么事情

OSI 七层模型从`底层到顶层`分别是：

1. `物理`层 (Physical Layer)
   - 主要功能：`传输比特流`（0和1）。
   - 设备：`网线`、`光纤`、中继器等。
   - 作用：`定义物理设备如何传输数据`。
2. `数据链路`层 (Data Link Layer)
   - 主要功能：`将比特流分组为帧`，进行`错误检测和纠正`。
   - 协议：`以太网协议`、PPP等。
   - 作用：确保`相邻设备之间的可靠传输`。
3. `网络`层 (Network Layer)
   - 主要功能：负责`数据包的路由和转发`。
   - 协议：`IP`、`ICMP`等。
   - 作用：`确定数据从源到目的地的路径`。
4. `传输`层 (Transport Layer)
   - 主要功能：`提供端到端的可靠数据传输`。
   - 协议：`TCP`、`UDP`。
   - 作用：`确保数据的可靠性和完整性`。
5. `会话`层 (Session Layer)
   - 主要功能：`建立`、`管理和终止会话`。
   - 作用：`控制会话的建立`、`维护和结束`。
6. `表示`层 (Presentation Layer)
   - 主要功能：`数据的表示`、`加密和压缩`。
   - 作用：确保`不同系统的数据可以相互理解`。
7. `应用`层 (Application Layer)
   - 主要功能：`为应用程序提供网络服务`。
   - 协议：`HTTP`、`FTP`、SMTP等。
   - 作用：`直接与用户交互的接口`。

## http报文都有哪些东西

HTTP 报文分为`请求报文`和`响应报文`，它们的`结构有所不同`，但`也有共同的部分`

#### HTTP `请求报文`的结构：

1. `请求行`（Request Line）

   - `HTTP 方法`（`GET`、`POST`、`PUT`、`DELETE `等）
   - `请求 URL`
   - `HTTP 版本`

   例如：`GET /index.html HTTP/1.1`

2. `请求头`（Request Headers）

   - `Host`：指定请求的`服务器域名`
   - `User-Agen`t：`客户端信息`
   - `Accept`：客户端`可接受`的`内容类型`
   - `Cookie`：客户端存储的 Cookie 信息
   - `Content-Type`：请求体的 `MIME `类型（用于 POST 请求）
   - `Authorization`：身份认证信息

3. `空行`

   - 用于`分隔请求头和请求体`

4. `请求体`（`Request Body`，可选）

   - 用于 `POST`、`PUT `等方法，`包含发送的数据`

MIME类型（Multipurpose Internet Mail Extensions）是`一种标准`，`用于表示文档`、`文件或字节流`的`性质和格式`

MIME类型的格式通常是`type/subtype`，其中`type`表示数据的`总体类别`，`subtype`表示`具体的格式`。例如：

- `text/plain`：`纯文本`
- `text/html`：`HTML文档`
- `image/jpeg`：`JPEG图像`
- `application/json`：`JSON数据`
- `application/pdf`：`PDF文档`

#### HTTP 响应报文的结构：

1. `状态行`（Status Line）

   - `HTTP 版本`
   - `状态码`（如 200、404、500 等）
   - 状态消息

   例如：`HTTP/1.1 200 OK`

2. `响应头`（Response Headers）

   - `Content-Type`：返回内容的 MIME 类型
   - `Content-Length`：响应体的长度
   - Set-Cookie：设置客户端 Cookie
   - Cache-Control：缓存控制
   - `Access-Control-Allow-Origin`：`CORS `相关

3. `空行`

   - 用于`分隔响应头和响应体`

4. `响应体`（Response Body）

   - `返回的实际内容`，如 HTML、JSON 等

## get请求会被浏览器缓存吗

`GET 请求通常会被浏览器缓存`，但这取决于多个因素：

1. 默认行为：
   - 浏览器`默认会缓存 GET 请求的响应`，`除非有特定的 HTTP 头指示不要缓存`。
2. 缓存控制：
   - `服务器可以通过设置特定的 HTTP 响应头`来`控制缓存行为`。
   - 关键的响应头包括：`Cache-Control`, `Expires`, ETag, 和` Last-Modified`。
3. `Cache-Control 头`：
   - '`no-store`'：`完全禁止缓存`。
   - '`no-cache`'：`每次都需要向服务器验证`缓存是否有效。
   - '`max-age`'：`指定缓存的最大有效期`。
4. `Expires `头：
   - 指定一个明确的`过期日期`。
5. `ETag `和 `If-None-Match`：
   - 用于`验证缓存是否仍然有效`。
6. `Last-Modified` 和 If-Modified-Since：
   - `基于最后修改时间来验证缓存`。

在前端开发中的应用：

1. 性能优化：
   - 合理利用缓存可以显著提高网页加载速度。
   - 对于不经常变化的资源（如图片、CSS、JS文件），我们可以设置较长的缓存时间。
2. 实时数据：
   - 对于需要实时更新的数据，我们可能需要禁用缓存或使用其他策略（如添加时间戳到URL）。
3. 版本控制：
   - 当更新静态资源时，我们可以通过改变文件名或URL来强制客户端重新请求新版本。
4. 调试：
   - 在开发过程中，缓存可能会导致看不到最新的更改，这时我们可能需要禁用缓存或强制刷新。
5. Single Page Applications (SPA)：
   - 在 SPA 中，我们需要特别注意 API 请求的缓存策略，以确保数据的实时性。
6. 离线应用：
   - 利用缓存，我们可以实现 Progressive Web Apps (PWA)，使应用在离线状态下仍然可用。

需要注意的是：

- `POST 请求通常不会被缓存`，`因为`它们`可能会修改服务器状态`。
- 即使是` GET 请求`，如果`包含认证信息（如 Authorization 头）`，也`可能不会被缓存`。

## url有长度限制吗

`URL 确实有长度限制`，但这个限制并不是由 HTTP 协议本身定义的。实际上，URL 的长度限制主要取决于以下几个因素：

1. 浏览器限制：
   - `不同的浏览器对 URL 长度有不同的限制`。
   - 例如，`Chrome 允许最长 2MB 的 URL`，而 `Internet Explore`r 的限制大约是` 2083 个字符`。
2. 服务器限制：
   - `Web 服务器如 Apache 或 Nginx 可能会对 URL 长度设置限制`。
   - 这些限制可以通过服务器配置来调整。
3. 客户端操作系统：
   - 某些`操作系统`可能对 URL 长度有额外的限制。
4. 防火墙和代理：
   - `网络设备`可能会对超长 URL 进行截断或阻止。

在实际开发中的考虑：

1. GET 请求的限制：
   - `GET 请求的参数是附加在 URL `上的，因此特别`容易受到 URL 长度限制的影响`。
   - 当需要`传输大量数据`时，应考虑`使用 POST `请求。
2. RESTful API 设计：
   - 在设计 API 时，应该避免使用过长的 URL。
   - 考虑使用查询参数或请求体来传递复杂数据。
3. 前端表单提交：
   - 对于包含大量字段的`表单`，应该`优先使用 POST `方法而不是 GET。
4. `安全性`考虑：
   - `过长的 URL` 可能`会在日志文件`、`浏览器历史`等地方`泄露敏感信息`。
5. `SEO 影响`：
   - `搜索引擎可能会忽略或降低过长 URL 的权重`。
6. 用户体验：
   - 过长的 URL 不利于分享和手动输入。
7. 缓存问题：
   - 非常长的 URL 可能会影响缓存效率，因为每个唯一的 URL 都被视为不同的资源。

## 为什么当需要传输大量数据时，应考虑使用 POST 请求

当需要传输大量数据时，我们推荐使用 POST 请求而不是 GET 请求，主要有以下几个原因：

1. 数据大小限制：
   - `GET 请求的参数是附加在 URL 上`的，而 `URL 长度是有限制`的。
   - `POST 请求将数据放在请求体中，理论上没有大小限制`（实际上可能受服务器配置限制）。
2. 安全性：
   - `GET 请求的参数会显示在 URL` 中，可能被`记录在浏览器历史、服务器日志`等处。
   - `POST 请求的数据在请求体中`，`相对更安全`，不易被无意中泄露。
3. 数据类型：
   - `GET 主要用于传输简单的文本数据`。
   - `POST 可以传输复杂的数据结构，包括文件上传`。
4. 缓存：
   - GET 请求更容易被缓存，这对于频繁变化的大量数据可能不适合。
   - POST 请求通常不被缓存，更适合动态数据。
5. 编码类型：
   - `GET 请求只能使用 URL 编码`。
   - `POST 可以使用多种编码`类型，如 `application``/x-www-form`-urlencoded, `multipart/form-data` 等。

`简单的表单数据`通常使用`application/x-www-form-urlencoded`，而涉及到`文件上传和需要传输较大数据`的情况，则使用`multipart/form-data`

1. 数据完整性：
   - 大量数据通过 GET 请求时，可能因为 URL 长度限制被截断，导致数据不完整。
   - POST 请求不会有这个问题。
2. 浏览器对比：
   - `不同浏览器对 GET 请求 URL 长度的限制不同`，使用` POST 可以避免`兼容性问题。
3. RESTful API 设计：
   - 在 RESTful 设计中，POST 通常用于创建新资源或提交数据，`更符合大量数据传输的语义`。
4. 性能考虑：
   - 对于非常大的数据集，`POST 请求可以分块发送`，这在处理大文件上传时特别有用。
5. 服务器处理：
   - 服务器通常对 POST 请求有更好的处理机制，特别是对于大量数据。
   - 服务器接收到`POST`请求时，它会从HTTP请求体中提取数据。不同的`Content-Type`要求服务器采用不同的解析方式

## 解释一下死锁

#### 死锁的定义： 

死锁是指`两个或多个进程（或线程）`==互相等待对方释放资源==，`导致都无法继续执行的状态`。

在前端开发中，虽然我们通常不直接处理操作系统级别的死锁，但类似的情况可能在以下场景中出现：

1. `JavaScript 的事件循环`： 虽然 JavaScript 是单线程的，但`不当的异步操作可能导致类似死锁`的情况。例如，`两个 Promise 互相等待对方解决`。

   ```javascript
   let a, b;
   a = new Promise((resolve) => {
     setTimeout(() => {
       resolve(b);
     }, 1000);
   });
   b = new Promise((resolve) => {
     resolve(a);
   });
   // a 和 b 互相等待，永远不会解决
   ```

2. Web Workers： 在使用 Web Workers 时，如果`主线程和 worker 线程互相等待对方的消息`，可能会出现死锁类似的情况。

3. 前端框架中的数据流： 在复杂的状态管理系统（如 Redux）中，如果状态更新的逻辑设计不当，可能会导致组件互相等待对方的状态变化。

4. 资源加载： 如果`两个脚本互相依赖，但都被设置为异步加载，可能会导致它们都无法正确执行`。

#### 死锁的四个必要条件（Coffman 条件）：

1. 互斥：`资源不能被多个进程同时使用`。
2. `持有并等待`：进程持有一些资源，同时等待其他资源。
3. `不可抢占`：资源只能由持有它的进程自愿释放。
4. `循环等待`：存在一个进程等待链，形成一个循环。

#### 如何避免死锁（前端视角）：

1. `合理设计异步操作`，`避免循环依赖`。
2. 在复杂的状态管理中，清晰定义数据流向，避免循环更新。
3. `使用 Promise.all() `或 `async/await `来`更好地管理多个异步操作`。
4. 在使用 Web Workers 时，实现清晰的通信协议。
5. `合理安排资源加载顺序`，使用模块化和依赖管理工具。

## 如何解决死锁

#### 传统的死锁解决方法（简要提及）：

1. `预防`：破坏死锁的四个必要条件之一。
2. `避免`：`事先判断资源分配是否安全`。
3. `检测和恢复`：`允许死锁发生`，但`通过检测机制发现并解决`。
4. 忽略：假装死锁不会发生（不推荐）。

#### 在前端开发中解决类似死锁的情况：

1. 异步操作管理：

   - `使用 Promise 链或 async/await 来有序管理异步操作`。
   - `避免创建互相依赖的 Promise`。

   示例：

   ```javascript
   // 不好的做法
   let a, b;
   a = new Promise(resolve => setTimeout(() => resolve(b), 1000));
   b = new Promise(resolve => resolve(a));
   
   // 好的做法
   async function getData() {
     const a = await fetchDataA();
     const b = await fetchDataB(a);
     return { a, b };
   }
   ```

2. 状态管理：

   - 在使用 Redux 或类似状态管理库时，确保状态更新的单向流动。
   - `避免组件之间的循环依赖`。

   示例：

   ```javascript
   // 不好的做法
   const componentA = ({ updateB }) => {
     useEffect(() => {
       updateB(someData);
     }, []);
     // ...
   }
   
   const componentB = ({ updateA }) => {
     useEffect(() => {
       updateA(someOtherData);
     }, []);
     // ...
   }
   
   // 好的做法
   const componentA = ({ data }) => {
     // 仅根据 props 渲染，不主动更新其他组件
   }
   
   const componentB = ({ data }) => {
     // 仅根据 props 渲染，不主动更新其他组件
   }
   
   // 在父组件中管理状态更新
   ```

3. Web Workers 通信：

   - 实现清晰的消息传递协议。
   - 使用`超时机制避免无限等待`。

   示例：

   ```javascript
   const worker = new Worker('worker.js');
   const messagePromise = new Promise((resolve, reject) => {
     const timeout = setTimeout(() => reject(new Error('Worker timeout')), 5000);
     worker.onmessage = (event) => {
       clearTimeout(timeout);
       resolve(event.data);
     };
   });
   
   worker.postMessage('Start work');
   messagePromise.then(handleResult).catch(handleError);
   ```

4. 资源加载优化：

   - 使用模块打包工具（如 Webpack）管理依赖。
   - 采用按需加载或代码分割策略。

   示例：

   ```javascript
   // 使用动态 import 按需加载
   const DataVisualization = React.lazy(() => import('./DataVisualization'));
   
   function MyComponent() {
     return (
       <React.Suspense fallback={<div>Loading...</div>}>
         <DataVisualization />
       </React.Suspense>
     );
   }
   ```

5.事件循环和任务队列管理：

- 理解 JavaScript 的事件循环机制。
- `合理使用 `setTimeout, setImmediate (Node.js), 和 requestAnimationFrame。
- `避免长时间阻塞主线程`。

示例：

```javascript
// 不好的做法：可能阻塞主线程
function heavyComputation() {
  for (let i = 0; i < 1000000000; i++) {
    // 耗时操作
  }
}
heavyComputation();

// 好的做法：将大量计算分解成小任务
function heavyComputationChunked(i = 0) {
  const chunk = 1000000;
  for (let j = 0; j < chunk; j++, i++) {
    if (i >= 1000000000) return;
    // 耗时操作
  }
  setTimeout(() => heavyComputationChunked(i), 0);
}
heavyComputationChunked();
```

6.使用 Linter 和静态代码分析工具：

- 配置 ESLint 规则来检测潜在的循环依赖。
- 使用静态代码分析工具来识别复杂的依赖关系。

## 手写Promise.all

Promise.all 接收一个可迭代对象（通常是一个数组），其中包含多个 Promise。它会等待所有 Promise 都完成（或第一个失败），然后返回一个新的 Promise，这个 Promise 的结果是所有输入 Promise 的结果数组。

让我们一步步来实现：

对于`forEach`遍历操作来说，确实是按照顺序同步进行遍历的。然而，在`处理包括异步操作`（如 `Promise`）的场景中，`遍历本身是同步的`，但是`每个被遍历调用的异步操作则是独立并行执行的`。

`forEach`用于`启动Promise并不阻塞其他Promise的启动`，`导致所有Promise变为并行执行`，而不是一个接一个的串行执行。

举一个具体的例子，当你使用`forEach`来遍历一个包含Promise的数组时，`forEach`会`为数组中的每个元素同步调用一次回调函数`。但是，在这些回调函数中，`如果你启动了一个异步操作`（如通过`Promise.resolve()`），这些`异步操作并不会等待前一个完成后才开始，而是几乎同时开始执行的`。

每个Promise的执行仍然是独立的。也就是说，当你在`forEach`中触发所有的Promise时，它们会同时进入到异步队列，在各自当负载和时机成熟时独立解决。解决的时序取决于各自的处理时间和系统资源情况，这就是并行性的表现。

```javascript
function myPromiseAll(promises){
    //首先确保是可迭代对象
    if(!promises[Symbol.iterator]){
        throw new TypeError('Argument must be iterable')
    }

    //将可迭代对象转换为数组
    const promsieArray = Array.from(promises)
    //返回一个新的promise
    return new Promise((resolve, reject) => {
        const result = []//存储结果的数组
        let computed = 0//跟踪已经resolve的数量
        //数组为空,直接resolve并返回result
        if(promsieArray.length === 0) {
            resolve(result)
            return
        }
        //遍历所有的promise
        promsieArray.forEach((promise, index) => {
            //使用promise.resolve来处理非promise的值
            //如果不需要处理非promise的值,直接promise.then,可以直接用[1,2,3]这种数组来测试
            //可以安全地处理promise和非promise值，无需担心调用非promise值上不存在的.then()方法，从而避免引发错误
            Promise.resolve(promise)
                .then(value => {
                    //结果存储在对应索引位置
                    result[index] = value
                    computed++
                    //所有promise都完成,解决返回的 Promise
                    if(computed === promsieArray.length){
                        resolve(result)
                    }
                })
                .catch(error => {
                    // 如果有任何一个 Promise 失败，立即拒绝返回的 Promise
                    reject(error)
                })
        })
    })
}
const promises1 = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.reject(3)
  ];
  
  myPromiseAll(promises1)
    .then(results => console.log('Test 1:', results))
    .catch(error => console.log('Test 1 Error:', error));
```

现在让我解释一下这个实现的关键点：

1. 我们首先检查输入`是否为可迭代对象`，如果`不是`，`抛出类型错误`。
2. 我们使用 `Array.from() 将可迭代对象转换为数组`，以便于处理。
3. 函数`返回一个新的 Promise`，这个 Promise 封装了所有输入 Promise 的处理逻辑。
4. 我们创建一个 `results 数组来存储所有 Promise 的结果`，并使用 completed 变量来跟踪已完成的 Promise 数量。
5. 如果`输入数组为空`，我们`立即解决返回的 Promise`。
6. 我们==遍历所有输入的 Promise==，==对每个 Promise 使用 Promise.resolve()== 来==确保它是一个 Promise 对象==（==这也允许处理非 Promise 值==）。
7. 当一个 Promise 成功时，我们将其结果存储在 results 数组中对应的位置，并增加 completed 计数。
8. 如果所有 Promise 都已完成，我们解决返回的 Promise，并传入结果数组。
9. 如果任何一个 Promise 失败，我们立即拒绝返回的 Promise，并传递错误信息。

这个实现涵盖了 Promise.all 的主要特性：`并行处理多个 Promise`，`按顺序返回结果`，以及在任何一个 Promise 失败时立即返回错误。

为了测试我们的实现，我们可以编写一些简单的测试用例：

```javascript
// 测试成功情况
const promises1 = [
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
];

myPromiseAll(promises1)
  .then(results => console.log('Test 1:', results))
  .catch(error => console.error('Test 1 Error:', error));

// 测试包含非 Promise 值
const promises2 = [
  Promise.resolve(1),
  2,
  Promise.resolve(3)
];

myPromiseAll(promises2)
  .then(results => console.log('Test 2:', results))
  .catch(error => console.error('Test 2 Error:', error));

// 测试失败情况
const promises3 = [
  Promise.resolve(1),
  Promise.reject('Error'),
  Promise.resolve(3)
];

myPromiseAll(promises3)
  .then(results => console.log('Test 3:', results))
  .catch(error => console.error('Test 3 Error:', error));

// 测试空数组
myPromiseAll([])
  .then(results => console.log('Test 4:', results))
  .catch(error => console.error('Test 4 Error:', error));
```

这些测试用例覆盖了不同的情况，包括全部成功、包含非 Promise 值、有失败的 Promise，以及空数组输入。

最后，我想补充一点，在实际的生产环境中，我们通常会使用内置的 Promise.all 方法，因为它经过了优化并且更可靠。这个手写实现主要是为了展示 Promise.all 的工作原理，并且在面试中展示我对 Promise 的理解。

## 强缓存和协商缓存

### 强缓存 (Strong Caching)

强缓存意味着`如果缓存有效`，则`不需要向服务器发送请求`。浏览器`直接使用缓存中的副本`。控制强缓存的HTTP头主要有两个：

1. `Cache-Control`
2. `Expires`

#### Cache-Control

`Cache-Control` 是最常用的方式来控制缓存，其具体字段如下：

- `max-age=<seconds>`：资源在本地缓存保存的最大时间（秒），超过这个时间后缓存将被认为是过期的。
- `no-cache`：禁止使用强缓存，每次请求都会去服务器验证。
- `no-store`：彻底禁止缓存，每次请求都会下载完整的资源。
- `public`：响应可以被任何缓存区缓存（即使是代理服务器等中间节点）。
- `private`：响应只适合私有缓存（如浏览器缓存），不允许任何中间缓存（如CDN）缓存。
- `s-maxage=<seconds>`：覆盖`max-age`或者`Expires`头，但只在共享缓存（比如各种代理）中有效。

#### Expires

`Expires` 用来指定资源到期的日期和时间，是HTTP/1.0的遗留字段，如果同时设置有`Cache-Control: max-age`，则`Expires` 会被忽略。

### 协商缓存 (Negotiated Caching)

当`强缓存失效后`，`浏览器`将`在请求头中带上缓存标识向服务器询问`，这就是协商缓存。`如果资源未修改`，服务器将`返回304状态码`，`告诉浏览器直接使用本地缓存`。控制协商缓存的HTTP头主要包括：

1. `Last-Modified` / `If-Modified-Since`
2. `ETag` / `If-None-Match`

#### Last-Modified / If-Modified-Since

- `Last-Modified`：这个`响应头标识了资源最后修改的时间`。
- `If-Modified-Since`：在随后的请求中，浏览器会将`Last-Modified`的值放入`If-Modified-Since`请求头中发送给服务器。如果服务器上的内容自该日期以来未被修改，则返回304状态码。

#### ETag / If-None-Match

- `ETag`：`资源的特定版本的标识符`，通常是一个`哈希值`或者其他指纹。
- `If-None-Match`：类似于`If-Modified-Since`，但是这是使用`ETag`值进行对比。如果`ETag`值匹配（即资源未改变），服务器返回304。

### 使用策略

- 对于频繁变动的资源，可以使用`Cache-Control: no-cache`来确保总是获得最新的版本。
- 对于不常更改的资源，如JS、CSS库，使用`Cache-Control: max-age`或`Expires`设置一个较长的过期时间可以提高页面加载速度。
- 对于核心网页文件本身（如HTML），通常使用协商缓存来确保用户总是有最新的页面版本，同时又能在未修改时利用缓存。

## script标签如何加载

在默认情冀外，当浏览器遇到 `<script>` 标签，会`停止解析`HTML文档，`直到脚本执行完成`。这是因为脚本可能会修改DOM结构，因此浏览器需要等待脚本执行完成以确保DOM的准确性。这种行为可通过以下属性进行控制：

1. **async**

   - 当使用 `async` 属性时，脚本会`异步加载`。即浏览器继续解析文档，不必等待脚本下载完成。脚本下载完成后将尽快执行，但具体执行时间取决于脚本下载速度和文档解析状态。
   - `async` 属性通常用于那些`不依赖于其他脚本的独立模块`。

   ```html
   <script async src="path/to/script.js"></script>
   ```

2. **defer**

   - 当使用 `defer` 属性时，脚本会被`延迟到整个文档解析完毕后再运行`，但在DOMContentLoaded事件之前执行。
   - 这适用于那些`依赖于DOM`，但不影响DOMContentLoaded事件触发时机的脚本。


```html
<script defer src="path/to/script.js"></script>
```

`DOMContentLoaded` 是一个非常重要的浏览器事件，它在 `HTML 文档被完全加载和解析完成后`立即触发，但`不等待样式表`、`图像`和子框架的加载完成。这使得它非常适合初始化 DOM 结构已经完全呈现的情况下的脚本执行。

##### 主要特点

- **快速执行**：相比于 `load` 事件，`DOMContentLoaded` 事件会更早触发，因为它不需要等待所有外部资源如图像或样式表加载完成。
- **`用处`广泛**：这个事件非常适合用来`初始化页面`，例如`添加事件处理器`、`操作DOM`等，因为此时所有的 HTML 元素都已经存在，但没有外部资源的加载延迟。

### 常见用例

- **无依赖脚本:** 使用 `async`，当脚本之间不相互依赖时使用。
- **依赖DOM的脚本:** 使用 `defer`，保证在DOM完全解析之后执行。
- **按顺序执行的多个脚本:** 当脚本需要按照特定顺序执行时，可以使用多个带`defer`属性的脚本，它们将按照在文档中出现的顺序执行。

### 注意点

- 当使用外部脚本时（即指定了 `src` 属性），脚本标签内部的JavaScript代码将被忽略。
- 脚本的加载和执行可能会影响到页面的加载时间，合理使用 `async` 和 `defer` 属性能够显著改善页面加载性能

## 重排和重绘

### 1. 重排（Reflow）

重排，`又称`作`回流`，是`浏览器重新计算页面布局的过程`。当`DOM的变化影响到元素的几何信息`（如宽度、高度、位置等），`浏览器将需要重新计算元素的位置和大小`。重排的`成本较高`，因为它`可能导致整个页面的部分或全部元素的布局更新`。

触发重排的情况包括：

- `添加或删除`可见的DOM元素
- 元素`位置的改变`
- 元素`尺寸的改变（`例如：边距、填充、边框的宽度、宽度和高度等）
- `内容的改变`（例如：文本改变或图片大小调整后）
- `页面渲染初始化`（首次加载）
- `浏览器窗口大小的改变`

### 2. 重绘（Repaint）

重绘是当元素的一些`样式被改变`，但`没有影响到其几何布局`的时，浏览器将重新绘制元素。重绘的`成本比重排要低`，因为不`涉及布局的计算`。

触发重绘的情况包括：

- 改变元素的外观而不影响其布局的样式，如 color, background-color, visibility。

### 3. 优化策略：减少重排和重绘

由于重排通常会引起重绘，但重绘不一定会引起重排，优化策略通常是尽量减少发生这两者的次数和范围：

#### a. 批量修改DOM

避免逐条更改样式，这样每改一次就可能触发一次重排/重绘。可以使用CSS类或者`DocumentFragment`进行一次性修改。

#### b. 离线操作DOM

操作离线DOM（即那些不在文档流中的DOM节点）。例如，可以先将元素隐藏（例如设为`display: none`），进行多项修改，然后再显示。

#### c. 使用CSS3动画

对于动画效果，使用CSS3的`transform` 和 `opacity` 属性，这些动画可以由GPU加速，而非CPU处理。

#### d. 避免触发同步布局事件

`避免使用那些在执行时需要立即计算布局的属性或方法`，如`offsetWidth`、`scrollHeight`等。

#### e. 减少对复杂选择器或通配符的使用

CSS选择器解析通常从右向左进行。避免过度使用复杂选择器，特别是在关键的性能时刻。

## **异步编程（Promises, Async/Await）：**

- 这不是新开线程，但是处理异步操作（如网络请求，文件读写等）时，JavaScript的执行模型（事件循环和消息队列）让代码可以异步执行，而不阻塞主线引程。

## web worker有哪些限制,与主线程怎么通信

Web Workers 提供了在`后台线程中执行脚本的能力`，但他们的运行环境与主线程有显著不同，因此存在以下限制：

1. **`无法访问DOM`**： Web Workers无法直接操作DOM。任何涉及到更新界面的操作都需要主线程来执行。
2. **有限的全局对象**： Workers 运行在一个独立的全局上下文中，不是标准的`window`对象，而是一个类型为`DedicatedWorkerGlobalScope`的对象。这意味着，一些常用的`window`方法和属性在Workers中不可用。
3. **`文件限制`**： Workers 中`无法访问本地文件系统`，因为这会造成安全问题。
4. **有限的API支持**： 不是所有 Web API 都在 Workers 中可用。虽然能使用例如 `fetch` 这样的网络请求API，但很多与用户界面交互密切的API，如 `window.alert` 或 `document.getElementById` 等，都不能在 Worker 中使用。
5. **内存使用**： 每个 `Worker 都占用额外的内存资源`。因此，虽然可以创建多个 Workers 并行处理任务，但这可能会`影响总体应用性能`。
6. **通信成本**： Worker 与主线程之间的`通信是通过传递消息实现`的，这些消息在传递过程中会被序列化和反序列化，如果消息内容很大，这一过程可能会`导致不小的性能开销`。

### 与主线程的通信方式

Web Workers 与主线程之间的通信是通过消息传递机制实现的。主线程和 Worker 都使用 `postMessage()` 方法来发送数据，使用 `onmessage` 事件处理器来接收数据。

## 什么是同源策略,怎么解决跨域,cors有哪些配置

### 同源策略（Same-origin policy）

同源策略是一种重要的安全策略，用于限制一个origin（源）的文档或脚本如何与另一个源的资源进行交互。它帮助防止恶意文档，降低可能攻击。如果两个URL的`协议`、`端口`（如果有指定）和`主机`都相同，则两个URL是同源的。

#### 同源策略限制内容包括：

- **`Cookie`、`LocalStorage` 和 `IndexDB` 的`访问权限`**
- **`DOM 的访问权限`**
- **`通过AJAX发起跨源HTTP请求`**

### 解决跨域问题

跨域资源共享（CORS，Cross-Origin Resource Sharing）是一种机制，它使用额外的HTTP头部让浏览器获得访问跨源服务器资源的权限，从而克服AJAX直接对跨源服务器进行访问的限制。

#### 实现 CORS 主要有以下几种方法：

1. **CORS 响应头部配置**：` 服务端`可以在返回的响应中`添加CORS相关的HTTP头部`，以允许特定的外部域访问资源。
2. **JSONP（只支持GET请求）**： 通过`<script>标签`的特性（`不受同源策略限制`）来绕过限制。服务器端需要支持JSONP调用方式，返回数据时，`将数据包裹在一个函数调用中`。
3. **代理服务器**： 在`服务器端`设置一个`代理服务`（Proxy），该服务请求外部资源并将资源转发给前端。这种方式不受同源策略限制，因为`实际上是在同源中请求`。

### CORS 的主要配置头部

1. **`Access-Control-Allow-Origin`**： 指定哪些网站可以访问资源，可以设置为一个具体的URI或者“*”表示允许所有域名。

   示例：`Access-Control-Allow-Origin: https://example.com`

2. **`Access-Control-Allow-Methods`**： 指明实际请求所允许使用的HTTP方法（如GET, POST, PUT, DELETE, OPTIONS等）。

   示例：`Access-Control-Allow-Methods: GET, POST`

3. **`Access-Control-Allow-Headers`**： 用于预检请求中，服务端返回表示哪些HTTP头部可以被外部域的请求使用。

   示例：`Access-Control-Allow-Headers: X-Custom-Header, Upgrade-Insecure-Requests`

4. **`Access-Control-Allow-Credentials`**： 标志着实际的请求中是否可以携带凭证（cookies）。如果服务端表明“true”，则表示外部域的请求可以附带cookies等凭证信息。

   示例：`Access-Control-Allow-Credentials: true`

5. **`Access-Control-Max-Age`**： 表明了preflight请求的结果（即Access-Control-Allow-Methods和Access-Control-Allow-Headers提供的信息）可以被缓存多久。

   示例：`Access-Control-Max-Age: 86400`

## js数据类型,栈和堆的区别

### JavaScript 数据类型

在 JavaScript 中，数据类型分为两大类：**原始类型**和**引用类型**。

#### 原始类型（Primitive types）

这些类型的数据直接存储在栈（stack）中，它们的值直接存储在变量访问的位置。这些类型包括：

1. **Number**: 包括整数和浮点数。
2. **String**: 文本数据，用单引号、双引号或反引号表示。
3. **Boolean**: 布尔值，`true` 或 `false`。
4. **undefined**: 表示变量声明了但未初始化。
5. **null**: 表示变量已声明，且赋值为“空”（无值）。
6. **Symbol**: 一种实例是唯一且不可更改的数据类型，用于创建对象的私有成员。
7. **BigInt**: 用来表示非常大的整数，超过 `Number` 类型能表示的范围。

#### 引用类型（Reference types）

`引用类型`的数据被存储在`堆`（heap）中。`变量存储在栈中的值`是一个`指向堆内存中实际数据的指针`。

- Object

  : 包括如下几种具体对象：

  - **Array**: 数组对象。
  - **Function**: 函数。
  - **Date**: 日期。
  - **RegExp**: 正则表达式。
  - 各种构造函数创建的对象，如 `new Number()`、`new String()` 等。

### 栈（Stack）与堆（Heap）的区别

栈和堆都是在计算机内存中用于存储数据的结构，但它们的管理方式和目的有所不同。

#### 栈

- **存储结构**：栈用于`存储局部变量和函数调用`。
- **内存管理**：栈有自动管理机制，即`自动分配内存`并在不需要时`自动释放`。
- **存储方式**：`先进后出`（FILO）的方式。
- **大小和效率**：栈的运行`效率很高`但可用`空间`通常`较小`，且`大小固定`。
- **数据访问**：由于栈对`数据的操作仅限于栈顶`，对数据的`操作速度非常快`。
- **适用场景**：适用于存储执行环境（如函数的局部变量）等较小的、临时的数据。

#### 堆

- **存储结构**：堆用来`存储实例化的对象`和`数组`等。
- **内存管理**：堆内存由开发者`手动分配和释放`，管理不当`容易产生内存泄漏`。
- **存储方式**：在`内存中动态分配`，无固定顺序。
- **大小和效率**：`堆的大小不固定`，扩展灵活，但`管理和访问速度相比栈要慢`。
- **数据访问**：可以随机访问，但速度比栈慢。
- **适用场景**：适用于`存储较大的`、`生命周期长的数据`，或者是在需要全局访问的数据。

总结而言，栈内存由系统自动分配释放，拥有快速的存取速度，但空间有限；而堑内存空间大、灵活、由程序员控制，但速度慢且容易出现内存泄露的风险。在 JavaScript 中，简单的数据类型（如数字、布尔值和字符串）通常存储在栈中，而对象和数组等复杂类型则存储在堆中。

## 垃圾回收机制

### 垃圾回收的关键概念

#### 1. 标记-清除（Mark-and-Sweep）

这是 JavaScript 最常用的垃圾回收机制。其核心原则包括：

- **标记阶段**：垃圾回收器遍历所有从根（通常是全局对象和当前执行栈的活动对象）开始`可到达`的对象，并`标记`它们。
- **清除阶段**：所有`未被标记`的对象将被视为不再需要，因此将被垃圾回收器`清除`。这些空间随后被释放出来，以供未来使用。

#### 2. 引用计数

这是一个较为`早期`的垃圾回收策略，它跟踪`每个值被引用的次数`。当一个对象的引用次数变为零时，表示该对象不再需要，因此可以被清理。然而，此方法的一个主要问题是循环引用，它可能导致内存泄露。

### 现代浏览器的优化策略

现代浏览器的 JavaScript 引擎，如 V8（Chrome 和 Node.js）、SpiderMonkey（Firefox）和 Chakra（Microsoft Edge 旧版）等，都实现了更先进的垃圾回收技术。

#### 分代回收

现代垃圾回收器通常将`内存分成几个不同的“代”或区域`，通常至少分为“`新生代`”和“`老生代`”：

- **新生代**：存储`生命周期较短`的对象。这些对象通常很快被创建和销毁。`回收器经常检查`这个区域，使用算法（如复制垃圾回收器）快速回收。
- **老生代**：存储`生命周期长或持续存活的对象`。这些区域的回收频率较低，使用算法（如标记-清除或标记-整理）。

#### 增量收集

为了避免在垃圾回收时发生长时间的停顿，一些现代垃圾回收机制采用了增量收集技术，即将垃圾回收工作分成多个小部分进行，分散回收的负担。

#### 并发和并行垃圾回收

并发垃圾回收允许垃圾回收器在执行 JavaScript 程序的同时运行，减少对程序执行的干承，而并行垃圾回收则是利用多核处理器同时进行垃圾回收的处理，以提高效率。

## 浏览器和node环境的事件循环

### 浏览器的事件循环

在浏览器中，事件循环的职责是`协调用户交互`、`脚本`、`UI 渲染`和`网络等活动`。浏览器的事件循环机制大致可以描述如下：

1. **任务队列**：浏览器`有多种任务队列`，这些`队列是存储异步事件回调函数的地方`，例如从 `setTimeout`、`setInterval`、用户互动（如点击、滚动等）、`Promise 的解决或拒绝`等。
2. **微任务队列**：JavaScript 还有一种特殊的任务队列，叫作微任务（microtask）队列，用于处理如 `Promise 回调`和 `MutationObserver` 回调等。

`MutationObserver`是一个强大的` Web API`，用于`监测DOM`（Document Object Model）`树中的变化`

1. **执行流程**：
   - `执行栈中的同步代码首先执行`。
   - `执行完同步代码后`，`执行微任务队列中的任务`。
   - `必要时进行渲染更新`（`通常按照浏览器的刷新率`定时进行，例如 60Hz 的频率）。
   - 从`宏任务`（macro task）`队列中取出一个`任务执行。
   - `执行完一个宏任务后`，再次`执行所有可用的微任务`。
   - 重复上述流程。
2. **渲染和任务的优先级**：浏览器需要在执行 JavaScript 和渲染页面之间保持平衡，因此通常会在宏任务执行完毕后，以及执行微任务之后，检查是否需要重新渲染页面。

### Node.js 的事件循环

Node.js 的事件循环由其底层的 libuv 库提供支持。Node.js 的事件循环与浏览器略有不同，主要是针对服务器环境优化的。其事件循环包括以下几个主要阶段：

1. **定时器**：处理 setTimeout 和 setInterval 所调度的回调。
2. **I/O 回调**：处理几乎所有的 I/O 回调，如网络通信、文件操作等（除了由其他阶段处理的特定活动）。
3. **空闲和预备**：仅内部使用。
4. **轮询**：检索新的 I/O 事件；执行与 I/O 相关的回调（几乎除了关闭的回调，所有回调都在这里被执行），轮询队列如果为空，可能会导致事件循环阻塞等待新的回调。
5. **检查**：`setImmediate()` 回调在这里执行。
6. **关闭的回调函数**：一些关闭的回调函数，如 `socket.on('close', ...)`。

在每个阶段之间，Node.js 也会处理微任务队列。与浏览器不同，Node.js 可能会在任何阶段结束后处理所有可用微任务。

### 总结

尽管浏览器和 Node.js 都使用了事件循环，但它们针对不同的环境和需求进行了优化。浏览器主要处理用户交互、脚本、UI 渲染等，而 Node.js 更专注于高效处理 I/O 密集型任务。了解这些事件循环的工作方式对于开发高性能、响应式的应用程序非常重要。

## flat拍平数组，循环依赖怎么办

在 JavaScript 中, `Array.prototype.flat()` 方法用于将多维数组转换为低维数组。例如，`[[1, 2], [3, [4, 5]]].flat()` 将返回 `[1, 2, 3, 4, 5]`。

### 循环依赖与`flat`方法

首先，我们需要明确一点，通常所说的“循环依赖”是指在模块、对象或函数之间的引用问题，通常不直接涉及到数组操作。然而，如果你的问题指的是在使用 `flat` 方法的时候数组中存在相互引用（例如，数组A包含数组B，数组B中又包含数组A），这种情况极为少见，且 `flat` 方法本身不支持处理包含循环引用的数组。这是因为 `flat` 方法设计来平铺数组，不是解决引用或内存管理问题。

尝试对包含循环引用的数组使用 `flat()` 方法会导致问题，因为`flat()`在尝试访问无限递归的结构时会导致堆栈溢出错误。

### 示例模拟循环引用数组

假设你不小心创建了一个包含循环引用的数组结构：

```javascript
let a = [];
let b = [a];
a.push(b);

// 尝试 flatten 会怎样？
// a.flat(); // 这将抛出 RangeError: Maximum call stack size exceeded
```

### 如何处理或防止循环引用

由于 JavaScript 中通常不推荐在数组中创建循环依赖（这是不良的设计），如果你确实遇到了这种需求，需要反思为何会设计出这种结构，并考虑进行重构。

1. **重构数据结构**：最好的方法是避免在数组中创建循环引用。通常，循环引用是设计不当的标志。尝试重构数据模型以去除这种依赖。
2. **自定义 flatten 函数**：如果出于某种特殊原因必须处理循环引用数组，你可以编写一个自定义的 flatten 函数，这个函数在工作前先检测数组中的循环引用。

### 实现一个简单的检测循环依赖的 flatten 函数

以下是一个自定义的 `flatten` 方法实现，可以检查循环引用并抛出错误：

```javascript
function safeFlatten(array, parentArrays = []) {
    let result = [];
    for (const item of array) {
        if (Array.isArray(item)) {
            if (parentArrays.includes(item)) {
                throw new Error("Detected a cycle in the array");
            }
            parentArrays.push(item);
            result = result.concat(safeFlatten(item, parentArrays));
            parentArrays.pop();
        } else {
            result.push(item);
        }
    }
    return result;
}

let a = [];
let b = [a];
a.push(b);

try {
    console.log(safeFlatten(a)); // This will throw an error
} catch (e) {
    console.error(e); // Detected a cycle in the array
}
```

在这个例子中，`safeFlatten` 功能检查 `item` 是否已经在 `parentArrays` 中，这可以帮助检浔循环引用并避免无限递归。

## BFC

BFC（Block Formatting Context，`块级格式化上下文`）是Web页面的可视化CSS渲染的一部分，它是页面上的一个隔离的渲染区域，`容器里面的元素不会在布局上影响到外面的元素`。简单地说，它是一个独立的布局环境。

### BFC的工作原理

BFC规定了内部的Block Box如何布置，并且与这个区域外部毫无关系。

### 如何形成BFC

一个HTML容器会变成BFC当它符合以下条件之一：

1. `float` 的值不为 `none`。
2. `position` 的值不为 `static` 或 `relative`。
3. `display` 的值为 `inline-block`, `table-cell`, `table-caption`, `flex`, `grid` 等。
4. `overflow` 的值不为 `visible`。

### BFC的主要用途

BFC 提供了几个重要的功能，或者可以用来解决常见的问题：

1. **防止外边距合并**（Margin Collapsing）： 在同一个BFC中的两个相邻块级元素的垂直间距会合并成一个间距，这通常不是我们想要的。通过将其中一个元素放入不同的BFC中可以避免这种情况。
2. **包含浮动元素**（Clearing Floats）：` 浮动元素不影响其父容器的高度`，`因为浮动元素不在流中`。通常，这会`导致父容器的高度塌陷`。`如果父容器创建了自己的BFC`，那么`就会包含它的浮动子元素`，父容器的`高度就能正常计算了`。
3. **创建独立的渲染区域**： 在`BFC中的布局不会影响外面的元素`，反之亦然。这对于布局非常有用，特别是在复村的网页设计中。
4. **防止文本环绕**： 当你`不希望文本环绕另一元素时`，可以使用BFC来避免。

### 实例应用

这是一个防止外边距合并的例子：

```html
<!-- 没有防止外边距合并的情况 -->
<div style="background-color: lightblue; margin-bottom: 20px;">Box 1</div>
<div style="background-color: lightcoral;">Box 2</div>
<!-- Box 1和Box 2的间隔看起来会是20px，实际上他们各有20px的margin, 但是合并了 -->

<!-- 使用BFC阻止外边距合并 -->
<div style="background-color: lightblue; overflow: hidden; margin-bottom: 20px;">Box 1</div>
<div style="background=""color:: lightcoral;">Box 2</div>
<!-- Box 1 和 Box 2 的间隔为40px -->
```

在这个例子中，第一种情况没有启用BFC，所以两个盒子的外边距合并导致看起来只有20px的间隔。在第二种情况中，通过`overflow: hidden`给`Box 1`创建了BFC，从而阻止了外边距合并，使两个盒子之间的间隔正确地显示为40px。

## 函数式编程思想

### 核心思想：

1.   `函数是一等公民`：`函数可以像其他数据类型一样被创建`，`传递`，`返回`和`存储`
2.   `不可变性`：`函数及其输入输出数据应当是不可变的`，一旦被创建就不可改变
3.   `纯函数`：`函数应当只依赖于其输入的数据`，并且`不修改外部状态`（`没有副作用`）
4.   `递归`
5.   `高阶函数`：高阶函数可以接收其他函数作为参数或者返回参数作为结果，使得函数可以像数据一样被操作

函数式编程（Functional Programming, FP）是一种编程范式，它把计算视为函数的评估，并尽可能避免使用状态和可变数据。在函数式编程中，函数本身可以像任何其他数据类型一样被传递和操作，这使得这种编程范式与传统的命令式和过程式编程有很大的不同。

### 函数式编程的关键思想和特性包括：

1. **不可变性 (Immutability)**： 函数式编程强调数据不可变性。一旦数据被创建，就不能改变。如果需要修改数据，你就创建一个新的数据副本并应用更改，而不是更改原始数据。
2. **纯函数 (Pure Functions)**： 纯函数对于相同的输入总是产生相同的输出，并且它们不会产生任何可观察的副作用（如修改全局变量、改变输入参数的状态等）。这使得程序更容易理解和预测。
3. **函数是"一级公民" (First-class Functions)**： 函数被视为一级公民，这意味着它们可以存储在数据结构中，可以作为参数传递给其他函数，还可以作为其他函数的返回值。
4. **高阶函数 (Higher-order Functions)**： 这是接收其他函数作为参数或将其他函数作为输出返回的函数。高阶函数是建立在把函数当做一级公民的概念之上的，是函数式编程中非常重要的一个概念。
5. **引用透明性 (Referential Transparency)**： 任何函数调用都可以被其输出值替换，而不会改变程序的行为。这是纯函数的一个直接结果，使得程序更易于推理。
6. **递归 (Recursion)**： 在函数式编程中，循环操作通常会通过递归来实现。这是因为递归调用自身的函数不需要改变状态，而是通过返回值来处理数据，这与函数式编程的纯净性和不可变性相符合。
7. **延迟计算 (Lazy Evaluation)**： 函数式编程语言经常支持延迟计算，意味着计算延迟到绝对需要结果的那一刻。这种特性可以提升性能，允许无限数据结构，如无限列表。

### 函数式编程的优势：

- **可测试性和可维护性**：由于使用纯函数，组件和系统更易于测试和维护。
- **并行处理**：不可变性简化了并行代码的开发，因为没有状态变化，所以不需要担心线程安全问题。
- **模块化和可复用性**：纯函数的自包含性和一致性使得复用更加简单。

## ES6新特性

### 1. `let` 和 `const`

ES6引入了两个新的声明变量的关键字：`let`和`const`，它们提供块级作用域（block-scoping），而传统的`var`声明只提供函数级作用域。`let` 用于声明变量，而 `const` 用于声明常量。

```javascript
if (true) {
    let a = 40;
    const b = 50; // b cannot be re-assigned
}
// a 和 b 在此处均不可访问
```

### 2. 箭头函数

箭头函数提供了另一种定义函数的方式，使用 `=>` 符号。它不仅语法简洁，还自动绑定当前的上下文(`this`关键字)。

```javascript
const add = (a, b) => a + b;
```

### 3. 模板字符串

ES6允许字符串嵌入变量和表达式，使用反引号（``\`）标示，变量和表达式放在`${}`中。

```javascript
let name = "world";
console.log(`Hello, ${name}!`); // 输出：Hello, world!
```

### 4. 默认参数

函数参数现在可以有默认值。

```javascript
function log(message = "Default message") {
    console.log(message);
}
log(); // 输出：Default message
```

### 5. 解构赋值

解构赋值允许从数组或对象中提取值，并赋值给通过模式匹配定义的变量。

```javascript
let [a, b] = [1, 2];
let {name, age} = {name: "Alice", age: 25};
```

### 6. 模块

ES6原生支持模块（module），使用`import`和`export`语句加载和导出模块。

```javascript
// file1.js
export const pi = 3.14159;

// file2.js
import { pi } from './file1';
console.log(pi); // 输出：3.14159
```

### 7. 类

ES6引入了基于类的面向对象编程，支持类的声明以及继承。

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {
    speak() {
        console.log(`${this.name} barks.`);
    }
}
```

### 8. Promises

Promises是异步编程的一种解决方案，用于处理异步操作，避免回调地狱。

```javascript
const promise = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'Some Value');
});
promise.then(value => console.log(value));
```

### 9. 新的集合类型

引入了`Map`, `Set`, `WeakMap`,和`WeakSet`等新数据结构。

### 10. 迭代器和for...of循环

ES6引入了迭代器(iterator)和可迭代协议，以及新的`for...of`循环，用来有效遍历数据集。

```javascript
let arr = [10, 20, 30];
for (let value of arr) {
  console.log(value); // 输出：10, 20, 30
}
```

### 11. Symbol

引入了一种新的原始数据类型`Symbol`，它是唯一不变的。

## axios的请求拦截和响应拦截底层实现原理

`axios` 的拦截器执行流程是通过一个基于 Promise 的链式结构实现的。具体步骤如下：

1. 创建拦截器链

   axios 内部为每个请求创建一个拦截器链。链的结构如下：

   - [请求拦截器1, 请求拦截器2, ..., 实际请求发送函数, 响应拦截器2, 响应拦截器1]

2. **执行链式调用**：`axios` 通过 Promise 链式调用执行上述拦截器链。首先按顺序执行所有请求拦截器，然后发送实际请求，最后按逆序执行所有响应拦截器。

## 请求接口错误，即状态码非200的请求错误怎么捕获



## 强制缓存和协商缓存使用场景是什么

### 强制缓存

`强制缓存`（也称为绝对缓存）`指的是客户端在设定的缓存时间内`，`不再向服务器发送请求`，而是`直接使用本地缓存的数据`。这种方式依赖于 HTTP 响应头中的 `Cache-Control` 和 `Expires` 字段。

#### 使用场景

1. **静态资源**：如图片、CSS、JavaScript 文件等，尤其是那些很少更改的资源。
2. **版本控制**：如果资源更新频繁但可以通过版本号来区分，强制缓存是非常适合的。例如，通过给文件名添加哈希值（如 `style.abcdef.css`），确保每次发布新版本时都会生成新的文件名。
3. **提升性能**：在`用户访问频繁的页面中使用强制缓存`，可以`减少重复请求`，提升加载速度。

#### 配置示例

```http
Cache-Control: max-age=31536000  // 设置缓存时间为一年
Expires: Thu, 01 Dec 2022 16:00:00 GMT  // 设置具体的过期时间
```

### 协商缓存

协商缓存指的是客户端`每次请求资源时`，都会`向服务器发送一个验证请求`，以`确定缓存的数据是否过期`。如果`未过期`，`服务器会返回304`状态码，`表示可以使用本地缓存`，`否则返回新的资源`。协商缓存依赖于 HTTP 响应头中的 `Last-Modified` 和 `ETag` 字段。

#### 使用场景

1. **动态内容**：如`新闻页面`、用户数据等，内容可能会不定期更新。
2. **大文件**：如视频、文档等，频繁重新下载成本较高，但又需要保证内容是最新的。
3. **频繁更新资源**：资源更新频率高，且需要确保用户始终获得最新的版本。

#### 配置示例

```http
Last-Modified: Tue, 15 Nov 2022 12:45:26 GMT  // 资源的最后修改时间
ETag: "abc123"  // 资源的唯一标识符
```

### 工作流程

1. **首次请求**：服务器返回资源并包含 `Last-Modified` 或 `ETag` 头。
2. **后续请求**：客户端发送带有 `If-Modified-Since` 或 `If-None-Match` 头的请求。
3. **验证**：服务器根据头信息验证资源是否修改，未修改返回 304 状态码，否则返回新的资源和新的 `Last-Modified` 或 `ETag`。

### 总结

- **强制缓存** 适用于`更新频率低`、可以`通过版本控制的静态资源`，能够显著减少请求数量，提高性能。
- **协商缓存** 适用于`内容更新频率较高`、需要`确保用户获取最新数据的场`景，通过与服务器协商，减少不必要的资源传输。

选择适当的缓存策略可以在提升性能的同时，确保数据的准确性和及时性。

## 打包工具打包后的文件名上的hash值根据不同场景应该怎么设置，有什么说法

###  静态资源（JavaScript、CSS、图片等）

#### 场景

这些资源通常会在用户的浏览器中缓存，若文件内容发生变化，希望用户获取到最新的文件，而不变的文件继续使用缓存。

#### 设置

- **内容哈希值（Content Hash）**：`根据文件内容生成哈希值`，当文件内容改变时，哈希值才会变化。
- **文件名格式**：`[name].[contenthash].[ext]` 或 `[name].[hash].[ext]`

### 动态加载的模块（Code Splitting）

#### 场景

通过代码拆分实现按需加载，不同的代码块可能会频繁更新，因此需要确保每个代码块的缓存管理。

#### 设置

- **内容哈希值（Content Hash）**：适用于动态加载的代码块，确保`每个块在内容变化时对应的哈希值变化。`
- **文件名格式**：`[name].[contenthash].js`

### 库文件（第三方库）

#### 场景

第三方库文件`较为稳定`，`不会频繁更新`，`可以考虑较长时间的缓存`。

#### 设置

- **哈希值（Hash）**：可以使用`版本号或内容哈希`，保证在库文件更新时哈希值变化。
- **文件名格式**：`[name].[hash].js` 或 `[name].[version].js`

**内容哈希值（Content Hash）**：适用于`内容频繁变化的文件`，如 JavaScript、CSS、图片等。

**哈希值（Hash）**：适用于`版本管理`，文件内容相对稳定的场景。

**文件名格式**：`[name].[contenthash].[ext]` 或 `chunkFilename` 根据文件类型和使用场景选择适当的哈希策略。

## 求字符串的最长不重复子串长度

## 求二叉树的公共祖先

## 算法:数组转树