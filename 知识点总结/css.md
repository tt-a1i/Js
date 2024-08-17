### meta

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```



- `http-equiv` 属性指定了该*meta标签的行为类似于一个HTTP头部信息*，尽管它实际上是存在于HTML文档中而不是HTTP响应头中。
- `content` 属性的值 `"IE=edge"` *表示让Internet Explorer使用其最高的可用渲染模式来显示当前网页*。这意味着IE浏览器将会尽可能地启用最新的渲染引擎特性，不采用任何可能导致页面按照旧版IE行为进行渲染的兼容性模式。



```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

这是一个HTML5中的meta标签，用于优化移动设备上的网页视图（viewport），即用户在移动设备（如手机、平板电脑）上看到的网页可视区域的大小和缩放比例。

详细解释如下：

- `name="viewport"`：定义了这是一个与视口相关的元数据标签。
- `content="width=device-width"`：设置视口宽度为设备屏幕的宽度，这样网页可以自动适应不同设备屏幕尺寸，实现响应式布局。
- `initial-scale=1.0`：设定初始缩放比例为1.0，也就是说网页加载时的缩放级别是100%，即网页的每一个CSS像素等于物理设备的一个像素点。

通过这样的配置，网页能够根据访问设备的屏幕尺寸进行适配，提供更好的移动端用户体验，避免了用户手动缩放页面以查看全部内容的问题。同时，这也符合现代Web设计中响应式设计的原则。

## 盒子模型

一个盒子由四个部分组成：`content`、`padding`、`border`、`margin`

`CSS`中，盒子模型可以分成：

- W3C 标准盒子模型
- IE 怪异盒子模型
- 默认情况下，盒子模型为`W3C` 标准盒子模型

1. **标准盒模型：**
   - 在标准盒模型中，元素的宽度和高度（width 和 height）属性值只包括内容区域的大小，不包括内边距（padding）、边框（border）和外边距（margin）。
   - `即元素的实际宽度和高度是由内容区域的大小加上内边距、边框和外边距的总和确定的。`
   - 这种盒模型是 CSS 标准规定的默认行为，也是现代浏览器的默认行为。
2. **怪异盒模型：**
   - 在怪异盒模型中，元素的宽度和高度（width 和 height）属性值包括内容区域、内边距和边框的大小，但不包括外边距。
   - `即元素的实际宽度和高度是由内容区域的大小加上内边距和边框的总和确定的。`
   - 怪异盒模型通常在老版本的浏览器（如 IE6 及以下）中存在，是这些浏览器的默认行为。当页面处于怪异模式（Quirks Mode）时，浏览器会采用怪异盒模型。

width部分不同,标准盒模型是content,怪异盒模型是content + border + padding

比如在怪异盒模型下，你设置width之后在设置padding，总的宽度是不变的，而是会挤压内容区

## css选择器

`css`属性选择器常用的有：

- id选择器（#box），选择id为box的元素
- 类选择器（.one），选择类名为one的所有元素
- 标签选择器（div），选择标签为div的所有元素
- 后代选择器（#box div），选择id为box元素内部所有的div元素
- 子选择器（.one>one_1），选择父元素为.one的所有.one_1的元素
- 相邻同胞选择器（.one+.two），选择紧接在.one之后的所有.two元素
- 群组选择器（div,p），选择div、p的所有元素

#### 优先级

`内联` >` ID选择器` > `类选择器` > `标签选择器`

如果外部样式需要覆盖内联样式，就需要使用`!important`

#### 继承属性

- 字体系列属性

```javascript
font:组合字体
font-family:规定元素的字体系列
font-weight:设置字体的粗细
font-size:设置字体的尺寸
font-style:定义字体的风格
font-variant:偏大或偏小的字体
```

- 文本系列属性

```javascript
text-indent：文本缩进
text-align：文本水平对刘
line-height：行高
word-spacing：增加或减少单词间的空白
letter-spacing：增加或减少字符间的空白
text-transform：控制文本大小写
direction：规定文本的书写方向
color：文本颜色
```

- 元素可见性

```javascript
visibility
```

- 表格布局属性

```css
caption-side：定位表格标题位置
border-collapse：合并表格边框
border-spacing：设置相邻单元格的边框间的距离
empty-cells：单元格的边框的出现与消失
table-layout：表格的宽度由什么决定
```

- 列表属性

```javascript
list-style-type：文字前面的小点点样式
list-style-position：小点点位置
list-style：以上的属性可通过这属性集合
```

- 引用

```css
quotes：设置嵌套引用的引号类型
```

- 光标属性

```css
cursor：箭头可以变成需要的形状
```

继承中比较`特殊`的几点：

- `a 标签`的`字体颜色`不能被继承
- `h1-h6`标签字体的大小也是不能被继承的

#### 无继承的属性

- display
- 文本属性：vertical-align、text-decoration
- 盒子模型的属性：宽度、高度、内外边距、边框等
- 背景属性：背景图片、颜色、位置等
- 定位属性：浮动、清除浮动、定位position等
- 生成内容属性：content、counter-reset、counter-increment
- 轮廓样式属性：outline-style、outline-width、outline-color、outline
- 页面样式属性：size、page-break-before、page-break-after

## em/px/rem/vh/vw区别

