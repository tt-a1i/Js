# 模块架构

- index
  - main
    - content
      - card
        - markdownRender
    - input
  - slider

对话卡片,根据消息历史来渲染,根据history中的role来进行确定user或assistant,v-for渲染

传参用了props和inject,传给card的参数

```vue
<template v-for="(msg, index) in $props.history">
      <card-vue
        :role="msg.role"
        :content="msg.content"
        :model="msg.model"
        :modelType="msg.modelType"
        :done="msg.done"
        :key="index"
        :image="msg.image"
        :imageSource="msg.imageSource"
        :imageFile="msg.imageFileCopy"
        :parseTextData="msg.parseTextData"
        :textData="msg.textData"
      />
    </template>
```

# 输出内容渲染

- 代码渲染:highlight.js库
- markdown渲染:Marked库,将markdown转换为html
  - 支持标准的 Markdown 语法
  - 允许自定义渲染器和解析规则
  - 正则替换换行符为</br>
  - 输出内容定义样式,打字机动画
  - 提供选项来防止 XSS（跨站脚本）攻击，可以净化输出的 HTML
    - 转义字符

# 难点:

使用js的ref来进行实现打字机效果,但是最终渲染的格式为html,无法使用html进行渲染,所以要用css来做

# 滚动到底部效果

滚动到底部的效果是通过设置内容容器的 `scrollTop` 属性来实现的。具体实现过程如下：

1. 首先，在模板中定义了一个带有 ref 的容器元素：

```html
<div
  ref="contentRef"
  class="no-scrollbar relative flex flex-col h-full overflow-y-scroll"
>
  <!-- 内容 -->
</div>
```

这个 div 元素被设置为可滚动（`overflow-y-scroll`），并且有一个 ref 属性 `contentRef`。

2. 在 setup 函数中，定义了 `scrollToBottom` 函数：

```javascript
const scrollToBottom = () => {
  vm.refs.contentRef.scrollTop = vm.refs.contentRef.scrollHeight;
};
```

这个函数做了以下事情：
- `vm.refs.contentRef` 获取了模板中定义的 ref 元素。
- `scrollHeight` 是元素内容的总高度。
- 将 `scrollTop`（滚动条的顶部位置）设置为 `scrollHeight`，effectively 使得滚动条移动到最底部。

3. 使用 `watch` 监听 `history` 属性的变化：

```javascript
watch(
  () => props.history,
  () => {
    scrollToBottom();
  },
  {
    deep: true,
  }
);
```

每当 `history` 发生变化（例如添加新消息）时，就会调用 `scrollToBottom` 函数。

4. 通过依赖注入，使得其他组件也能触发滚动：

```javascript
const scrollToBottomFn = inject("scrollToBottomFn");
scrollToBottomFn.value = scrollToBottom;
```

这允许其他组件在需要时也能调用 `scrollToBottom` 函数。

总结：
- 滚动效果主要通过设置 `scrollTop` 为 `scrollHeight` 来实现。
- 每当消息历史更新时，自动触发滚动。
- 通过依赖注入，允许其他组件在需要时也能触发滚动。

这种实现方式确保了每次新消息添加到对话中时，视图都会自动滚动到最新的内容，提供了良好的用户体验。

1. `scrollHeight`:
   - 这是元素内容的总高度，包括由于溢出而在视图中不可见的部分。
   - 它代表了元素内容的完整高度。
2. `scrollTop`:
   - 这是元素已经滚动的垂直距离。
   - 它表示滚动条顶部与元素顶部之间的距离。
   - 当 `scrollTop` 为 0 时，表示滚动条在最顶部。
   - 当 `scrollTop` 等于 `scrollHeight - clientHeight` 时，表示滚动条在最底部。

所以，当我们设置 `scrollTop = scrollHeight` 时：

- 这实际上是将滚动条移动到了超过内容底部的位置。
- 浏览器会自动将其限制在最大可滚动位置，也就是 `scrollHeight - clientHeight`。
- 结果就是滚动条移动到了最底部。

更准确的做法可能是：

```javascript
element.scrollTop = element.scrollHeight - element.clientHeight;
```

但在实践中，直接设置 `scrollTop = scrollHeight` 通常也能达到滚动到底部的效果，因为浏览器会自动处理超出范围的情况。

总之，这个操作的目的是将内容区域滚动到最底部，使最新添加的内容可见。它不是设置元素距离页面顶部的距离，而是调整元素内部的滚动位置。

