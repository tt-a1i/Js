## [HMR] Waiting for update signal from WDS...

1. **HMR**：全称为 Hot Module Replacement（热模块替换）。这是一种技术，允许开发者在应用运行时替换、添加或删除模块，而无需完全重新加载页面。这大大提高了开发效率，因为你可以实时看到更改的效果。
2. **WDS**：全称为 Webpack Dev Server（Webpack  开发服务器）。这是一个小型的 Express 服务器，它使用 webpack 与浏览器进行通信，并且利用 sockjs  提供实时重载功能。它主要用于在开发期间提供 assets（由 webpack 构建）。

![image-20240424150054247](assets/image-20240424150054247.png)

## Vite为什么比webpack快

Vite 和 Webpack 都是用于现代前端开发的工具，但它们在底层架构和工作原理上有显著的不同。理解它们之间的区别，尤其是为什么 Vite 比 Webpack 更快，有助于我们选择合适的开发工具，提高开发效率和性能。

### Webpack

#### 介绍

Webpack 是一个模块打包工具，能够将项目中的各种资源（JavaScript, CSS, 图片等）作为模块进行处理，并生成优化后的静态资源文件。Webpack 广泛应用于现代前端开发中，并支持丰富的插件和配置。

#### 工作原理

1. **入口（Entry）**：Webpack 从一个或多个入口点开始构建依赖图。默认入口文件通常是 `src/index.js`。

2. **模块解析（Module Resolution）**：Webpack 使用加载器（loaders）将各类文件（如 JavaScript、CSS、图像）转换为可以直接使用的模块（通常是 JavaScript）。

3. **依赖图（Dependency Graph）**：通过解析入口文件中的导入语句，Webpack 构建一个包含所有依赖的图表，递归查找每个依赖模块。

4. **插件（Plugins）**：Webpack 使用插件系统执行各种任务，如压缩代码、提取CSS、构建分析等。

5. **输出（Output）**：Webpack 将处理和优化后的文件输出到配置的目标文件夹（通常是 `dist/`）。

#### 性能瓶颈

- **初始构建时间长**：Webpack 会解析整个依赖图，处理大量的模块，这会使初始构建时间变长。
- **热更新延迟**：即使是开发过程中的小改动，Webpack 也可能需要重新打包较大的代码块，导致热更新速度较慢。

### Vite

#### 介绍

Vite 是一个基于 ES 模块的新一代前端构建工具，它的优点在于快速的热更新和即时的开发环境。Vite 是由 Vue.js 的作者尤雨溪（Evan You）创建的，旨在解决 Webpack 等传统打包工具的性能问题。

#### 工作原理

1. **开发模式下的即时服务器**：Vite 在开发模式下使用原生 ES 模块（ESM）和浏览器支持的 HTTP 提供即时模块解析和热更新。这意味着只有被修改的模块会被重新请求，无需重新打包整个项目。

2. **轻量化的初始加载**：Vite 通过预构建常用依赖（例如 React、Vue）来加速冷启动时间。它使用 esbuild，一个用 Go 编写并高度优化的编译器来处理预构建任务。

3. **按需加载**：在开发模式下，Vite 按需加载模块。只有被真实引用的模块才会被请求和处理，从而显著减少不必要的工作量。

4. **生产模式下的 Rollup 打包**：尽管 Vite 在开发模式下不使用传统的打包工具，但在生产模式下，Vite 使用 Rollup 进行优化打包。这使得 Vite 能够生成高效、优化的生产环境代码。

#### Vite 为什么更快

1. **即时模块服务**：Vite 不需要对整个项目进行提前打包，而是即时提供模块，这避免了大量的初始构建开销。

2. **依赖预构建**：Vite 使用 esbuild 预构建非 ES 模块化的依赖，这显著加快了依赖解析和模块转换的速度。esbuild 极其高效，通常比 JavaScript 实现的打包器（如 Webpack、Rollup）快 10 到 100 倍。

3. **按需转换**：在开发模式下，只有第一次请求特定模块时，Vite 才会进行转换并缓存结果。这可避免无效代码被频繁地重新构建。

4. **Hot Module Replacement (HMR)**：Vite 的 HMR 实现更加细粒度，只重加载被修改的部分模块。而 Webpack 的 HMR 在大型项目中容易拖慢开发效率，因为它可能需要重新打包较大的模块。

### 性能对比总结

- **初始启动时间**：Vite 的依赖预构建和即时模块服务策略使得初始启动时间大幅缩减，而 Webpack 需要解析构建整个依赖图，初始启动时间较长。

- **热更新速度**：Vite 的 HMR 速度非常快，因为它仅重新加载修改的模块。而 Webpack 的热更新机制在大型项目中变得相对缓慢。

- **构建产物优化**：尽管在开发模式下 Vite 更快，但在生产模式下，两者在构建产物优化上可能效果相似，因为 Vite 使用 Rollup 进行最终的生产构建。

### 总结

- **Webpack** 是一个功能强大的模块打包工具，广泛适用于各种前端项目，但其初始构建和热更新性能在大型项目中不如意。