1. **px（像素）：**
   - 像素是`相对于显示器屏幕的最小点`的单位，是最基本的长度单位。
   - px 是`固定单位`，`不随着浏览器缩放而变化`，适合于固定布局。
2. **em：**
   - em 是`相对于元素自身字体`大小的单位。
   - 如果一个元素的字体大小为 16px，1em 等于 16px；如果字体大小为 20px，1em 等于 20px。
   - em 单位`可以继承父元素的字体大小`，适合于响应式设计和动态布局。
3. **rem：**
   - `rem 是相对于根元素（html）`的字体大小的单位。
   - rem 单位`不受继承影响`，始终是相对于根元素的字体大小。
   - rem 单位适用于需要整个页面的布局，更容易控制页面的整体样式。
4. **vh（视窗高度单位）：**
   - `vh 表示视口高度的百分比`，1vh 等于视口高度的 1%。
   - vh 单位可以用于制作响应式的布局，使元素的大小随着视口高度的变化而变化。
5. **vw（视窗宽度单位）：**
   - `vw 表示视口宽度的百分比`，1vw 等于视口宽度的 1%。
   - vw 单位可以用于制作响应式的布局，使元素的大小随着视口宽度的变化而变化。

总的来说，px 是最基本的单位，`em 和 rem 适用于动态布局和响应式设计`，`vh 和 vw 适用于制作响应式布局和实现相对于视口大小的元素尺寸`。选择合适的单位取决于设计需求和布局目标。

## 设备像素、css像素、设备独立像素、dpr、ppi 之间的区别

1. **设备像素（Device Pixel）：**
   - 设备像素是屏幕的物理像素，它是显示设备（如手机、电脑显示器）中最小的物理单元。
   - 设备像素是屏幕显示图像的基本单位，显示器上的每个点都由一个设备像素表示。
2. **CSS像素（CSS Pixel）：**
   - CSS 像素是浏览器中用于渲染网页的抽象单位，它是网页布局和样式表的基本单位。
   - CSS 像素通常是相对单位，它的大小会根据显示设备的像素密度而变化。
3. **设备独立像素（Device-Independent Pixel，dp 或 dip）：**
   - 设备独立像素是一种抽象单位，它是一种相对于屏幕物理特性的长度单位，通常被用于移动设备上。
   - 设备独立像素通常与密度无关的屏幕尺寸相关联，它与实际显示设备的物理像素之间有一个固定的关系。
4. **设备像素比（Device Pixel Ratio，DPR）：**
   - 设备像素比是设备像素与 CSS 像素之间的比率，用于衡量设备的像素密度。
   - 设备像素比可以通过设备的物理像素数除以 CSS 像素数来计算得到。
5. **每英寸像素（Pixels Per Inch，PPI）：**
   - 每英寸像素是指在一英寸长度内的设备像素数，用于衡量显示设备的像素密度。
   - PPI 越高，显示器的像素密度就越高，图像显示得就越清晰。

总的来说，设备像素是屏幕的物理像素，CSS 像素是浏览器中用于渲染的抽象单位，设备独立像素是相对于屏幕特性的抽象单位，DPR 是设备像素与 CSS 像素的比率，PPI 是每英寸的像素数。它们之间的关系涉及到屏幕分辨率、像素密度和网页布局等方面的概念。

## css中，有哪些方式可以隐藏页面元素？区别

1. **display: none;**
   - 使用 `display: none;` 可以完全隐藏页面元素，使其不占据任何空间。
   - 元素使用该属性后，将不会显示在页面中，并且不会占据任何空间，相当于`元素从文档流中移除。`
2. **visibility: hidden;**
   - 使用 `visibility: hidden;` 可以隐藏页面元素，但是元素仍然会占据空间。
   - 元素使用该属性后，仍然会保留其原本的大小和位置，只是不可见而已。
3. **opacity: 0;**
   - 使用 `opacity: 0;` 可以使页面元素完全透明，但元素仍然会占据空间。
   - 元素使用该属性后，`保留原有的大小和位置`，`只是完全透明不可见`。
4. **visibility: collapse;** (仅适用于表格元素)
   - 使用 `visibility: collapse;` 可以将表格的行或列隐藏，但是该属性只适用于表格元素。
   - 元素使用该属性后，会隐藏并且不占据任何空间。
5. **position: absolute; left: -9999px;**
   - 使用绝对定位和移动元素到屏幕外部，通常搭配 `position: absolute; left: -9999px;` 来实现。
   - 元素会被移动到屏幕外部，不会显示在页面上，但仍然会占据空间。

这些方式在实际应用中根据具体需求选择，如果需要完全隐藏元素并释放其占据的空间，可以使用 `display: none;`；如果需要隐藏元素但保留其占据的空间，可以使用 `visibility: hidden;` 或者 `opacity: 0;`。

## 谈谈你对BFC的理解？

BFC（块级格式化上下文）是 CSS 中的一种布局模式，用于定义块级盒子的布局及其内部元素如何相互排布和相互影响

1. **概念：**
   - BFC 是指一个独立的渲染区域，内部的块级盒子布局与外部无关，是一个独立的容器。