# 打字机效果实现

### 第一版,不实现打字机,根据props.content的变化,页面进行响应式更新,vue的虚拟dom进行优化(猜测),所以不会闪动

### 第二版,实现打字机,但是由于fulltext重新赋值,所以在sse数据未全部传输之前会导致重新赋值,页面闪动,直到数据不再更新才正确显示

```vue
<script>
import {
  computed,
  defineComponent,
  watch,
  ref,
  onMounted,
} from "@vue/composition-api";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { marked } from "marked";

export default defineComponent({
  props: {
    content: {
      type: String,
    },
    sanitize: {
      type: Boolean,
      default: true,
    },
    typingSpeed: {
      type: Number,
      default: 3, // 每个字符的打字速度，毫秒为单位
    },
  },
  setup(props) {
    const displayedContent = ref("");
    let fullText = "";
    let typingIndex = 0;
    let timer;
    marked.setOptions({
      renderer: new marked.Renderer(),
      sanitize: props.sanitize,
      pedantic: false,
      highlight(code) {
        return hljs.highlightAuto(code).value;
      },
    });

    const wrapClass = computed(() => {
      return ["text-wrap", "min-w-[20px]", "rounded-md", "bg-[#f4f6f8]"];
    });

    // const text = computed(() => {
    //   return marked(props.content.replace(/\\n|\r\n/g, "<br />"));
    // });
    // watch(
    //   () => props.content,
    //   () => {
    //     console.log(text.value);
    //   }
    // );
    const typeWriterEffect = () => {
      if (typingIndex <= fullText.length) {
        displayedContent.value = fullText.slice(0, typingIndex++);
        timer = setTimeout(typeWriterEffect, props.typingSpeed);
      } else {
        clearTimeout(timer);
      }
    };

    const resetTypewriter = () => {
      clearTimeout(timer);
      typingIndex = 0;
      displayedContent.value = "";
      fullText = marked(props.content.replace(/\\n|\r\n/g, "<br />"));
      typeWriterEffect();
    };

    watch(
      () => props.content,
      () => {
        resetTypewriter();
      }
    );

    onMounted(() => {
      resetTypewriter();
    });
    return {
      displayedContent,
      wrapClass,
    };
  },
});
</script>

<template>
  <div class="text-black" :class="wrapClass">
    <div class="leading-relaxed break-all">
      <div class="markdown-body dark" v-html="displayedContent" v-blank />
    </div>
  </div>
</template>
```

### sse动态更新内容和打字机实现动态更新

那我们再来深入分析。

如果你运行第二段代码时依然可以看到类似打字机的效果，这可能是由于 `props.content` 的数据来源是通过 Server-Sent Events (SSE) 动态增长的。这实际上是一种输入数据流的方式，每次新的数据片段到达都会触发 Vue 的响应系统进行更新。

#### 关键点
1. **SSE 动态更新**：当 `props.content` 通过 SSE 动态增长时，Vue 的响应系统会捕捉到这些变化并自动触发重新渲染。
2. **数据的逐步传递**：由于 `props.content` 逐步变长，因此 `marked` 渲染的内容不断增加，从而每次 `text` 计算属性的值也会相应改变。

#### 打字机效果的不同实现方式
尽管两段代码是不同的实现方式，但由于 `props.content` 的逐步更新，视觉效果上与打字机效果类似。

#### 核心区别

- **第一段代码的打字机效果**：明确通过 `typeWriterEffect` 函数逐字符描绘打字机效应，需要手动控制每个字符的显示速度。
- **第二段代码的打字机效果**：由于 `props.content` 是通过 SSE 动态更新，并且是逐步添加的，这带来了类似打字机的效果。这里 Vue 响应系统的自动更新配合`marked`的渲染，让内容逐步显示出来。

#### 更详细的解释
为了更清晰地了解原因，我们可以看下 Vue 响应系统和 SSE 的结合是如何工作的：

1. **SSE 数据逐步到达**：
   SSE连接后，服务端会不断发送字符串内容，如：
   ```
   "H"
   "He"
   "Hel"
   ...
   "Hello, World!"
   ```

2. **观看数据变化**：
   这样 `props.content` 在逐步骤更新，Vue 的响应式系统捕捉到变化后，会通过 `marked` 渲染更新到 DOM。

3. **可视化效果**：
   - Vue 监听 `props.content` 的变化，动态更新 `text`。
   - 渲染出来的内容一部分一部分地增加，类似打字机效果。

