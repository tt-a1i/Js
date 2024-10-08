# 模块架构

- index
  - main
    - content
      - card
        - markdownRender
    - input
  - slider

### main-vue

![image-20240809134035765](assets/image-20240809134035765.png)

#### history

![image-20240809134442030](assets/image-20240809134442030.png)

与模型的对话历史记录，根据role来区分对应的角色进行对话卡片位置头像的渲染

其中模型的回答没有文件相关的参数

##### 携带文件进行对话时的数据结构

![image-20240809134825956](assets/image-20240809134825956.png)



### input-vue

![payload](assets/payload.png)

![image-20240809214448409](assets/image-20240809214448409.png)

输入框左边的图片预览使用el-image做的，src的数据为base64

![image-20240809214538763](assets/image-20240809214538763.png)



发送数据后，等待sse返回结果之前的等待动画

![image-20240809214809681](assets/image-20240809214809681.png)

sse的onemessage对数据进行更新

#### 关于文件到base64的转换

![image-20240812143906683](assets/image-20240812143906683.png)

- 使用 `FileReader` 将文件读取为 Data URL 格式。

  - `FileReader` 是一个内置的 JavaScript 对象，它位于 [File API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) 中，允许Web应用读取用户本地文件的内容。它是处理由 `<input type="file">`、`drag-and-drop` 接口、`Clipboard API` 等提供的 `File` 或 `Blob` 对象的主要工具。

    ##### `FileReader` 主要功能

    `FileReader` 主要用于读取文件内容，其中包括：

    - 读取文件并返回文本。
    - 读取文件并返回 ArrayBuffer。
    - 读取文件并返回 Data URL（Base64编码）。
    - 读取文件并返回二进制字符串。

    ##### 常用方法

    - **`readAsArrayBuffer(blob)`**：读取文件并返回 ArrayBuffer。
    - **`readAsBinaryString(blob)`**：读取文件并返回二进制字符串。
    - **`readAsDataURL(blob)`**：读取文件并返回 Data URL（Base64编码）。
    - **`readAsText(blob, [encoding])`**：读取文件并返回文本字符串。可以指定编码，默认是 UTF-8。

    ##### 常用事件

    - **`onload`**：当读取操作成功完成时触发。
    - **`onerror`**：读取操作发生错误时触发。
    - **`onprogress`**：在读取进行中以及读取结束前的读取数据量的变化通知。
    - **`onabort`**：当读取操作被中止时触发。

- `reader.onload` 回调中，将结果存储到 `imageFile.previewImageUrl` 和 `imageSource.value.data` 中。 `Data URL` 是由两个部分组成：`data:[<mediatype>][;base64],<data>`，所以直接用`.split(",")[1]`来获取Base64部分。

##### 完整流程解析

1. **用户上传文件**： 用户选择文件后，`element-upload` 的 `:on-change` 触发 `handleChange` 方法。
2. **`handleChange` 方法**：
   - 获取文件类型 `fileType`。
   - 判断是否支持多模态文件上传 `isUpload.multimodal`。
   - 如果支持多模态，则根据文件类型设置 `mediaType` 并调用 `previewImage(file.raw)`。
   - 如果仅支持特定格式的文件上传，则使用 `FileReader` 直接读取文件并生成 Base64。
3. **`FileReader` 读取文件**：
   - `FileReader.readAsDataURL(file)` 方法读取文件，结果是一个包含 Base64 编码的 Data URL。
   - 在 `onload` 回调中，将 Base64 数据存储到 `imageFile.previewImageUrl` 和 `parseTextData.value.data` 属性中。

#### 关于组件间渲染数据对象传输格式

![image-20240812144955077](assets/image-20240812144955077.png)

- **ID**
  - **数据更新：**根据标识更新具体的数组中的某一项数据（找到历史中当前进行的会话）
  - ![image-20240812145057932](assets/image-20240812145057932.png)
  - **取消出错请求**
  - ![image-20240817153242810](assets/image-20240817153242810.png)

#### 关于模拟调用el-upload实现对预览栏的图片进行问答和上传图片问答走一套逻辑

![image-20240812145724153](assets/image-20240812145724153.png)

```javascript
function convertUrlToUploadFormat(url, callback) {
          console.log("fetch前", url);
      // 使用fetch API获取图像数据
      fetch(url)
        .then((response) => {
          // 确保响应状态正常
          if (!response.ok) throw new Error("Failed to fetch the image");
          // 获取响应的MIME类型
          // 获取MIME类型
          const contentType = response.headers.get("content-type");
          // 返回一个包含blob和contentType的对象
          return response.blob().then((blob) => ({ blob, contentType }));
        })
        .then(({ blob, contentType }) => {
          // 从MIME类型中提取文件扩展名
          // 使用从headers获取的MIME类型设置文件类型
          const fileExtension = contentType.split("/")[1]; // 从MIME类型获取文件扩展名
          // 构造文件名
          const fileName = `image.${fileExtension}`; // 创建文件名
          // 创建File对象，用于上传
          const file = new File([blob], fileName, {
            type: contentType,
          });
          // 为文件对象添加URL属性，用于预览
          file.url = URL.createObjectURL(blob); // 创建Blob URL用于预览等
          // 创建原始文件对象，保持原始数据
          file.raw = new File([blob], file.name, { type: contentType });
          // 设置文件状态为准备就绪
          file.status = "ready";
          // 构造模拟的事件对象，包含文件信息
          // 模拟Element UI el-upload的handleChange参数
          const event = { file };
          // 调用回调函数，传入转换后的文件对象
          callback(event);
        })
        .catch((error) => {
          // 在转换过程中捕获并打印错误
          console.error("Error converting URL to upload format:", error);
        });
    }
```

![image-20240812145918088](assets/image-20240812145918088.png)

##### 函数的目标是方便地将图片的 URL 转换为一个文件上传时所需的格式

- 获取响应的 MIME 类型，通过 `response.headers.get("content-type")` 获取。
- 将响应数据转换为 `Blob`，并返回包含 `Blob` 和 MIME 类型的对象。
- 提取 MIME 类型中的文件扩展名（通过分割 MIME 类型字符串）。
- 构造文件名（`image.<fileExtension>`）。
- 基于 `Blob` 创建一个新的 `File` 对象，用于上传。
- 创建一个 `Blob` URL（`URL.createObjectURL(blob)`）用于预览图像。
- 创建一个原始的 `File` 对象，保持原始数据方便后续使用。
- 设置文件的状态为 "ready"（准备就绪状态）。
- 构造一个模拟的事件对象（`event`），包含文件信息。
- 调用回调函数 `callback`，将处理后的文件对象传入回调函数。

#### MIME

MIME（Multipurpose Internet Mail Extensions）用于指定文件的类型和格式，浏览器和服务器通过 MIME 类型来识别和处理不同的文件类型

##### MIME 在这个函数中的作用

在 `convertUrlToUploadFormat` 函数中，MIME 类型是通过 `response.headers.get("content-type")` 获取的。它在以下几个方面起作用：

1. **识别内容类型**：

   - `const contentType = response.headers.get("content-type");` 获取了响应的数据类型，例如 `image/jpeg` 或 `image/png`。
   - 通过 MIME 类型，我们能够知道所处理的数据的具体格式，从而能够正确处理这些数据。

2. **构造文件对象**：

   - 在创建File对象时，需要指定type属性：

     ```javascript
     const file = new File([blob], fileName, { type: contentType });
     ```

     这能确保浏览器在处理文件时，了解文件的具体类型。

3. **设置文件扩展名**：

   - 从 MIME 类型中提取文件扩展名，以便创建适当的文件名：

     ```javascript
     const fileExtension = contentType.split("/")[1];
     const fileName = `image.${fileExtension}`;
     ```

#### BLOB

##### 为什么需要 Blob

Blob（Binary Large Object）是一种**表示二进制数据的大对象**，通常用于在浏览器中存储和处理文件。Blob 对象可以表示图片、视频、音频等多种二进制数据。

##### Blob 在这个函数中的作用

在函数 `convertUrlToUploadFormat` 中，Blob 扮演着以下重要角色：

1. **处理图像数据**：

   - 使用fetch获取图像数据后，通过response.blob()将响应数据转换成 Blob 对象：

     ```javascript
     return response.blob().then((blob) => ({ blob, contentType }));
     ```

   - Blob 对象可以方便地处理二进制数据，例如传送到 `File` 对象或通过 URL 生成预览图片。

2. **创建文件对象**：

   - 基于 Blob 对象创建File对象，用于模拟用户上传的文件：

     ```javascript
     const file = new File([blob], fileName, { type: contentType });
     ```

3. **创建预览 URL**：

   - 使用URL.createObjectURL(blob)创建一个预览 URL：

     ```javascript
     file.url = URL.createObjectURL(blob);
     ```

   - 这使得可以在浏览器中直接预览二进制文件的数据，而不需要上传到服务器。这对于用户体验是非常有好处的，因为用户可以立刻看到他们选择或下载的图片。

​	MIME 和 Blob 的应用场景

1. 文件上传

   - 当需要上传文件到服务器时，通常会使用 Blob 或 File 对象。Blob 对象可以代表任何二进制数据，同时也可以指定 MIME 类型。

2. 数据处理

   - Blob 对象用于处理大型二进制数据，如将数据读取到内存中进行处理，或者使用 Blob 创建下载链接，允许用户下载二进制文件。

3. 预览功能

   - 使用 `URL.createObjectURL(blob)` 可以生成一个临时 URL，用于在网页中直接显示二进制数据，如图像预览、视频播放等。

#### 在这个函数中的关系与配合

- **获取图像数据**：
  - 使用 `fetch` 获取图像数据并将其转换为 Blob；
  - 在转换过程中获取内容的 MIME 类型以确保数据类型正确。
- **创建 `File` 对象**：
  - 使用 Blob 创建一个新的 `File` 对象，确保其 MIME 类型正确，并指定文件名。
- **预览 URL**：
  - 基于 Blob 创建图像预览 URL，使用户可以即时查看下载的图像。

通过上述步骤，`convertUrlToUploadFormat` 函数实现了从给定 URL 获取图像数据，并将其转换成可上传和预览的格式，最终通过回调函数返回。

### content-vue

![image-20240809135325330](assets/image-20240809135325330.png)

content-vue负责渲染对话的历史记录，相当于所有聊天对话的最外层盒子，对子组件card-vue进行每一条记录的传参进行渲染单个的消息

#### contentRef

![image-20240809135453696](assets/image-20240809135453696.png)

![image-20240809135550319](assets/image-20240809135550319.png)

通过ref控制滚动条位置赋值为content的内容高度来实现滚动到底部

### card-vue

![image-20240809141249878](assets/image-20240809141249878.png)

props为content-vue的单条对话数据

通过判断是否存在文件数据来展现图片预览

- isUpload

在改变模型时，请求接口获取模型的相关信息，更改可支持的图像类型

格式类型：

```json
anthropic": [
            {
                "model": "claude-3-sonnet",
                "max_tokens": 4096,
                "max_temperature": 1,
                "label": "claude",
                "multimodal": true,
                "support_modals": [
                    "image/jpeg",
                    "image/jpg",
                    "image/png",
                    "image/gif",
                    "image/webp"
                ],
                "unit_price": {
                    "prompt": 0.000003,
                    "completion": 0.000015
                }
            },
```



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

### MarkDown组件

![image-20240809154301173](assets/image-20240809154301173.png)

props.content为input.vue传来的流式输出动态更新返回的数据

#### marked库配置项的作用

```javascript
marked.setOptions({
      renderer: renderer,
      sanitize: false,
      pedantic: false,
      silent: true,
      highlight(code) {
        return hljs.highlightAuto(code).value;
      },
    });
```

**`renderer`**:

- **描述**: 自定义渲染器，用于覆盖默认的 Markdown 渲染行为。

