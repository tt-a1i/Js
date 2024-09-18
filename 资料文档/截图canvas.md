创建一个div

绝对定位,定义border的宽度和颜色,div的起始点坐标为鼠标点击事件中的e.offsetX和e.offSetY

```javascript
this.rectStart = { x: event.offsetX, y: event.offsetY };
// 创建选择框元素
this.selectionBox = document.createElement("div");

this.selectionBox.style.position = "absolute";
this.selectionBox.style.border = "2px solid red";
this.selectionBox.style.left = `${this.rectStart.x}px`;
this.selectionBox.style.top = `${this.rectStart.y}px`;
this.selectionBox.style.width = `0px`;
this.selectionBox.style.height = `0px`;
this.$refs.pdf.$el.appendChild(this.selectionBox);
```

添加鼠标按下和抬起事件监听器，用于在截图模式下选择区域

```js
pdfContainer.addEventListener("mousedown", this.startSelection);
pdfContainer.addEventListener("mouseup", this.endSelection);
```

```js
// 绑定鼠标点击状态下移动事件变更截图范围的监听器
this.$refs.pdf.$el.addEventListener("mousemove", this.moveSelection);
```

移动事件过程中,更新div尺寸

```javascript
// 更新选择框尺寸和位置
if (width > 2 && height > 2) {
this.selectionBox.style.width = `${width}px`;
this.selectionBox.style.height = `${height}px`;

// 设置选择框的左上角位置
// 使用Math.min确保左上角坐标是最小的起始坐标，即使鼠标向右或向下拖动
this.selectionBox.style.left = `${Math.min(
  this.rectStart.x,
  currentX
)}px`;
this.selectionBox.style.top = `${Math.min(
  this.rectStart.y,
  currentY
)}px`;
}
```

使用 html2canvas 库将 PDF 页面元素转换为 Canvas

获取canvas上下文
    const ctx = canvas.getContext("2d");

计算div裁剪区域的左上角坐标和宽高

getImageData 方法返回一个 ImageData 对象，包含裁剪区域的像素数据。
const imageData = ctx.getImageData(x + 4, y + 4, width - 4, height - 4); 

创建临时canvas

调用putImage方法绘制div的像素数据

const tmpCtx = tmpCanvas.getContext("2d");
tmpCtx.putImageData(imageData, 0, 0);

转化数据

tmpCanvas.toDataURL("image/png");

```javascript
// 选择PDF的页面元素
const pdfPageElement = document.querySelector(".pdfPreview");

// 将PDF预览页面元素转换为canvas
// 使用 html2canvas 库将 PDF 页面元素转换为 Canvas
const canvas = await html2canvas(pdfPageElement);

// 如果定义了选择区域的起始和结束点，则进行裁剪
// 从canvas中裁剪选定区域
if (this.rectStart && this.rectEnd) {
    // 获取canvas上下文
    const ctx = canvas.getContext("2d");
    // 计算裁剪区域的左上角坐标和宽高
    const x = Math.min(this.rectStart.x, this.rectEnd.x);
    const y = Math.min(this.rectStart.y, this.rectEnd.y);
    const width = Math.abs(this.rectEnd.x - this.rectStart.x);
    const height = Math.abs(this.rectEnd.y - this.rectStart.y);

    // getImageData 方法返回一个 ImageData 对象，包含裁剪区域的像素数据。
    const imageData = ctx.getImageData(x + 4, y + 4, width - 4, height - 4); //对偏移进行修正
    const tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = width;
    tmpCanvas.height = height;
    const tmpCtx = tmpCanvas.getContext("2d");
    tmpCtx.putImageData(imageData, 0, 0);

    // 将临时canvas转换为数据URL
    // 获取裁剪后的图像的数据URL
    const img = tmpCanvas.toDataURL("image/png");
```

