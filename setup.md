```javascript
setup(props) {
    const displayedContent = ref("");
    let fullText = ref("");
    let typingIndex = 0;
    let timer = null;

    const renderer = new marked.Renderer();

    /*const inlineMathRegex = /\[([^\]]+)]/g;
    renderer.text = (text) => {
      return text.replace(inlineMathRegex, (match, p1) => {
        try {
          return katex.renderToString(p1, { throwOnError: false });
        } catch (e) {
          console.error("KaTeX rendering error:", e);
          return match;
        }
      });
    };*/

    const displayMathRegex = /\[([\s\S]+?)]/g;
    const inlineMathRegex = /\$([^$]+)\$/g;
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
    marked.setOptions({
      renderer: renderer,
      sanitize: true,
      pedantic: false,
      silent: true,
      breaks: true,
      highlight(code) {
        return hljs.highlightAuto(code).value;
      },
    });

    const wrapClass = computed(() => {
      return ["text-wrap", "min-w-[20px]", "rounded-md", "bg-[#f4f6f8]"];
    });
    /*这段代码没有按照预期的定时器延迟进行渲染，主要是因为 typeWriterEffect 函数内部的 setTimeout 被频繁地清除和重置。
    每次 props.content 更新时，都会调用 updateContent 函数，它会清除之前的定时器，并重新启动 typeWriterEffect。
    这意味着，如果 props.content 更新频繁（例如，SSE 流不断推送数据），setTimeout 就几乎没有机会等到设定的延迟时间就被清除了。
    这就导致渲染效果看起来不像是在按照设定的速度打字，而是直接显示了最新的内容。*/
    /*const text = computed(() => {
      return marked(props.content.replace(/\\n|\r\n/g, "<br />"));
    });
    watch(
      () => props.content,
      () => {
        console.log(text.value);
      }
    );*/
    /*const typeWriterEffect = () => {
      console.log("setInterval");
      timer = setInterval(() => {
        if (typingIndex < fullText.value.length) {
          displayedContent.value = fullText.value.slice(0, typingIndex++);
        } else {
          clearInterval(timer);
        }
      }, props.typingSpeed);
    };*/

    /**
     * 使用 定时器 来实现动画效果
     */
    /*const typeWriterEffect = () => {
      console.log(1);
      if (typingIndex < fullText.value.length) {
        displayedContent.value = fullText.value.slice(0, typingIndex++);
        timer = setTimeout(typeWriterEffect, props.typingSpeed);
      } else {
        clearTimeout(timer);
        timer = null;
      }
    };*/
    /**
     * 使用 requestAnimationFrame 来实现动画效果
     */
    const typeWriterEffect = () => {
      // console.log(3);
      if (typingIndex < fullText.value.length) {
        displayedContent.value = fullText.value.slice(0, typingIndex);
        typingIndex += 100;
        timer = requestAnimationFrame(typeWriterEffect);
      } else {
        if (timer !== null) {
          cancelAnimationFrame(timer);
          timer = null;
        }
      }
    };
    const updateContent = () => {
      // 每次增量更新
      fullText.value = marked(props.content.replace("/\<br />|\r<br />/g", "<br />"));
      // console.log("Rendered markdown:", marked(props.content));
      // console.log("props.content", props.content);
      if (!timer) {
        typeWriterEffect();
        console.log("timer", timer);
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
    // onMounted(() => clearInterval(timer));
    return {
      displayedContent,
      wrapClass,
    };
  },
```

## 不卡顿但是重复输出

```javascript
const typeWriterEffect = () => {
      const startTime = performance.now();
      const duration = 1000; // 动画总时长，单位毫秒
      const charsPerSecond = 10; // 每秒渲染字符数

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        typingIndex = Math.floor(progress * fullText.value.length);
        displayedContent.value = fullText.value.slice(0, typingIndex);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          timer = null;
        }
      };
      timer = requestAnimationFrame(animate);
      console.log(timer, "");
    };
```