- **细节**: `renderer` 是一个对象，其中包含用于渲染不同 Markdown 元素的方法。你可以用自己的实现替换这些方法，以自定义输出。例如，如果你想自定义标题的渲染，可以给 renderer 对象提供一个 `heading` 方法。

- 示例

  ```javascript
  const renderer = {
    heading(text, level) {
      return `<h${level} class="my-custom-class">${text}</h${level}>`;
    }
  };
  ```

**`sanitize`**:

- **描述**: 是否启用 HTML 标签的清理。
- **细节**: 如果设置为 `true`，将会移除 Markdown 中的 HTML 标签。这样可以避免 XSS 攻击，但可能会剥离掉一些需要的 HTML 内容。
- **默认值**: `false`，不清理 HTML 标签。

**`pedantic`**:

- **描述**: 是否启用严格模式。
- **细节**: 如果设置为 `true`，将会严格遵循 Markdown.pl 的实现。一些 Markdown 解析器会在标准基础上增加一些灵活性，这个选项可以关闭这些灵活性。
- **默认值**: `false`，不启用严格模式。

**`silent`**:

- **描述**: 是否静默运行。
- **细节**: 如果设置为 `true`，错误会被作为响应返回而不会抛出异常。这对在某些环境下避免程序崩溃可能有用。
- **默认值**: `false`，不启用静默模式。

**`highlight`**:

- **描述**: 代码高亮函数。
- **细节**: 允许你为代码块提供自定义的高亮实现。设定此选项后，代码块将使用你提供的函数进行高亮。

## 模型对比的实现

![image-20240809132012784](assets/image-20240809132012784.png)

多设置一套数据用来做对比模型的数据和渲染

# 输出内容渲染

![image-20240829132318155](assets/image-20240829132318155.png)

模型输出内容本身就为markdown格式的字符

### 代码渲染:highlight.js库

![image-20240809164007098](assets/image-20240809164007098.png)

![image-20240809164040337](assets/image-20240809164040337.png)

- 导入的onedark样式，marked库配置的highlight函数会自动应用导入的hilightjs库下导入样式，最终应用到代码块的样式上



### 输出内容样式

![image-20240809164245743](assets/image-20240809164245743.png)

为插入v-html的元素设置类名

![image-20240809164320531](assets/image-20240809164320531.png)

匹配样式库的类名进行格式的生成

也可以自定义样式进行覆盖应用

![image-20240809164359342](assets/image-20240809164359342.png)

- markdown渲染:Marked库,将markdown转换为html
  - 支持标准的 Markdown 语法
  - 允许自定义渲染器和解析规则
  - 正则替换换行符为</br>
  - 输出内容定义样式,打字机动画
  - 提供选项来防止 XSS（跨站脚本）攻击，可以净化输出的 HTML
    - 转义字符

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

```javascript
<script>
import { computed, defineComponent } from "@vue/composition-api";
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
  },
  setup(props) {
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

    const text = computed(() =>
      marked(props.content.replace(/\\n|\r\n/g, "<br />"))
    );
    return {
      text,
      wrapClass,
    };
  },
});
</script>

<template>
  <div class="text-black" :class="wrapClass">
    <div class="leading-relaxed break-all">
      <div class="markdown-body dark" v-html="text" v-blank />
    </div>
  </div>
</template>

<style scoped>
@import url(./github.less);
</style>
```



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

### 第三版（实现）

```javascript
const typeWriterEffect = () => {
  console.log(1);
  if (typingIndex < fullText.value.length) {
    displayedContent.value = fullText.value.slice(0, typingIndex++);
    timer = setTimeout(typeWriterEffect, props.typingSpeed);
  } else {
    clearTimeout(timer);
    timer = undefined;
  }
};
const updateContent = () => {
  // 每次增量更新
  fullText.value = marked(props.content.replace(/\\n|\r\n/g, "<br />"));
  // console.log("Rendered markdown:", marked(props.content));
  // console.log("props.content", props.content);
  if (!timer) {
    typeWriterEffect();
  }
};

watch(
  () => props.content,
  () => {
    updateContent();
  }
);

onMounted(() => {
  updateContent();
});
```

#### 第二版实际上并没有完成对速度的控制

原因：

![image-20240809201819699](assets/image-20240809201819699.png)

#### watch中不断间接调用函数创建新的定时器

不是，是多次创建之后会导致你的定时器出现异常，因为他们执行的是同样的逻辑，间隔的时间也一样，如果你创建的过程也很均匀最后的结果就是你的定时器看起来是变快了，实际上是多个定时器在互相影响

他重复创建的结果就是你会看到他执行的越来越快

然后渲染是根据typeindex的值

你看起来是一个

其实背后执行的可能有几百个定时器了

#### 解决方法

注意：clearTimeout定时器后，！timer为false，所以需要手动赋值timer为空

![image-20240809201923906](assets/image-20240809201923906.png)

![image-20240809201937409](assets/image-20240809201937409.png)

### 第四版，requestAnimation

```javascript
const typeWriterEffect = () => {
      console.log(1);
      if (typingIndex < fullText.value.length) {
        displayedContent.value = fullText.value.slice(0, typingIndex++);
        timer = requestAnimationFrame(typeWriterEffect);
      } else {
        if (timer !== null) {
          cancelAnimationFrame(timer);
          timer = null;
        }
      }
    };
```

可以在可能已有高帧率的情况下获得更平滑的性能表现，同时还可以更高效地使用浏览器提供的优化,

因为它是由浏览器来调度的，通常可以提供更好的性能和电池效率

1. **准确的间隔**：`requestAnimationFrame` 的调用频率是每秒 60 次（即每 16.67 毫秒运行一次），这可能会比你原来的 `props.typingSpeed`（如果它高于 16ms）更快。因此，如果你的 `typingSpeed` 是高于 16ms，你可能需要在 `typeWriterEffect` 中手动添加一些计时逻辑，以确保你的效果和原先的 `setTimeout` 在视觉上保持一致。
2. **取消动画**：确保在不需要进行动画时使用 `cancelAnimationFrame` 来尽可能释放资源。
3. 调用频率大约为每秒60次（即每帧16.67毫秒）,这一频率是由浏览器和硬件刷新率决定的，不可直接通过 `requestAnimationFrame` 调用自身进行加速到**更短的时间间隔**。
4. 适合用于动画和视觉更新,因为它与浏览器的重绘周期同步,可以提供更流畅的动画效果
5. 当你使用 `requestAnimationFrame` 并切换到其他标签页时，浏览器通常会暂停该标签页的动画执行。`requestAnimationFrame` 的一个特性是它会在标签页不活跃时暂停调用，这样可以减少CPU和GPU的消耗。这意味着如果用户切换到其他标签页，动画会暂停，直到用户返回到原来的标签页时才会继续执行。
6. 通义千问的效果就是这样的

#### 控制速度版本

这里增加了一个lastTime变量来记录上一次更新的时间，通过比较performance.now()和lastTime之间的差值来控制打字速度。

```javascript
如果你希望有一个打字速度参数，你可以这样做：

const typeWriterEffect = () => {
  console.log(1);
  const now = performance.now();
  if (now - lastTime >= props.typingSpeed) {
    if (typingIndex < fullText.value.length) {
      displayedContent.value = fullText.value.slice(0, typingIndex++);
      lastTime = now;
    } else {
      cancelAnimationFrame(timer);
      timer = null;
      return;
    }
  }
  timer = requestAnimationFrame(typeWriterEffect);
};

let lastTime = performance.now();

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
  - 速度只能调整变慢不能快
  
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

### 请求发送的内容

![image-20240809132351261](assets/image-20240809132351261.png)

- maxtoken: 输出内容的长度限制
- temperature: 随机和稳定性
- stream： 流式输出

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

# Aborthandler

控制取消中断请求和sse传输,节省资源

# 使用@microsoft/fetch-event-source库实现Server-Sent Events（SSE）和使用原生JavaScript方法实现SSE

![image-20240826100625490](assets/image-20240826100625490.png)

使用 @microsoft/fetch-event-source 改善服务器发送事件的请求@microsoft/fetch-event-source - npm
在前端开发中，处理服务器发送事件（server-sent events）时，我们通常使用浏览器提供的 EventSource API。然而，该默认 API 存在一些限制，本文介绍了一个名为 @microsoft/fetch-event-source 的包，它提供了更强大的 API，使我们能够更灵活地进行服务器发送事件的请求。

#### 问题与限制

##### 默认的浏览器 EventSource API 在以下方面存在一些限制：

- 无法传递请求体（request body），必须将执行请求所需的所有信息编码到 URL 中，而大多数浏览器对 URL 的长度限制为 2000 个字符。

- 无法传递自定义请求头。
- 只能进行 GET 请求，无法指定其他方法。
- 如果连接中断，无法控制重试策略，浏览器会自动进行几次尝试然后停止。

##### @microsoft/fetch-event-source 的优势

@microsoft/fetch-event-source 提供了一个基于 Fetch API 的替代接口，完全兼容 Event Stream 格式。这使得我们能够以更加灵活的方式进行服务器发送事件的消费。以下是该库的一些主要优势：

- 支持任何请求方法、请求头和请求体，以及 Fetch API 提供的其他功能。甚至可以提供替代的 fetch() 实现，以应对默认浏览器实现无法满足需求的情况。

- 提供对响应对象的访问权限，允许在解析事件源之前进行自定义验证/处理。这在存在 API 网关（如 nginx）的情况下非常有用，如果网关返回错误，我们可能希望正确处理它。
- 对连接中断或发生错误时，提供完全控制的重试策略。
- 此外，该库还集成了浏览器的 Page Visibility API，使得在文档被隐藏时（例如用户最小化窗口），连接会关闭，当文档再次可见时会自动使用上次事件 ID 进行重试。这有助于减轻服务器负担，避免不必要的开放连接（但如果需要，可以选择禁用此行为）。

原文链接：https://blog.csdn.net/SAXX2/article/details/136538314



使用@microsoft/fetch-event-source库和原生JavaScript实现Server-Sent Events (SSE)各有优缺点。让我们来详细比较一下：

@microsoft/fetch-event-source库：

优点：
1. 功能强大：支持自定义HTTP方法、请求头和请求体。
2. 错误处理：提供更强大的错误处理和重试机制。
3. 跨浏览器兼容性：解决了一些浏览器的兼容性问题。
4. 取消请求：支持使用AbortController取消请求。
5. 灵活性：可以处理复杂的数据结构和不同类型的事件。
6. POST请求支持：允许发送包含数据的POST请求。

缺点：
1. 额外依赖：需要引入额外的库，增加了项目的依赖。
2. 学习成本：使用库需要学习其API和用法。
3. 包大小：可能增加应用的总体大小。
4. 更新和维护：依赖第三方库的更新和维护。

原生JavaScript实现SSE：

优点：
1. 简单直接：使用EventSource API，实现简单，易于理解。
2. 无额外依赖：不需要引入额外的库。
3. 浏览器原生支持：在支持的浏览器中性能可能更好。
4. 轻量级：不增加额外的代码体积。
5. 长期稳定性：作为Web标准，API不太可能发生重大变化。

缺点：
1. 功能限制：**只支持GET请求**，不能自定义HTTP方法或发送请求体。
2. 有限的错误处理：错误处理能力相对较弱。
3. 兼容性问题：某些老旧浏览器可能不支持。
4. 缺乏高级功能：如自动重连、细粒度的超时控制等需要自行实现。
5. 安全限制：受到同源策略的限制，跨域使用需要服务器支持。

选择建议：

1. 如果你的项目需要复杂的SSE功能，如POST请求、自定义头、高级错误处理等，选择@microsoft/fetch-event-source库会更合适。

2. 如果你的项目较简单，只需基本的SSE功能，并且希望保持轻量级和无额外依赖，那么使用原生JavaScript实现会更好。

3. 考虑你的目标浏览器支持。如果需要支持旧版浏览器，使用库可能会提供更好的兼容性。

4. 评估你的项目对实时性和可靠性的要求。如果需要更强大的重试机制和错误处理，库可能会提供更多现成的解决方案。

5. 考虑开发团队的熟悉程度。如果团队更熟悉原生API，可能直接使用原生实现会更有效率。

总的来说，选择哪种方法主要取决于你的具体需求、项目复杂度、性能要求以及开发团队的偏好。在复杂的应用场景中，使用库通常能提供更多的功能和更好的开发体验，而在简单场景中，原生实现可能更加轻量和直接。

# 一键复制效果实现

```javascript
const copyHandler = () => {
      navigator.clipboard
        ? navigator.clipboard
            .writeText(escapeContent.value || displayContent.value)
            .then(() => {
              Message.success("复制成功");
            })
        : ctx.root
            .$copyText(escapeContent.value || displayContent.value)
            .then(() => {
              Message.success("复制成功");
            });
    };