- **Vite** 是一个新一代的前端开发工具，利用浏览器原生支持的 ES 模块和高速的 esbuild，在开发模式下显著提升了速度和效率。针对依赖预构建、按需加载和更快速的 HMR，使 Vite 比 Webpack 更快。

选择合适的工具应该根据项目需求和规模。如果追求快速的开发反馈循环和更简化的配置，特别是在构建现代前端项目时，Vite 是一个非常好的选择。如果需要更复杂的构建过程和插件系统，Webpack 仍然是一个成熟的工具。

## webpack打包构建流程；为什么要进行打包

### 为什么要进行打包

在现代Web开发中，前端工程化已经成为标配，而打包工具（如Webpack）在其中扮演着至关重要的角色。核心原因如下：

1. **模块化开发**：打包工具允许开发者使用模块化开发模式（如ES6模块或CommonJS），这使得代码更加清晰、可维护。
2. **依赖管理**：自动管理依赖关系，确保正确的模块依赖顺序和加载方式。
3. **代码优化**：通过压缩、合并、删除未使用代码等多种优化手段，减少文件大小，提高加载速度。
4. **提升性能**：使用代码分割（Code Splitting）、懒加载（Lazy Loading）等技术，优化性能和用户体验。
5. **兼容性处理**：处理不同浏览器的兼容性问题，如通过Babel将ES6+的代码转换为ES5，以兼容老旧浏览器。
6. **方便调试**：通过Source Map支持，将编译后的代码映射回源代码，帮助开发者更容易地进行调试。

### Webpack打包构建流程

Webpack的打包流程可以用以下几个步骤来描述：

1. **初始化**：读取配置文件 `webpack.config.js`，创建一个 `compiler` 实例，并初始化一系列插件和配置参数。
2. **解析入口**：从配置的 `entry` 入口文件开始，递归地解析出项目依赖的所有模块。
3. **模块编译**：根据模块类型（如JavaScript、CSS、图片等），使用相应的Loader对模块内容进行转换和解析，将其编译为浏览器可以识别的代码。
4. **模块打包**：将编译后的模块按照配置的规则（如代码分割、Chunk处理等）进行合并打包，生成一个或多个输出文件。
5. **输出**：将打包好的文件输出到指定的 `output` 目录，并生成相应的Source Map以便调试。
6. **完成**：执行一些优化操作（如代码压缩、文件哈希命名等），整个打包过程完成。

#### 示例配置和流程细节

