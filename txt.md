##### ==问题:这是我的代码,如何可以设置当我点击渲染出来的可点击区域后,图片预览栏对应的图片显示一个红色的边框,并且如果图片预览栏里对应的图片不在当前视口的话,自动滚动到当前视口==



要实现点击 PDF 内的可点击区域后在图片预览栏对应的图片显示红色边框，并且确保图片如果不在当前视口中则自动滚动到视口内，你需要在你的 Vue 组件中添加一些逻辑和样式。下面是实现这些功能的步骤：

### 1. 点击事件处理

首先，为每个可点击区域添加点击事件处理函数。这个处理函数将会改变相应图片的状态，显示红色边框，并且检查图片位置，如果不在视口中则滚动到视口内。

#### 修改 `createClickableAreas` 方法 

在创建可点击区域的 div 元素时，添加点击事件监听器：

```javascript
clickableArea.addEventListener('click', () => {
  this.handleImageActivation(coord.imageIndex);
});
```

确保传递一个可以标识对应图片的参数，如 `imageIndex`，这应当是图片在 `pdfPreviewImage` 数组中的索引。

#### 创建 `handleImageActivation` 方法

这个方法负责设置当前激活的图片，并处理滚动逻辑：

```javascript
handleImageActivation(index) {
  this.activeImageIndex = index; // 设置当前激活的图片索引

  // 获取对应的图片元素
  const imgElement = this.$refs.elImage[index].$el;

  // 添加红色边框样式
  this.pdfPreviewImage.forEach((img, idx) => {
    if (idx === index) {
      imgElement.style.border = '2px solid red';
    } else {
      this.$refs.elImage[idx].$el.style.border = 'none';
    }
  });

  // 滚动到图片
  this.scrollToView(imgElement);
}
```

#### 创建 `scrollToView` 方法

这个方法负责将不在视口中的图片滚动到视口内：

```javascript
scrollToView(element) {
  // 仅当元素不在视口中时执行滚动
  if (!this.isElementInViewport(element)) {
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }
}

isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
```

### 2. 样式添加

确保你在 CSS 中有适合的样式设置来显示激活状态：

```css
.image-container /deep/ .el-image {
  border: 1px solid #ddd; /* 默认无红色边框 */
  /* 其他样式不变 */
}
```

`handleImageActivation` 方法会动态改变元素的边框样式。

### 3. 组件状态

在 `data` 方法中添加 `activeImageIndex` 状态用来追踪当前激活的图片索引：

```javascript
data() {
  return {
    activeImageIndex: null,
    // 其他数据不变
  };
}
```

完成以上步骤后，你应该能够达到点击 PDF 的可点击区域，在图片预览栏中对应的图片显示红色边框，并且如果该图片不在当前视口中，会自动滚动到视口的功能。

要让PowerShell脚本在计算机启动时自动执行，您可以使用任务计划程序（Task Scheduler）来设置。这里是如何设置的详终步骤：

### 步骤 1: 创建PowerShell脚本

首先，确保您的PowerShell脚本可以正常运行并且可以实现您想要的功能（比如打开一个软件）。例如，您的脚本可能看起来像这样：

```ps1
# 打开记事本
Start-Process "notepad.exe"
```

保存这个脚本到一个您记得的位置，例如 `C:\Scripts\startup.ps1`。

### 步骤 2: 设置任务计划程序

1. 按 `Win + R` 打开运行窗口，输入 `taskschd.msc` 并回车，这将打开任务计划程序。
2. 在右侧的操作栏中点击“创建基本任务...”。
3. 为任务命名，例如：“Start PowerShell Script on Startup”，并可以选择添加描述，点击“下一步”。
4. 选择“当计算机启动时”作为触发器，然后点击“下一步”。
5. 在“操作”界面中，选择“启动程序”，点击“下一步”。
6. 在“程序或脚本”栏中输入 `powershell.exe`。
7. 在“添加参数 (可选)” 栏中输入 `-ExecutionPolicy Bypass -File "C:\Scripts\startup.ps1"`（请确保路径是您保存脚本的精确位置）。
8. 点击“下一步”并查看摘要是否正确，然后点击“完成”。

### 步骤 3: 测试您的任务

- 重启计算机以测试自动执行脚本是否正常工作。
- 如果脚本没有执行，检查脚本路径和任务设置是否正确。

使用任务计划程序可以使您的脚本在没有任何手动介入的情况下在启动时自动执行。如果您希望更改脚本的行为，只需修改保存的 `.ps1` 脚本文件即可。请确保您的脚本没有错误，并且在预期的执行环境中能正常运行。