```

尝试使用现代浏览器的 navigator.clipboard.writeText 方法来复制文本。
如果浏览器不支持该方法，则使用 vue-clipboard2 的 $copyText 方法。

# 为什么这种与模型问答的场景要使用sse,而不是使用websocket

在设计和实现实时通信的应用场景时，选择适当的技术非常重要。Server-Sent Events (SSE) 和 WebSocket 是两种常见的实时通信协议，各自有其优势和适用场景。在与你描述的模型问答场景中，使用 SSE 而不是 WebSocket 通常有以下几个原因：

### SSE（Server-Sent Events）的优点

1. **简单和轻量**：
   - **易于实现**：SSE 使用标准的 HTTP 协议，其实现比 WebSocket 简单。在浏览器中，使用 `EventSource` 对象可以很方便地与服务器进行事件流通信，而不需要复杂的握手过程。
   - **轻量级**：SSE 只需要单向通信（从服务器到客户端），省去了 WebSocket 双向通信的复杂性和资源消耗。
2. **自动重连机制**：
   - **内建重连**：SSE 内置了自动重连机制。当连接意外断开时，浏览器会自动尝试重新连接，这非常适合长时间的稳定连接要求。
4. **兼容性高**：
   - **HTTP 环境**：SSE 可以更方便地穿过防火墙和代理服务器，因为它基于 HTTP 协议，不需要额外的配置和代理支持。
5. **更适合长时间持续性的更新**：
   - **问答场景**：在问答模型中，通常是服务器持续向客户端推送消息，直到一个问题的回答完成，这种场景更适合使用 SSE 的单向推送通信模式。
6.  EventStream（事件流）为 `UTF-8` 格式编码的`文本`或使用 Base64 编码和 gzip 压缩的二进制消息
   - 契合针对多模态模型发送的数据中包含图片这种的base64数据

### WebSocket 的特点及适用场景

1. **双向通信**：
   - **实时互动**：WebSocket 提供了双向通信的能力，客户端和服务器可以在任意时刻发送数据。这适用于需要双向实时互动的场景，例如在线游戏、实时聊天、协作工具等。

2. **低延迟**：
   - **更快速的消息传递**：由于 WebSocket 在握手之后保持长连接，并且不需要每次发送消息时进行 HTTP 请求，因此延迟较低，更适合对延迟敏感的应用。
   
3. **更好的二进制数据支持**：
   - **多种数据格式**：WebSocket 原生支持发送二进制数据和文本数据，适合需要传输大量二进制数据的应用，例如视频流、音频流等。

### 为什么问答模型使用 SSE 而非 WebSocket

结合上述优点和特点，我们可以清楚地看到，在问答模型的场景中，使用 SSE 通常是因为以下几个原因：

1. **通信需求单向**：
   - 在问答模型场景中，通信主要是单向的，即服务器向客户端推送应答消息。SSE 刚好满足这种需求。
   
2. **实现简单**：
   - 实现和使用简单。客户端和服务器的代码都更为简洁，不需要处理复杂的握手和双向通信逻辑。

3. **资源消耗**：
   - SSE 对资源的消耗较小，更适合长时间的持续连接，而双向通信的 WebSocket 在这种单向消息推送的需求下显得有些“过剩”。

4. **自动重连**：
   - 自动重连机制非常适合处理网络不稳定的情况，保证了连接的稳定性和消息的持续推送。

5. **服务器端的支持**：
   - SSE 基于标准的 HTTP 协议，很多服务器框架都内置了对 SSE 的支持，易于部署和管理。

### 总结

虽然 WebSocket 在许多实时通信场景下表现更为出色，但在单向、持续、轻量且实现简单的场景中，Server-Sent Events (SSE) 是更为合适的选择。考虑到你描述的模型问答场景主要涉及从服务器到客户端的连续消息推送，SSE 提供了更为简洁和高效的解决方案，因此在这种场景中优先选择 SSE 是合理的。

# sse对资源的消耗为什么比websocket小

Server-Sent Events (SSE) 与 WebSocket 在处理机制和通信模式上有明显的不同，这使得它们对系统资源的消耗有所区别。以下是 SSE 对资源消耗相较于 WebSocket 更小的详细分析：

### 1. 通信模式差异
- **SSE**：
  - **单向通信**：SSE 仅支持服务器向客户端推送消息，这种单向通信模式减少了处理双向通信所需的复杂性和资源消耗。
  - **基于 HTTP**：SSE 使用标准的 HTTP 协议，这意味着它可以通过传统的 HTTP/1.1 或者 HTTP/2 连接，这在 HTTP/2 中尤其有效，因为 HTTP/2 支持多路复用，进一步降低了连接管理的开销。

- **WebSocket**：
  - **双向通信**：WebSocket 支持双向通信，即服务器和客户端都可以发送和接收消息。这种模式需要更多的资源来维护双向连接的状态和流量。
  - **自定义协议**：WebSocket 在初次握手时是基于 HTTP 的，但握手完成后切换到自定义的 WebSocket 协议，这可能需要额外的处理逻辑和资源来管理连接。

### 2. 连接管理
- **SSE**：
  -  事件ID。事件的唯一标识符，浏览器会跟踪事件ID，如果发生断连，浏览器会把收到的最后一个事件ID放到 HTTP Header `Last-Event-Id` 中进行重连，作为一种简单的同步机制。
  - **长连接但轻量**：SSE 连接是长连接，但它不需要处理复杂的状态同步和即时性数据的双向传输，加之 HTTP/2 的多路复用，连接管理更加轻量。
  - **自动重连**：SSE 客户端内置了自动重连机制，简化了断线重连的逻辑处理。
  
- **WebSocket**：
  - **维持双向连接的复杂性**：维护 WebSocket 连接需要处理心跳包（ping/pong）、连接丢失时的重试逻辑等，这些都会增加服务器的资源开销。
  - **资源占用更明显**：由于需要处理双向通信，WebSocket 的连接管理会占用更多的服务器资源，尤其是在大量并发连接时。

### 3. 数据传输模式
- **SSE**：
  - **文本传输**：SSE 主要用于**传输字符数据（文本）**，数据格式简单，解析效率高，减少了服务器和客户端的处理复杂度。
  
- **WebSocket**：
  - **二进制和文本传输**：除了文本，WebSocket 还可以传输二进制数据，这虽然在某些场景下带来便利（例如实时音视频传输），但也增加了解析和处理数据的复杂性，进而增加了资源消耗。

### 4. 开发和配置复杂度
- **SSE**：
  - **简单的实现**：实现和管理 SSE 连接较为简单，不需要复杂的配置和编程技巧，很适合轻量的实时数据推送场景。

- **WebSocket**：
  - **复杂的配置**：WebSocket 需要服务器和客户端双方都处理 WebSocket 协议的握手、心跳检测、消息解析等复杂的逻辑，开发和维护成本较高。

### 实例对比

假设我们有一个需要实时更新股票价格的应用：

- **使用 SSE**：
  - 服务器每秒推送一次股票价格更新，只需开一个长连接，每次更新的数据量小，解析快。
  - 客户端只需要一个简单的 `EventSource` 对象来接收数据。

- **使用 WebSocket**：
  - 每秒推送一次股票价格更新，同样维持一个长连接，但需要管理双向连接的状态。
  - 如果客户端只需要接收数据，尽管 WebSocket 能实现，但在这种单向通信需求中，实际资源消耗更高。

总结来看，SSE 更适合轻量的、单向的数据推送场景，因其实现简单、基于 HTTP、自动重连机制以及能够利用 HTTP/2 的优势，使其在资源消耗方面通常比 WebSocket 更小。WebSocket 虽然功能强大，适用于更加复杂的实时双向通信需求，但在单向实时数据推送的场景下显得有些 “过剩”，从而带来了额外的资源消耗。

# 掘金文章

[一文读懂即时更新方案：SSE - 掘金 (juejin.cn)](https://juejin.cn/post/7221125237500330039)

# 有一个场景，就是比如跟ai对话问答，目前所有对话的数据都是存在vue本地的对象变量中，你觉得这样有什么问题吗，或者说他的坏处是什么，如果有更好的方式，那应该存在哪里呢

在和 AI 对话的应用场景中，所有对话数据都存在 Vue 本地的对象变量中，这种做法可能会带来一些问题和挑战。下面我会分析其中的坏处，并提供一些改进的建议。

### 问题和坏处

1. **内存限制和性能**：
   - 如果对话数据量较大或对话持续时间较长，将所有数据都存在本地对象变量中可能会占用大量内存，导致浏览器性能下降，甚至可能引起内存泄漏和应用崩溃。

2. **数据不持久**：
   - 本地对象变量的生命周期与页面的生命周期一致，当用户刷新页面或关闭后再重新打开，所有对话数据都会丢失。这对于需要保存对话记录的应用来说是一个明显的问题。

3. **无法跨设备访问**：
   - 存储在本地的对话数据只能在当前设备上访问，对于需要跨设备同步数据的应用（例如用户从PC切换到手机）是不利的。

4. **数据安全性**：
   - 如果对话内容涉及敏感信息，仅存储在前端可能会带来安全隐患。

### 改进建议

1. **服务器端存储**：
   - 利用后端服务器和数据库将对话数据持久化存储，确保数据的安全性和持久性。
   - 可以使用 RESTful API 或 WebSocket 进行数据传输和实时通信。

```javascript
// 使用axios进行示例API请求
import axios from 'axios';