2. **特点：**
   - 内部的`块级盒子垂直方向上的布局是从上到下`的，两个块级盒子会`一个接一个地排列`。
   - 属于同一个 BFC 的`两个相邻的块级盒子的外边距会发生折叠`。
   - BFC 内部的元素`不会影响外部元素`，反之亦然。
3. **触发条件：**
   - 根元素（html）
   - 浮动元素（`float不为none`）
   - 绝对定位元素（`position`为`absolute`或`fixed`）
   - 行内块元素（`display`为`inline-block`）
   - `overflow`属性`不为visible`的块级元素
4. **应用场景：**
   - 清除浮动：将包含浮动元素的父元素设为 BFC，可以清除浮动。
   - 阻止外边距折叠：可以避免外边距折叠的影响。
   - 自适应两栏布局：使用 BFC 可以实现左右两栏布局，使得两栏高度相等且不会影响其他元素。

## 元素水平垂直居中的方法有哪些？如果元素不定宽高呢？

实现元素水平垂直居中的方式：

1. 利用定位+margin:auto
   - 设置父元素为相对定位， 子元素移动自身50%实现水平垂直居中		

1. 利用定位+margin:负值
2. 利用定位+transform
3. table布局
4. flex布局
5. grid布局

## 如何实现两栏布局，右侧自适应？三栏布局中间自适应呢

#### 两栏布局

- 使用 float 左浮左边栏
- 右边模块使用 margin-left 撑出内容块做内容展示
- 为父级元素添加BFC，防止下方元素飞到上方内容



`flex`可以说是最好的方案了，代码少，使用简单

注意的是，`flex`容器的一个默认属性值:`align-items: stretch;`

这个属性导致了列等高的效果。 为了让两个盒子高度自动，需要设置: `align-items: flex-start`

#### 三栏布局

- 两边使用 float，中间使用 margin
- 两边使用 absolute，中间使用 margin
- 两边使用 float 和负 margin
- display: table 实现
- flex实现
- grid网格布

## flexbox（弹性盒布局模型）,以及适用场景

Flexbox（弹性盒布局模型）是 CSS3 中的一种布局模式，用于在容器中对子元素进行灵活的排列和对齐。它通过在父元素上设置一些灵活的属性来控制子元素的布局，适用于各种不同的布局需求。

#### **特点：**

1. **灵活的布局：** Flexbox 可以让子元素在容器内以弹性的方式布局，根据容器的大小和子元素的特性自动调整布局。
2. **一维布局：** Flexbox 是针对一维布局（主轴和交叉轴）设计的，主要用于解决水平或垂直方向上的布局问题。
3. **对齐和排列：** Flexbox 提供了多种属性来控制子元素在主轴和交叉轴上的对齐和排列方式，包括主轴上的对齐方式（justify-content）、交叉轴上的对齐方式（align-items）、以及单个子元素的对齐方式（align-self）等。
4. **弹性伸缩：** Flexbox 允许子元素根据自身的特性和父容器的大小进行伸缩，可以设置子元素的伸缩比例（flex-grow）、收缩比例（flex-shrink）、以及基准大小（flex-basis）等。
5. **自适应布局：** Flexbox 可以适应不同尺寸的屏幕和设备，实现响应式布局效果，提高页面的适应性和可用性。

#### **适用场景：**

1. **水平和垂直居中：** 使用 Flexbox 可以轻松实现水平和垂直居中的效果，适用于各种布局场景。
2. **等高布局：** Flexbox 可以实现等高列布局，即使子元素的高度不同也可以保持同一行的高度相等。
3. **弹性布局：** Flexbox 可以实现弹性伸缩的布局效果，根据内容和空间的变化自动调整布局，适用于动态内容和可变尺寸的页面。
4. **响应式布局：** Flexbox 可以实现简单且有效的响应式布局，适应不同尺寸的屏幕和设备，提高页面的适应性和可用性。

## Grid（网格布局）

CSS Grid（网格布局）是 CSS3 中的一种布局模式，它提供了一种强大且灵活的方式来创建二维布局，可以将页面划分为行和列，并在这些行和列中放置元素。以下是 CSS Grid 的主要特点和适用场景：

**特点：**

1. **二维布局：** CSS Grid 是一种二维布局模式，可以同时控制行和列，以创建复杂的布局结构。
2. **自动调整：** Grid 布局可以根据网格容器的大小和子元素的特性自动调整布局，适应不同尺寸的屏幕和设备。
3. **强大的对齐方式：** Grid 提供了多种属性来控制子元素在网格中的对齐方式，包括对齐到网格线、对齐到网格区域等。
4. **网格线和网格轨道：** Grid 使用网格线（grid lines）和网格轨道（grid tracks）来定义布局，可以通过设置网格线的位置和间距来实现灵活的布局效果。
5. **网格区域：** Grid 允许将多个网格单元格组合成一个网格区域，可以通过命名网格区域来更方便地管理布局。

**适用场景：**

1. **复杂布局：** Grid 布局适用于创建复杂的布局结构，例如多栏布局、网格瀑布流布局等。
2. **等高布局：** Grid 布局可以实现等高列布局，即使子元素的高度不同也可以保持同一行的高度相等。
3. **响应式布局：** Grid 布局可以实现简单且有效的响应式布局，适应不同尺寸的屏幕和设备。
4. **项目布局：** Grid 布局适用于项目管理和布局，可以使用网格区域来更清晰地定义和管理页面的结构。

