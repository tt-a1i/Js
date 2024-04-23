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