// 发送对话信息到服务器
async function sendMessageToServer(message) {
    try {
        const response = await axios.post('/api/messages', { content: message });
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// 从服务器获取历史对话信息
async function fetchConversationHistory() {
    try {
        const response = await axios.get('/api/messages');
        return response.data;
    } catch (error) {
        console.error('Error fetching conversation history:', error);
    }
}
```

2. **本地存储与同步**：
    - 使用浏览器的本地存储（如 `localStorage` 或 `IndexedDB`）进行数据持久化，确保页面刷新后数据不丢失。
    - 设置合适的同步机制，在用户在线时将本地存储的数据同步到服务器，增强用户体验。

```javascript
// 将对话信息存储到localStorage
function saveMessageLocally(message) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
}

// 从localStorage加载历史对话信息
function loadLocalMessages() {
    return JSON.parse(localStorage.getItem('messages')) || [];
}
```

3. **混合存储策略**：
   - 结合服务器端和本地存储，在在线状态下将对话数据存储到服务器，在离线状态时使用本地存储。
   - 使用库如 IndexedDB 的 `dexie.js` 或 `localforage` 可以更方便地管理复杂的本地存储需求。

```javascript
import Dexie from 'dexie';

// Dexie.js 实例化
const db = new Dexie('ChatDatabase');
db.version(1).stores({
    messages: '++id, content, timestamp'
});

// 将对话信息存储到IndexedDB
async function saveMessageToIndexedDB(message) {
    await db.messages.add({ content: message, timestamp: Date.now() });
}

// 从IndexedDB加载历史对话信息
async function loadMessagesFromIndexedDB() {
    return await db.messages.toArray();
}
```

### 结合方案示例
结合以上策略可以设计一个更健壮的解决方案：

1. **初始化时加载本地和服务器数据**。
2. **优先使用本地数据进行展示，同时异步从服务器获取完整对话记录进行同步**。
3. **每次新增消息时，同时保存到本地和服务器**。

### 总结
简单将对话数据存储在 Vue 本地对象变量中可能会带来内存占用高、数据持久化差、无法跨设备访问等问题。推荐使用服务器端存储配合本地存储，并考虑数据的同步和安全性，通过合理的存储策略，确保对话数据管理的高效性和可靠性。

# MarkDownGpt/index.vue

这段代码的核心功能是将传入的Markdown内容转换为HTML，并实现一个模拟“打字效果”的组件，同时支持数学公式的渲染和代码高亮。代码主要分为四部分：导入依赖、组件定义及设置、模板定义、和样式定义。我们逐一解释各部分的作用和主要语句。

### 导入依赖

```javascript
import {
  computed,
  defineComponent,
  watch,
  ref,
  onMounted,
} from "@vue/composition-api";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import katex from "katex";
import "katex/dist/katex.min.css";
import { marked } from "marked";
```

这部分代码导入了Vue 2的Composition API模块、`highlight.js`用于代码高亮、`katex`用于渲染数学公式，以及`marked`用于解析Markdown文本。

### 组件定义及设置

```javascript
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
      default: 30, // 每个字符的打字速度，毫秒为单位
    },
  },
  setup(props) {
    // ... setup function content ...
  },
});
```

这部分代码定义了一个Vue组件并设置了三项props：
- `content`: 传入的Markdown文本内容。
- `sanitize`: 是否清理输入内容，默认为true。
- `typingSpeed`: 模拟打字效果时每个字符的时间间隔，默认为30毫秒。

#### setup函数内部

```javascript
const displayedContent = ref("");
let fullText = ref("");
let typingIndex = 0;
let timer;
```

定义了几个响应式变量：
- `displayedContent`: 实时显示的内容，绑定到模板中的HTML。
- `fullText`: 解析和渲染后的完整内容。
- `typingIndex`: 当前打字效果的位置索引。
- `timer`: 模拟打字效果的定时器ID。

### Renderer设置

自定义`marked`的渲染器以处理数学公式的渲染。

```javascript
const renderer = new marked.Renderer();

const inlineMathRegex = /\[([^\]]+)]/g;
renderer.text = (text) => {
  return text.replace(inlineMathRegex, (match, p1) => {
    try {
      return katex.renderToString(p1, { throwOnError: false });
    } catch (e) {
      console.error("KaTeX rendering error:", e);
      return match;
    }
  });
};

const displayMathRegex = /\$\$([\s\S]+?)\$\$/g;
renderer.paragraph = (text) => {
  return text
    .replace(displayMathRegex, (match, math) => {
      try {
        return `<p>${katex.renderToString(math, {
          throwOnError: false,
          displayMode: true,
        })}</p>`;
      } catch (e) {
        console.error("KaTeX rendering error:", e);
        return `<p>${text}</p>`;
      }
    })
    .replace(inlineMathRegex, (match, p1) => {
      try {
        return katex.renderToString(p1, { throwOnError: false });
      } catch (e) {
        console.error("KaTeX rendering error:", e);
        return match;
      }
    });
};
```

定义了一个自定义渲染器：
- `renderer.text`: 处理行内数学公式，使用`katex.renderToString`渲染Bracket语法（即`[公式内容]`）。
- `renderer.paragraph`: 处理块级数学公式（即`$$公式内容$$`）和行内数学公式（同上）。

设置`marked`的选项，包括代码高亮的功能。

```javascript
marked.setOptions({
  renderer: renderer,
  sanitize: false,
  pedantic: false,
  silent: true,
  highlight(code) {
    return hljs.highlightAuto(code).value;
  },
});
```

### Computed和Watch

使用计算属性计算包裹类和侦听器响应内容变化。

```javascript
const wrapClass = computed(() => {
  return ["text-wrap", "min-w-[20px]", "rounded-md", "bg-[#f4f6f8]"];
});

