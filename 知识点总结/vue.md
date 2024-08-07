## Watch合Computed的区别

#### watch

监听数据或某个状态的变化,之后要执行某段逻辑

场景:搜索栏下方提示的展示

- **功能**：`watch`是用来监听特定数据的变化，当被监听的数据发生变化时，将会触发指定的回调函数。
- 特点

  - **无缓存**：每当监听·**深度监听**：配置`deep`选项来深度监听对象内部属性的变化。
  - **异步处理**：`watch`不仅可以同步执行操作，还`可以处理异步操作`，例如在网络请求、批量更新等场景下非常有用。
  - **手动触发**：不同于计算属性，`watch`不会在初次绑定时自动执行，若需要在绑定时立即执行，可设置`immediate`为`true`。



#### computed

`一个数据受其他数据的影响`,`随他的变化而变化`,就将这个数据作为计算属性处理

场景:购物车总价

- **功能**：`计算属性用于根据其他数据派生出一个新的值`。当你有一些复杂的逻辑基于组件的状态但并不希望这些逻辑遍布模板中时，可以使用计算属性。

- 特点

  ：

  - **`缓存机制`**：计算属性具有缓存特性，当它的`依赖`（即计算属性中引用的其他数据）`没有发生变化`时，它不会重新计算，而是`直接返回缓存的值`，这提高了性能。
  - **`声明方式`**：计算属性通常定义为一个返回值的方法，此方法内包含计算逻辑，并且`必须返回`一个值。
  - **`自动追踪依赖`**：Vue能够`自动追踪`计算属性中依赖的所有`数据变化`

#### **总结差异**：

1. **目的**：计算属性专注于提供基于其他属性的派生值；而`watch`关注的是对特定数据变化做出反应并执行相关操作。
2. **执行时机**：计算属性会在依赖变化时自动、高效地计算新值；`watch`则是在数据变化后明确触发的回调。
3. **缓存策略**：计算属性有缓存机制，仅在必要时重新计算；`watch`每次触发都会执行回调函数。
4. **异步支持**：计算属性不适合异步操作，而`watch`支持异步回调。
5. **使用场景**：`当需要基于多个属性简单计算得出单一值时，选择计算属性`；当`需要在数据变化时执行复杂逻辑或副作用操作时`，选择`watch`。

## 了解webpack和vite吗

#### Webpack

**Webpack** Webpack是一个高度可配置的静态模块打包工具，常用于现代JavaScript应用程序的构建过程。它的核心功能包括：

- **模块化处理**：Webpack可以处理各种模块格式（CommonJS、AMD、ES6 Modules等），并将它们转换为合适的输出格式。
- **资源加载器**：通过Loader机制，Webpack可以处理不同类型资源（如JS、CSS、图片、字体等），将其转换和打包进最终的bundle中。
- **插件系统**：通过Plugin系统，Webpack可以执行更复杂的构建任务，比如代码压缩优化、分割代码块、热更新（Hot Module Replacement, HMR）等。
- **代码分割**：Webpack可以根据模块之间的依赖关系，智能地生成按需加载的代码片段，优化网页加载性能。
- **树形 shaking**：Webpack可以通过摇树优化去除未使用的代码，减少包体积。

#### Vite

**Vite** Vite由Vue.js作者尤雨溪创建，是一个专注于提高开发体验的新型构建工具，其主要特点包括：

- **快速冷启动**：Vite利用`浏览器原生支持的ES模块`（ESM），在开发环境中可以做到几乎无等待的即时预览，仅当文件发生改变时才对相关模块进行按需编译，大幅提高了开发环境下的刷新速度。
- **基于Esbuild**：Vite底层依赖于Esbuild进行快速的预构建和转译工作，Esbuild由于使用`Go语言编写`，具有`极高的构建速度`。
- **渐进式构建**：Vite在生产环境同样会进行完整的构建，但它主张在开发阶段尽量保持接近生产环境的状态，以便开发者能尽早发现问题。
- **零配置**：Vite默认配置就足够满足大部分开发需求，对于Vue.js项目尤其友好，但也支持React和其他框架。

#### 区别与比较

- **构建速度**：`Vite在开发环境下构建速度显著优于Webpack`，因为它`避免了不必要的整体打包`，而是采取`增量编译`的方式。
- **开发体验**：Vite提供的开发服务器无需经过打包即可直接运行源码，且HMR响应更快。
- **配置复杂度**：Webpack因其高度灵活性而拥有较高的学习曲线和配置复杂度，而Vite的默认配置简化了许多常见任务。
- **生态兼容**：Webpack作为老牌构建工具，有庞大的`生态系统支`持，`兼容更多老项目和技术栈`；Vite虽较新，但正在迅速发展，特别适合追求最新技术和高效开发流程的新项目。

## 为什么data属性是一个函数而不是一个对象



- 根实例对象`data`可以是对象也可以是函数（根实例是单例），不会产生数据污染情况

- 组件实例对象`data`必须为函数，目的是为了`防止多个组件实例对象之间共用`一个`data`，产生`数据污染`。采用函数的形式，`initData`时会将其作为`工厂函数都会返回全`新`data`对象

- `vue`组件可能会有很多个实例，采用函数返回一个全新`data`形式，使每个实例对象的数据不会受到其他实例对象数据的污染

- 当`data`是一个对象时，这个对象直接作为根组件的状态，并且在全局范围内只有一份该状态的拷贝。由于不存在复用根实例的情况，所以不同组件之间不会因为引用同一个`data`对象而导致数据污染。

- 而当`data`是一个函数时，Vue.js会调用这个函数来获取初始数据对象，这样每次创建新的组件实例时（对于非根实例而言），都会通过调用函数得到一个新的数据对象副本，确保各个组件实例的数据隔离

- 根实例作为整个应用的顶级组件，其`data`属性既可以是对象也可以是函数，这是因为根实例在整个应用中只有一个实例，即它是单例模式。由于根实例在整个应用程序中是独一无二的，因此不会存在多个根实例之间的数据共享问题。

- 在我们定义好一个组件的时候，`vue`最终都会通过`Vue.extend()`构成组件实例

  这里我们模仿组件构造函数，定义`data`属性，采用对象的形式

## `v-for`与`v-if`一同使用在vue2和vue3中的区别

- 在vue2中，`v-for` 的优先级比`v-if`更高。
- 在vue3中，`v-if`具有比`v-for`更高的优先级。

## 动态给vue的data添加一个新的属性时会发生什么？怎样解决？

- 如果为对象添加少量的新属性，可以直接采用`Vue.set()`
- 如果需要为新对象添加大量的新属性，则通过`Object.assign()`创建新对象
- `vue3`是用过`proxy`实现数据响应式的，直接动态添加新属性仍可以实现数据响应式

## Vue中组件和插件有什么区别

1. 组件 `(Component)` 是用来构成你的 `App` 的业务模块，它的目标是 `App.vue`

2. 插件 `(Plugin)` 是用来增强你的技术栈的功能模块，它的目标是 `Vue` 本身

   简单来说，插件就是指对`Vue`的功能的增强或补充

## Vue的双向数据绑定怎么实现的

Vue.js 实现双向数据绑定的核心机制主要包括两个关键部分：响应式系统（Reactivity System）和指令系统（Directives）。以下是简要概述：

1. **响应式系统**：
   - Vue使用`Object.defineProperty()`方法来监听数据对象的变化。当我们在Vue实例中定义`data`时，Vue会遍历这些数据属性并利用`defineProperty`将它们转化为getter和setter。
   - 通过getter和setter，Vue能够跟踪依赖关系（哪个组件或计算属性正在使用某个数据属性）并建立一个依赖收集系统。
   - 当数据发生变化时，Vue能通过setter触发相应的通知过程，这个过程会找到所有依赖于这个数据属性的视图组件，并迫使它们重新渲染。
2. **指令系统（v-model）**：
   - 双向绑定最常见的应用场景是表单元素与数据模型之间的同步。Vue通过`v-model`指令实现了这一点。
   - 在表单元素上使用`v-model`时，Vue会在背后监听元素值的变化（比如input的input事件），当用户输入导致值发生变动时，Vue会调用相应的setter来更新数据模型。
   - 同样地，如果数据模型的数据发生变化，响应式系统会触发视图更新，包括那些通过`v-model`绑定的表单元素，使其显示最新的数据。

总结起来，Vue通过响应式系统监听数据变化，并在数据变化时自动更新视图；同时，通过指令系统捕获用户的交互行为，并在适当的时候反向同步至数据模型，这就是Vue实现双向数据绑定的基本原理。

## 组件通信

#### props

`父子间相互通信`

- 若`父传子`,属性值是`非函数`
- 若`子传父`,属性值是`函数`



#### 自定义事件

`子->父`

