## vue的响应式原理

## template和render有什么区别

在前端开发中，特别是使用 JavaScript 框架（如 Vue、React 等）时，"template" 和 "render" 是两个经常出现的概念，它们都与如何构建用户界面有关，但承担的角色和方式有所不同。

**1. Template (模板)**

* **本质:**  HTML 代码片段，用于描述 UI 的结构和内容。
* **特点:**
    * 语法接近标准 HTML，易于理解和编写。
    * 通常是声明式的，描述最终想要的结果，而不是如何实现。
    * 框架负责将模板编译成可执行的 JavaScript 代码。
* **优点:**
    * 直观易懂，对新手友好。
    * 提高开发效率，专注于 UI 结构和数据绑定。
* **缺点:**
    * 灵活性相对较低，难以实现复杂的逻辑处理。

**示例 (Vue 模板):**

```html
<template>
  <div>
    <h1>{{ title }}</h1>
    <p v-if="showContent">{{ message }}</p>
  </div>
</template>
```

**2. Render (渲染函数)**

* **本质:**  JavaScript 函数，用于生成 Virtual DOM (虚拟 DOM) 结构。
* **特点:**
    * 使用 JavaScript 的语法和逻辑来描述 UI。
    * 完全控制 UI 渲染过程，更加灵活。
* **优点:**
    * 灵活强大，可以实现复杂的 UI 逻辑和动态渲染。
    * 性能优化空间更大。
* **缺点:**
    * 相对来说更难理解和编写，需要更强的 JavaScript 技能。

**示例 (Vue 渲染函数):**

```javascript
render: function (h) {
  return h('div', [
    h('h1', this.title),
    this.showContent ? h('p', this.message) : null
  ])
}
```

**总结：**

| 特性     | Template | Render     |
| -------- | -------- | ---------- |
| 语法     | HTML     | JavaScript |
| 方式     | 声明式   | 命令式     |
| 灵活性   | 较低     | 较高       |
| 学习成本 | 较低     | 较高       |

**何时选择:**

* **Template:**  适合大部分场景，特别是 UI 结构相对简单，逻辑不复杂的情况下。
* **Render:**  需要更精细的控制 UI 渲染过程，实现复杂逻辑和动态效果时。

**一些框架的差异：**

* **Vue:**  同时支持模板和渲染函数，可以根据项目需要选择。
* **React:**  主要使用 JSX 语法，更接近于渲染函数的思想。

希望这能帮助你更好地理解 "template" 和 "render" 之间的区别。

## history api/Vue-Router的history模式和#模式

## 深入理解 History API、Vue Router 的 history 模式和 hash 模式

在单页面应用 (SPA) 中，路由管理是至关重要的。 Vue Router 作为 Vue.js 官方路由管理器，提供了两种模式来实现前端路由：hash 模式和 history 模式。这两种模式都依赖于浏览器机制，但实现方式和优缺点有所不同。

### 1.  History API 

在深入探讨 Vue Router 路由模式之前，先了解一下 `History API`。它是 HTML5 引入的一组 API，允许开发者直接操作浏览器历史记录，而无需刷新页面。 

**History API 主要方法：**

* `pushState(state, title, url)`: 向浏览器历史栈添加一个新的状态和 URL，不会触发页面刷新。
* `replaceState(state, title, url)`: 用新的状态和 URL 替换当前历史记录，也不会刷新页面。
* `onpopstate`: 监听浏览器历史记录的变化，例如点击浏览器前进后退按钮。

### 2. Hash 模式

#### 2.1 原理：

* 使用 URL 中的 hash 符号 (`#`) 来模拟路由。
* hash 符号后面的内容不会发送到服务器，而是由浏览器解析，改变页面视图。
* 通过监听 `hashchange` 事件，根据不同的 hash 值来渲染对应的组件。

#### 2.2 示例：

```
https://www.example.com/#/home
https://www.example.com/#/about
```

#### 2.3 优点：

* **兼容性好**: 兼容所有浏览器，包括旧版本的浏览器。
* **配置简单**: 无需服务器端配置。

#### 2.4 缺点：

* **URL 不美观**:  hash 符号的存在使得 URL 看起来不够简洁。
* **SEO 不友好**:  由于 hash 值不会发送到服务器，搜索引擎无法抓取到相应的页面内容。


### 3. History 模式

#### 3.1 原理：

* 利用 HTML5 History API，通过 `pushState` 和 `replaceState` 方法来改变 URL，不刷新页面。
* 需要服务器端配合，将所有路由请求指向应用首页，由前端路由管理。

#### 3.2 示例：

```
https://www.example.com/home
https://www.example.com/about
```

#### 3.3 优点：

* **URL 美观**: URL 看起来更像传统的网页链接。
* **SEO 友好**:  搜索引擎可以抓取到完整的 URL，有利于 SEO。

#### 3.4 缺点：

* **兼容性**: 不兼容 IE9 及以下版本浏览器。
* **需要服务器配置**: 当用户直接访问非首页路由时，服务器需要返回首页 HTML，否则会出现 404 错误。

### 4. Vue Router 中的两种模式

在 Vue Router 中，可以通过 `mode` 选项来配置路由模式：

```javascript
const router = createRouter({
  history: createWebHistory(), // history 模式
  // history: createWebHashHistory(), // hash 模式
  routes: [...]
})
```

* `createWebHistory()`:  使用 history 模式。
* `createWebHashHistory()`: 使用 hash 模式。


### 5.  如何选择

* **优先考虑 history 模式**： 如果不需要支持 IE9 及以下版本浏览器，并且可以配置服务器，建议使用 history 模式，因为它更美观，对 SEO 更友好。
* **特殊情况使用 hash 模式**： 如果需要兼容旧版浏览器，或者无法配置服务器，则只能使用 hash 模式。


### 6. 总结

| 特性       | Hash 模式             | History 模式        |
| ---------- | --------------------- | ------------------- |
| 原理       | hash 值变化           | History API         |
| URL 示例   | `example.com/#/about` | `example.com/about` |
| 兼容性     | 所有浏览器            | 现代浏览器 (IE10+)  |
| SEO        | 不友好                | 友好                |
| 服务器配置 | 不需要                | 需要                |


希望这篇文章能够帮助你更深入地理解 History API、Vue Router 的 history 模式和 hash 模式，并在实际项目中做出最佳选择。