## CSS3新增了哪些新特性

1. **选择器的增强：** CSS3 引入了许多新的选择器，如属性选择器（Attribute Selectors）、伪类选择器（Pseudo-classes）、伪元素选择器（Pseudo-elements）等，使得样式的选择更加灵活和强大。
2. **盒模型的增强：** CSS3 引入了新的盒模型属性，如 box-sizing 属性，可以控制盒模型的尺寸计算方式，使得开发者可以更方便地进行布局设计。
3. **布局模块的增强：** CSS3 引入了弹性盒子布局（Flexbox）、网格布局（Grid Layout）等新的布局模块，可以更方便地实现复杂的页面布局效果。
4. **字体样式的增强：** CSS3 引入了新的字体属性，如 @font-face 规则、字体阴影（text-shadow）等，使得文字样式的设置更加丰富和灵活。
5. **渐变效果：** CSS3 引入了渐变效果（Gradient），包括线性渐变和径向渐变，可以在元素背景、边框等位置实现丰富多彩的渐变效果。
6. **过渡和动画：** CSS3 引入了过渡效果（Transition）和动画效果（Animation），可以实现元素的平滑过渡和动画效果，使得页面更加生动和具有交互性。
7. **多列布局：** CSS3 引入了多列布局（Multi-column Layout），可以实现多列文本布局，提高页面的可读性和排版效果。
8. **响应式布局：** CSS3 提供了媒体查询（Media Queries）和弹性图片（Flexible Images）等技术，可以实现响应式布局，使得页面可以在不同设备上呈现出最佳的布局效果。
9. **阴影和边框效果：** CSS3 引入了新的阴影效果（Box-shadow）和边框效果（Border-radius），可以实现丰富多彩的阴影和边框样式。
10. **3D转换和变换：** CSS3 引入了 3D 转换（Transform）和变换（Transform）效果，可以实现元素的三维旋转、缩放、平移等效果，增强页面的视觉效果。

## css3动画有哪些

- transition 实现渐变动画
- transform 转变动画
- animation 实现自定义动画

## 回流跟重绘

#### 重绘与重排区别

```javascript
    重排/回流（Reflow）：当DOM的变化影响了元素的几何信息，浏览器需要重新计算元素的几何属性，将其安放在界面中的正确位置，这个过程叫做重排。表现为重新生成布局，重新排列元素。

    重绘(Repaint): 当一个元素的外观发生改变，但没有改变布局,叫做重绘。表现为某些元素的外观被改变

『重绘』不一定会出现『重排』，『重排』必然会出现『重绘』。

如何触发重排和重绘？

    添加、删除、更新DOM节点

    通过display: none隐藏一个DOM节点-触发重排和重绘
display: none; 样式会立即隐藏元素，并触发回流和重绘，但是它不会占据页面布局空间，也无法接收用户交互事件。
    通过visibility: hidden隐藏一个DOM节点-只触发重绘

    移动或者给页面中的DOM节点添加动画

    添加一个样式表，调整样式属性

    用户行为，例如调整窗口大小，改变字号，或者滚动。

如何避免重绘或者重排？

    集中改变样式，不要一条一条地修改 DOM 的样式。

    不要把 DOM 结点的属性值放在循环里当成循环里的变量。

    尽量只修改position：absolute或fixed元素，对其他元素影响不大

    提升为合成层

    优点：
        合成层的位图，会交由 GPU 合成，比 CPU 处理要快
        当需要 repaint 时，只需要 repaint 本身，不会影响到其他的层
        对于 transform 和 opacity 效果，不会触发 layout 和 paint

方式：是使用 CSS 的 will-change 属性
```

## 行内元素、块级元素、空元素

| 类型         | 元素                                                         |
| :----------- | :----------------------------------------------------------- |
| 块级元素     | `<div>`, `<p>`, `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`, `<ol>`, `<ul>`, `<li>`, `<table>`, `<form>`, `<header>`, `<footer>`, `<section>`, `<article>`, `<nav>`, `<aside>` |
| 行内元素     | `<span>`, `<a>`, `<strong>`, `<b>`, `<em>`, `<i>`, `<u>`, `<sub>`, `<sup>`, `<img>`, `<label>`, `<textarea>`, `<input>`（部分情况除外）, `<button>`（部分情况除外） |
| 行内块级元素 | `<img>`, `<input>`, `<label>`, `<button>`                    |

### 块级元素（Block-level elements）

- **布局特性**：通常会占据调用它的容器的整个宽度，并且其后的元素会在新的一行显示。
- **常见用途**：用于创建文档或应用的结构布局。

### 行内元素（Inline elements）

- **布局特性**：不会独占一行，其宽度仅包围其内容。
- **常见用途**：用于标记文本，可以在段落内部或其他块级元素内部使用，而不会引起文本换行。

### 行内块级元素（Inline-block elements）

- **布局特性**：类似于行内元素，不会导致换行；同时具有块级元素的某些特性，如设置宽度和高度。
- **常见用途**：适合在需求同时需要行内布局和宽高控制的场景。

请注意，这个表格中的分类是基于元素的默认显示类型，但CSS可以修改这些元素的默认行为（例如，使用`display:block`，`display:inline`或`display:inline-block`等CSS属性）。