#### mitt

与消息订阅与发布（`pubsub`）功能类似，可以实现任意组件间通信。

接收数据的组件中：绑定事件、同时在销毁前解绑事件

##### 为什么要在销毁前解绑

- **`内存泄漏`**：如果不在组件销毁前解绑事件，那么事件`监听器将继续存在`，即使组件已经被销毁。这可能导致内存泄漏，因为无法回收这些不再需要的事件监听器。
- **`副作用`**：如果事件监听器没有被正确解绑，可能会导致副作用。例如，如果你在组件中订阅了一个`全局事件`，但没有在组件销毁前取消订阅，那么即使组件不再存在，该事件仍然会触发，可能导致不必要的行为。
- **`性能优化`**：解绑事件可以减少不必要的计算和资源消耗。当组件销毁时，解绑事件可以帮助浏览器更有效地`回收资源`。

#### V-model

`父子间相互通信`

给input元素绑定原生input事件，触发input事件时，进而触发update:model-value事件



#### $attrs

`$attrs`用于实现**当前组件的父组件**，向**当前组件的子组件**通信（**祖→孙**）

`$attrs`是一个对象，包含所有父组件传入的标签属性。



#### $refs、$parent

* `$refs`用于 ：**父→子。**

* `$parent`用于：**子→父。**

* | 属性      | 说明                                                     |
  | --------- | -------------------------------------------------------- |
  | `$refs`   | 值为对象，包含所有被`ref`属性标识的`DOM`元素或组件实例。 |
  | `$parent` | 值为对象，当前组件的父组件实例对象。                     |

#### 【provide、inject】

实现**`祖孙组件`**直接通信

* 在祖先组件中通过`provide`配置向后代组件提供数据
* 在后代组件中通过`inject`配置来声明接收数据



#### 【pinia】



#### 【slot】

- 默认插槽
- 具名插槽
- 作用域插槽`数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。`

## Vue双向绑定的原理

#### 什么是双向绑定

##### MVVM

- `数据变化后更新视图`
- `视图变化后更新数据`
- `数据层`（Model）：`应用的数据及业务逻辑`
- `视图层`（View）：`应用的展示效果`，`各类UI组件`
- 业务逻辑层（ViewModel）：`框架封装的核心`，它`负责将数据与视图关联起来`

而上面的这个分层的架构方案，可以用一个专业术语进行称呼：`MVVM`这里的控制层的核心功能便是 “数据双向绑定” 。

#### Vue 双向绑定的原理

1. **`数据劫持`**：Vue 使用数据劫持结合发布者-订阅者模式来实现双向绑定。具体步骤如下：
   - Vue `首先监听数据对象中的属性`。
   - 当`属性发生变化时，Vue 通知订阅者（视图）更新`。
   - `视图更新后，数据也会相应地更新`。
2. **`Object.defineProperty`**：Vue 使用 `Object.defineProperty` 来定义数据属性的 getter 和 setter。这允许 Vue 在属性被访问或修改时执行相应的操作。

## NextTick

Vue的nextTick是一个非常有用的功能,它允许我们`在DOM更新循环结束之后执行延迟回调`。简单来说,当你修改数据后,想要立即使用js操作新的DOM元素,就需要使用nextTick。

`Vue在更新DOM时是异步执行的`。当你`修改响应式状态时`,Vue将`开启一个队列`,并`缓冲在同一事件循环中发生的所有数据改变`。如果同`一个watcher被多次触发`,`只会被推入到队列中一次`。这种`缓冲和去重的机制可以有效的提升性能`。==nextTick会在队列中的所有数据变更完成之后立即调用==。

下面是一些具体的示例:

1. 基本用法:

```javascript
export default {
  methods: {
    updateMessage() {
      this.message = 'Updated'
      console.log(this.$el.textContent) // 仍然是 'Not updated'
      this.$nextTick(() => {
        console.log(this.$el.textContent) // 'Updated'
      })
    }
  }
}
```

#### 为什么要有nexttick

举个例子

```js
{{num}}
for(let i=0; i<100000; i++){
    num = i
}
```

如果没有 `nextTick` 更新机制，那么 `num` 每次更新值都会触发视图更新

有了`nextTick`机制，只需要更新一次，所以`nextTick`本质是一种优化策略



如果想要在修改数据后立刻得到更新后的`DOM`结构，可以使用`Vue.nextTick()`

原理:

- 能力检测：优先使用微任务（Promise），如果不支持则使用宏任务（ setTimeout）。
- 回调队列：存储需要执行的回调函数。
- 异步执行：通过微任务或宏任务异步延迟调用回调函数。

## minxmin

**混入 (mixin)** 是一种非常灵活的方式，用于`分发可复用的功能`到多个组件中。通过混入，你可以将一些公共逻辑或配置提取出来，然后在需要的组件中混入这部分功能。

- **混入是什么**：
  - 混入是一个`对象`，包含了一些组件选项。
  - 当组件使用混入对象时，混入对象的选项会被“混合”到组件自身的选项中。
- **为什么使用混入**：
  - `减少代码冗余`：将公共逻辑或配置提取出来，避免在多个组件中重复编写相同的代码。
  - `更易维护`：将`公共功能集中管理`，后期维护更方便。

## slot

**插槽 (slot)** 是 Vue 组件模板中的一个`占位符`，允许`外部内容插入到组件的指定位置`。

- **默认插槽**：
  - 可以为插槽提供默认内容，如果没有提供插槽内容，将显示默认内容。
- **具名插槽**：
  - 通过 `name` 属性来定义，使得可以有多个插槽，每个插槽可以放置不同的内容。
- **作用域插槽**：
  - 允许子组件将数据作为插槽的属性传递回父组件，使得父组件可以访问子组件的数据来决定如何渲染插槽内容。

#### 使用场景

1. **布局组件**：
   - 在创建可复用的布局组件时，插槽允许你定义布局结构，同时`让使用者决定具体内容的填充`。
2. **列表组件**：
   - 当你创建一个列表组件时，使用插槽可以`让父组件控制每个列表项的渲染`，甚至可以插入额外的内容或操作按钮。

## Vue.observable()

`Vue.observable()` 是一个函数，它可以将一个普通的 JavaScript 对象或数组转换为可观察对象，使其具有响应式的特性。

`Vue.observable()` 可以用于创建一个简单的状态管理器，用于跨组件共享和更新数据状态。

在`非父子组件通信时`，可以使用通常的`bus`或者使用`vuex`，但是`实现的功能不是太复杂`，而使用上面两个又有点繁琐。这时，`observable`就是一个很好的选择

## Vue中的key

在 Vue 中，`key` 属性是一个非常重要的概念，用于`优化虚拟 DOM 的渲染`

#### 什么是 `key` 属性？

- `key` 是 Vue 中用于识别虚拟 DOM 元素的一个特殊属性。
- 当 Vue 更新已渲染过的元素列表时，`key` 用于`区分不同的虚拟节点`。

#### 为什么使用 `key`？

1. **优化性能**：
   - `key` 可以帮助 Vue 更`高效地更新虚拟 DOM`。
   - 如果没有 `key`，Vue 会`尽量就地复用`相同类型的元素，但可能导致混乱。
2. **避免错误的复用**：
   - 使用 `key` 可以`确保在列表渲染时正确识别元素`。
   - 如果`不使用key`，`可能会出现错误的复用`，`导致页面渲染不正确`。

## KeepAlive

`<KeepAlive>` 是 Vue 中的一个内置组件，用于在多个组件之间动态切换时缓存被移除的组件实例。它的作用是保持组件的状态，避免被销毁。

- 使用 `include` 和 `exclude` 属性来定制缓存行为。
- `include` 只缓存指定的组件，而 `exclude` 排除指定的组件。
- `<KeepAlive>` 还支持 `max` 属性，用于限制最大缓存实例数。

## Vue常用的修饰符有哪些有什么应用场景

1. **事件修饰符**：
   - **`.stop`**：阻止事件冒泡，相当于 `event.stopPropagation()`。适用于防止事件继续向上传播。
   - **`.prevent`**：阻止事件的默认行为，相当于 `event.preventDefault()`。常用于阻止表单提交或链接跳转。
   - **`.self`**：只在事件目标是当前元素自身时触发处理函数。适用于限定事件处理范围。
   - **`.once`**：只触发一次，适用于只需要执行一次的操作。
2. **鼠标按钮修饰符**：
   - **`.left`**：左键点击。
   - **`.right`**：右键点击。
   - **`.middle`**：中键点击。
3. **键盘修饰符**：
   - 用于修饰键盘事件（如 `keyup`、`keydown`）。
   - 可以使用别名，如 `enter`、`tab`、`delete` 等。
   - 也可以使用键码，例如 `13` 表示回车键。
