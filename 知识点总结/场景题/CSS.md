## link和@import的区别

在网页开发中，`<link>` 标签和 `@import` 语句都是用于在 HTML 中引入 CSS 样式表的方法。然而，它们之间存在一些显著的区别：

### 1. 加载过程

- **`<link>` 标签**：
  - 是 HTML 标准的标签，用于在文档中引用外部资源。
  - 浏览器在解析 HTML 时，会立即处理 `<link>` 标签借此加载相关的 CSS 文件。
  - 由于 `<link>` 是属于 HTML 解析过程的一部分，CSS 文件会被并行加载，有助于提高页面的加载速度。

- **`@import` 语句**：
  - 是 CSS 提供的语法，通常用于在样式表中导入其他样式表。
  - 由于 `@import` 是 CSS 规则，在解析 CSS 时才会处理它。
  - 样式表中的 CSS 规则是按顺序解析的，这样可能导致较慢的加载速度，因为依赖的样式表加载会被阻塞。

### 2. 位置

- **`<link>` 标签**：
  - 通常放置在 HTML 文档的 `<head>` 部分。
  
- **`@import` 语句**：
  - 必须写在 CSS 文件的开头或其他 `@import` 语句之后。

### 3. 浏览器兼容性

- **`<link>` 标签**：
  - 被所有现代浏览器，包括旧版本浏览器普遍支持。

- **`@import` 语句**：
  - 老版本浏览器（如 Netscape 4 和 IE4 等）对 `@import` 的支持较差。
  
### 4. 用法和灵活性

- **`<link>` 标签**：
  - 由于 `<link>` 是一个 HTML 标签，它不仅能引入 CSS 资源，也可以用来添加其他资源（如 `rel="icon"` 用于网站图标）。
  - 可以使用媒体属性指定在哪些情况下启用外部样式，例如：`<link rel="stylesheet" href="style.css" media="screen and (max-width: 600px)">`

- **`@import` 语句**：
  - 仅用于引入 CSS 文件。
  - 允许通过指定媒体查询进行条件样式导入，例如：`@import url("print.css") print;`

### 综合影响

- **性能方面**：使用 `<link>` 标签通常比 `@import` 更优，因为 `<link>` 提供并行加载能力，不阻塞后续样式表。

- **使用场景**：如果需要保证最大化的兼容性和性能，优先选择 `<link>` 标签。但 `@import` 可能在一些情况下提供额外的灵活性，尤其是在动态加载需求中或是通过 CSS 自身间接引入其他样式。

总的来说，尽管在某些情况下 `@import` 提供了便捷性，但 `<link>` 标签由于其较佳的性能和广泛的兼容性，是通常推荐的引入样式的方法。

## 中间有间距，两边没有间距，怎么设置

如果你想在两端没有间距，但元素间有间距的布局情况，可以通过多种方式实现，具体取决于应用场景和布局要求。常见的方法包括使用 CSS 的 `margin` 配合灵活的布局技巧。例如，你有一个水平布局的多个项（如按钮或图片），希望中间的项目之间有间距，而两端没有间距。以下是一些常见的方法：

### 1. Flexbox 布局

使用 flexbox 可以很方便地控制间距：

```html
<div class="container">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</div>
```

```css
.container {
  display: flex;
  justify-content: space-between;
}

.item {
  /* 设置所有子元素之间的默认间距 */
  margin: 0;
}

.item:not(:last-child) {
  /* 除了最后一个元素，其他元素之间添加右侧间距 */
  margin-right: 16px; /* 根据需求调整间距宽度 */
}
```

### 2. Grid 布局

CSS Grid 提供了对间距的良好控制：

```html
<div class="grid-container">
  <div class="grid-item">Item 1</div>
  <div class="grid-item">Item 2</div>
  <div class="grid-item">Item 3</div>
</div>
```

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 根据需求调整列数 */
  column-gap: 16px; /* 设置列间距 */
}

.grid-item {
  /* 可以设置必要的样式 */
}
```

### 3. 使用 CSS Margin

针对简单不需要响应式的情况：

```html
<div class="wrapper">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</div>
```

```css
.wrapper {
  display: flex;
}

.item {
  margin-left: 0;  /* 移除左侧间距 */
}