## Css预编语言

CSS预处理器是一种将类似于编程语言的特性引入CSS的工具，它们使得CSS`更具有可维护性`、可扩展性和重用性。常见的CSS预处理器包括Sass、Less和Stylus等,预处理是`Css`的超集

1. **特性**：
   - CSS 预处理器引入了类似于编程语言的特性，如变量、嵌套规则、混合（mixin）、继承（extend）等，使得样式代码更加模块化和易于维护。
   - 原生CSS没有这些特性，编写复杂的样式时可能会导致代码冗长和重复。
2. **变量**：
   - 预处理器允许定义变量来存储颜色、尺寸等样式信息，提高了样式的可重用性和维护性。
   - 原生CSS没有变量的概念，样式信息需要在多个地方重复编写。
3. **嵌套规则**：
   - 预处理器支持将样式规则嵌套在父选择器内，更加清晰地表示样式之间的层级关系。
   - 原生CSS不支持嵌套，需要在样式表中重复写选择器，增加了代码的冗余度。
4. **混合（Mixin）**：
   - 预处理器允许定义可重用的样式块，称为混合（Mixin），可以在需要的地方引用。
   - 原生CSS中实现相同效果需要使用类似于类的方式来实现，代码会变得冗长。
5. **继承（Extend）**：
   - 预处理器支持通过继承来共享样式规则，提高了样式的复用性和可维护性。
   - 原生CSS中没有继承的概念，样式需要在多个地方重复编写。
6. **代码压缩和优化**：
   - 预处理器通常提供了代码压缩和优化的功能，可以将编写的样式文件编译为精简的CSS文件，减少页面加载时间。
   - 原生CSS没有这样的功能，需要手动进行代码压缩和优化

## SCSS

SCSS（Sassy CSS）是一种 CSS 预处理语言，它扩展了 CSS 的功能并且提供了更多程序化的特性。SCSS 通过 Sass（Syntactically Awesome Style Sheets）来处理，Sass 是一个成熟、稳定、且强大的 CSS 扩展语言。SCSS 让你可以使用变量、嵌套规则、混入（mixins）、继承以及更多有助于编写可维护和重用的样式表的功能。

### 主要特性

#### 1. 变量

你可以存储一些经常使用的样式值，如颜色、字体或任何 CSS 值，并且通过一个方便的名称来重用它们。这让你的 CSS 代码更容易维护和更新。

```scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

#### 2. 嵌套

SCSS 允许你使用嵌套语法，让 CSS 规则的结构更清晰和更紧凑。这样的方式使得继承父选择器的制定更为直观。

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

#### 3. 混入

混入允许你创建可复用的代码块，并且可以包含全部的 CSS 属性。

```scss
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
      -ms-border-radius: $radius;
          border-radius: $radius;
}

.box { @include border-radius(10px); }
```

#### 4. 导入

SCSS 提供了一个更加强大的 `@import` 规则，它允许你导入其他样式表文件，这有助于你组织和模块化你的样式代码。

#### 5. 继承

使用 `@extend`，你可以让一个选择器继承另一个选择器的样式。这是一个简单强大的方式来避免重复代码，并保持样式表的整洁和可读性。

```scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}