4. **表单修饰符**：
   - **`.lazy`**：在光标离开输入框时才同步数据，适用于减少频繁的数据更新。
   - **`.trim`**：自动过滤用户输入的首尾空格，但保留中间空格。
   - **`.number`**：自动将用户输入的值转为数值类型。
5. **`v-bind` 修饰符**：
   - **`.sync`**：用于实现父子组件之间的双向绑定。适用于将子组件的修改反馈到父组件。

## 自定义指令

自定义指令是 Vue 中重用底层 DOM 访问逻辑的一种方式，用于处理特定的行为

1. **注册全局自定义指令**：
   - 使用 `Vue.directive(id, definition)` 方法来注册一个全局自定义指令。
   - `id` 是指令的名称，而 `definition` 是一个包含指令钩子函数的对象。

- 自定义指令适用于需要直接操作 DOM 的场景，例如聚焦输入框、固定布局等。
- 比如v-model,自定义指令延迟界面数据的更新

## 过滤器

用于对即将显示的数据进行进一步的筛选处理

- 过滤器可以用在两个地方：
  - 双花括号插值（`{{ expression | filter }}`）
  - `v-bind` 表达式（`<div v-bind:id="rawId | formatId"></div>`）

### 过滤器的应用场景

1. **格式化日期和时间**：
   - 将日期或时间字符串转换为特定格式，例如 `2023-07-30` 转为 `July 30, 2023`。
2. **数字格式化**：
   - 添加千位分隔符，例如将 `30000` 转为 `30,000`。
3. **文本处理**：
   - 将文本转为大写、小写或首字母大写。
4. **单位转换**：
   - 将单位从英寸转为厘米、从美元转为欧元等。
5. **自定义文本处理**：
   - 根据业务需求，自定义一些文本处理逻辑，例如添加前缀、后缀等。

## 虚拟DOM

#### 什么是虚拟 DOM？

虚拟 DOM 是一个抽象层，`用 JavaScript 对象模拟真实 DOM 树`。它的`目的是优化 DOM 操作`，`提高性能`。

主要特点：

- `虚拟 DOM 是一个 JavaScript 对象树`，`与真实 DOM 一一对应`。
- 通过一系列操作，将虚拟 DOM 映射到真实环境中的 DOM 树。

#### 为什么需要虚拟 DOM？

1. **性能优化**：
   - 真实 DOM 操作昂贵，频繁操作会导致页面卡顿。
   - `虚拟 DOM 可以减少 DOM 操作`，`提高性能。`
2. **跨平台能力**：
   - 虚拟 DOM 可以映射到不同平台，如浏览器、移动端、小程序等。

#### 如何实现一个简单的虚拟 DOM？

1. **创建虚拟 DOM**：
   - 使用 JavaScript 对象描述 DOM 树结构。
   - 至少包含标签名（tag）、属性（props）和子元素对象（children）。
2. **渲染虚拟 DOM**：
   - 将虚拟 DOM 映射到真实 DOM。
   - 通过 diff 算法找出最小差异，然后批量更新真实 DOM。

## 你了解vue的diff算法吗

基本原理

Diff算法的核心思想是通过同层级比较，而不是跨层级比较。这大大减少了需要比较的节点数量，提高了效率。

比较过程

a. 比较根节点：

- 如果根节点类型不同，直接替换整个树。
- 如果根节点类型相同，则继续比较子节点。

b. 比较子节点：

- 遍历新旧两个子节点列表。
- 比较key和节点类型。
- 当节点类型相同时：
  - 更新节点的属性。
  - 然后递归比较子节点。
- 当节点类型不同时：
  - 直接替换旧节点。

c. 静态节点优化：对于不会变化的节点（如纯文本节点），可以跳过比较。

key的作用

在列表渲染中，key帮助Diff算法识别哪些元素改变了、添加了或删除了。有了key，Vue可以最小化元素的移动，并且能够重用和重新排序现有元素。

## Vue项目中有封装过axios吗？主要是封装哪方面的？

#### axios是什么

`axios` 是一个轻量的 `HTTP`客户端

基于 `XMLHttpRequest` 服务来执行 `HTTP` 请求，支持丰富的配置，支持 `Promise`，支持浏览器端和 `Node.js` 端

####  特性

- 从浏览器中创建 `XMLHttpRequests`
- 从 `node.js` 创建 `http`请求
- 支持 `Promise` API
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换`JSON` 数据
- 客户端支持防御`XSRF`

#### 为什么要封装

随着项目规模增大，如果每发起一次`HTTP`请求，就要把这些比如设置超时时间、设置请求头、根据项目环境判断使用哪个请求地址、错误处理等等操作，都需要写一遍

这种重复劳动不仅浪费时间，而且让代码变得冗余不堪，难以维护。

`vue.config.js`文件中配置`devServer`实现代理转发，从而实现跨域

#### 请求拦截器

`请求拦截器可以在每个请求里加上token`，做了统一处理后维护起来也方便

#### 响应拦截器

响应拦截器可以在接收到响应后先做一层操作，`如根据状态码判断登录状态、授权`

## 前端如何判断用户的登录状态

#### **使用` Token（JWT）`**：

- 用户首次登录时，服务器验证通过后，会返回一个经过加密处理的 token 给浏览器。
- 浏览器通过 `localStorage` 存储 token，`后续的请求在请求头中携带 token`。
- 服务器通过验证 token 的正确性，判断是否授权。

#### **设置 Cookie**：

- 登录成功后，设置一个名为 `isLogin` 的 cookie，值为 `true`。
- 退出登录时，删除或设置 `isLogin` 为 `false`

#### **判断 Session ID 是否存在**：

- 登录成功后，后端会返回一个 session ID。
- 前端每次请求时，将 session ID 放在请求头或 cookies 中。
- 后端根据 session ID 判断用户是否登录

#### JWT

**JSON Web Token (JWT)** 是一种开放标准，用于定义通信双方之间安全地传输信息的格式

JWT是一种用于安全地传输信息的标准,适用于身份认证和信息交换

1. #### **用途**：

   - **身份认证**：JWT 是常见的身份认证方式，用于在用户登录后生成 token，后续请求都携带该 token。
   - **信息交换**：JWT 可以安全地传输信息，因为它是数字签名的。

2. #### **优势**：

   - **无状态**：JWT 不需要服务器存储 Session 信息，提高了可用性和伸缩性。
   - **防止 CSRF 攻击**：`JWT 不依赖 Cookie，避免了 CSRF 攻击`。

## SSR

- ### SSR（服务端渲染）概述

  **SSR** 的全称是 **Server-Side Rendering**，即服务端渲染。它是指在服务器端生成 HTML 并将其发送到客户端进行显示的技术。在现代前端开发中，SSR 通常与客户端渲染（CSR, Client-Side Rendering）相对，比起传统的 HTML 页面，现代的 SSR 通常与 JavaScript 框架如 Vue.js、React.js 一起使用。

  ### SSR 的工作原理

  1. **请求发送到服务器**：
     用户在浏览器中发起请求，这个请求会被发送到服务器。
  2. **服务器处理请求**：
     服务器接收请求后，通过服务器端的框架（如 Nuxt.js、Next.js 等）生成完整的 HTML 内容。
  3. **返回完整 HTML 页面**：
     服务器将生成的 HTML 页面发送回浏览器。
  4. **浏览器解析和显示**：
     浏览器接收到 HTML 页面后，进行解析并显示给用户，同时加载和执行页面中的 JavaScript 代码来初始化客户端应用。

  ### SSR 的优缺点

  #### 优点

  1. **更快的首屏渲染**：
     因为整个 HTML 页面是由服务器生成的，所以浏览器在接收到页面时，用户可以立即看到内容，而不需要等待 JavaScript 完全加载和执行。
  2. **更好的 SEO**：
     搜索引擎可以更容易地抓取和索引服务端渲染的完整 HTML 页面，这对 SEO 友好。
  3. **更好的分享和预览**：
     完整的 HTML 可以更好地支持社交媒体的预览功能，如在分享链接时显示预览图和描述。

  #### 缺点

  1. **服务器负载增加**：
     因为每个请求都需要服务器动态生成 HTML，服务器的负载会增加，尤其对于高并发的情况，可能需要更强大的服务器资源。
  2. **开发复杂度高**：
     需要处理更多的服务器端逻辑，开发和调试相对于纯粹的客户端渲染会更复杂。
  3. **响应时间延长**：
     页面生成的时间存在于服务器端，如果服务器性能不好或者网络延迟较高，可能会导致响应时间变长。

  ### 常见的 SSR 框架

  #### Vue.js
  - **Nuxt.js**
    Nuxt.js 是基于 Vue.js 的 SSR 框架，提供了简单易用的配置和开发方式。

  #### React.js
  - **Next.js**
    Next.js 是用于 React 的 SSR 框架，支持静态生成和 SSR。

    

  ### 混合渲染模式

  现代的前端开发中，很多应用采用了 **混合渲染** 模式（Hybrid Rendering），结合了 SSR 和 CSR 的优点：

  1. **首屏使用 SSR**：
     提高首屏加载速度和 SEO 效果。
     1. SSR 可以显著减少首次内容绘制的时间，因为浏览器接收到的是已经渲染好的 HTML。

  2. **后续页面使用 CSR**：
     提高页面切换的灵活性和响应速度。

  通过这种方式，可以在保证用户体验的同时，优化服务器资源和复杂度。

  ### 总结

  SSR 是一种强大的技术，特别是在需要高性能和良好 SEO 的网站和应用中。尽管开发复杂度较高，但通过使用合适的框架和工具，可以有效地实现高性能、SEO 友好的 Web 应用。