#### 建议调试
#### 如果确实是通过 SSE 实现逐步更新的效果，你可以在 `watch` 函数内加入调试语句来观察：

```javascript
watch(
  () => props.content,
  (newContent) => {
    console.log("Received new content:", newContent);
    updateContent();
  }
);
```

### 示例说明
假设 SSE 每秒发出一个字符，`props.content` 的变化会如下：

| 时间  | props.content   | text (渲染后的内容)    |
| ----- | --------------- | ---------------------- |
| t0    | "H"             | `<p>H</p>`             |
| t1    | "He"            | `<p>He</p>`            |
| t2    | "Hel"           | `<p>Hel</p>`           |
| ...   | ...             | ...                    |
| t_end | "Hello, World!" | `<p>Hello, World!</p>` |

### 小结
- **第一段代码**：明确通过回调函数实现字符输出量控制。
- **第二段代码**：简单地依赖于 `props.content` 的动态增长，视觉上实现类似打字机效果，但是具体实现方式不同。

两者都能实现类似的效果，但具体实现方式是大不相同的。希望这能更好地解释你提到的现象。任何时候有进一步的问题，请随时提问！

## 这两种实现差别很大,但是效果却是基本相同的,那这两种实现在什么时候会有差别,以及我们应该用哪一种呢

这两种实现的选择取决于你的具体需求和使用场景。尽管在某些情况下两者的效果看起来是一样的，但在其他场景下可能会有所差异。以下情况将两者进行对比和分析，帮助你更好地决定使用哪种方式。

### 使用场景对比

#### 第一种方法：显式打字机效果

**实现原理**：
- 通过显式的 `setTimeout` 控制每个字符的显示速度，逐字符显示内容。

**适用场景**：
1. **持续一致的打字效果**：
   - 如果渲染的内容需要在固定的时间间隔逐字输出，无论数据如何变化，统一的打字机效果更为一致。
   - 举例：你可能通过 websocket 或其他方式实时接收数据，并希望以统一速度展示出来。

2. **可控制的打字速度**：
   - 如果需要通过打字机效果来体现不同的打字速度（例如，慢慢地逐字展示打字效果或快速地批量展示），这种方法提供了更精细的控制。

**优点**：
- 明确控制每个字符的显示时间，效果可预测性强。
- 适合与非流式数据源，例如：静态内容逐字展示。

**缺点**：
- 实现稍复杂，需要写更多的逻辑代码。
- 如果传递的数据量很大，`setTimeout` 多次触发可能有性能瓶颈。

#### 第二种方法：依赖动态更新（如SSE）

**实现原理**：
- 通过动态数据源（如 SSE）逐步更新 `props.content`，Vue 的响应系统捕捉变化并更新内容。

**适用场景**：
1. **动态数据流**：
   - 当使用 WebSocket 或 SSE 这种逐步传递数据的方式时，内容会自然地逐步更新，形成类似打字效果。
   - 举例：通过 SSE 或者 WebSocket 接收一段已控制好的片段化数据，并让其自然地逐步渲染。

2. **不需要精细控制**：
   - 当不需要严格控制每个字符的显示时间，而希望依赖数据流自然到达的节奏。

**优点**：
- 实现简单，不需要额外的控制逻辑，直接依赖于数据流的特性。
- 对于动态数据流的展示，自然合理。

**缺点**：
- 显示速度完全依赖于数据流的到达速度，无法灵活调整。
- 需要特定的流式数据源来保证逐步更新。

#### 第三种方法:requestAnimation

你提供的 Vue 组件中使用了 `requestAnimationFrame` 实现打字机效果，而之前讨论的代码使用的是 `setTimeout` 实现打字机效果。两个方式在实现原理和性能上有所不同。让我们详解这两个实现方式及其差异。

##### 1. `requestAnimationFrame` 实现打字机效果

你提供的 Vue 组件中使用的是 `requestAnimationFrame`，可参考以下片段：

```javascript
const timerList = new Set();

function setIntervalRaf(fn, delay) {
  let last = new Date().getTime();

  function start() {
    requestAnimationFrame(() => {
      if (!timerList.has(id)) return;
      const now = new Date().getTime();
      if (now - last >= delay) {
        fn();
        last = now;
      }
      start();
    });
  }

  start();
  const id = Symbol();
  timerList.add(id);
  return id;
}

function clearIntervalRaf(id) {
  timerList.delete(id);
}

const showText = () => {
  let i = 0;
  let timer = setIntervalRaf(() => {
    displayContent.value += escapeContent.value.charAt(i);
    i++;
    if (i > escapeContent.value.length) {
      clearIntervalRaf(timer);
    }
  }, 5);
};
```