.seriousError {
  @extend .error;
  border-width: 3px;
}
```

#### 6. 控制指令

SCSS 提供了一些编程结构如条件语句和循环，这些可以用来动态生成样式。

```scss
@for $i from 1 through 10 {
  .border-#{$i} { border-width: #{$i}px; }
}
```

## SCSS的优势

你目前的代码结构很清晰，使用 JavaScript 处理 PDF 功能，用 CSS 样式美化页面。

**使用 SCSS 代替 CSS 的优势**

1. **提高代码组织性**

   *  **嵌套:** SCSS 允许你按照 HTML 结构嵌套样式规则，使代码更易读和维护，例如：
     ```scss
     .main {
       border: 2px solid #dcdfe6;
      
       .pdf-container {
         width: 75%; 
         // ...其他样式
       }
     }
     ```

   * **变量:**  你可以定义变量来存储颜色、字体等重复值，方便全局修改：
     ```scss
     $primary-color: #F56C6C; 
     $secondary-color: #67C23A;
      
     .total { 
       b {
         &:first-of-type { color: $primary-color; } // 使用变量
         &:last-of-type { color: $secondary-color; }
       }
     }
     ```

   * **Mixins:**  将可复用的样式块定义为 mixin，减少重复代码：
      ```scss
      @mixin button-style { 
        border: none;
        background: none;
        cursor: pointer;
      }
      
      .el-button[type="text"] {
        @include button-style; 
      }
      ```

2. **代码更简洁、可维护性强**

   通过变量、嵌套、mixin 等特性，SCSS 能够显著减少代码量，提高可读性和可维护性，尤其是在大型项目中优势更加明显。

3. **功能更强大**

   * 函数：SCSS 支持自定义函数，实现更复杂的逻辑运算。
   *  控制流：可以使用 `@if`, `@for`, `@each` 等控制语句，根据条件生成不同的样式。

**如何修改现有代码以使用 SCSS**

1. 将 `<style lang="less" scoped>` 改为 `<style lang="scss" scoped>`。

2.  根据 SCSS 语法，利用上面提到的特性重构你的 CSS 代码。

**总结**

对于你目前的代码，使用 SCSS 可以使代码更清晰、易于维护，但优势不是特别明显。  如果你之后需要添加更多样式，或者项目规模扩大，那么使用 SCSS 将会带来更大的好处。

## SVG的属性

###  核心属性

- **id:** 定义唯一标识符。
- **class:** 指定应用一个或多个类。
- **style:** 用于指定CSS样式。

### 2. 图形属性

- **fill:** 定义图形的`填充颜色`。
- **stroke:** 定义图形`轮廓的颜色`。
- **stroke-width:** 定义`轮廓的宽度`。

### 3. 位置与尺寸属性

- **x, y:** 用于定义元素的`位置`。
- **width, height:** 用来`定义元素的宽度和高度`。
- **cx, cy:** 对于圆形元素，`定义圆心位置`。
- **r:** 对于圆形元素，`定义半径`。
- **d:** 用于`<path>`元素，`定义路径`。

### 4. 变换属性

- **transform:** 应用于元素的变换，如平移（`translate`）、缩放（`scale`）、旋转(`rotate`)、斜切(`skewX`, `skewY`)。

### 5. 文本属性

- **text-anchor:** 定义文本的对齐方式（如`start`, `middle`, `end`）。
- **font-size, font-family, font-weight:** 分别设置字体大小、字体族和字体粗细。

### 6. 视图控制属性

- **viewBox:** 定义要从SVG图像中显示的部分。
- **preserveAspectRatio:** 控制SVG图形在不同视口尺寸下的缩放和对齐方式。

### 7. 颜色和样式

- **opacity:** 定义`透明度`。
- **fill-opacity, stroke-opacity:** 分别设置填充和描边的透明度。

### 8. 动画属性

- **animate, animateTransform, animateMotion:** 用于定义动画效果。

### 9. 链接属性

- **href (或 xlink:href):** 用于在SVG元素中`创建链接`。

### 10. 事件属性

SVG支持绑定常见的事件如：

- **onclick, onmouseover, onmouseout, onload,** 等

## position的属性

`position` 属性用来指定一个元素在文档中的定位方式。`position` 属性有以下几种值：

1. **`static`**:
   - 这是默认值。
   - 元素按照正常的文档流进行排布。
   - 此时的 `top`、`right`、`bottom`、`left` 和 `z-index` 属性不会被应用。
2. **`relative`**:
   - 相对定位允许元素相对于其在正常流中的位置进行定位。
   - 设置 `top`、`right`、`bottom` 或 `left` 属性会使元素相对于其正常位置移动。
   - 元素仍保留在常规流中，即不会影响其他元素的布局。
3. **`absolute`**:
   - 绝对定位使元素相对于其最近的已定位的祖先元素定位（即非 `static` 的元素），如果没有已定位的祖先元素，则相对于初始包含块（通常是页面的文档体或 `viewport`）定位。
   - 元素被从常规流中移除，因此不会影响其他元素的布局。
   - 使用 `top`、`right`、`bottom` 和 `left` 属性来规定元素从最近的定位祖先的边框到元素边框的距离。
4. **`fixed`**:
   - 固定定位将元素相对于浏览器窗口进行定位。
   - 元素随着页面滚动而保持固定位置。
   - 元素被从常规流中移除，同样不影响其他元素的布局。
5. **`sticky`**:
   - 粘性定位可以被看作是相对定位和固定定位的混合。
   - 它基于用户的滚动位置来定位元素。
   - 元素在屏幕中的位置依赖于滚动位置，并且在达到滚动阈值之前表现为相对定位，之后表现为固定定位。
   - 需要使用 `top`、`right`、`bottom` 或 `left` 中的某个属性来设置元素在变为 "sticky"（粘性定位）之前的滚动范围。

## TailWind Css

Tailwind CSS 是一种`功能类优先`的` CSS 框架`，它提供了大量的实用类，用于快速构建用户界面。它与传统的 CSS 方法不同，因为它不鼓励直接书写 CSS 样式，而是使用预定义的类直接在 HTML 中应用样式。

### Tailwind CSS 的主要特点：

1. **功能类优先**：功能类可以直接在 HTML 中应用，使得布局和设计的更改更加快速和直观。例如，`mt-4` 用于应用 `margin-top: 1rem;`。
2. **高度自定义**：Tailwind CSS 允许通过配置文件（通常是 `tailwind.config.js`）高度自定义设计系统，例如颜色、字体、间距等。你可以调整这些设置以符合你的品牌标准。
3. **响应式设计**：通过使用诸如 `sm:`, `md:` 这样的前缀，可以轻松创建响应式设计。这些前缀使得在不同的屏幕尺寸下应用不同的样式变得简单。
4. **实用的插件生态**：Tailwind 社区提供了许多插件，这些插件可以扩展框架的基础功能，如表单插件、行过滤插件等。
5. **与现代工具集成**：Tailwind CSS 可以轻松集成到现代前端工具链中，包括 Webpack, Vite, PostCSS 等。
6. **可显著减少 CSS 文件大小**：使用 PurgeCSS（现在内置于 Tailwind CSS）可以从最终的生产构建中删除未使用的 CSS，从而显著减小文件大小。
7. **实用的默认配色方案**：Tailwind 提供了一个旨在美观实用的默认配色方案，但也允许高度自定义。

### 使用场景：

- **快速原型开发**：Tailwind 的功能类方法使得快速迭代和原型开发变得非常快捷。
- **自定义用户界面设计**：对于需要高度定制 UI 的项目，Tailwind 让设计师和开发者能够更精细地控制界面的每一个细节。
- **与组件库结合**：可以将 Tailwind 与 React, Vue, Angular 等现代 JavaScript 框架一起使用，创建可重用的 UI 组件。

通过使用 Tailwind CSS，开发者和设计师可以更加专注于构建精美而响应迅速的界面，而无需担心大量的样式维护问题。与传统 CSS 相比，它提供了一种更为高效和可控的方式来处理前端样式问题。

## requestAnimationFrame 

requestAnimationFrame 是一个浏览器 API，用于优化动画渲染性能。它的主要作用和特点包括：

1. 优化动画性能：
   - 与浏览器的刷新率同步，通常是 60fps（每秒60帧）。
   - 确保动画更加流畅，减少卡顿。

2. 提高电池寿命：
   - 当标签页不可见时，动画会自动暂停，节省 CPU 和 GPU 资源。

3. 自动调节帧率：
   - 根据设备性能和系统负载自动调整，保证最佳性能。

4. 精确的时间控制：
   - 提供一个高精度的时间戳，便于计算动画进度。

5. 避免过度渲染：
   - 限制在浏览器重绘之前完成所有动画操作，防止一帧中多次重绘。

6. 优化后台标签页：
   - 当页面不在活动标签页时，动画会自动暂停，节省资源。

7. 替代 setTimeout 和 setInterval：
   - 对于动画来说，requestAnimationFrame 比这两个方法更加高效和准确。

使用示例：

```javascript
function animate(time) {
    // 更新动画状态
    updateAnimation(time);

    // 绘制动画
    drawAnimation();

    // 继续下一帧
    requestAnimationFrame(animate);
}