## vue项目的目录结构，大型项目怎么划分结构和划分组件

1. **src 目录**：
   - `assets`：存放静态资源，如图片、字体等。
   - `components`：存放通用组件，可被多个页面复用。
   - `views`：存放页面级组件，每个页面对应一个文件夹，包含该页面的组件、路由和样式。
   - `router`：存放路由配置。
   - `store`：存放 Vuex 状态管理相关代码。
   - `utils`：存放工具函数、常量等。
   - `styles`：存放全局样式。
   - `main.js`：入口文件。
2. **大型项目的目录划分**：
   - **模块化划分**：将功能模块拆分成独立的文件夹，每个文件夹包含组件、路由、状态管理等。
   - **按业务功能划分**：根据业务功能划分目录，例如用户管理、订单管理、商品管理等。
   - **按页面划分**：每个页面对应一个文件夹，包含该页面的所有组件、路由和状态管理。
3. **组件划分**：
   - **基础组件**：通用的、无业务逻辑的组件，例如按钮、输入框等。
   - **业务组件**：与业务相关的组件，例如商品列表、用户详情等。
   - **布局组件**：用于页面布局的组件，例如头部、侧边栏等。

## vue要做权限管理该怎么做？如果控制到按钮级别的权限怎么做？

- 路由方面，用户登录后只能看到自己有权访问的导航菜单，也只能访问自己有权访问的路由地址，否则将跳转 `4xx` 提示页
- 视图方面，用户只能看到自己有权浏览的内容和有权操作的控件
- 最后再加上请求控制作为最后一道防线，路由可能配置失误，按钮可能忘了加权限，这种时候请求控制可以用来兜底，越权请求将在前端被拦截

#### 如何做

前端权限控制可以分为四个方面：

- 接口权限
- 按钮权限
- 菜单权限
- 路由权限

#### 接口权限

采用`jwt`的形式来验证，没有通过的话一般返回`401`，跳转到登录页面重新进行登录

登录完拿到`token`，将`token`存起来，通过`axios`请求拦截器进行拦截，每次请求的时候头部携带`token`

#### 路由权限控制

##### 1.初始化即挂载全部路由，并且在路由上标记相应的权限信息，每次路由跳转前做校验

缺点：

- 加载所有的路由，如果路由很多，而用户并不是所有的路由都有权限访问，对性能会有影响。
- 全局路由守卫里，每次路由跳转都要做权限判断。
- 菜单信息写死在前端，要改个显示文字或权限信息，需要重新编译
- 菜单跟路由耦合在一起，定义路由的时候还有添加菜单显示标题，图标之类的信息，而且路由不一定作为菜单显示，还要多加字段进行标识



##### 初始化的时候先挂载不需要权限控制的路由，比如登录页，404等错误页。如果用户通过URL进行强制访问，则会直接进入404，相当于从源头上做了控制

登录后，获取用户的权限信息，然后筛选有权限访问的路由，在全局路由守卫里进行调用`addRoutes`添加路由

缺点：

- 全局路由守卫里，每次路由跳转都要做判断
- 菜单信息写死在前端，要改个显示文字或权限信息，需要重新编译
- 菜单跟路由耦合在一起，定义路由的时候还有添加菜单显示标题，图标之类的信息，而且路由不一定作为菜单显示，还要多加字段进行标识

#### [#](https://vue3js.cn/interview/vue/permission.html#菜单权限)菜单权限

菜单权限可以理解成将页面与理由进行解耦

菜单与路由分离，菜单由后端返回

#### 按钮权限

按钮权限也可以用`v-if`判断

通过自定义指令进行按钮权限的判断



权限需要前后端结合，前端尽可能的去控制，更多的需要后台判断

## Vue项目中你是如何解决跨域的呢？

`跨域`本质是浏览器基于**`同源策略`**的一种`安全手段`

`同源`具有以下三个相同点

- 协议相同（protocol）
- 主机相同（host）
- 端口相同（port）

#### CORS

- 后端服务设置响应头中的 `Access-Control-Allow-Origin`，允许指定的域名访问资源。

#### **使用代理服务器**(Proxy)

- 在 `vue.config.js` 中配置代理，将请求转发到目标服务器。
- 通过配置`nginx`实现代理

#### **JSONP**

- 适用于跨域获取数据的 GET 请求。
- 通过动态创建 `<script>` 标签实现跨域请求。

动态创建 `<script>` 标签实现跨域请求的原理是利用浏览器对 `<script>` 标签的加载机制

- `<script>` 标签的 `src` 属性可以指向其他域名的资源。
- 浏览器会下载并执行该资源，不受同源策略的限制。

## Vue3和Vue2区别

- 重写了虚拟`Dom`实现
- 编译模板的优化
- 更高效的组件初始化
- `undate`性能提高1.3~2倍
- `SSR`速度提高了2~3倍
- Tree-Shaking 支持，减小了打包体积。
- composition Api
- 组件现在支持有多个根节点
- `Teleport`，我们可以在组件的逻辑位置写模板代码，然后在 `Vue` 应用范围之外渲染它

## Vue3的设计目标,做了哪些优化

- 更小
  - Vue3`移除一些不常用的 `API
  - 引入`tree-shaking`
- 更快
  - `composition API`，大大增加了代码的逻辑组织和代码复用能力
  - `diff算法优化`,通过静态分析和标记技术，减少了不必要的比较
  - `静态提升`,将不会变的节点或属性提升到渲染函数的外部
  - **事件监听缓存**,避免了重复创建相同的事件处理函数
  - ssr优化
- TypeScript支持
  - `Vue3`是基于`typeScript`编写的，提供了更好的类型检查，能支持复杂的类型推导
- API设计一致性
  - `Composition API 允许按功能组织代码`，而不是按照属性类型（如 data、methods、computed）
- **`Teleport（传送门）`：** Vue 3引入了Teleport特性，`允许您在DOM结构中的任何位置渲染组件`。这使得布局更加灵活，同时也提高了代码的可维护性。
- **`Fragment`（片段）：** Vue 3支持`使用片段来包裹多个根元素`，而不需要额外的DOM容器。这简化了模板的编写，并且减少了不必要的DOM嵌套，从而提高了代码的清晰度和可维护性。
- **Suspense（悬挂）：** Vue 3引入了Suspense特性，允许您在组件树中的异步操作完成之前显示占位符内容。这提高了用户体验，并且让代码更加清晰和易于维护。

## Vue 3.0 的性能提升主要体现

1. **虚拟 DOM 重写：**新的虚拟 DOM 实现在 diff 算法、静态节点提升等方面进行了优化，从而减少了渲染时的计算量和内存消耗，提升了渲染性能。
2. **编译器优化：** Vue 3.0 的编译器进行了优化，生成的代码更加精简和高效。优化后的编译器生成更少的代码，减少了运行时的开销，提高了初始化和渲染的速度。
3. **Tree-shaking 支持：** Vue 3.0 支持了更好的 Tree-shaking，即在打包时能够更有效地剔除未使用的代码。这意味着只有实际用到的代码会被打包到最终的构建文件中，减少了构建体积和加载时间。
4. **静态提升（Static Hoisting）：** Vue 3.0 使用静态提升优化技术将静态节点提升到渲染函数之外，从而避免了不必要的重新渲染。这可以减少运行时的开销，提高了组件的初始化和更新性能。
5. **`Proxy 替代 Object.defineProperty`：** Vue 3.0 中使用了 Proxy 来实现响应式系统，取代了 Vue 2.x 中基于 Object.defineProperty 的实现。Proxy 具有更强大和灵活的功能，能够捕获更多的操作，并且性能更高，从而提高了响应式系统的性能表现。

## Proxy API 替代 Object.defineProperty API 

