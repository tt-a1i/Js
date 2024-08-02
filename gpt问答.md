输出内容渲染

- 代码渲染:highlight.js库
- markdown渲染:Marked库,将markdown转换为html
  - 支持标准的 Markdown 语法
  - 允许自定义渲染器和解析规则
  - 正则替换换行符为</br>
  - 输出内容定义样式,打字机动画
  - 提供选项来防止 XSS（跨站脚本）攻击，可以净化输出的 HTML
    - 转义字符

难点:

使用js的ref来进行实现打字机效果,但是最终渲染的格式为html,无法使用html进行渲染,所以要用css来做