const typeWriterEffect = () => {
  if (typingIndex < fullText.value.length) {
    displayedContent.value = fullText.value.slice(0, typingIndex++);
```

好的，接下来我们继续讲解代码的其他部分，包括打字效果的实现、内容更新逻辑的实现代码、模板部分以及样式部分。

### 打字效果的实现

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

这个函数实现了模拟打字的效果：
- 检查当前位置索引 `typingIndex` 是否小于 `fullText.value` 的长度。
- 如果是，则更新 `displayedContent.value` 为 `fullText.value` 的当前切片，并递增 `typingIndex`。
- 设置一个定时器，在 `props.typingSpeed` 毫秒后递归调用 `typeWriterEffect`，直到打字完成。
- 打字完成时清除定时器 `timer`。

### 内容更新逻辑

```javascript
const updateContent = () => {
  // 每次增量更新
  fullText.value = marked(props.content.replace(/\\n|\r\n/g, "<br />"));
  console.log("Rendered markdown:", marked(props.content));
  console.log("props.content", props.content);
  typeWriterEffect();
};

watch(
  () => props.content,
  () => {
    updateContent();
  }
);

onMounted(() => {
  updateContent();
});
```

- `updateContent` 函数负责每次内容改变时刷新并更新打字效果：
  - 将传入的 `content` 进行 Markdown 渲染并替换换行符为 `<br />` 标签，结果赋值给 `fullText.value`。
  - 调用 `typeWriterEffect` 开始打字效果。
  - 控制台日志输出解析后的 Markdown 内容和原始的 `props.content` 以便调试。

- `watch` 函数监听 `props.content` 的变化，每次变化时调用 `updateContent` 更新内容。
- `onMounted` 钩子在组件挂载时首次调用 `updateContent`。

### 模板定义

```html
<template>
  <div class="text-black" :class="wrapClass">
    <div class="leading-relaxed break-all">
      <div class="markdown-body dark" v-html="displayedContent" v-blank />
    </div>
  </div>
</template>
```

模板部分定义了组件的 DOM 结构和样式：
- 外层 `div` 使用 `text-black` 类，并通过绑定 `wrapClass` 应用动态计算的类。
- 内层包含显示内容的 `div`，使用 `v-html` 指令将渲染后的 HTML 内容绑定到 `displayedContent`，从而实现 Markdown 内容的展示。
- `v-blank` 是自定义指令，具体实现没有提供，但可能用于特定的内容处理。

### 样式定义

```css
<style scoped>
@import url(./github.less);
</style>
```

这段代码使用了 `scoped` 样式，这意味着样式仅应用于当前组件。同时引入了一个 `github.less` 文件，可能用于定义组件的自定义样式.

### 总结

这个 Vue 组件实现了以下功能：
1. 接收 Markdown 文本并解析为 HTML 格式。
2. 支持行内及块级数学公式的渲染。
3. 实现了一个“打字效果”，模拟文本逐字显示。
4. 支持代码高亮，并可自定义样式。

通过这些功能，提升了 Markdown 内容的交互性和显示效果。

## 这段代码是怎么将hilightjs和markedjs联系在一起的

这段代码通过自定义 `marked` 的渲染选项来将 `highlight.js` 和 `marked.js` 结合在一起。具体实现方式如下：

### 1. `marked` 渲染器配置

在设置 `marked.js` 的选项时，设置了一个 `highlight` 函数，该函数使用 `highlight.js` 进行代码高亮。

```javascript
marked.setOptions({
  renderer: renderer, // 自定义的渲染器
  sanitize: false,
  pedantic: false,
  silent: true,
  highlight(code) {
    return hljs.highlightAuto(code).value;
  },
});
```

### 2. `highlight` 函数解析

关键在于 `highlight` 函数的定义：

```javascript
highlight(code) {
  return hljs.highlightAuto(code).value;
}
```

- `code`: 这是 `marked` 解析后的代码块字符串。

`highlight.js` 提供的 `highlightAuto` 函数会自动检测代码块的语言并进行相应的高亮处理，返回经过高亮处理的 HTML 代码字符串。

### 3. `marked` 渲染时应用高亮

当 `marked` 解析带有代码块的 Markdown 文本时，例如如下 Markdown 代码块：

    ```javascript
    console.log('Hello, world!');
    ```

`marked` 会识别出这是一个代码块，并调用配置的 `highlight` 函数。

通过 `highlight(code)`, 它将代码文本传递给 `highlight.js`，并返回高亮后的代码字符串。

### 4. 最终结合

将 Markdown 文本解析为 HTML 时，代码块会自动通过 `highlight.js` 进行高亮，并返回包含高亮 HTML 内容的最终字符串。这个最终字符串会被赋值到 `fullText.value`，然后通过 `v-html` 绑定到模板中的 `displayedContent` 来展示。

### 示例流程

假设 `props.content` 是以下 Markdown 文本：

```markdown
# Example Code

Here is some JavaScript code:

```javascript
console.log('Hello, world!');
```
```

1. `updateContent` 函数调用 `marked(props.content)`。
2. `marked` 开始解析 Markdown 文本，遇到代码块。
3. `marked` 调用 `highlight` 函数：
   ```javascript
   highlight(code) {
     return hljs.highlightAuto(code).value;
   }
```
4. 代码高亮后返回的 HTML 被插入到最终的渲染结果中。
5. `fullText.value` 被更新为插入高亮代码后的完整 HTML。
6. `displayedContent` 的值通过 `v-html` 显示在模板中。

通过这种方式，这段代码成功地将 `highlight.js` 和 `marked.js` 集成在一起，实现了 Markdown 文本的解析和代码高亮。

## 讲一下在渲染公式时的执行过程

在渲染数学公式时，这段代码结合了 `marked.js` 和 `katex` 来解析 Markdown 和渲染数学公式。下面详细解释一下公式渲染的执行过程。

### 1. 初始化 `katex` 相关正则表达式

首先，定义了两个正则表达式来匹配行内和块级的数学公式：

```javascript
const inlineMathSyntax = /\$(.+?)\$/g; // 匹配 $...$ 格式的行内公式
const blockMathSyntax = /\$\$(.+?)\$\$/g; // 匹配 $$...$$ 格式的块级公式
```

### 2. 自定义 Renderer

为了能够捕获和处理数学公式，创建了一个自定义的 `Renderer`：

```javascript
const renderer = new marked.Renderer();

renderer.paragraph = (text) => {
  // 处理块级公式
  if (blockMathSyntax.test(text)) {
    return '<p>' + text.replace(blockMathSyntax, (_, tex) => katex.renderToString(tex, { displayMode: true })) + '</p>';
  }
  // 处理行内公式
  if (inlineMathSyntax.test(text)) {
    return '<p>' + text.replace(inlineMathSyntax, (_, tex) => katex.renderToString(tex)) + '</p>';
  }
  return `<p>${text}</p>`;
};
```

这个自定义渲染器覆盖了 `marked.Renderer` 的 `paragraph` 方法，用于处理段落中的数学公式：
- 它首先检查段落内容中是否包含块级数学公式（`$$...$$`），如果有，则使用 `katex.renderToString` 将它们渲染为 HTML。
- 然后检查行内数学公式（`$...$`），也使用 `katex.renderToString` 渲染为 HTML。
- 如果既不包含块级公式也不包含行内公式，则直接返回段落内容。

### 3. 配置 `marked` 使用自定义 Renderer

将这个自定义渲染器应用到 `marked`：

```javascript
marked.setOptions({
  renderer: renderer, // 自定义的渲染器
  sanitize: false,
  pedantic: false,
  silent: true,
  highlight(code) {
    return hljs.highlightAuto(code).value;
  },
});
```

通过此配置，`marked` 在解析文本时会使用自定义的渲染器来处理段落。

### 4. 解析和渲染公式

在 `updateContent` 函数中调用 `marked` 解析内容：

```javascript
const updateContent = () => {
  // 每次增量更新
  fullText.value = marked(props.content.replace(/\\n|\r\n/g, "<br />"));
  console.log("Rendered markdown:", marked(props.content));
  console.log("props.content", props.content);
  typeWriterEffect();
};
```

假设 `props.content` 是下面的 Markdown 文本：

```markdown
This is an inline formula: $E = mc^2$

This is a block-level formula:
$$
\frac{a}{b} = c
$$
```

### 5. 执行流程

1. **替换换行符**
   - `props.content.replace(/\\n|\r\n/g, "<br />")` 将换行符替换为 HTML 的 `<br />` 标签（这步只在某些环境下适用，具体取决于你传入的内容格式）。

2. **调用 `marked` 解析 Markdown 内容**
   ```javascript
   fullText.value = marked(props.content.replace(/\\n|\r\n/g, "<br />"));
   ```

3. **段落处理**
   `marked` 使用自定义的 `renderer.paragraph` 方法处理每个段落：
   - 如果段落包含块级公式 `$$...$$`，例如 `$$ \frac{a}{b} = c $$`：
     ```javascript
     text.replace(blockMathSyntax, (_, tex) => katex.renderToString(tex, { displayMode: true }))
     ```
     `katex.renderToString` 会将 `\frac{a}{b} = c` 渲染为带有适当 HTML 的公式，并启用 `displayMode` 以块级公式显示。
   
   - 如果段落包含行内公式 `$...$`，例如 `$E = mc^2$`：
     ```javascript
     text.replace(inlineMathSyntax, (_, tex) => katex.renderToString(tex))
     ```
     `katex.renderToString` 会将 `E = mc^2` 渲染为

## 这段代码的名字是不是不能改，只能写render.paragraph

renderer.paragraph = (text) => {
      return text
        .replace(displayMathRegex, (match, math) => {
          try {
            return `<p>${katex.renderToString(math, {
              throwOnError: false,
              displayMode: true,
            })}</p>`;
          } catch (e) {
            console.error("KaTeX rendering error:", e);
            return `<p>${text}</p>`;
          }
        })
        .replace(inlineMathRegex, (match, p1) => {
          try {
            return katex.renderToString(p1, { throwOnError: false });
          } catch (e) {
            console.error("KaTeX rendering error:", e);
            return match;
          }
        });
    };

在这个例子中，`renderer.paragraph` 是一个自定义的函数，用于覆盖 `marked.Renderer` 的默认 `paragraph` 方法。这使得 `marked` 在解析 Markdown 的段落时，会使用你提供的这个自定义方法来处理段落内容。

具体来说，当 `marked` 处理到一个段落时，会调用你的 `renderer.paragraph` 方法，对段落内容进行自定义处理。在这种情况下，你确实不能更改 `renderer.paragraph` 的名字，因为此方法是用于覆盖 `marked.Renderer` 特定的渲染方法。

你可以在类或对象中自定义其他方法，但 `marked` 会明确调用名为 `paragraph` 的方法来处理段落。因此，你重写的函数名称必须是 `paragraph`。

### 代码说明

在这个自定义 `paragraph` 方法中，主要进行了以下操作：

1. **处理块级数学公式：**
   - 使用 `displayMathRegex` 正则表达式匹配块级数学公式（如 `$$...$$`）。
   - 为每个匹配的公式使用 `katex.renderToString` 进行渲染，然后生成带 `<p>` 标签的 HTML。
   - 如果 `katex.renderToString` 抛出异常，捕获错误，并记录错误日志。

2. **处理行内数学公式：**
   - 使用 `inlineMathRegex` 正则表达式匹配行内数学公式（如 `$...$`）。
   - 为每个匹配的公式使用 `katex.renderToString` 进行渲染。
   - 同样，如果 `katex.renderToString` 抛出异常，捕获错误，并记录错误日志。

### 具体的代码：

```javascript
renderer.paragraph = (text) => {
  return text
    .replace(displayMathRegex, (match, math) => {
      try {
        return `<p>${katex.renderToString(math, {
          throwOnError: false,
          displayMode: true,
        })}</p>`;
      } catch (e) {
        console.error("KaTeX rendering error:", e);
        return `<p>${text}</p>`;
      }
    })
    .replace(inlineMathRegex, (match, p1) => {
      try {
        return katex.renderToString(p1, { throwOnError: false });
      } catch (e) {
        console.error("KaTeX rendering error:", e);
        return match;
      }
    });
};
```

如前所述，这个方法名必须是 `paragraph`，因为它是重载 `marked.Renderer` 的 `paragraph` 方法，目的是自定义段落的渲染行为。如果你更改了方法名，例如 `renderer.customParagraph`，`marked` 就不会自动调用它。

### 其他配置项

为了将自定义 `renderer` 应用到 `marked`，你还需要配置 `marked`：

```javascript
marked.setOptions({
  renderer: renderer, // 指定使用自定义的 renderer
  sanitize: false,
  pedantic: false,
  silent: true,
  highlight(code) {
    return hljs.highlightAuto(code).value;
  },
});
```

### 总结

- 为了自定义 `marked` 的段落渲染，你必须使用 `renderer.paragraph` 方法名来重载默认的段落处理行为。
- 你可以在这个方法中自定义处理逻辑，比如使用 `katex` 渲染数学公式。
- 重载的方法名 `paragraph` 不能更改，因为这是 `marked.Renderer` 约定的接口方法。

## 优化样式

![image-20240805195243108](assets/image-20240805195243108.png)![image-20240805195256009](assets/image-20240805195256009.png)

# 浏览器原生的sse只支持get请求

SSE 是一种由服务器向客户端推送实时更新的机制。与 WebSocket 不同，SSE 只能由服务器向客户端发送消息，而不能由客户端向服务器发送消息。实际上，SSE 是通过 HTTP 协议中的 GET 请求来实现的。

1. **HTTP GET 请求**：SSE 通过 HTTP GET 请求进行初始化，服务器返回 `text/event-stream` 的响应类型，之后的所有数据都通过同一连接推送给客户端。
2. **单向通信**：SSE 提供了一种从服务器向客户端单向发送消息的简单方式。如果需要客户端向服务器发送消息，则需要借助其他方式（如 AJAX 或 WebSocket）。
3. **自动重连**：浏览器会自动重连中断的 SSE 连接，保持实时数据传输的连续性。

## 自动重连怎么实现的



Server-Sent Events (SSE) 自动重连的特性是由浏览器内置实现的。浏览器会在连接中断时自动尝试重新连接到服务器。这是 SSE 协议的一个核心部分，可以极大地简化开发者的工作。下面是自动重连的工作原理，以及相关的机制和注意事项。

### 自动重连的工作原理

1. **自动尝试重新连接**：当 SSE 连接由于网络问题、服务器关闭或其他原因中断时，浏览器会在一段时间后自动尝试重新连接到服务器。
2. **默认重连延迟**：默认情况下，浏览器会在连接中断后的 3 秒钟后尝试重新连接。这个间隔可以通过服务器端在事件流中发送 `retry` 字段来进行调整。
3. **重连次数**：浏览器会持续尝试重新连接，直到成功或发生错误。

### 服务器端设置重连间隔

服务器可以通过发送 `retry` 字段来建议客户端在连接断开后重连的延迟时间。单位是毫秒。

```javascript
res.write(`retry: 10000\n`); // 建议客户端在断开后 10 秒钟进行重连
```

### 示例：实现自动重连和设置重连间隔

#### 服务器端 (Node.js)

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    res.write(`retry: 10000\n`); // 设置重连间隔为 10 秒

    // 初始消息
    res.write(`data: Initial data from server\n\n`);

    // 每 5 秒发送一条消息
    setInterval(() => {
      res.write(`data: Periodic update from server\n\n`);
    }, 5000);
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000, () => {
  console.log('SSE server is running on http://localhost:3000');
});
```

#### 客户端 (浏览器)

```html
<!DOCTYPE html>
<html>
<head>
  <title>SSE Example</title>
</head>
<body>
  <h1>Server-Sent Events</h1>
  <div id="messages"></div>
  <script>
    const eventSource = new EventSource('/events');

    eventSource.onopen = function(event) {
      console.log('Connection opened');
    };

    eventSource.onmessage = function(event) {
      const messagesDiv = document.getElementById('messages');
      const newMessage = document.createElement('div');
      newMessage.textContent = event.data;
      messagesDiv.appendChild(newMessage);
    };

    eventSource.onerror = function(event) {
      if (event.eventPhase === EventSource.CLOSED) {
        console.error('Connection closed by server');
      } else {
        console.error('Error occurred');
      }
    };
  </script>
</body>
</html>
```

### 注意事项

1. **重连逻辑**：浏览器自动重连的特性使得开发者无需自行编写复杂的重连逻辑。只需确保服务器能够处理客户端的重新连接请求并持续发送数据。
2. **长连接保持**：服务器端需要配置适当的设置以确保保持长连接，否则可能会遇到连接被中断的情况。例如，可以通过设置 `Keep-Alive` 头部保持连接。
3. **资源管理**：服务器端在处理 SSE 时，务必注意资源的管理。每个连接都是一个持久的打开文件描述符，资源消耗需要根据客户端数量进行评估和管理。

### 结论

自动重连是 SSE 的一大优势，简化了客户端处理实时数据流时的开发难度，只需在服务器端做好相应支持和配置，即可实现高效、可靠的实时通信。

# sse返回的数据格式的问题

```json
{"id":"","object":"chat.completion.chunk","created":1722925812,"model":"claude-3-haiku","choices":[{"index":0,"delta":{"content":"表"},"finish_reason":null,"content_filter_results":{"hate":{"filtered":false},"self_harm":{"filtered":false},"sexual":{"filtered":false},"violence":{"filtered":false}}}],"system_fingerprint":"bedrock"}	

```

![image-20240806144429870](assets/image-20240806144429870.png)![image-20240806144444681](assets/image-20240806144444681.png)

## 模型返回的流式输出的内容虽然看起来是文字，但是实际上是有格式的文字对吗，所以才能用marked来渲染

虽然看起来都是文字，但是实际上是有格式的字符

您的理解是正确的。让我详细解释一下：

1. 模型输出的本质：
   GPT 模型（如 ChatGPT）输出的内容虽然看起来是普通文本，但实际上通常包含了 Markdown 格式的标记。这些标记在纯文本中是不可见的，但它们定义了文本的结构和格式。

2. Markdown 格式：
   Markdown 是一种轻量级标记语言，它使用简单的文本符号来表示格式。例如，`#` 表示标题，`*` 或 `_` 用于斜体，`` ` `` 用于行内代码，等等。

3. 流式输出中的 Markdown：
   在流式输出中，你会逐渐收到包含这些 Markdown 标记的文本片段。虽然它们看起来像普通文本，但实际上包含了格式信息。

4. 示例：
   模型可能会输出如下内容：
   ```
   # 这是一个标题
   
   这是正常的段落文本。
   
   - 这是一个列表项
   - 这是另一个列表项
   
   `这是一段代码`
   ```

5. Marked 的作用：
   Marked 库能够识别这些 Markdown 标记，并将其转换为相应的 HTML 元素。例如，`#` 会被转换为 `<h1>`，列表项会被转换为 `<ul>` 和 `<li>` 等。

6. 渲染过程：
   - 前端接收流式文本输出
   - 使用 Marked 将累积的文本转换为 HTML
   - 将生成的 HTML 插入到页面的 DOM 中
   - 应用 CSS 样式使其美观展示

7. 动态更新：
   在流式响应中，你可能需要在每次接收新的文本片段时重新运行 Marked，以更新页面内容。

总结：你的理解是正确的。模型输出的内容虽然看起来像普通文本，但实际上包含了 Markdown 格式的标记。这就是为什么可以使用 Marked 这样的库来解析和渲染它，从而在页面上呈现格式化的内容。这种方法允许在保持输出简单性的同时，提供丰富的格式化选项。

## 为什么多模态模型在接收图片时要接收base64格式，只能接收base64吗

多模态模型在处理图像输入时，接收 base64 格式的图像数据有其特殊原因，但并不仅限于必须接收 base64 格式。以下解释为什么使用 base64 格式，以及其他可行的图像输入方法：

### 为什么使用 Base64 格式：

1. **通用性与兼容性**：
   - Base64 是一种将二进制数据编码为 ASCII 字符串的技术，使得图像数据可以方便地嵌入 JSON 或 XML 等文本格式中，便于传输和处理。

2. **数据传输的简化**：
   - 在许多网络应用和 API 中，通过 JSON 来传递数据是常见的做法。将图像数据编码为 Base64 使得其可以内嵌在 JSON 中，从而减少了额外的传输步骤和复杂性。

3. **避免文件系统操作**：
   - 使用 Base64 编码可以避免在网络传输过程中依赖于文件系统操作，使数据传输更加独立和健壮。

### 其他图像输入方法：

1. **传递图像文件路径**：
   - 如果模型本地化，可以直接传递图像文件路径，然后再由模型所在的环境来读取文件。这种方法避免了图像编码和解码的开销，但需要确保文件路径和访问权限的正确。

2. **二进制图像数据（Multipart Form-Data）**：
   
   - 在网络传输中，可以使用 HTTP 的 multipart/form-data 格式来上传图片。这种方法在文件上传操作中非常普遍，尤其在 web 应用中。
   
   

### 示例：

1. **Base64 格式**：
   ```json
   {
     "image_data": "/9j/4AAQSkZJRgABAQEAAAABAA..."
   }
   ```

2. **图像文件路径**：
   ```json
   {
     "image_path": "/path/to/image.jpg"
   }
   ```

3. **Multipart Form-Data 格式**：
   ```bash
   curl -X POST -F "image=@/path/to/image.jpg" http://example.com/api/upload
   ```

## 使用base64的好处

1. ### 1. **通过JSON传递图片数据**

   Base64编码将二进制数据转成纯文本字符串，使得图片数据可以嵌入到JSON对象中。JSON（JavaScript对象表示法）是一种轻量级数据交换格式，广泛用于Web API之间的通信。Base64编码使得非文本数据如图片能通过JSON轻松进行传输，这样在API设计时就不需要引入复杂的多部分表单数据格式。

   **示例**：

   ```json
   {
       "name": "example.png",
       "image": "iVBORw0KGgoAAAANSUhEUgAAAAUA..."
   }
   ```

   ### 2. **跨平台和跨语言的兼容性**

   Base64编码后的数据是纯文本，这使得它非常容易被不同的编程语言和平台处理。无论是Python、Java、JavaScript、C#，还是其他编程语言，都有内置的或者易于使用的库来处理Base64编码，这极大地简化了跨平台和跨语言的开发。

   **示例**（Python和JavaScript）：

   ```python
   import base64
   
   data = open('example.png', 'rb').read()
   encoded_img = base64.b64encode(data).decode('utf-8')
   let base64String = btoa(String.fromCharCode(...new Uint8Array(imageBuffer)));
   ```

   ### 3. **避免传输中的数据损坏**

   在数据传输过程中，某些传输协议或网关、代理服务器可能会对二进制数据进行改动，导致数据损坏。如HTTP传输中的字符集问题或者传输中的数据截断等问题。而Base64编码后的数据是标准的ASCII字符，不容易被这些中间过程改动，从而提升了数据传输的稳定性和可靠性。

   **示例**： 直接传输二进制数据可能会遇到字符集问题，而Base64编码的文本数据则不会：

   ```bash
   binary_data: \x89PNG\x0D\x0AX\x0C...
   base64_data: iVBORw0KGgoAAAANSUhEUg...
   ```

   ### 4. **API简单化**

   Base64编码可以简化API的设计和实现。在处理文件上传时，传统的方法使用多部分表单数据格式（multipart/form-data），这种方法需要更多的开发工作量、配置和处理。而Base64编码则使得直接通过JSON传递图片数据变得更简单和直观，不需要额外的表单处理逻辑。

   **示例**：

   ```javascript
   // 传统上传方式
   <form enctype="multipart/form-data">
       <input type="file" name="file" />
       <input type="submit" value="Upload" />
   </form>
   
   // 使用Base64编码的方式
   fetch('/upload', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({ image: base64String })
   })
   ```

   ### 5. **便于存储和日志记录**

   Base64编码的图片数据是纯文本的，因此可以方便地嵌入到日志文件、数据库记录或其他文本文件中。这在调试和记录的时候尤为有用，可以保持数据的完整性。同时，Base64编码的数据可以方便地加载到文本编辑器中查看，而不需要特殊的工具去解释二进制数据。

   **示例**：

   ```json
   {
       "timestamp": "2023-01-01T00:00:00Z",
       "event": "image_upload",
       "image_data": "iVBORw0KGgoAAAANSUhEUgAAAAUA..."
   }
   ```

   这种方法使得调试和数据存档时，更容易查看、过滤和存储图片数据以及相关的元信息。

### 小结：

虽然 Base64 编码的图像数据是多模态模型接收图像数据的一种常见形式，但并不是唯一的方式。根据使用环境和具体需求，可以选择不同的图像数据传递方法。有些方法可能更适合本地化处理，而有些方法则适合网络传输和远程调用。重要的是选择合适的方式以满足特定应用场景的需求。

# latex渲染卡顿的问题

从你提供的代码和描述的行为来看，渲染 LaTeX 公式格式文本时的卡顿和闪烁可能由以下几个原因导致：

1. **递归重绘**：
   - 你使用了 `requestAnimationFrame` 来实现打字机效果，这会导致在每一帧中都有可能重新渲染整个 markdown 内容。当内容过长或需要复杂的渲染时，这可能会造成性能问题，因为 `requestAnimationFrame` 每秒会尝试执行多次（通常是60次），如果每次都处理大量的内容会导致明显的卡顿。

2. **不必要的 DOM 操作**：
   - `v-html` 指令会导致整个 DOM 节点的内部被频繁替换，因为完整的 HTML 内容在每次 typewriter 更新时都变化。DOM 操作是昂贵的，所以频繁和过度的 DOM 更新会导致页面性能下降。

3. **重复解析和渲染公式**：
   - 如果你在运行打字机效果时每次都重新调用 `marked` 和 `katex` ，对于公式解析可能会是性能瓶颈，因为公式的解析和渲染是比较计算密集型的操作。

### 可能的优化方案

1. **减少内容重渲染**：
   - 不必在每次 animation frame 都调用 `marked` 和 `katex`。可以先对传入的文本进行解析，生成一个完整的结果，然后再用 typewriter 效果逐步显示这些已经解析好的内容。

2. **优化 DOM 操作**：
   - 考虑使用 CSS 动画或是其他方式，来实现打字机效果，而不是每次都重新设置 `v-html`。例如，将内容分块，然后使用显示/隐藏的方式替换掉重绘整个 DOM。

3. **批量化处理**：
   - 用于渲染类型数学公式的 `katex` 解析函数，以及 `marked` 的函数，应该避免在 `requestAnimationFrame` 内部被频繁调用。如果能在挂载时提前对公式进行预处理（即只处理一次），会大大减小后续的渲染压力。

4. **Throttle/De-bounce**：
   - 对调用 `typeWriterEffect` 函数的速率进行节流（throttle）或者防抖（debounce）处理，避免在短时间内过多重复调用。

这些优化步骤可以帮助减少文档中繁琐的重绘，提升用户体验和界面渲染的平滑度。对于内容量较大或复杂的应用，可以尝试分阶段加载和渲染，或者使用 Web Workers 分离计算和 UI 渲染。

## 为什么我不渲染latex公式的时候就不卡

当你的代码不渲染 LaTeX 公式时没有卡顿，通常说明公式的渲染过程是性能问题的主要原因。LaTeX 公式的渲染涉及到一些复杂的计算和 DOM 操作，它可能导致性能瓶颈。下面是一些具体的原因可能导致渲染 LaTeX 公式时的卡顿，以及为什么不渲染公式时会更流畅：

1. **计算复杂度**：
   - LaTeX 公式的渲染使用库（例如 KaTeX）来将文本转换成复杂的 HTML 和 CSS 样式。这种转换涉及深度解析和生成复杂的 DOM 结构，计算密集型操作增加了 CPU 的负担。

2. **DOM 更新频率**：
   - 每次更新公式都会生成大量新的 DOM 元素，如果这些过程发生在一个频繁更新的循环中，比如打字机效果的循环中，会导致浏览器的重绘和重排频率非常高。

3. **同步执行**：
   - LaTeX 公式渲染通常是同步的，它会阻塞 JavaScript 线程，直到所有渲染过程完成。这就会导致其他 JavaScript 任务（如动画）无法流畅执行。

4. **内存消耗**：
   - 渲染复杂公式时会消耗较多的内存，频繁的垃圾收集（GC）可以导致不流畅的用户体验。

5. **布局和样式的计算**：
   - 由于公式渲染生成了复杂的样式，浏览器需要进行大量的布局和样式计算，进一步加重了渲染负担。

### 建议的解决方案

- **预渲染**：考虑在后台预渲染公式，这样用户的可见视图中只需显示已经渲染好的内容。
  
- **节省渲染**：尽可能减少不必要的公式渲染，例如当公式内容没有变更时重用已有的渲染结果。

- **Virtual DOM**：利用像 Vue 或 React 这样的框架提供的 Virtual DOM 来减少实际 DOM 的操作次数，优化重排和重绘的成本。

- **分批处理**：将所有的公式分批进行渲染，而不是在一次循环中全部完成，这将有助于减轻每帧的工作负载。

- **使用 Web Workers**：将公式渲染移至 Web Workers 中，以便在不阻塞主线程的情况下执行。

通过采取这些措施，可以有效减少公式渲染造成的卡顿现象，提升用户体验。

# marked库的output都可以为什么

KaTeX 提供了多种输出选项，每种选项都有其特定的用途和优势。主要的输出选项包括：

1. HTML（默认）
2. MathML
3. SVG

让我们详细了解每种输出选项：

1. HTML（默认）:
   - 优点：
     - 渲染速度快
     - 与网页结构良好集成
     - 可以通过 CSS 轻松修改样式
   - 缺点：
     - 在某些情况下可能不如 SVG 清晰
     - 依赖于用户系统的字体

2. MathML:
   - 优点：
     - 是数学公式的标准标记语言
     - 对屏幕阅读器友好，提高可访问性
     - 某些浏览器原生支持
   - 缺点：
     - 并非所有浏览器都完全支持
     - 渲染质量可能因浏览器而异

3. SVG:
   - 优点：
     - 矢量格式，可无损缩放
     - 跨平台一致性好
     - 不依赖系统字体
     - 可以嵌入元数据，有利于 SEO
   - 缺点：
     - 对于简单公式可能过于复杂
     - 在某些旧版浏览器中可能不被完全支持

选择哪种输出格式取决于你的具体需求：

- 如果你需要最快的渲染速度和良好的浏览器兼容性，选择默认的 HTML 输出。
- 如果可访问性是首要考虑因素，并且你的目标用户使用支持 MathML 的浏览器，可以选择 MathML。
- 如果你需要高质量的显示效果，特别是在高分辨率屏幕上，或者需要公式在不同设备上保持一致的外观，SVG 是一个很好的选择。

在你的代码中，选择 SVG 作为输出格式是一个很好的决定，因为它提供了高质量的渲染结果和良好的跨平台一致性。但是，你也可以根据具体需求调整输出格式。例如：

```javascript
katex.renderToString(math, {
  throwOnError: false,
  displayMode: true,
  output: "html", // 或 "mathml"
});
```

通过更改 `output` 参数，你可以轻松切换不同的输出格式，以满足不同的需求或在不同的场景中使用。

# return `<p>${katex.renderToString(math, {为什么要有个$符号

在 JavaScript 中，`${}` 是模板字符串（Template Literals）的一个特性，用于在字符串中嵌入表达式。这里使用 `${}` 的原因是为了将 KaTeX 渲染的结果插入到 HTML 字符串中。让我解释一下：

```javascript
return `<p>${katex.renderToString(math, { ... })}</p>`;
```

这行代码的作用是：

1. 创建一个 HTML 段落元素 `<p>...</p>`。
2. 在段落内部，使用 KaTeX 渲染数学公式。
3. `${}` 允许我们在模板字符串中嵌入 JavaScript 表达式。

具体来说：

- `` ` `` （反引号）用来定义模板字符串。
- `${...}` 用于在字符串中插入 JavaScript 表达式的值。
- `katex.renderToString(math, { ... })` 是一个 JavaScript 表达式，它调用 KaTeX 的函数来渲染数学公式。

这种写法的好处是：

1. 可读性强：清楚地表示我们正在创建一个段落元素，并在其中插入渲染后的数学公式。
2. 灵活性：允许我们轻松地在 HTML 字符串中插入动态内容（在这个例子中是渲染后的数学公式）。
3. 避免字符串拼接：相比传统的字符串拼接（如 `'<p>' + katex.renderToString(...) + '</p>'`），这种方式更简洁、更不容易出错。

如果不使用 `${}`，我们就需要使用字符串拼接，例如：

```javascript
return '<p>' + katex.renderToString(math, { ... }) + '</p>';
```

这种方式虽然也能达到同样的效果，但相比之下不如模板字符串直观和易于维护。

总之，`${}` 在这里的作用是允许我们在创建 HTML 字符串时，方便地插入 KaTeX 渲染的结果。

# 为什么我的代码输出设置为svg,但是实际内容还是文本

![image-20240902213934943](assets/image-20240902213934943.png)

日志调试的输出

根据提供的错误日志，`katex.renderToString` 试图渲染的数学公式中遇到了错误。主要问题是 `KaTeX` 解析过程中出现了 `ParseError`，无法正确解析传递的数学公式。

日志中的错误信息如下：

```
ParseError: KaTeX parse error: Unexpected character: '\` at position 12: frac{5}{2} \
```

### 分析问题

1. **意外字符**：
   - 错误提示 `Unexpected character: '\`，这说明在解析 `frac{5}{2} \` 这个公式时，遇到了意外的字符 `\`。`KaTeX` 解析器认为这个字符是非法的。

2. **公式格式错误**：
   - 公式 `frac{5}{2} \` 看起来像是不完整的。正则表达式或者输入的数学公式可能存在问题，导致公式解析失败。

### 解决方法

1. **检查正则表达式是否正确捕获公式**：
   - 确认正则表达式能正确匹配到完整的数学公式。

2. **修正输入公式**:
   - 修正数学公式中的错误，使其符合 `KaTeX` 的解析规则。

### 具体修正步骤

#### 1. 检查正则表达式

确保正则表达式 `inlineMathRegex` 能正确捕获到正确的数学公式。

```javascript
const inlineMathRegex = /\\\(([^)]+)\\\)/g;
```

此正则表达式匹配 `\(` 和 `\)` 包裹的内容作为一个整体数学公式。

#### 2. 修改 `renderer.paragraph` 函数

调整 `renderer.paragraph` 函数中的公式捕获和解析逻辑，确保公式未被意外截断。

```javascript
renderer.paragraph = (text) => {
  return text
    .replace(displayMathRegex, (match, math) => {
      try {
        console.log("block");
        return `<p>${katex.renderToString(math.trim(), {
          throwOnError: false,
          displayMode: true,
          output: "svg",
        })}</p>`;
      } catch (e) {
        console.error("KaTeX rendering error:", e);
        return `<p>${Math.escape()}</p>`;
      }
    })
    .replace(inlineMathRegex, (match, math) => {
      try {
        console.log("inline");
        return katex.renderToString(math.trim(), {
          throwOnError: false,
          output: "svg",
        });
      } catch (e) {
        console.error("KaTeX rendering error:", e);
        return match;
      }
    });
};
```

注意在 `katex.renderToString` 调用之前，对捕获到的数学公式进行 `trim()` 操作，以剔除多余的空格或换行符，这可能会导致解析错误。

#### 3. 确保 `marked` 不转义 SVG 标签：

确保 `marked` 设置选项时，`sanitize` 被设置为 `false`，以免 `marked` 解析过程中转义 SVG 标签。

```javascript
marked.setOptions({
  renderer: renderer,
  sanitize: false, // 关闭 sanitize，以免 SVG 被转义
  pedantic: false,
  silent: false,
  breaks: true,
  highlight(code) {
    return hljs.highlightAuto(code).value;
  },
});
```



通过上述步骤，完整而详细地检查和校正了 `katex` 公式解析及渲染过程中可能出现的问题。希望这些调整能够解决公式无法正确显示的问题。

# katex3种输出模式区别

下面是 `KaTeX` 的三种输出模式（HTML、MathML 和 SVG）的区别，以及每种模式的优缺点。

### 1. HTML (默认) 输出模式
`HTML` 是 `KaTeX` 的默认输出格式。

#### 优点:
- **快速渲染**: HTML渲染速度通常较快，特别是对于不太复杂的数学公式。
- **CSS 可定制**: 可以使用 CSS 来定制显示风格。
- **浏览器兼容性高**: 大多数现代浏览器都支持。

#### 缺点:
- **复杂数学公式的限制**: 对于非常复杂的数学公式，HTML可能会稍显不足。
- **依赖于 Web 字体**: 如果用到特定的数学字体，依赖于用户的网络连接来加载这些Web字体。

### 2. MathML 输出模式
`MathML` 是一种基于XML的标记语言，用于表示数学符号和结构。

#### 优点:
- **语义化标记**: MathML 提供了语义化的数学表达，对机器学习和解析器更友好。
- **可访问性**: MathML 可以更好地集成到辅助技术中，如屏幕阅读器，这对于有视觉障碍的用户很重要。

#### 缺点:
- **浏览器支持较差**: 并不是所有浏览器都完全支持 MathML，尤其是某些版本的 Chrome 和其他非 Firefox 浏览器。
- **渲染速度慢**: 与 HTML 和 SVG 相比，复杂公式的渲染可能会更慢。
- **样式控制难**: MathML 的样式定制相对困难，不如 HTML 和 SVG 灵活。

### 3. SVG 输出模式
`SVG` 是基于 XML 的矢量图形格式。

#### 优点:
- **高质量渲染**: SVG 提供了高质量的数学公式渲染，非常适合复杂公式，无论缩放多大都不会失真。
- **独立于分辨率**: 适合于所有显示设备，尤其是需要高分辨率显示的情形。
- **CSS 可定制**: 可以使用 CSS 定制 SVG 样式。

#### 缺点:
- **渲染效率**: SVG 生成较多的 DOM 元素，对于特别复杂和大型的公式可能渲染速度较慢。
- **文件大小**: 生成的 SVG 代码可能较多，从而增大页面大小。

### 选用不同模式的决策指南
1. **一般应用场景**：大多数场景下可以选择默认的 HTML 输出，渲染速度和浏览器兼容性都相对不错。
2. **语义化需求**：需要更好的辅助技术集成，可以选择 MathML 输出，尽管需要注意其浏览器兼容性问题。
3. **高质量显示需求**：如果希望在高分辨率设备上显示高质量的数学公式，那么 SVG 是一个很好的选择。

### 通过不同的选项生成不同的输出模式
```javascript
// HTML (默认)
katex.renderToString(mathExpression, { output: "html" });

// MathML
katex.renderToString(mathExpression, { output: "mathml" });

// SVG
katex.renderToString(mathExpression, { output: "svg" });
```

选择具体的输出方式取决于你对性能、兼容性以及输出质量的要求。在你的情况中，若要生成高质量的数学公式，可以考虑使用 SVG；如果更多的是关注页面加载速度与浏览器兼容性，则可以按照默认的 HTML 输出模式。

# marked配置项

好的，我来详细解释一下 `display` 配置项的含义，以及 `marked` 的配置项。

### `katex` 的 `displayMode` 配置项

在 `katex` 中，`displayMode` 是一个重要的配置项，它决定了数学公式是以“行内模式”（inline mode）还是以“显示模式”（display mode）进行渲染：

1. **行内模式（Inline Mode）**：
   - `displayMode: false`（默认值）
   - 数学公式将与文本在同一行中显示。
   - 适合短小的数学表达式，例如：`\(E=mc^2\)`。
   - 示例代码：
     ```javascript
     katex.renderToString("E=mc^2", { displayMode: false });
     ```

2. **显示模式（Display Mode）**：
   - `displayMode: true`
   - 数学公式将独立成行，并通常居中显示。
   - 适合较长或复杂的公式，例如：`\[\sum_{i=1}^n i = \frac{n(n+1)}{2}\]`。
   - 示例代码：
     ```javascript
     katex.renderToString("\sum_{i=1}^n i = \frac{n(n+1)}{2}", { displayMode: true });
     ```

### `marked` 的配置项

`marked` 是一个非常流行的 Markdown 解析库，能够解析 Markdown 语法并输出 HTML。它提供了许多配置项来定制其行为。以下是一些重要的配置项及其说明：

1. **renderer（类型：Object）**：
   - 自定义渲染器，用于覆盖内置的 Markdown 渲染逻辑。可以通过扩展 `marked.Renderer` 类来实现。
   - 示例：
     ```javascript
     const renderer = new marked.Renderer();
     renderer.paragraph = (text) => `<p>${text}</p>`;
     marked.setOptions({ renderer });
     ```

2. **gfm（类型：boolean，默认：true）**：
   - 启用/禁用 GFM（GitHub Flavored Markdown）扩展。
   - 示例：
     ```javascript
     marked.setOptions({ gfm: false });
     ```

3. **headerIds（类型：boolean，默认：true）**：
   - 启用/禁用对标题元素生成的 ID。
   - 示例：
     ```javascript
     marked.setOptions({ headerIds: false });
     ```

4. **headerPrefix（类型：string，默认：''）**：
   - 为生成的标题 IDs 添加前缀。
   - 示例：
     ```javascript
     marked.setOptions({ headerPrefix: 'prefix-' });
     ```

5. **mangle（类型：boolean，默认：true）**：
   - 启用/禁用对标头 IDs 的混淆处理。
   - 示例：
     ```javascript
     marked.setOptions({ mangle: false });
     ```

6. **sanitize（类型：boolean，默认：false）**：
   - 启用/禁用输出 HTML 的清理，以防止潜在的 XSS 攻击。开启这个选项具有安全性，但可能会移除合法的 HTML 标签。
   - 示例：
     ```javascript
     marked.setOptions({ sanitize: true });
     ```

7. **breaks（类型：boolean，默认：false）**：
   - 启用/禁用 GFM 换行符扩展。
   - 示例：
     ```javascript
     marked.setOptions({ breaks: true });
     ```

8. **highlight（类型：function，默认：null）**：
   - 提供一个自定义的代码高亮函数，用于高亮代码块。通常与 `highlight.js` 一起使用。
   - 示例：
     ```javascript
     marked.setOptions({
       highlight: (code, lang) => {
         const language = hljs.getLanguage(lang) ? lang : 'plaintext';
         return hljs.highlight(code, { language }).value;
       }
     });
     ```

9. **langPrefix（类型：string，默认：hljs-）**：
   - 为代码块的类名添加前缀。
   - 示例：
     ```javascript
     marked.setOptions({ langPrefix: 'language-' });
     ```

# 关于正则匹配问题导致的换行

const displayMathRegex = /\[([\s\S]+?)]/g;
    const inlineMathRegex = /\\((.*?)\\)/g;这是我的正则,renderer.paragraph = (text) => {
      text = text
        .replace(displayMathRegex, (match, math) => {
          try {
            return katex.renderToString(math.trim(), {
              throwOnError: false,
              displayMode: true,
              output: "svg",
            });
          } catch (e) {
            console.error("KaTeX rendering error:", e);
            return match;
          }
        })
        .replace(inlineMathRegex, (match, math) => {
          try {
            return katex.renderToString(math.trim(), {
              throwOnError: false,
              output: "svg",
            });
          } catch (e) {
            console.error("KaTeX rendering error:", e);
            return match;
          }
        });

return `<p>${text}</p>`;
};这段代码在渲染这段内容的时候:\[ S_n = \frac{n}{2} \cdot [2a_1 + (n - 1) \cdot d] \],最后1个d后面的右括号换行了,也就是说后面的内容跟前面的不是一个整体,为什么会出现这样的情况

## 答

katex在渲染出错误报红代码块也是匹配的问题,正则分割导致错误的公式块开头或结尾,导致转义字符出现问题

问题出现在你的 `displayMathRegex` 正则表达式上，特别是 `+?` 部分。`+?` 是一个“懒惰”匹配符，意味着它会尽可能少地匹配字符。

包括有些后端返回的字符,公式内的\n,也要做替换处理,否则会导致换行无法正确渲染

在你的例子中，`\[([\s\S]+?)]` 会匹配到 `\[ S_n = \frac{n}{2} \cdot [2a_1 + (n - 1) \cdot d` 就停止了，因为它遇到了一个 `]`，满足了正则表达式的条件。由于 `+?` 的懒惰性质，它不会尝试匹配更多的字符，即使后面还有匹配的 `]`。

**解决方法：**

将 `+?` 改为 `+`，这样就会使用“贪婪”匹配，尽可能多地匹配字符，直到遇到最后一个 `]`：

```javascript
const displayMathRegex = /\[([\s\S]+)]/g;
```

这个修改会让正则表达式匹配到整个公式，包括最后一个 `]`，从而避免了换行的问题。

**修改后的代码：**

```javascript
const displayMathRegex = /\[([\s\S]+)]/g; 
const inlineMathRegex = /\\((.*?)\\)/g; 