以下是一个简单的 Webpack 配置文件（`webpack.config.js`）示例：

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // 入口
    entry: './src/index.js',  
    // 输出
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    // 模块和加载器
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    // 插件
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    // 开发工具
    devtool: 'source-map',
    // 模式
    mode: 'development'
};
```

### 详细流程

1. **初始化**：
   - Webpack 读取配置文件 `webpack.config.js`，初始化参数（包括 Entry、Output、Loaders、Plugins 等）。
   - 创建 `Compiler` 实例并初始化插件（Plugins）。

2. **解析入口**：
   - 从配置的 `entry` 入口文件（如 `./src/index.js`）开始解析，构建模块依赖图（Dependency Graph）。

3. **模块编译**：
   - 对于每个模块，确定其需要使用的加载器（Loader），并依次应用这些加载器进行代码转换。例如，`babel-loader` 会将 ES6+ 代码转换为 ES5。
   - 加载器的配置在 `rules` 中定义，如处理 JavaScript 文件的 `babel-loader` 和处理 CSS 文件的 `style-loader` 和 `css-loader`。

4. **模块打包**：
   - 根据依赖图确定各个模块的依赖关系和加载顺序，将模块打包成一个或多个 `chunk`。
   - 生成打包后的输出文件（Output），如 `bundle.[contenthash].js`。

5. **输出**：
   - 将打包好的文件输出到指定的目录（如 `dist`）。
   - 生成对应的 Source Map 文件以便调试（如果配置了 `devtool`）。

6. **完成**：
   - Webpack 会触发 `emit` 事件，执行一些后续处理，如插件的 cleanup 或文件压缩等。

### 总结

Webpack 通过一系列的配置和插件机制，将复杂的前端开发环境变得可以高效管理和维护。打包过程不仅优化了代码量和加载速度，还提高了开发和调试的便利性。因此，通过Webpack进行打包构建，促使Web应用更具性能和可维护性。

## bundle，chunk，loader这些在整个打包构建流程中的作用是啥

在 Webpack 的打包构建流程中，bundle、chunk 和 loader 都扮演着重要的角色。让我们逐一解释它们的作用：

1. Loader

作用：

![image-20240825133736886](assets/image-20240825133736886.png)

- Loader 是 Webpack 的核心概念之一，它的主要作用是将不同类型的文件转换为 Webpack 可以处理的模块。处理各种文件的功能.
- Loader 可以将各种类型的资源（如 CSS、图片、TypeScript 等）转换为 JavaScript 模块。

在构建流程中的位置：

- Loader 在模块编译阶段发挥作用。
- 当 Webpack 遇到非 JavaScript 文件时，它会使用配置的 Loader 来处理这些文件。

示例：

- css-loader：将 CSS 转换为 CommonJS 模块
- babel-loader：将 ES6+ 代码转换为 ES5
- file-loader：处理文件导入，返回文件的 URL

2. Chunk

作用：

- Chunk 是 Webpack 打包过程中的中间产物。
- 它表示一组模块的集合，这些模块通常具有某种内在关联。

在构建流程中的位置：

- Chunk 在模块依赖分析之后、生成 bundle 之前产生。
- Webpack 会根据配置和模块依赖关系将模块组合成 Chunk。

Chunk 的类型：

- 入口 Chunk：包含入口模块及其依赖
- 异步 Chunk：通过动态导入（如 import()）生成的 Chunk
- 通过 SplitChunksPlugin 分离的公共 Chunk

3. Bundle

作用：

- Bundle 是 Webpack 打包的最终产物，是最终输出的文件。
- 一个 bundle 文件通常包含了多个模块的合并和处理后的版本。

在构建流程中的位置：

- Bundle 是整个构建过程的最终输出。
- 它是在所有模块被处理、Chunk 被创建之后生成的。

Bundle 与 Chunk 的关系：

- 通常情况下，一个 Chunk 会生成一个 Bundle。
- 但是，通过某些插件（如 MiniCssExtractPlugin），一个 Chunk 可能会生成多个 Bundle（如分离的 CSS 文件）。

在整个打包构建流程中的作用总结：

1. Loader（加载器）:
   - 在模块编译阶段工作。
   - 将各种类型的文件转换为 Webpack 可以处理的模块。
   - 使得 Webpack 能够处理非 JavaScript 文件。

2. Chunk（代码块）:
   - 在依赖关系解析后形成。
   - 是多个模块的集合，基于入口点和代码分割配置生成。
   - 帮助 Webpack 更好地组织和优化输出。

3. Bundle（包）:
   - 是最终的输出文件。
   - 包含了处理后的源码、运行时代码等。
   - 是浏览器最终加载的资源。

这三个概念在 Webpack 的构建流程中紧密相连：Loader 处理各种源文件，Webpack 根据依赖关系和配置将处理后的模块组合成 Chunk，最后将 Chunk 转换为最终的 Bundle 文件。这个过程使得开发者可以使用现代化的开发技术和工具，同时确保最终产出的代码能够高效地在浏览器中运行。

## npm执行原理

npm 脚本是一种便捷的机制，用于在 Node.js 环境中定义和运行各种任务。通过在 `package.json` 文件中定义的脚本命令，你可以轻松地执行诸如构建、测试、启动服务器等任务。理解 npm 脚本的执行原理有助于更有效地利用它们：

### 执行原理

1. **定义脚本**：

   - 在 `package.json` 中，脚本定义在 `"scripts"` 字段下。每个键值对中的键是脚本的名称，值是指令/命令。比如：

     ```json
     {
       "scripts": {
         "start": "node app.js",
         "test": "echo \"Error: no test specified\" && exit 1",
         "build": "webpack --config webpack.config.js"
       }
     }
     ```

2. **执行脚本**：

   - 使用 `npm run <script-name>` 命令来执行定义的脚本。例如，运行 `npm run start` 将执行 `node app.js`。
   - 有特殊的命令如 `npm start`、`npm test`、`npm restart` 可以直接运行对应定义的脚本而不需要加 `run`。

3. **生命周期脚本**：

   - npm 支持一些特殊的生命周期脚本，允许在安装、发布等生命周期钩子的特定时刻执行脚本。例如，`preinstall`、`postinstall`、`prepublish` 等。

4. **路径管理**：

   - 在 npm 脚本中运行的命令，会自动将 `node_modules/.bin` 加入到路径中。这意味着你可以直接使用项目本地安装的 CLI 工具，而不需提供其完整路径。例如，使用 `webpack` 命令时，无需配置其绝对路径，只要它被安装在 `node_modules` 下。

5. **shell 命令**：

   - npm 脚本中可以直接运行 shell 命令，如 `echo`、`&&`、`||` 等，这使得在不同的命令之间进行组合变得容易。

6. **跨平台支持**：

   - 由于操作系统之间存在差异（如 Windows 和 Unix 系统），在编写复杂的脚本时，可以使用 `npm-run-all` 或 `cross-env` 等工具来保证跨平台的兼容性。

### 执行流程

- 当你运行 `npm run <script>` 时，npm 会首先检查 `package.json` 中的 `scripts` 字段。
- npm 查找与脚本名称对应的命令，然后在 shell 中执行它。
- 在执行环境中，npm 会自动将 `node_modules/.bin` 目录加入到环境变量 PATH 中，从而能直接调用项目本地安装的命令行工具。
- 执行完成后，npm 返回控制权给当前环境，并提供执行结果的输出。

通过 npm 脚本机制，你可以在项目中定义各种自动化任务，并使用 Node.js 环境中已有的工具，以一种结构化的方式执行它们。这极大地方便了前端及全栈开发流程中的各种任务管理。