##### 2. `setTimeout` 实现打字机效果

之前我们讨论的用 `setTimeout` 实现的打字机效果，伪代码如下：

```javascript
const typeWriterEffect = () => {
  if (typingIndex < fullText.value.length) {
    displayedContent.value = fullText.value.slice(0, typingIndex++);
    timer = setTimeout(typeWriterEffect, props.typingSpeed);
  } else {
    clearTimeout(timer);
  }
};
```

#### 代码讲解

当然，详细介绍一下你提供的使用 `requestAnimationFrame` 实现打字机效果的代码。

以下是你提供的代码片段，其中包括了`requestAnimationFrame`实现的`setIntervalRaf`方法和如何在组件中使用它实现打字机效果：

```javascript
const timerList = new Set();

function setIntervalRaf(fn, delay) {
  let last = new Date().getTime();

  function start() {
    requestAnimationFrame(() => {
      if (!timerList.has(id)) return;
      const now = new Date().getTime();
      if (now - last >= delay) {
        fn();
        last = now;
      }
      start();
    });
  }

  start();
  const id = Symbol();
  timerList.add(id);
  return id;
}

function clearIntervalRaf(id) {
  timerList.delete(id);
}

const showText = () => {
  let i = 0;
  let timer = setIntervalRaf(() => {
    displayContent.value += escapeContent.value.charAt(i);
    i++;
    if (i > escapeContent.value.length) {
      clearIntervalRaf(timer);
    }
  }, 5);
};
```

#### 分析与逐步讲解

#### 1. `timerList`

```javascript
const timerList = new Set();
```

- `timerList` 用于保存所有活动的定时器标识符。这里使用 `Set` 数据结构便于管理定时器。

#### 2. `setIntervalRaf` 函数

此函数功能类似于 `setInterval`，但使用 `requestAnimationFrame` 来实现。

```javascript
function setIntervalRaf(fn, delay) {
  let last = new Date().getTime(); // 获取当前时间

  function start() {
    requestAnimationFrame(() => {
      if (!timerList.has(id)) return;  // 检查定时器是否已经被清除
      const now = new Date().getTime(); // 获取当前时间
      if (now - last >= delay) {  // 检查是否已经经过了指定的延迟时间
        fn(); // 执行要执行的函数
        last = now; // 重置上次执行的时间
      }
      start(); // 继续下一帧的调用
    });
  }

  start();
  const id = Symbol(); // 生成一个唯一标识符
  timerList.add(id);    // 将标识符加入 `timerList`
  return id;            // 返回标识符，方便外部清除定时器
}
```

这个函数的工作流程是：
1. 初始化上一次执行时间 `last`。
2. 使用 `requestAnimationFrame` 调度每一帧的执行。
3. 在每一帧中，检查是否删除了该定时器。
4. 检查当前时间与上一次执行时间之间的差值是否大于或等于指定延时 `delay`。
5. 如果是，则执行指定的函数 `fn`，然后更新上一次执行时间 `last`。
6. 继续下一帧的执行。

#### 3. `clearIntervalRaf` 函数

```javascript
function clearIntervalRaf(id) {
  timerList.delete(id);
}
```

该函数用于取消定时器，它会从 `timerList` 中删除定时器标识，使得这个定时器不再执行。

#### 4. `showText` 函数

此函数使用 `setIntervalRaf` 实现打字机效果：

```javascript
const showText = () => {
  let i = 0; // 初始化字符索引
  let timer = setIntervalRaf(() => {
    displayContent.value += escapeContent.value.charAt(i); // 逐字符拼接
    i++;
    if (i > escapeContent.value.length) {
      clearIntervalRaf(timer); // 如果所有字符已经被显示，清除定时器
    }
  }, 5); // 每5毫秒执行一次
};
```

在这个函数中：
1. 初始化字符索引 `i` 为 0。
2. 使用 `setIntervalRaf` 设置一个重复执行的定时器，间隔为 5 毫秒。
3. 定时器每次执行，将内容 `escapeContent` 的当前字符添加到 `displayContent`。
4. 增加字符索引 `i`。
5. 当所有字符被显示完时，清除定时器。

### 使用详细解释与优势

#### 为什么使用 `requestAnimationFrame`

