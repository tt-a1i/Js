<script>
import {
  computed,
  defineComponent,
  watch,
  ref,
  onMounted,
} from "@vue/composition-api";
import hljs from "highlight.js";
//渲染的代码会自动应用这个样式，用来渲染代码块
import "highlight.js/styles/atom-one-dark.css";
import katex from "katex";
import "katex/dist/katex.min.css";
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
      default: 50, // 每个字符的打字速度，毫秒为单位
    },
  },
  setup(props) {
    const displayedContent = ref("");
    let fullText = ref("");
    let typingIndex = 0;
    let timer = null;

    const renderer = new marked.Renderer();

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
      fullText.value = marked(
        props.content.replace("/\<br />|\r<br />/g", "<br />")
      );
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
});
</script>

<template>
  <div class="text-black" :class="wrapClass">
    <div class="leading-relaxed break-all">
      <div
        class="markdown-body dark"
        v-html="displayedContent"
        v-blank
        id="md"
      />
    </div>
  </div>
</template>

<style scoped>
@import url(./github.less);
</style>
<style lang="less" scoped>
.markdown-body {
  background-color: transparent;
  font-size: 14px;

  p {
    white-space: pre-wrap;
  }

  ol {
    list-style-type: decimal;
  }

  ul {
    list-style-type: disc;
  }

  pre code,
  pre tt {
    line-height: 1.65;
  }

  .highlight pre,
  pre {
    background-color: #fff;
  }

  code.hljs {
    padding: 0;
  }

  .code-block {
    &-wrapper {
      position: relative;
      padding-top: 24px;
    }

    &-header {
      position: absolute;
      top: 5px;
      right: 0;
      width: 100%;
      padding: 0 1rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: #b3b3b3;

      &__copy {
        cursor: pointer;
        margin-left: 0.5rem;
        user-select: none;

        &:hover {
          color: #65a665;
        }
      }
    }
  }

  &.markdown-body-generate > dd:last-child:after,
  &.markdown-body-generate > dl:last-child:after,
  &.markdown-body-generate > dt:last-child:after,
  &.markdown-body-generate > h1:last-child:after,
  &.markdown-body-generate > h2:last-child:after,
  &.markdown-body-generate > h3:last-child:after,
  &.markdown-body-generate > h4:last-child:after,
  &.markdown-body-generate > h5:last-child:after,
  &.markdown-body-generate > h6:last-child:after,
  &.markdown-body-generate > li:last-child:after,
  &.markdown-body-generate > ol:last-child li:last-child:after,
  &.markdown-body-generate > p:last-child:after,
  &.markdown-body-generate > pre:last-child code:after,
  &.markdown-body-generate > td:last-child:after,
  &.markdown-body-generate > ul:last-child li:last-child:after {
    animation: blink 1s steps(5, start) infinite;
    color: #000;
    content: "_";
    font-weight: 700;
    margin-left: 3px;
    vertical-align: baseline;
  }

  @keyframes blink {
    to {
      visibility: hidden;
    }
  }
}

html {
  .markdown-body.dark {
    &.markdown-body-generate > dd:last-child:after,
    &.markdown-body-generate > dl:last-child:after,
    &.markdown-body-generate > dt:last-child:after,
    &.markdown-body-generate > h1:last-child:after,
    &.markdown-body-generate > h2:last-child:after,
    &.markdown-body-generate > h3:last-child:after,
    &.markdown-body-generate > h4:last-child:after,
    &.markdown-body-generate > h5:last-child:after,
    &.markdown-body-generate > h6:last-child:after,
    &.markdown-body-generate > li:last-child:after,
    &.markdown-body-generate > ol:last-child li:last-child:after,
    &.markdown-body-generate > p:last-child:after,
    &.markdown-body-generate > pre:last-child code:after,
    &.markdown-body-generate > td:last-child:after,
    &.markdown-body-generate > ul:last-child li:last-child:after {
      color: #65a665;
    }
  }

  .message-reply {
    .whitespace-pre-wrap {
      white-space: pre-wrap;
      color: var(--n-text-color);
    }
  }

  .highlight pre,
  pre {
    background-color: #282c34;
  }
}

@media screen and (max-width: 533px) {
  .markdown-body .code-block-wrapper {
    padding: unset;

    code {
      padding: 24px 16px 16px 16px;
    }
  }
}
</style>
<style>
ol,
ul {
  list-style: auto;
  margin: 0;
  padding: 0;
}
</style>