1. **更强大和灵活的功能：** Proxy API 提供了比 Object.defineProperty 更强大和灵活的功能。`使用 Proxy 可以捕获更多种类的操作，包括属性的读取、写入、删除等`，而 Object.defineProperty 只能捕获属性的读取和写入。
2. **更简洁的语法：**` Proxy API 提供了更简洁和直观的语法`，使得代码更易于理解和维护。相比之下，使用 Object.defineProperty 实现响应式系统需要编写更多的代码，并且语法较为繁琐。
3. **更好的性能：** Proxy API 的性能通常比 Object.defineProperty 更好。`Proxy 本身是 JavaScript 引擎的原生实现，能够在底层进行优化`，而 `Object.defineProperty 则需要在 JavaScript 代码中模拟响应式行为，性能相对较低。`
4. **更好的浏览器兼容性：** `Proxy API 相比 Object.defineProperty 在浏览器的兼容性上更好`。虽然 Proxy 并不支持所有的旧版本浏览器，但随着时间的推移，对 Proxy 的支持已经越来越广泛，而且 Proxy 的支持也在不断增加。

## Composition Api 与 Options Api

- 在逻辑组织和逻辑复用方面，`Composition API`是优于`Options API`
- 因为`Composition API`几乎是函数，会有更好的类型推断, TS支持更好。
- `Composition API`对 `tree-shaking` 友好，代码也更容易压缩
- `Composition API`中见不到`this`的使用，减少了`this`指向不明的情况

## 说说Vue 3.0中Treeshaking特性

Tree-shaking 是指在`打包时能够更有效地剔除未使用的代码`，以`减少最终构建文件的体积`。

Tree-shaking 是`通过标记和移除未被引用的代码`来实现的，这样可以减少浏览器需要下载和解析的代码量，从而提高应用程序的加载速度和性能。

假设我们有一个 Vue 组件库，其中包含了很多常用的 UI 组件，例如按钮、输入框、对话框等。在某个应用程序中，我们`只使用了其中的按钮和输入框组件，而没有使用对话框组件`。在使用 Tree-shaking 特性后，打包工具会`识别出对话框组件没有被使用`，因此会`将其从最终的构建文件中移除`，减少了打包文件的体积。

## 组件懒加载

指`初始加载页面时`并`不一次性加载所有组件`的代码，而是`仅加载当前视图所需的最少组件`，其他非关键组件的代码会在用户`实际需要它们时`（通常是在用户导航到特定路由或交互触发时）`按需加载`。

#### **动态导入（Dynamic Import）**： 

使用ES6的`import()`函数，它返回一个Promise，可以在运行时异步加载模块。

#### **路由级别的懒加载**：

 在基于路由的SPA中，可以`配置路由规则`，使得只有当用户导航到特定路由时，对应的组件代码才会被加载。`许多路由库`（如React Router、`Vue Router`等）都`内置了对懒加载的支持`。

## CSS懒加载

**CSS懒加载**则是指`推迟非关键CSS资源的加载`,直到它们对当前视口或即将可见的内容变得必要时再进行加载

这样做可以减少页面首次加载时的网络请求数量和总下载量，加速首屏渲染，尤其是对于长页面或滚动式网站。

CSS懒加载的常见实现方式包括：

#### **媒体查询（Media Queries）**：

 利用CSS媒体查询的特性，可以将非关键CSS放在一个外部样式表中，并通过`media`属性设置条件。只有当用户的设备或浏览器窗口满足特定条件时，浏览器才会加载相应的样式表。

```javascript
<link rel="stylesheet" href="critical.css" media="screen">
<link rel="stylesheet" href="non-critical.css" media="(min-width: 1024px)">
```

#### **Intersection Observer API**：

 结合JavaScript，特别是`Intersection Observer API`，可以`检测某个包含CSS链接的HTML元素何时进入视口（或接近视口）`。当元素变为可见时，才动态插入CSS链接，触发CSS文件的加载。

```javascript
let link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'non-critical.css';

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    document.head.appendChild(link);
    observer.disconnect();
  }
});

const triggerElement = document.querySelector('#trigger');
observer.observe(triggerElement);
```

## vuex