- **节省性能**：`requestAnimationFrame` 会在

### 差异解析

#### 1. 精度和控制流

- **`requestAnimationFrame`**:
  - 更适合用于动画操作，它与浏览器的绘制周期同步，能够提供流畅的动画帧效果。
  - 函数会在下一次重绘之前被调用，因此在精准控制时间间隔上不如 `setTimeout`。

- **`setTimeout`**:
  - `setTimeout` 提供了精确的延时控制，可以设定明确的时间间隔。
  - 适合用于需要精确时间间隔的操作，如打字机效果。

#### 2. 性能

- **`requestAnimationFrame`**:
  - 更节省性能，在未激活的标签页不会执行动画，从而节省资源。
  - 每秒约60次（依赖于屏幕刷新率），会比 `setTimeout`（特别是延时很短时）更加平滑。

- **`setTimeout`**:
  - 无视浏览器帧数，直接执行定时操作，可能导致性能瓶颈。
  - 在需要精准时间控制时，特别是短时间多次操作，可能会对性能产生不利影响。

#### 3. 使用复杂度和场景

- **`requestAnimationFrame`**:
  - 场景：更适合作为动画的主循环，如动画帧、平滑的滚动操作。
  - 复杂度：实现 `setInterval` 类似功能需要手动管理定时器标识符等，代码稍复杂。

- **`setTimeout`**:
  - 场景：定时执行一些逻辑操作，如间隔更新UI、打字机效果。
  - 复杂度：直接使用 `setTimeout` 或 `setInterval` 即可实现定时功能，代码较简单。

#### requestAnimation为什么要记录时间

使用 `requestAnimationFrame` 的主要目的是实现一个平滑、与浏览器刷新率同步的动画循环。然而，默认情况下，`requestAnimationFrame` 是每次屏幕重绘时调用的，其调用频率大约是每秒 60 次，也就是每帧大约 16.67 毫秒。这对于某些动画来说可能不够精确，尤其是在需要实现一个类似 `setInterval` 的精确时间间隔时。

### 为什么要记录时间

在你的代码中，需要实现的是一个类似 `setInterval` 的效果，例如打字机效果，它需要每隔一个特定的时间间隔更新一次屏幕内容。因此，仅仅依赖 `requestAnimationFrame` 来控制时间是不够的，因为它不能保证精确的时间间隔。记录时间可以用来：

1. **确保精确的时间间隔**：通过记录上一次执行的时间，可以确保接下来的函数调用是在期望的时间间隔之后执行。
2. **弥补浏览器性能波动**：浏览器并不能总是保证在每次 `requestAnimationFrame` 调用之间的时间间隔恒定（例如当浏览器窗口最小化时或者系统资源紧张时），记录时间可以帮助检测并补偿这些波动。

### 如何记录时间

下面是代码中记录时间的具体实现步骤和原因：

1. **记录当前时间**：在函数调用开始时，记录当前系统时间 `last`。

    ```javascript
    let last = new Date().getTime();
    ```

2. **通过 `requestAnimationFrame` 启动一个循环**：这个循环每帧都会调用。

    ```javascript
    function start() {
      requestAnimationFrame(() => {
        if (!timerList.has(id)) return; // 检查定时器是否已被清除
        const now = new Date().getTime(); // 获取当前时间
        if (now - last >= delay) { // 如果当前时间与上次记录时间的间隔超过或等于设定的延迟时间
          fn(); // 执行回调函数
          last = now; // 更新上次记录时间
        }
        start(); // 继续循环
      });
    }
    ```

3. **循环中计算时间差和执行回调**：在每次循环中，通过计算当前时间和上一次记录的时间差来判断是否应该执行回调函数 `fn`。

    ```javascript
    const now = new Date().getTime();
    if (now - last >= delay) {
      fn();
      last = now;
    }
    ```

这样，通过在每次调用 `requestAnimationFrame` 的间隔内记录实际的时间，可以更精确地控制函数调用的间隔时间，而不是依赖于 `requestAnimationFrame` 的默认帧率。

### 回顾您的代码
结合你的代码，这样的实现方式确保了即使浏览器的刷新率波动，也能按相对精确的时间间隔来执行预定的任务，例如显示打字机效果的字符。

```javascript
const showText = () => {
  let i = 0;
  let timer = setIntervalRaf(() => {
    displayContent.value += escapeContent.value.charAt(i);
    i++;
    if (i > escapeContent.value.length) {
      clearIntervalRaf(timer);
    }
  }, 5); // 按5毫秒的间隔更新内容
};
```