// 开始动画循环
requestAnimationFrame(animate);
```

在这个例子中，animate 函数会在每一帧被调用，time 参数提供了一个精确的时间戳。

总之，requestAnimationFrame 是创建高性能、流畅 Web 动画的关键工具，它能够智能地管理动画timing，优化资源使用，并提供更好的用户体验。

## css会阻塞dom渲染吗，dom解析呢

在讨论浏览器渲染过程中 CSS 对于 DOM 和页面显示的影响时，需要区分几个关键步骤：DOM 解析、CSSOM 解析、渲染树构建、布局计算与绘制。

### 1. CSS 是否阻塞 DOM 解析？

**CSS 不会阻塞 DOM 解析**。浏览器在解析 HTML 文件时，会同时进行 DOM 树构建和 CSSOM 树构建。具体流程如下：
- **DOM 树**：浏览器从上到下解析 HTML，逐步构建 DOM 树。
- **CSSOM 树**：浏览器在解析遇到 `<link>` 标签引入的外部 CSS 文件时，会开始下载和解析这些 CSS 文件，构建 CSSOM 树。

虽然 CSS 解析是并行进行的，但它并不阻止 DOM 树的构建。

### 2. CSS 是否阻塞 DOM 渲染？

**CSS 会阻塞 DOM 的渲染**。这是因为，在页面渲染之前，浏览器需要将 CSSOM 树与 DOM 树结合起来，生成渲染树（Render Tree）。只有当 CSSOM 树和 DOM 树都构建完成以后，浏览器才能开始生成渲染树，并进行后续的布局计算与绘制。因此，如果在构建 CSSOM 树的过程中某些关键 CSS 文件尚未加载完毕，就会导致渲染过程被阻塞，进而影响页面的首屏渲染。

### 小结：

- **DOM 解析**：CSS 不会阻塞 DOM 树的解析。
- **页面渲染**：CSS 会阻塞渲染树的生成，进而阻塞页面的最终渲染。

### 优化技巧

为了优化页面的加载性能，减少 CSS 文件对 DOM 渲染的阻塞影响，可以采取以下几种策略：

1. **尽量减少 CSS 文件的数量和体积**：合并和压缩 CSS 文件，移除不必要的样式。
2. **使用异步加载 CSS**：例如使用 `media` 属性，或者动态创建 `<link>` 标签加载非关键 CSS 文件。
   ```html
   <link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'; this.onload=null;">
   ```
3. **内联关键 CSS**：在 HTML 文件中包含关键的 CSS 片段，确保首屏内容可以尽快渲染。
   ```html
   <style>
       /* Critical CSS */
   </style>
   ```
4. **异步加载非关键 CSS**：可以使用 JavaScript 动态加载非关键的 CSS 文件。
   ```javascript
   const link = document.createElement('link');
   link.rel = 'stylesheet';
   link.href = 'non-critical-styles.css';
   document.head.appendChild(link);
   ```

总结来说，尽管 CSS 不会阻塞 DOM 解析，但它会阻塞页面的渲染。通过合理地组织和加载 CSS，能够有效提升页面的加载速度和用户体验。

## querySelectorAll得到结果，能否用forEach遍历，如何遍历？

`querySelectorAll` 方法返回一个静态的 `NodeList` 对象，虽然这个结果看起来类似于数组，但它并不是一个真正的 JavaScript 数组。然而，自 ECMAScript 2015 (ES6) 以来，`NodeList` 对象已经实现了 `forEach` 方法，因此你可以直接对 `NodeList` 进行 `forEach` 遍历。

### 使用 `forEach` 遍历 `NodeList`

以下是一个简单的例子，展示了如何使用 `forEach` 方法遍历 `querySelectorAll` 返回的 `NodeList`：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Query Selector All Example</title>
</head>
<body>
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const items = document.querySelectorAll('.item');
      items.forEach(item => {
        console.log(item.textContent);
      });
    });
  </script>
</body>
</html>
```