![vuex](https://vuex.vuejs.org/vuex.png)

## 处理Token过期或失效

1. ```
   清除本地token（本地存储），让用户回到登录页，获取最新的token
   ```

## 脚手架目录结构

![image-20240423134658442](D:\Js\assets\image-20240423134658442.png)

- **node_modules**：存放项目依赖的第三方包。这些是通过npm或yarn等包管理工具安装的。
- **public**：通常包含静态资源如HTML文件、图片、和直接被浏览器访问的其他文件。
- **src**：源代码目录，包含项目的主要开发文件，如JavaScript、Vue组件、CSS等。
- **.gitignore**：Git版本控制系统中指定忽略跟踪的文件和文件夹。
- **.gitlab-ci.yml**：为GitLab CI/CD提供配置，定义如何自动构建、测试和部署项目。
- **babel.config.js**：配置Babel，帮助将ES6+代码转换为向后兼容的JavaScript代码。
- **default.conf**：通常用于Web服务器的配置文件，如Nginx或Apache的服务器配置。
- **Dockerfile**：用于创建Docker容器的脚本，定义了构建Docker镜像所需的步骤。
- **DockerfileCache**：可能是自定义的用于优化Docker构建过程的特定Dockerfile，以利用缓存机制提高构建效率。
- **env.prod.js**：包含生产环境的环境变量配置。
- **jsconfig.json**：为JavaScript项目提供编辑器和IDE的代码感知能力，指定根文件和JavaScript语言选项。
- **package-lock.json** 和 **pnpm-lock.yaml**：这两个文件都是包依赖管理文件。分别用于npm和pnpm包管理器，确保依赖的一致安装。
- **package.json**：定义了项目的元数据和管理项目所需的依赖、脚本、版本等信息。
- **postcss.config.js**：配置PostCSS，一个用于CSS转换的工具，比如自动添加浏览器前缀。
- **README.md**：项目的README文件，提供项目说明、使用方法、贡献指南等信息。
- **tailwind.config.js**：Tailwind CSS的配置文件，用于自定义Tailwind的主题、变种和插件等。
- **vue.config.js**：Vue CLI项目的配置文件，用于调整Webpack配置、开发服务器设置等。

## 权限控制-自定义指令

```javascript
 Vue.directive("check", {
  inserted: function (el, binding, vnode) {
    const user = localStorage.user;
    console.log(user, binding.value);
    if (binding.value !== user) {
      el.hidden = true;
    }
  },
}); 
```

Vue.js指令的定义，该指令名为 `check`。这个指令的目的是用来检查`localStorage`中的`user`值与绑定值（`binding.value`）是否匹配，如果不匹配，则隐藏该元素。这种类型的指令可以用来在Vue应用中实现简单的权限控制或条件显示逻辑。

让我们详细解析这段代码：

1. **指令名称**: `check` - 这是您定义的自定义Vue指令的名称。

2. **指令钩子函数**: `inserted` - 这是Vue指令的一个生命周期钩子。`inserted` 钩子函数在绑定元素被插入到DOM中时调用。这意味着在这个时刻，您可以访问元素本身，并且可以确保它已经被插入文档。

3. **钩子函数参数**:
   - `el`: 指令绑定的DOM元素。
   - `binding`: 一个对象，包含绑定的值、表达式等信息。在此例中，`binding.value`代表绑定到指令的值。
   - `vnode`: Vue编译生成的虚拟节点。

4. **功能实现**:
   - 代码首先从`localStorage`读取`user`值。
   - 使用`console.log`输出当前的用户和绑定值，这有助于调试和查看当前的对比值。
   - 如果`binding.value`（可能代表某种权限级别或特定用户标识）与`localStorage`中存储的`user`值不同，则将元素设置为隐藏 (`el.hidden = true`)。

**用法**:
要使用这个指令，您可以在Vue模板中直接将它应用到任何DOM元素上，如下所示：

```html
<div v-check="'admin'">只有admin用户可以看到这段文字</div>
```

在上面的例子中，如果`localStorage`中的`user`值不是`'admin'`，则`<div>`元素将被隐藏。

**注意事项**:

- 确保在使用此自定义指令之前已将其全局注册到Vue实例中。
- 处理敏感的权限检查时要格外注意，可能需要考虑更复杂的安全措施来防止潜在的前端数据篡改。
- 这种权限控制的实现依赖于客户端存储的数据，不应视为安全的认证机制，更多的是为了`用户体验或轻量级的页面控制`。

## 组件通信-`透传`（transparently pass）

Vue.js 中，`v-on="$listeners"` 是一种常见的模式，主要用于组件开发中，它允许组件实现透传（transparently pass）事件监听器。这样的功能对于实现一个透明的包装组件或高阶组件非常有用。下面我详细解释一下 `$listeners` 和 `v-on="$listeners"` 的用途和原理。

### 什么是 `$listeners`？

在 Vue.js 中，`$listeners` 是一个包含了父级在该组件上设置的所有监听器（不含 `.native` 修饰符的）的对象。它使得组件可以访问由父组件绑定的所有事件监听器，而不必明确地声明每一个事件传递。这在创建可复用和配置灵活的组件时特别有用。

### 如何使用 `v-on="$listeners"`？

当你在组件中使用 `v-on="$listeners"` 时，你实际上是在告诉 Vue 将父组件中绑定到当前组件实例上的所有事件监听器动态绑定到子组件的根元素上。这使得子组件不需要知道具体的事件处理逻辑，而可以将事件处理透传到父组件。

### 示例场景

想象你正在创建一个按钮组件，这个组件在不同的地方被用来执行不同的动作。一种方法是为每种动作创建不同的事件处理器，但这会使得组件难以维护和扩展。使用 `v-on="$listeners"`，你可以简化这一过程：

```vue
<!-- BaseButton.vue -->
<template>
  <button v-on="$listeners">
    <slot></slot> <!-- 使按钮内容也可定制 -->
  </button>
</template>

<!-- ParentComponent.vue -->
<template>
  <BaseButton @click="handleClick">Click Me</BaseButton>
</template>

<script>
export default {
  methods: {
    handleClick() {
      console.log('Button clicked');
    }
  }
}
</script>
```

在这个例子中，`BaseButton` 组件不需要明确知道它需要处理哪些事件。它只需要通过 `v-on="$listeners"` 将任何在它上面声明的监听器绑定到其根元素，即 `<button>` 元素。

### 结论

使用 `v-on="$listeners"` 可以让你的 Vue 组件更加灵活和可复用，尤其是当处理那些需要响应外部事件但又不想直接管理这些事件的组件时。在构建大型应用或者库和框架的时候，这种模式特别有用。

## created生命周期钩子

1. **数据初始化**：`created` 钩子在`实例创建后`、`挂载开始之前`被调用。这是一个`适合将数据`、`计算属性`等`设置或修改`的阶段，因为在`这时候`，`所有的响应式数据`已经`准备好了`。
2. **执行方法**：如果需要`在组件加载时立即执行`某些方法（如`API请求`），`created` 是一个好时机，因为它保证这些方法可以访问到响应式数据。例如，从服务器获取数据填充到组件的数据属性中。
3. **事件监听**：在 ``created`` 钩子中添加`事件监听器`是合适的，尤其是当这些监听器不依赖于DOM或只与数据交互时。
4. **条件判断**：`created` 钩子可以用来根据初始数据做出一些逻辑判断，改变组件的行为或选择不同的展示路线。

然而，也有一些情况下不适合在 `created` 钩子中操作:

- **访问或操作DOM**：由于 `created` 钩子触发时，`组件的DOM还未生成`，所以`不能`在 `created` 中`直接操作DOM`。这种情况下应该使用 `mounted` 钩子。
- **依赖于子组件的数据**：由于`子组件尚未挂载`，`任何依赖于子组件数据的操作都不应在` `created` 中进行。

## 在组件页面刷新为什么触发不了组件的生命周期销毁钩子

当在前端开发中遇到组件页面刷新时，无法触发组件生命周期的销毁钩子（如 Vue 的 `beforeDestroy`/`destroyed` 或 React 的 `componentWillUnmount`），通常有以下几种情况或原因：

1. **`页面刷新`的本质**：当浏览器页面执行刷新（例如按下F5或点击浏览器刷新按钮）时，整个页面会进行重新加载。此过程实际上是在结束当前页面的所有活动，包括JavaScript的执行，然后重新加载资源并重新运行JavaScript代码。这个过程并不会触发组件的正常生命周期销毁钩子，因为这是一种`“硬”终止，不会走正常的组件卸载流程`。

2. **设计问题**：组件销毁钩子主要用于处理组件在被正常替换或移除时的清理工作，如移除事件监听器、停止定时器等。当进行页面刷新时，这些操作通常由浏览器自动处理（如清除内存中的变量等），因此`不需要组件自身显式触发销毁钩子`。

3. **其他方法处理**：如果你需要在页面刷新时执行一些操作（例如保存状态到`localStorage`或进行数据的清理等），你可能需要依赖于浏览器提供的一些事件，比如 `beforeunload` 或 `unload`。这些事件可以在页面即将卸载时触发，允许你执行一些清理或保存工作：

   ```javascript
   window.addEventListener('beforeunload', function (event) {
     // 执行清理操作
     console.log('页面刷新或关闭');
     // 可以在这里保存一些数据
   });
   ```

4. **环境因素**：在某些特定的应用或框架中，可能有自己的方式来管理组件的生命期。如果你使用的是如Next.js这类服务端渲染或静态站点生成的框架，组件的生命周期可能会有所不同，或者有特定的API来处理类似场景。

5. **调试与测试**：如果你确信组件的销毁钩子应该在某个操作时被触发，但实际上没有发生，可能需要检查代码实现是否正确，或是否有其他代码或错误阻止了这一过程。

总之，页面刷新不会触发组件的正常销毁钩子，因为页面刷新意味着整个页面的销毁和重新加载，这是一个浏览器级的操作，不是单个组件或应用的生命周期管理。如果需要在`页面刷新时进行特定操作`，应该考虑使用浏览器提供的事件如 `beforeunload`。

## NavigationDuplicated

这个错误信息显示的是 `NavigationDuplicated` 错误，也就是说，在 Vue.js 使用 vue-router 时，应用试图导航到一个与当前已经是激活状态的路由相同的新路由上，从而触发了这个错误。在实际应用中，这通常发生在你试图通过 `vue-router` 的 `push` 或者 `replace` 方法重复跳转到相同的路由地址上。

### 报错原因

具体来说，在你的这条错误信息中：

```
Avoided redundant navigation to current location: "/publicApiHub?cateName=%E5%85%A8%E9%83%A8%E5%88%86%E7%B1%BB"
```

这表明应用试图再次导航到同一个路径和查询参数（`/publicApiHub?cateName=%E5%85%A8%E9%83%A8%E5%88%86%E7%B1%BB`），这与当前页面相同。

### 解决办法

1. **检查触发导航的条件**：你需要检查为什么你的应用尝试执行这样的导航。可能是因为有某些代码（例如在组件的 `created`、`mounted` 钩子或响应式的计算属性中）错误地触发了多次导航到相同路由的行为。

2. **使用 `push` 或 `replace` 前进行检验**：在调用 `router.push` 或 `router.replace` 之前，你可以添加一个检查，确认即将导航的目标路由是否与当前路由相同。如果相同，则不进行导航。

   ```javascript
   if (this.$route.path !== newPath || this.$route.fullPath !== newFullPath) {
       this.$router.push(newPath);
   }
   ```

3. **捕捉并忽略这个错误**：Vue Router 在 3.1.0 之后的版本中，默认行为是当路由跳转到相同路径时会产生一个 Promise 错误。你可以通过捕捉并忽略这个错误来处理它：

   ```javascript
   this.$router.push(path).catch(err => {
       if (err.name !== 'NavigationDuplicated') {
           // 只处理 NavigationDuplicated 以外的错误
           throw err;
       }
   });
   ```

   ```javascript
   //业务中示例
   beforeCreate(){
       this.$router.push({
             path: "/publicApiHub",
             query: { cateName: "全部分类" },
           })
           .catch(err => {
             if (err.name === 'NavigationDuplicated') {
               console.log("NavigationDuplicated");
           }
         });
     },
   ```

   

4. **升级 Vue Router 的使用方式**：如果你确认需要重复导航到同一个路由（例如刷新视图），可以考虑使用 `router.go(0)` 来强制刷新当前页面，或者根据业务逻辑使用其他方式重置或更新页面内容。

## Vue的SetUp函数

在Vue 3中，引入了一个名为 `setup` 的新函数，它是使用组合式API时的一个主要功能。`setup` 函数是组件的入口点，它在组件创建之前执行，允许你定义组件的响应式状态、计算属性、侦听器和其他函数。这标志着Vue对于更具函数风格编程的支持，旨在促进更大程度的代码复用和更清晰的逻辑分离。

### setup函数的基本使用：

`setup` 函数的特点是：

1. 它执行的时机在组件的 `beforeCreate` 和 `created` 生命周期钩子之前。

2. 接收两个参数：

   - `props`：父组件传递的属性，是一个响应式的代理（reactive proxy）。

   - ```
     context
     ```

     ：一个普通的JavaScript对象，包含以下属性：

     - `attrs`：包含未注册的`props`属性，它们也是响应式的。
     - `slots`：父组件传递的插槽。
     - `emit`：用于触发事件的方法。

3. 应该返回一个对象。该对象的属性和方法将被暴露给组件的其他部分（例如模板或其他选项API），或者返回一个渲染函数。

### 示例代码：

```javascript
<template>
  <div>
    <p>{{ message }}</p>
    <button @click="changeMessage">Change Message</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup(props, { emit }) {
    const message = ref("Hello Vue 3!");

    function changeMessage() {
      message.value = "Message changed.";
    }

    return {
      message,
      changeMessage
    };
  }
}
</script>
```

### 在上述示例中：

- 定义了一个响应性的数据 `message` 使用 `ref`，这使得在模板中可以响应该数据的变化。
- 定义了一个方法 `changeMessage`，用于改变`message`的值。
- `setup` 函数返回一个对象，包含 `message` 和 `changeMessage`，这些属性和方法在模板中被使用。

### 注意事项：

- 在`setup`中无法访问到组件的`this`上下文，因为`setup`调用时，组件实例尚未创建。
- 所有Composition API函数（如`ref`, `computed`等）都应该在`setup`内部使用。

通过使用 `setup` 函数，Vue 3的组合式API提供了一种更灵活和模块化的方式来组织代码，同时也保留了对旧有选项API的支持。这使得开发者可以根据具体情况选择最适合的方式编写组件。

## 数据请求在created和mouted的区别

`created`是在组件实例一旦创建完成的时候立刻调用，这时候页面`dom`节点并未生成；`mounted`是在页面`dom`节点渲染完毕之后就立刻执行的。触发时机上`created`是比`mounted`要更早的，两者的相同点：都能拿到实例对象的属性和方法。 讨论这个问题本质就是触发的时机，放在`mounted`中的请求有可能导致页面闪动（因为此时页面`dom`结构已经生成），但如果在页面加载前完成请求，则不会出现此情况。建议对页面内容的改动放在`created`生命周期当中。

## vue中响应式是怎么实现的

1. 数据劫持：
   - Vue 2: 使用Object.defineProperty遍历对象的每个属性，将其转换为getter/setter。
   - Vue 3: 使用Proxy创建一个对象的代理，拦截并处理对该对象的各种操作。
2. 依赖收集： 当访问数据时（例如在渲染过程中），系统会记录谁在使用这个数据（即收集依赖）。
3. 数据更新： 当数据变化时，系统会通知所有依赖该数据的地方进行更新。
4. 虚拟DOM： Vue使用虚拟DOM来最小化实际DOM操作，提高性能。
5. 异步更新队列： Vue将数据变化后的视图更新操作推入一个队列中，在下一个事件循环中批量执行，以避免不必要的计算和DOM操作。

## 如何让一个值失去响应式

1. 使用 toRaw()

toRaw() 函数可以返回一个响应式对象的原始版本，这个版本不再是响应式的。

```javascript
import { ref, toRaw } from 'vue'

const reactiveValue = ref({ count: 0 })
const rawValue = toRaw(reactiveValue.value)

// rawValue 不再是响应式的
```

1. 使用 markRaw()

markRaw() 函数可以标记一个对象，使其永远不会转换为响应式对象。

```javascript
import { markRaw, reactive } from 'vue'

const originalObject = { count: 0 }
const rawObject = markRaw(originalObject)

// 即使将 rawObject 传递给 reactive，它也不会变成响应式
const stillRaw = reactive(rawObject)
// stillRaw 仍然是非响应式的
```

1. 创建一个普通的副本

对于简单的值或对象，你可以创建一个普通的副本：

```javascript
import { ref } from 'vue'

const reactiveValue = ref({ count: 0 })
const nonReactiveValue = { ...reactiveValue.value }

// nonReactiveValue 是一个普通对象，不是响应式的
```

1. 使用 Object.freeze()

Object.freeze() 可以冻结一个对象，使其属性不可修改，这也会阻止 Vue 将其转换为响应式。

```javascript
import { reactive } from 'vue'

const originalObject = { count: 0 }
const frozenObject = Object.freeze(originalObject)

// 即使将 frozenObject 传递给 reactive，它也不会变成响应式
const stillFrozen = reactive(frozenObject)
// stillFrozen 仍然是非响应式的
```

1. 使用普通变量替代 ref 或 reactive

如果你不再需要响应式，可以将值赋给一个普通变量：

```javascript
import { ref } from 'vue'

const reactiveValue = ref(0)
let nonReactiveValue = reactiveValue.value

// nonReactiveValue 现在是一个普通变量，不再是响应式的
```

1. 解构响应式对象

当你解构一个响应式对象时，解构出来的属性会失去响应式：

```javascript
import { reactive } from 'vue'

const reactiveObject = reactive({ count: 0, text: 'hello' })
const { count, text } = reactiveObject

// count 和 text 现在是非响应式的普通变量
```

## vue生命周期特点，什么时候做什么事

Vue 的生命周期可以分为几个主要阶段，每个阶段都有其特点和适合执行的操作。下面我们详细介绍每个阶段的特点和可以执行的操作：

1. 初始化阶段

   beforeCreate:
   - 特点：实例刚被创建，组件选项对象还未处理
   - 数据观测和事件配置都未初始化
   - 可以做：设置一些全局的配置，但基本很少使用

   created:
   - 特点：实例创建完成，数据观测、计算属性、方法、侦听器已设置
   - 还未挂载到 DOM，$el 属性不可用
   - 可以做：
     - 进行数据初始化
     - 发送 API 请求
     - 设置定时器或订阅事件

2. 挂载阶段

   beforeMount:
   - 特点：模板编译完成，虚拟 DOM 已生成，但还未挂载到实际 DOM
   - 可以做：
     - 最后一次修改数据而不触发重新渲染
     - 访问未挂载的 $refs

   mounted:
   - 特点：组件已挂载到 DOM，可以访问 $el 和 $refs
   - 可以做：
     - 访问和操作 DOM
     - 初始化需要 DOM 的库（如图表库）
     - 添加事件监听器
     - 集成第三方插件

3. 更新阶段

   beforeUpdate:
   - 特点：数据更新后，DOM 更新之前
   - 可以做：
     - 访问更新前的 DOM 状态
     - 在 DOM 更新前进行额外的状态更改

   updated:
   - 特点：DOM 已经更新完成
   - 可以做：
     - 执行依赖于更新后 DOM 的操作
     - 但要避免在这里更改状态，可能导致无限循环

4. 卸载阶段

   beforeUnmount (Vue 3) / beforeDestroy (Vue 2):
   - 特点：组件即将被卸载
   - 可以做：
     - 清理定时器
     - 取消网络请求
     - 移除事件监听器

   unmounted (Vue 3) / destroyed (Vue 2):
   - 特点：组件已被卸载
   - 可以做：
     - 最后的清理工作
     - 移除全局事件监听器或订阅

5. 特殊情况

   activated (keep-alive):
   - 特点：被缓存的组件激活时调用
   - 可以做：
     - 重新获取数据
     - 更新组件状态

   deactivated (keep-alive):
   - 特点：被缓存的组件停用时调用
   - 可以做：
     - 暂停或清理一些操作
     - 保存组件状态

   errorCaptured:
   - 特点：捕获来自后代组件的错误
   - 可以做：
     - 错误处理和日志记录
     - 展示错误信息给用户

注意事项：
1. 在 created 中可以访问数据，但不建议进行 DOM 操作。
2. mounted 不保证所有子组件也都已经挂载完成，如果需要等待整个视图都渲染完毕，可以使用 $nextTick。
3. updated 钩子不保证所有子组件也都重新渲染完毕，同样可以使用 $nextTick。
4. 避免在 updated 中更改数据，可能导致无限循环。
   1. 在 `updated` 钩子中更改状态可能导致无限循环的原因：
      1. 触发机制： `updated` 钩子在 DOM 更新完成后被调用。
      2. 状态改变引发更新： 当你在 `updated` 中改变组件的响应式数据（状态）时，Vue 会检测到这个变化。
      3. 重新渲染： 数据变化会触发组件的重新渲染。
      4. 再次调用 `updated`： 重新渲染完成后，`updated` 钩子会再次被调用。
      5. 循环开始： 如果在新的 `updated` 调用中又改变了状态，这个过程会不断重复。

5. 在 beforeUnmount 和 unmounted 中进行清理工作，避免内存泄漏。

理解这些生命周期钩子的特点和适用场景，可以帮助你更好地组织 Vue 应用的逻辑，提高性能和可维护性。

## vue项目的代码目录结构，什么目录做什么事

一个典型的 Vue 项目的代码目录结构通常如下所示，我会解释每个目录的用途：

```js
project-root/
│
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── views/
│   ├── router/
│   ├── store/
│   ├── services/
│   ├── utils/
│   ├── styles/
│   ├── App.vue
│   └── main.js
│
├── tests/
│
├── node_modules/
│
├── package.json
├── vue.config.js
└── README.md
```

让我们详细解释每个目录的作用：

1. public/
   - 存放不需要通过 Webpack 处理的静态资源
   - index.html 是应用的入口 HTML 文件
   - favicon.ico 是网站图标

2. src/
   这是主要的源代码目录，包含以下子目录：

   - assets/: 存放图片、字体等静态资源
   - components/: 存放可复用的 Vue 组件
   - views/: 存放页面级的 Vue 组件
   - router/: 存放路由配置文件
   - store/: 存放 Vuex 相关文件（状态管理）
   - services/: 存放 API 调用相关的服务
   - utils/: 存放通用的工具函数
   - styles/: 存放全局样式文件
   - App.vue: 根组件
   - main.js: 应用的入口文件，用于创建 Vue 实例并挂载

3. tests/
   - 存放单元测试和集成测试文件

4. node_modules/
   - 存放项目依赖的 npm 包

5. package.json
   - 定义项目的依赖和脚本

6. vue.config.js
   - Vue CLI 的配置文件，用于自定义构建配置

7. README.md
   - 项目说明文档

其他可能的目录或文件：

8. dist/
   - 构建后的生产环境文件，通常被 .gitignore 忽略

9. .env files (.env, .env.development, .env.production)
   - 环境变量配置文件

10. jsconfig.json 或 tsconfig.json
    - JavaScript 或 TypeScript 配置文件

11. .eslintrc.js 和 .prettierrc
    - ESLint 和 Prettier 配置文件

12. babel.config.js
    - Babel 配置文件

这种结构有助于组织和管理代码，使项目更加清晰和可维护。根据项目的具体需求，你可能需要添加或修改一些目录。例如，对于大型项目，你可能会在 src/ 下添加 modules/ 目录来组织不同的功能模块。

记住，好的目录结构应该是直观的、一致的，并且能够随着项目的增长而轻松扩展。

## vue-router原理

### Vue Router 的原理

Vue Router 是 Vue.js 的官方路由管理工具，主要用于在单页面应用（SPA）中实现不同视图组件的切换和管理。它基于浏览器的历史记录（History API）或 URL 的哈希（Hash）部分来管理 URL。以下将详细介绍 Vue Router 的工作原理，包括其初始化、导航过程、模式、导航守卫等关键部分。

### 核心工作原理

#### 1. 初始化

Vue Router 初始化过程中完成以下几项关键任务：

1. **创建 Router 实例**：
   当你创建一个 VueRouter 实例时，会将路由配置传入实例中，包括路径与组件之间的映射关系。

   ```javascript
   const router = new VueRouter({
       routes: [
           { path: '/', component: Home },
           { path: '/about', component: About }
       ]
   });
   ```

2. **记录初始路由**：
   Router 实例会记录当前的初始路由，以便在后续操作中进行路由匹配。

3. **设置路由模式**：
   Router 支持两种模式：`history` 模式和 `hash` 模式。可以通过传递 `mode` 参数来指定：
   - `history` 模式：基于 HTML5 History API。
   - `hash` 模式：基于 URL 的哈希部分。

   ```javascript
   const router = new VueRouter({
       mode: 'history', // 或者 'hash'
       routes: [...]
   });
   ```

#### 2. 路由匹配

当路由发生变化时，Vue Router 会根据已配置的路由表进行路径匹配。这个过程通常包括以下几步：

1. **解析路径**：
   从浏览器的 URL 中解析出路径信息。

2. **匹配路由**：
   遍历路由配置表，找到与当前路径匹配的路由记录。这些路由记录可以是静态路径，也可以是动态路径（如 `/user/:id`）。

3. **加载组件**：
   根据匹配的路由记录加载相应的 Vue 组件，并将其渲染到 `<router-view>` 中。

#### 3. 路由模式

##### Hash模式
- **原理**：基于 URL 的哈希（#）部分，它不会被浏览器发送到服务器。
- **实现**：使用 `window.onhashchange` 监听 URL 的变化。

##### History模式
- **原理**：利用 HTML5 自带的 History API（pushState, replaceState, popstate）。
- **实现**：通过调用 `history.pushState` 和 `history.replaceState` 方法来设置 URL，并使用 `window.onpopstate` 事件监听回退和前进操作。
  - pushState: 将新的状态推入（push）历史堆栈。
  - replaceState: 替换（replace）历史堆栈中的当前状态。
  - pushState: 增加浏览器历史的长度。
  - replaceState: 不改变浏览器历史的长度。
  - pushState: 允许用户通过后退按钮逐步回到之前的状态。
  - replaceState: 用户无法通过后退按钮回到被替换的状态。


#### 4. 导航过程

1. **导航触发**：
   导航可以通过点击 `<router-link>` 或调用 `router.push`、`router.replace` 等方法触发。

2. **确认导航**：
   触发导航后，Vue Router 会先确认当前路由的离开，并解析目标路由。

3. **执行导航守卫**：
   在确认导航之前，Vue Router 会执行各级导航守卫（全局守卫、路由独享守卫、组件内守卫），用于验证权限、异步数据加载等。

4. **更新路由视图**：
   当所有导航守卫执行完毕且通过验证后，Vue Router 会更新 `<router-view>`，将新的组件渲染到视图中。

#### 5. 导航守卫

导航守卫用于控制路由跳转的逻辑，主要包括以下几类：

1. **全局守卫**：
   - `router.beforeEach`：在每次导航前触发。
   - `router.afterEach`：在每次导航后触发。

   ```javascript
   router.beforeEach((to, from, next) => {
       // 如果用户未登录，则跳转到登录页
       if (!isAuthenticated() && to.path !== '/login') {
           next('/login');
       } else {
           next();
       }
   });
   ```

2. **路由独享守卫**：
   定义在路由配置中的守卫。

   ```javascript
   const routes = [
       {
           path: '/dashboard',
           component: Dashboard,
           beforeEnter: (to, from, next) => {
               if (hasPermission()) {
                   next();
               } else {
                   next('/');
               }
           }
       }
   ];
   ```

3. **组件内守卫**：
   包括 `beforeRouteEnter`、`beforeRouteUpdate` 和 `beforeRouteLeave`。

   ```javascript
   export default {
       beforeRouteEnter(to, from, next) {
           // 在路由进入之前，调用组件的进入钩子
           next(vm => {
               // 这里的 vm 是页面实例，可以调用其方法
               vm.initialize();
           });
       },
       beforeRouteUpdate(to, from, next) {
           // 在路由状态更新时调用
           next();
       },
       beforeRouteLeave(to, from, next) {
           // 在离开路由之前调用，可以用于清理工作
           next();
       }
   };
   ```

### 总结

Vue Router 是 Vue.js 中用于管理单页面应用路由的工具。它通过路径匹配和导航守卫，使得开发者可以方便地管理不同 URL 与组件之间的关系，并对导航进行控制。了解其核心原理，有助于我们开发出功能丰富且安全可靠的前端应用。

## 路由的history和hash模式

History 模式和 Hash 模式是 Vue Router（以及其他前端路由系统）中两种主要的路由实现方式。它们各有特点和使用场景，让我们详细比较一下：

1. URL 格式
   - History 模式: `http://example.com/user/123`
   - Hash 模式: `http://example.com/#/user/123`
2. 实现原理
   - History 模式:  使用 HTML5 History API，主要是 `pushState()` 和 `replaceState()` 方法来改变 URL， 并通过 `popstate` 事件来监听 URL 的变化。
   - Hash 模式:  使用 URL 的哈希部分（即 # 后面的部分）来模拟路径， 通过 `hashchange` 事件来监听 URL 的变化。
3. 浏览器支持
   - History 模式: 需要 HTML5 History API 支持，不支持较老的浏览器。
   - Hash 模式: 支持所有浏览器，包括较老的浏览器。
4. 服务器配置
   - History 模式:  需要服务器配置。因为当用户直接访问 `http://example.com/user/123` 时，服务器需要返回应用的 index.html 文件， 而不是试图寻找一个 `/user/123` 文件。
   - Hash 模式:  不需要特殊的服务器配置。因为 hash 部分不会被发送到服务器。
5. SEO 友好性
   - History 模式: 更友好。URL 看起来像普通的路径，更有利于 SEO。
   - Hash 模式: 较差。搜索引擎通常会忽略 URL 中 # 后面的内容。
6. 美观度
   - History 模式: URL 更加简洁美观。
   - Hash 模式: URL 中包含 #，不太美观。
7. 刷新页面的行为
   - History 模式:  刷新页面时，如果服务器没有正确配置，可能会返回 404 错误。
   - Hash 模式:  刷新页面总是没问题的，因为服务器不会解析 hash 部分。