### 总结
记录时间的作用在于通过 `requestAnimationFrame` 实现一个模拟 `setInterval` 效果，确保任务在一个精确的时间间隔内执行。虽然 `requestAnimationFrame` 可以提供更平滑的动画效果，但仅靠它不能保证时间间隔的精确性，因此需要记录时间来实现更精确的控制。

### 在具体场景中的选择

- **对于动画效果**（如CSS动画、游戏帧刷新）：建议使用 `requestAnimationFrame`，因其优化的性能及与绘制周期同步的特性。
  
- **对于定时操作**（如打字机效果）：`setTimeout` 通常较简便，但如果对流畅程度有更高要求且不需要精确的时间控制，也可考虑结合 `requestAnimationFrame`。

### 组件打字机效果的实际应用
你提供的Vue组件中选择使用 `requestAnimationFrame` 实现打字机效果，有助于实现更流畅的字符显示效果，但稍微复杂了一些。

如果需要更高的精度和代码简便性，使用 `setTimeout` 也就足够。可以根据实际需求选择合适的实现方式。

两者各有优劣，需根据具体应用场景选择合适的方法。

### 何时会有差别？

1. **受数据流速度影响**：
   - 第二种方法完全取决于数据流的速度。如果数据流速度不一致或过快/过慢，效果可能无法预测。
   - 第一种方法则可通过设定统一的时间间隔来保证一致打字效果，受数据流影响小。

2. **内容大小和性能**：
   - 当内容很大时，第一种方法需要大量定时器循环可能会影响性能。
   - 第二种方法如果数据流速度合理，性能一般会更好。

### 选择的建议：

1. **如果你有精确的打字效果需求**（例如希望打字速度是一致的，无论数据源如何到达），**选用第一种方法**。

2. **如果你处理的是动态数据流**（例如 SSE 或 WebSocket 数据），并且不需要非常严格地控制打字速度时，**使用第二种方法**会更自然简便。

### 综合考虑
- 如果使用静态内容或你需要创建一种视觉效果，比如模拟打字机的逐字显示，请选择 **第一种方法**。
- 如果你的内容来自实时的数据流，并且内容变化来自服务端连续推送（如 SSE），那么 **第二种方法** 会更为适合。

总之，理解你的数据来源和展示需求是选择合适实现方式的关键。如果仍有其他问题或需要进一步帮助，欢迎提问！

## 实现SSE的部分

### 组件中实现 SSE 通信的代码详细介绍

在这个代码中，部分关键逻辑涉及到使用 Server-Sent Events（SSE）从服务器接收消息，并将这些消息更新到前端的 `history` 状态中。下面将详细介绍相关部分的具体实现和功能。

### 1. 生成请求所需的信息

首先，从 `config` 参数中提取了一些必要的信息，如模型类型、温度、最大 tokens 等，然后用于创建一个请求的 placeholder。

```javascript
const {
  memo,
  model,
  modelType,
  temperature,
  max_tokens,
  stream,
  aiEngine,
} = config;
```

接下来创建一个占位符对象，用于在服务端响应之前在 `history` 中显示加载动画或占位内容：

```javascript
const placeholder = {
  id: generateUniqueId(),
  done: false,
  model,
  modelType,
  role: "assistant",
  content: (modelType === "pharm3" ? true : stream) ? " " : "[loading]",
};
history.value.push(placeholder);
```

### 2. 决定请求的 URL

根据模型类型决定请求的 URL：

```javascript
let baseUrl = "http://rd-gateway.patsnap.info";
if (location.origin == "http://ai.patsnap.io") baseUrl = "http://rd-gateway.patsnap.io";

const urls = {
  gpt: `${baseUrl}/compute/openai_chatgpt_turbo`,
  patsnap: `${baseUrl}/compute/openai_chatgpt_turbo`,
  pharm: `${baseUrl}/compute/chatgpt_pharm`,
  sense: `${baseUrl}/compute/chatgpt_sense`,
  text: `${baseUrl}/compute/openai_completion`,
  llama: `${baseUrl}/compute/chatgpt_llm`,
  pharm3: `${baseUrl}/compute/chatgpt_llm`,
  hunyuan: `${baseUrl}/compute/chatgpt_aggregation`,
  ernie: `${baseUrl}/compute/chatgpt_aggregation`,
  claude: `${baseUrl}/compute/openai_chatgpt_turbo`,
  gemini: `${baseUrl}/compute/openai_chatgpt_turbo`,
};

const url = urls[modelType] || `${baseUrl}/compute/openai_chatgpt_turbo`;
```