renderer.paragraph = (text) => {
  text = text
    .replace(displayMathRegex, (match, math) => {
      try {
        return katex.renderToString(math.trim(), {
          throwOnError: false,
          displayMode: true,
          output: "svg",
        });
      } catch (e) {
        console.error("KaTeX rendering error:", e);
        return match;
      }
    })
    .replace(inlineMathRegex, (match, math) => {
      try {
        return katex.renderToString(math.trim(), {
          throwOnError: false,
          output: "svg",
        });
      } catch (e) {
        console.error("KaTeX rendering error:", e);
        return match;
      }
    });

  return `<p>${text}</p>`;
};
```

# 你可以讲讲为什么这种场景使用katex的类名来渲染公式不起作用吗

不同模型的回答

## 1

使用 KaTeX 的类名来渲染公式在流式输出环境中不起作用的原因主要在于：

1. **类名的作用**：
   - 类名通常用于应用 CSS 样式，而不是执行逻辑操作。KaTeX 不能仅通过类名识别和渲染数学公式。KaTeX 需要明确的渲染调用，而不仅仅是检测 DOM 变化中的某个类名。

2. **渲染的触发**：
   - KaTeX 的渲染是通过函数调用来实现的（比如 `katex.render`），而不是自动根据某个类名去遍历和转变内容。

3. **流式数据更新的复杂性**：
   - 流式输出意味着内容不断更新。与静态或一次性渲染不同，系统需要动态地响应和渲染新的数学表达式。
   - 通过类名去识别和渲染可能需要复杂的逻辑来确保新添加的部分被渲染，且不影响已有内容。

4. **动态内容的处理**：
   - 动态内容意味着不只是单纯地设置类名，而是可能要重构或添加到完整的 DOM 中。对于每个新加入的公式部分，都需要调用相应的 KaTeX 渲染方法。

5. **性能问题**：
   - 如果要对每个带有特定类名的元素进行渲染，可能会重复渲染同样的内容或者造成性能瓶颈，因为渲染过程即使是稍微复杂的公式也可能消耗一定的计算资源。

### 如何正确使用 KaTeX 在流式输出中渲染公式

为了在流式输出中正确地使用 KaTeX 渲染数学公式，应该采用以下方法：

1. **标记检测**：
   - 通过在文本流中使用特定的标记（如 `$...$`）来标识哪些部分是数学公式。

2. **动态渲染调用**：
   - 在文本流更新后，通过 JavaScript 模块化地调用 `katex.render` 对新添加的部分进行渲染。通常，可以在每次新的数据加入后处理这些部分。

3. **避免重复渲染**：
   - 使用逻辑确保只对新添加或变化的部分进行渲染，而不是每次重新处理整个文档中的内容，从而优化性能。

这样，通过适当地调用渲染函数，可以确保有效地对动态添加的公式进行处理，而不仅仅是依赖类名来试图自动化检测和渲染公式。

## 2

使用KaTeX的类名来渲染公式可能不起作用的原因有多种，以下是一些常见的原因及解决办法：

### 1. 脚本加载顺序/异步问题
确保KaTeX的脚本文件在渲染公式时已经完全加载。如果脚本还未加载完成，就执行渲染操作，可能会导致渲染失败。

**解决方法**：确保在页面完全加载后再执行渲染操作，可以使用 `DOMContentLoaded` 事件或脚本的 `onload` 回调。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>KaTeX Example</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css" integrity="sha384-ODkI5aH4/a5FZB6CtQ4AVydJP3oE9fP2vqqbofjU9y0fK6RRG7wYUJ2WMOjqdY/f" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.js" integrity="sha384-wI/qkKC/VQS4hF4bGn0iMq7pXaYeQlsncUeH5Xa2iRBQdOZrsZZNMQe1zkbPDyAx" crossorigin="anonymous"></script>
</head>
<body>
    <div id="output" class="math">\( E=mc^2 \)</div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const elements = document.getElementsByClassName('math');
            for (let i = 0; i < elements.length; i++) {
                katex.render(elements[i].textContent, elements[i], {
                    throwOnError: false
                });
            }
        });
    </script>
</body>
</html>
```