.item + .item {
  margin-left: 16px; /* 为除第一个外的所有元素添加左侧间距 */
}
```

### 4. 使用伪元素

对于某些情形，伪元素也是一种灵活的选择，但通常需要更加复杂的布局和效果，建议在非必要情况下优先使用前面的方法。

以上每种方法的选择遵循具体需求和项目需求与可维护性。`flexbox` 和 `grid` 方法优点是对响应式和复杂布局友好，而改变 `margin` 的方法最适用于简单布局。根据项目实际需要选择最适合的方法来实现间距控制。

##  css做动画有哪些方案

在 CSS 中，为元素创建动画有多种方案，主要包括以下几种：

1. **CSS Transition**：
   - **简介**：CSS 过渡（transition）允许在属性变化时，平滑地进行从一个状态到另一个状态的动画效果。
   - **适用场景**：适用于响应用户交互的简单动画，比如鼠标悬停或者焦点变化。
   - **示例使用**：
     ```css
     .box {
       width: 100px;
       height: 100px;
       background-color: blue;
       transition: background-color 0.5s ease;
     }
     .box:hover {
       background-color: red;
     }
     ```
   - **特点**：只在元素状态改变时触发。

2. **CSS Animation**：
   - **简介**：CSS 动画（animation）使用关键帧（@keyframes），定义元素从一种样式变化到另一种样式的一系列关键步骤。
   - **适用场景**：适合更复杂的、需要精细控制的动画，比如循环动画、独立于用户交互的动画。
   - **示例使用**：
     ```css
     @keyframes slide {
       from { transform: translateX(0); }
       to { transform: translateX(100px); }
     }
     .box {
       width: 100px;
       height: 100px;
       background-color: blue;
       animation: slide 2s infinite alternate;
     }
     ```
   - **特点**：可以脱离状态变化独立运行，支持更多控制如延迟、重复、方向等。

3. **Background Position Animation**：
   - **简介**：背景位置动画通过改变背景图像的位置来实现简单的动画效果，比如循环帧图像。
   - **特点**：主要用于背景精灵图，实现帧动画。

4. **CSS Transforms with Animation/Transition**：
   - **简介**：结合 transform 属性（如 `translate`, `rotate`, `scale` 等）可以通过 transitions 或 animations，提供平滑的几何动画效果。
   - **适用场景**：适合需要元素位置、大小、旋转改变的动画。

这些 CSS 动画技术各有优劣，其中 `transition` 更加适用于简单的触发性动画，而 `animation` 更灵活，适用于更复杂和动态的动画效果。在创建较复杂动画时，使用 CSS Animation 通常是最佳选择，因为它提供了更高的控制能力

## 场景：一个表很多数据、很多图标，怎么优化。

说实话我答了分页，不给分页就虚拟滚动、图片懒加载，他说还有呢，我心想还有什么呀？

webworkers

## 下面这段代码会执行几次回流

   

```css
div.style.width = 10;
div.style.height = 10;
console.log(div.offsetWidth);
console.log(div.offsetHeight);
```

在这段代码中，我们首先通过直接修改元素 `div` 的样式属性 `width` 和 `height`，然后访问元素的 `offsetWidth` 和 `offsetHeight`。这将引发回流的发生。让我们分析一下具体的回流次数。

### 回流（重排）发生的原因

- **设置 `style` 属性**：
  - `div.style.width = 10` 和 `div.style.height = 10` 实际上并不会立即引发回流。仅仅是将新的样式应用到对应的 CSSOM 树上。

- **读取布局属性**：
  - 当我们访问 `div.offsetWidth` 和 `div.offsetHeight` 时，这些属于“读取布局属性”的操作，会引发浏览器进行一次回流，以确保该元素的最新样式应用到它的布局上，并返回准确的值。

### 这段代码中的回流次数

在你的代码中，有两个布局属性的读取（`offsetWidth` 和 `offsetHeight`）。默认来说，访问任何一个布局属性都会强制浏览器进行一次回流以计算最新的尺寸和位置。因此在这个具体例子中，该段代码会触发**一次回流**。

### 为什么不是两次回流？

当 `div.offsetWidth` 被访问时，会触发一次回流，浏览器已经计算了所有需要更新的布局信息。随后访问 `div.offsetHeight` 时，浏览器会使用已经计算好的布局信息，因此不会再次触发回流。

### 总结

最终，这段代码触发的回流次数是**一次**。这是一种浏览器优化行为，旨在尽量减少回流的频率以增强性能。为了避免不必要的回流，可以考虑将多次布局属性读取合并在一起，减少回流的触发。