### 3. 构建消息内容

根据模型类型，构建发送给 API 的消息内容：

```javascript
let msgPart = {};
const validHistory = getElementsAfterDivider(history.value);
const msgHistory = validHistory.slice(-Math.min(66, validHistory.length));

if (modelType === "text") {
  msgPart = memo
    ? { prompt: msgHistory.map((msg) => msg.textData + msg.content) }
    : { prompt: message };
} else if (modelType === "pharm") {
  msgPart = { message: message };
} else {
  msgPart = memo
    ? {
        messages: msgHistory.map((msg) => ({
          role: msg.role,
          content: (msg.textData || "") + msg.content.trim(),
        })),
      }
    : { message: message };
}

// 去除空内容
if (msgPart.messages && Array.isArray(msgPart.messages)) {
  msgPart.messages.pop();
}

if (msgPart.prompt && Array.isArray(msgPart.prompt)) {
  msgPart.prompt.pop();
}
```

### 4. 处理多模态内容

如果包含图片和多模态内容，进行处理：

```javascript
let messagesData = null;
if (modelsWithMultimodal.value.includes(localStorage.chatModel)) {
  if (image.data && message) {
    messagesData = [
      { role: "user", content: [{ type: "image", source: image }, { type: "text", text: message }] },
    ];
  } else if (image.data && !message) {
    messagesData = [{ role: "user", content: [{ type: "image", source: image }] }];
  } else if (!image.data && message) {
    messagesData = [{ role: "user", content: message }];
  }
}

// 更新历史
if (modelsWithMultimodal.value.includes(localStorage.chatModel)) {
  originalHistory.value.push(...messagesData);
  originalHistory.value.push({ role: history.value[history.value.length - 1].role, content: "" });
}
```

### 5. 构建请求体

根据是否包含多模态内容，构建请求体：

```javascript
let body = null;
if (modelsWithMultimodal.value.includes(localStorage.chatModel)) {
  body = JSON.stringify({
    messages: memo ? getLastSixToSecondLast(originalHistory.value)
```

抱歉，刚刚部分回答被截断，下面继续讲述：

```javascript
  body = JSON.stringify({
    messages: memo ? getLastSixToSecondLast(originalHistory.value) : messagesData,
    stream: modelType === "pharm3" ? true : stream,
    temperature,
    max_tokens,
    model,
  });
} else {
  body = JSON.stringify({
    ...msgPart,
    stream: modelType === "pharm3" ? true : stream,
    temperature,
    max_tokens,
    model,
  });
}
```

### 6. 设置请求头

根据需要设置请求头，这里使用 `text/event-stream` 作为 `Content-Type` 以处理 SSE 请求：

```javascript
const headers = {
  "Content-Type": "text/event-stream",
  Authorization: localStorage.chatToken,
};

headers["X-Ai-Engine"] = aiEngine;
```

### 7. 处理 SSE 通信

对支持流模式（`stream`）的模型类型，会使用 `fetchEventSource` 来处理 SSE 通信：

```javascript
if (stream || modelType !== "pharm") {
  const controller = new AbortController(); // 创建一个新的 AbortController 实例
  const requestId = generateUniqueId(); // 生成唯一标识符
  controllers.value[requestId] = controller; // 将控制器添加到对象中
  
  checkTokenExpiration(); // 检查 token 是否过期
  
  fetchEventSource(url, {
    signal: controller.signal,
    openWhenHidden: true,
    method: "POST",
    headers: headers,
    body,
    onerror(err) {
      console.log("retrying", err);
      abortHandler(requestId); // 取消出错的请求
      const index = history.value.findIndex(
        (item) => item.id === placeholder.id
      );
      history.value[index].content += "[error]";
      history.value[index].done = true;
      // 添加 divider
      if (history.value.length > 0) {
        const last = history.value[history.value.length - 1];
        if (last.content !== "[divider]") {
          history.value.push({
            content: "[divider]",
            done: true,
          });
        }
      }
      return 9999 * 10000; // 返回一个大的错误码
    },
    onmessage(ev) {
      const { event, data: rawData } = ev;
      if (event === "message") {
        const jsonData = JSON.parse(rawData);
        let data = "";

        switch (modelType) {
          case "text":
            data = jsonData.choices[0].text;
            break;
          case "sense":
            data = jsonData.choices[0].delta;
            break;
          case "llama":
          case "pharm3":
            data = jsonData.token.special ? null : jsonData.token.text;
            break;
          case "hunyuan":
          case "ernie":
            data = jsonData.message;
            break;
          default:
            data = jsonData.choices[0].delta.content;
            break;
        }

        if (data) {
          const index = history.value.findIndex(
            (item) => item.id === placeholder.id
          );
          history.value[index].content += data;
          if (modelsWithMultimodal.value.includes(localStorage.chatModel)) {
            originalHistory.value[
              originalHistory.value.length - 1
            ].content += data;
          }
        }
      }

      if (event === "stop") {
        updateUsage();
        const index = history.value.findIndex(
          (item) => item.id === placeholder.id
        );
        history.value[index].done = true;
      }

      if (event === "error") {
        history.value.at(-1).content = rawData;
        history.value.at(-1).done = true;
      }
    },
  });
}
```