### 2. 转义字符问题
在HTML内容中需要正确转义特殊字符（例如用于LaTeX的 `$`、`^`、`_` 等），否则可能会导致解析错误。

**解决方法**：确保公式内容在插入DOM之前已经正确转义。

### 3. 内容更新未触发
如果页面内容是动态加载或更新的（例如通过JavaScript追加内容），在更新内容后需要重新触发渲染。

**解决方法**：在动态更新DOM内容后再次调用 `katex.render` 或 `katex.renderToString`。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>KaTeX Example</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css" integrity="sha384-ODkI5aH4/a5FZB6CtQ4AVydJP3oE9fP2vqqbofjU9y0fK6RRG7wYUJ2WMOjqdY/f" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.js" integrity="sha384-wI/qkKC/VQS4hF4bGn0iMq7pXaYeQlsncUeH5Xa2iRBQdOZrsZZNMQe1zkbPDyAx" crossorigin="anonymous"></script>
</head>
<body>
    <div id="output"></div>

    <script>
        const outputElement = document.getElementById('output');
        const inputStream = ["This is the first part of ", "E=mc^2", " and this is after the formula."];
        
        inputStream.forEach((part, index) => {
            setTimeout(() => {
                if (index === 1) {
                    // Create a new span for the formula
                    const formulaElement = document.createElement('span');
                    formulaElement.className = 'math';
                    formulaElement.textContent = part;

                    // Append the new span to the output
                    outputElement.appendChild(formulaElement);

                    // Render the formula
                    katex.render(formulaElement.textContent, formulaElement, {
                        throwOnError: false
                    });
                } else {
                    outputElement.innerHTML += part;
                }
            }, index * 1000); // Simulating streaming delay
        });
    </script>
