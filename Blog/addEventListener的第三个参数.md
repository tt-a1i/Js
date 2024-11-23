### `options`对象,可选

- `capture`可选

  一个布尔值，表示 listener是在冒泡阶段还是捕获阶段执行, 默认为false, 即在冒泡阶段执行

- `once` 可选

  一个布尔值，表示 `listener` 在添加之后最多只调用一次。如果为 `true`，`listener` 会在其被调用之后自动移除。

- `passive`可选

  一个布尔值，设置为 `true` 时，表示 `listener` 永远不会调用 `preventDefault()`。

- `signal` 可选

  可以传入`AbortSignal`对象的signal， `AbortSignal` 的 `abort()` 方法被调用时，监听器会被移除。

#### 代码示例

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>addEventListener Options Example</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }
    .box {
      width: 200px;
      height: 200px;
      background-color: lightblue;
      margin: 20px;
    }
  </style>
</head>
<body>
  <div class="box"></div>
  <button id="abortButton">Abort</button>
  <script>
    const box = document.querySelector('.box');
    const abortButton = document.querySelector('#abortButton');

    // 使用 capture 选项
    box.addEventListener('click', (event) => {
      console.log('Capture phase: Clicked on box');
    }, { capture: true });

    // 使用 once 选项
    box.addEventListener('click', (event) => {
      console.log('Once: Clicked on box');
    }, { once: true });

    // 使用 passive 选项
    box.addEventListener('touchstart', (event) => {
      console.log('Passive: Touch started on box');
      // event.preventDefault(); // 这行代码不会阻止默认行为
    }, { passive: true });

    // 使用 signal 选项
    const controller = new AbortController();
    const signal = controller.signal;

    box.addEventListener('click', (event) => {
      console.log('Signal: Clicked on box');
    }, { signal });

    abortButton.addEventListener('click', () => {
      controller.abort();
      console.log('Aborted: Listener removed');
    });
  </script>
</body>
</html>
```

### 关于使用passive属性的性能优化

`passive`可选

一个布尔值，设置为 `true` 时，表示 `listener` 永远不会调用 `preventDefault()`

#### event.preventDefault的作用

##### JavaScript 中，有许多事件会自动地触发浏览器的某些行为, 比如

- 点击a标签,跳转到href的url
- input框按下键盘字符自动输入

event.preventDefault的作用就是取消这些默认行为

#### 非快速滚动区域

非快速滚动区域（non-fast scrollable region）是浏览器在处理页面合成时的一个重要概念。当一个页面被合成时，合成线程会将那些注册了事件监听器的区域标记为“非快速滚动区域”。这意味着，如果用户在这些区域触发事件，合成线程需要将事件发送给主线程来处理，而不是直接合成新的帧。

![有限的非快速滚动区域](https://developer.chrome.com/static/blog/inside-browser-part4/image/limited-non-fast-scrollab-376be5ee2cd6b.png?hl=zh-cn)

具体来说，当事件发生在非快速滚动区域时，合成线程会执行以下操作：

1. **发送事件到主线程**：合成线程会将事件发送给主线程，由主线程调用相关事件的回调函数。
2. **等待主线程处理**：合成线程会等待主线程处理完事件后再继续合成新的帧。

这种机制会导致以下几种情况：

- **监听器函数执行时间过长**：如果事件处理函数执行时间过长，会导致新的帧出现时间过晚，给用户带来卡顿的感觉。
- **执行`event.preventDefault`**：如果事件处理函数中调用了`event.preventDefault`，通知合成线程停止合成新的帧，页面也就没有滑动的效果。
- **事件发生在其他区域**：如果事件发生在非快速滚动区域之外，合成线程就无须等待主线程的处理，直接合成一个新的帧，使页面产生滑动的效果。

为了避免这种情况，开发者可以在事件监听器中传递`passive: true`选项。这个选项告诉浏览器，即使事件处理函数中调用了`event.preventDefault`，合成线程也可以继续合成新的帧，而不需要等待主线程的响应。这样可以确保页面的流畅滚动效果。

引用自 [深入了解现代网络浏览器（第 4 部分）  | Blog  | Chrome for Developers](https://developer.chrome.com/blog/inside-browser-part4?hl=zh-cn)

#### 使用passive进行滚动性能优化的代码示例

```javascript
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Scroll Jank Demo</title>
		<style>
			div {
				height: 3000px;
				background: linear-gradient(70deg, blue, pink);
			}
		</style>
	</head>

	<body>
		<div></div>

		<script>
			function simulateJank(duration) {
				const startTime = Date.now();
				while (Date.now() < startTime + duration) {}
			}

			document.addEventListener(
				"wheel",
				(event) => {
					if (Math.random() < 0.8) {
						console.log("Jank simulation start ---------");
						simulateJank(500);
						console.log("Jank simulation end ---------");
						console.log("\n");
					}
				},
				{ passive: false }
			);
		</script>
	</body>
</html>

```

这段代码中, 监听鼠标滚轮的滚动事件, 在滚动时,会有80%的概率执行一段500ms的长任务, 给我们的感觉就是滑动时的卡顿

如果把`passive`设置为``false`,会发现滚动的过程中没有卡顿的感觉了

具体原因就是上面非快速滚动区域部分的介绍

`合成线程也可以继续合成新的帧，而不需要等待主线程的响应。这样可以确保页面的流畅滚动效果。`

#### 为什么监听scroll事件不卡顿, 监听wheel时间就卡顿

`一些自己的疑惑解答, 为什么把wheel事件改为scroll事件就不卡顿了`

##### 事件触发频率

- **`scroll` 事件**：通常在用户滚动页面时触发，触发频率较低，通常在滚动停止时触发一次。
- **`wheel` 事件**：在用户滚动鼠标滚轮时触发，触发频率较高，尤其是在快速滚动时，可能会连续触发多次。

##### 事件处理机制

- **`scroll` 事件**：通常在滚动停止时触发，处理时间较长不会对滚动体验产生太大影响。
- **`wheel` 事件**：由于触发频率高，如果在事件处理函数中执行耗时操作，会阻塞主线程，导致页面卡顿。

##### 浏览器优化

- 现代浏览器对 `scroll` 事件进行了优化，即使不使用 `passive` 选项，也能提供相对流畅的滚动体验。
- 对于 `wheel` 事件，浏览器没有类似的优化，因此在处理耗时操作时更容易出现卡顿。

#### scroll和wheel的适用场景

##### scroll

- **回到顶部按钮**：当用户滚动到页面的某个位置时，显示“回到顶部”按钮，点击后平滑滚动到页面顶部。

  ```js
  const backToTopButton = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  ```

- **无限加载**：在内容较长的页面（如社交媒体或新闻网站）中，当用户滚动到页面底部时，自动加载更多内容。

  ```javascript
  window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      loadMoreContent(); // 加载更多内容的函数
    }
  });
  ```

##### wheel

- **缩放元素**：在图片库中，用户可以通过滚动鼠标滚轮来缩放图片
- **检测滚动方向**