### 兼容性考虑

尽管现代浏览器都支持 `NodeList.prototype.forEach`，如果你需要在不支持 `forEach` 方法的旧浏览器（如 IE）上也能正常运行代码，可以将 `NodeList` 转换为一个真正的数组，然后再进行遍历。这可以通过 `Array.from` 或者 `Array.prototype.slice.call` 实现。

#### 使用 `Array.from`

```javascript
const items = document.querySelectorAll('.item');
Array.from(items).forEach(item => {
  console.log(item.textContent);
});
```

#### 使用 `Array.prototype.slice.call`

```javascript
const items = document.querySelectorAll('.item');
Array.prototype.slice.call(items).forEach(item => {
  console.log(item.textContent);
});
```

### 其它遍历方法

除了使用 `forEach`，你也可以使用其他遍历方法，例如 `for...of` 循环或传统的 `for` 循环。

#### 使用 `for...of`

```javascript
const items = document.querySelectorAll('.item');
for (const item of items) {
  console.log(item.textContent);
}
```

#### 使用传统的 `for` 循环

```javascript
const items = document.querySelectorAll('.item');
for (let i = 0; i < items.length; i++) {
  console.log(items[i].textContent);
}
```

总结来说，`querySelectorAll` 返回的 `NodeList` 是可以使用 `forEach` 直接进行遍历的，此外你也可以选择将其转换为数组或使用其他循环方式进行遍历。

## CSS懒加载

CSS 懒加载是一种优化网页加载性能的方法，旨在推迟加载非关键的 CSS 资源，直到它们实际需要时才进行加载。这种策略可以减少页面初次加载时的渲染阻塞，提高页面加载速度和性能。

### 为什么需要 CSS 懒加载？

1. **提高初次渲染速度**：在页面首次加载时，浏览器会等待关键 CSS 文件下载完毕再进行渲染，懒加载非关键 CSS 可以减少渲染阻塞。
   
2. **减小页面初始加载重量**：只加载首屏需要的样式，减少初次加载的 CSS 文件大小。
   
3. **密集带宽利用**：将非必要的 CSS 延迟加载，有助于更高效地利用网络带宽。

### 实现 CSS 懒加载的方法

#### 1. **Media Queries**

通过为 `<link>` 标签设置 `media` 属性，可以指定某些 CSS 仅在特定媒体条件下加载。例如：

```html
<link rel="stylesheet" href="print.css" media="print">
```

这里的 CSS 文件只在页面打印时加载。

#### 2. **JavaScript 动态加载**

可以使用 JavaScript 动态创建 `<link>` 标签来加载 CSS：

```javascript
function loadCSS(href) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

// 在需要时调用
loadCSS("styles.css");
```

这种方法可以用于在特定用户交互或页面滚动到某个部分时加载 CSS。

#### 3. **Preload + On Demand Loading**

首先预加载CSS，然后在结束时应用：

```html
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>
```

这里使用 `preload` 在浏览器后台预加载 CSS 文件，当文件加载完成后，`onload` 回调将 `rel` 修改为 `stylesheet`，以此方式应用样式。

#### 4.使用 `Intersection Observer` 实现懒加载

可以使用 `Intersection Observer` 来检测元素是否出现在视口中，然后懒加载对应的样式。

```javascript
// 初始化 Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 当目标元素出现在视口中时，加载所需的 CSS 文件
      loadCSS('/path/to/style.css');
      // 停止观察该元素
      observer.unobserve(entry.target);
    }
  });
});

// 目标元素
const targetElement = document.querySelector('#lazy-load-element');

// 开始观察目标元素
observer.observe(targetElement);
```

#### 5.路由懒加载与 CSS 懒加载结合

在使用前端路由时（如 Vue Router 或 React Router），可以在路由切换时动态加载特定页面的 CSS。

### 注意事项

- **确保关键渲染路径的 CSS 不被懒加载**：CSS 懒加载应该只应用于非关键样式，否则会导致页面打开时未渲染完全的闪烁或无样式的元素。
  
- **处理 FOUC（无样式内容闪烁）**：一些懒加载策略可能导致首屏出现无样式内容闪烁的问题，要小心控制懒加载 CSS 的时机。

- **浏览器兼容性**：某些方法可能在老旧浏览器中不被支持，应该进行浏览器兼容性检查。

总的来说，合理的 CSS 懒加载策略可以显著提升页面的首屏加载性能，同时确保用户体验不受影响。根据项目的具体需求选择合适的懒加载技术至关重要。