</body>
</html>
```

### 4. 环境问题或库版本问题
确保使用的KaTeX版本以及其依赖库在你的开发环境中完全正常工作。版本兼容性和库一致性也是关键。

### 5. 缓冲区保证
如果流式数据中包含信息片段，你需要确保接收到完整的公式字符串后再调用KaTeX进行渲染。提前调用会导致不完整或错误的公式渲染。

**解决方法**：使用数据缓冲机制，待完整公式片段接收到后再触发渲染操作。

### 总结
- **脚本加载顺序**：确保KaTeX库在渲染前已完全加载。
- **转义字符处理**：正确处理并转义公式中的特殊字符。
- **更新内容后再渲染**：动态更新内容后要重新触发公式渲染。
- **版本兼容性**：确保库的版本兼容性和环境配置正确。
- **数据完整性保障**：确保公式内容在完整性保障下再进行渲染。

通过这些措施，可以有效避免在使用KaTeX进行公式渲染时遇到的一些常见问题。

## 3

当在流式输出的场景中使用 KaTeX 的类名来渲染公式不起作用，主要有以下几个原因：

1. 动态内容问题：
   KaTeX 通常在页面加载时初始化并渲染带有特定类名的元素。然而，在流式输出中，内容是动态添加的，发生在页面初始加载之后。KaTeX 不会自动检测新添加的元素并渲染它们。

2. 时机问题：
   KaTeX 的自动渲染通常在 DOMContentLoaded 事件触发时执行。而流式输出的内容是在这个事件之后逐步添加的，因此错过了初始渲染时机。

3. 缺少触发机制：
   仅仅添加带有 KaTeX 类名的元素不足以触发渲染。KaTeX 需要明确的指令来处理新添加的内容。

4. 性能考虑：
   即使 KaTeX 能够自动检测新元素，在每次接收到新的文本块时触发完整的渲染过程可能会导致性能问题，特别是在快速流式输出的情况下。

为了在流式输出中正确使用 KaTeX，你可以采取以下方法：

1. 手动触发渲染：
   在每次添加新内容后，手动调用 KaTeX 的渲染函数。

   ```javascript
   function onNewTextChunk(text) {
     const outputElement = document.getElementById('output');
     outputElement.innerHTML += text;
     renderMathInElement(outputElement);
   }
   ```

2. 使用 KaTeX 的 API 直接渲染：
   直接使用 KaTeX 的 API 渲染每个公式，而不是依赖自动渲染。

   ```javascript
   function onNewTextChunk(text) {
     const renderedText = text.replace(/\$(.+?)\$/g, (match, formula) => {
       return katex.renderToString(formula, {throwOnError: false});
     });
     document.getElementById('output').innerHTML += renderedText;
   }
   ```

3. 延迟渲染：
   收集所有文本，然后在流式输出完成后一次性渲染。

   ```javascript
   let fullText = '';
   
   function onNewTextChunk(text) {
     fullText += text;
     document.getElementById('output').textContent = fullText;
   }
   
   function onStreamComplete() {
     renderMathInElement(document.getElementById('output'));
   }
   ```

4. 使用 Web Components：
   创建一个自定义元素，当添加到 DOM 中时自动渲染其内容。

   ```javascript
   class MathElement extends HTMLElement {
     connectedCallback() {
       katex.render(this.textContent, this, {throwOnError: false});
     }
   }
   customElements.define('math-formula', MathElement);
   
   function onNewTextChunk(text) {
     const processedText = text.replace(/\$(.+?)\$/g, (match, formula) => {
       return `<math-formula>${formula}</math-formula>`;
     });
     document.getElementById('output').innerHTML += processedText;
   }
   ```

通过这些方法，你可以在流式输出的场景中有效地使用 KaTeX 渲染数学公式，克服仅使用类名无法正常工作的问题。选择哪种方法取决于你的具体需求和性能考虑。