### 8. 处理非 SSE 通信

对于不需要流式处理的模型类型，将直接使用 `axios` 进行请求：

```javascript
} else {
  checkTokenExpiration();
  try {
    console.warn(model, model.split("_").at(-1));
    axios({
      method: "post",
      url,
      headers: headers,
      data: model.startsWith("pharm")
        ? {
            ...JSON.parse(body),
            version: model.split("_").at(-1),
          }
        : body,
    }).then((res) => {
      if (res.data.error_code === 400) {
        history.value.at(-1).content = res.data.msg;
        history.value.at(-1).done = true;
        return;
      }
      const msg = res.data.data[
        model.startsWith("pharm") ?
```

好的，接下来继续解释。

### 处理非 SSE 通信（续）

当使用 `axios` 进行非 SSE 通信时，主要逻辑如下：

1. **检查 Token 是否过期**：在发送请求之前，调用 `checkTokenExpiration` 函数。
2. **发送请求**：使用 `axios` 发送 POST 请求，将请求体和必要的头信息一同发送。
3. **处理响应**：根据不同模型类型，对响应数据进行适当处理。
4. **更新历史记录**：将服务器返回的数据更新到 `history` 中，并标记为完成。

详细代码示例如下：

```javascript
} else {
  checkTokenExpiration();
  try {
    console.warn(model, model.split("_").at(-1));
    axios({
      method: "post",
      url,
      headers: headers,
      data: model.startsWith("pharm")
        ? {
            ...JSON.parse(body),
            version: model.split("_").at(-1),
          }
        : body,
    }).then((res) => {
      if (res.data.error_code === 400) {
        history.value.at(-1).content = res.data.msg;
        history.value.at(-1).done = true;
        return;
      }
      const msg = res.data.data[
        model.startsWith("pharm") ? "response" : "message"
      ];
      history.value.at(-1).content = msg;

      // 更新打字机效果的完成状态
      const duration = msg.length * 5;
      setTimeout(() => {
        history.value.at(-1).done = true;
      }, duration);
    });
  } catch (error) {
    history.value.at(-1).content = error.message;
  } finally {
    updateUsage();
  }
}
```

### 总结

这个 `sendMessage` 函数综合了以下几个关键步骤：

1. **初始化和准备**：包括生成唯一标识符、设置请求占位符和决定基于模型类型的 URL。
2. **构建请求内容**：根据模型类型和用户输入，构建要发送给 API 的消息内容。
3. **处理多模态数据**：若当前的聊天模式支持多模态（如图像+文本），则处理这些数据。
4. **设置请求头**：根据需要配置请求头信息。
5. **处理 SSE 通信**：如果当前模型需要流式处理，使用 `fetchEventSource` 进行 SSE 通信，并处理事件。
6. **处理非 SSE 通信**：对于不需要流式处理的模型类型，使用 `axios` 发送普通 HTTP POST 请求。

**事件处理函数如 `onerror`, `onmessage`, `onstop`, `onerror`**：
- `onerror`: 处理出现错误的情况，将错误信息添加到 `history` 中。
- `onmessage`: 处理接收到的消息，将数据追加到 `history` 中。
- `onstop`: 更新使用情况并将当前消息标记为完成。
- `onerror`: 处理流错误并将错误信息标记为内容。

这样设置可以确保在不同模型类型和请求方式（SSE 或普通 HTTP 请求）下，前端组件能够灵活地与后台服务进行通信，并将交互结果展示给用户。