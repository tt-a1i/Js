## 控制台打印[object Object]的远原因

这是打印输出代码

```javascript
console.log("111111111111111111111"+this.basicInfo);
```

控制台打印显示



![image-20240426175116846](D:\Js\assets\image-20240426175116846.png)



原因

因为 `console.log` 在尝试转换对象为字符串时调用了对象的 `toString()` 方法。对于普通 JavaScript 对象，`toString()` 方法并没有做特殊处理，所以返回的是对象的通用字符串表示形式，即 `[object Object]`。



要更详细地查看对象的内容，可以使用几种方法：

1. **直接传递对象给 `console.log`**: 不要将对象与字符串拼接。直接将对象作为参数传给 `console.log` 可以让浏览器控制台显示对象的可交互树形结构。

   ```javascript
   const obj = { name: 'Alice', age: 25 };
   console.log(obj); // 控制台将显示对象的详细结构
   ```

2. **使用 `console.dir`**: `console.dir` 方法可以显示一个对象的所有属性和方法，这对于调试复杂对象特别有用。

   ```javascript
   console.dir(obj);
   ```

3. **JSON.stringify**: 使用 `JSON.stringify` 可以将对象转换为其 JSON 字符串表示，这样可以在一行中看到整个对象。你还可以通过额外的参数美化输出。

   ```javascript
   console.log(JSON.stringify(obj));
   console.log(JSON.stringify(obj, null, 2)); // 第三个参数指定缩进，使输出更易读
   ```

4. **使用展开运算符或 `Object.assign()`**: 当你使用展开运算符时，在控制台打印时将会生成对象的浅拷贝，这也可以帮助展示对象的结构。

   ```javascript
   console.log({...obj});
   console.log(Object.assign({}, obj));
   ```





## Elementui的el-footer标签使用报错

###### 其余标签的使用没有报错信息

![image-20240506094514674](D:\Js\assets\image-20240506094514674.png)



###### el-footer的报错信息

![image-20240506094358189](D:\Js\assets\image-20240506094358189.png)

###### 原因:

​	警告信息表示 Vue 不识别 `<el-footer>`



###### 解决方式:

![image-20240506094636416](D:\Js\assets\image-20240506094636416.png)

###### 在组件中进行引入和暴露

## 单个标签的多个监听器绑定

```javascript
 <el-button 
	type="primary" 
	plain size="small" 
	@click="saveCallout(scope.row.responses) 
	@click="saveMessage(scope.row.responses)"
 >
      保存标注
 </el-button>
```

==语法错误==

###### 目的:对一个按钮绑定多个监听器处理事件

###### 解决方法:通过在一个处理事件内调用两个方法

```javascript
<el-button type="primary" plain size="small" @click="handleClick(scope.row.responses)">
  保存标注
</el-button>
```



```javascript
methods: {
  handleClick(responses) {
    this.saveCallout(responses);
    this.saveMessage(responses);
  },
  saveCallout(responses) {
    // 保存标注的逻辑
  },
  saveMessage(responses) {
    // 保存消息的逻辑
  }
}
```



## git push 报错

###### 报错信息

```bash
To https://github.com/xxxx/Js.git
 ! [rejected]        master -> master (fetch first)
error: failed to push some refs to 'https://github.com/xxxx/Js.git'
hint: Updates were rejected because the remote contains work that you do not
hint: have locally. This is usually caused by another repository pushing to
hint: the same ref. If you want to integrate the remote changes, use
hint: 'git pull' before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

###### 原因

错误信息说明试图推送到 GitHub 上的存储库时出现了冲突，因为远程仓库中含有本地没有的新内容。具体来说，有其他的更改已经被推送到同一个分支（此处为 `master` 分支），而本地分支落后于这些更改。

为解决这个问题，需要先将远程仓库的变更拉取（合并）到本地仓库中，然后再尝试推送你的更改



**拉取远程仓库的变更到本地：** 在命令行中，执行以下命令：

```bash
git pull origin master
```

**处理合并冲突**

```bash
git add .
```

###### push

```bash
git push origin master
```

## Shell脚本开机自动化启动程序

在Windows系统中，通常不使用传统的Shell脚本（如Bash脚本，这种脚本多用于类Unix系统），而是使用Windows PowerShell脚本或批处理（batch）脚本来实现类似的功能。下面将具体说明如何使用这些工具在每次启动Windows电脑时自动启动指定的应用程序。

### 方法1：使用批处理脚本（Batch Script）

1. **创建批处理文件**：
   打开记事本，输入以下命令行内容，按需修改以启动你需要的应用程序。例如，启动记事本和计算器：

   ```batch
   @echo off
   start notepad.exe
   start calc.exe
   ```

   保存此文件时，选择“所有文件”类型，文件名设为 `startup.bat`。

2. **将批处理文件放入启动文件夹**：
   - 按 `Win+R` 打开运行对话框，输入 `shell:startup`，按回车键。
   - 将你创建的 `startup.bat` 文件复制或移动到打开的文件夹中。

   这样，每次登录你的账户时，Windows就会运行这个批处理文件，从而启动列出的应用程序。

### 方法2：使用PowerShell脚本

1. **创建PowerShell脚本**：
   打开记事本，输入以下脚本内容，按需修改以启动你需要的应用程序。例如，启动记事本和计算器：

   ```powershell
   Start-Process "notepad.exe"
   Start-Process "calc.exe"
   ```

   保存此文件时，选择“所有文件”类型，文件名设为 `startup.ps1`。

2. **更改策略以允许脚本运行（如果需要）**：
   在运行PowerShell脚本之前，可能需要更改执行策略，因为Windows默认可能不允许执行未签名的脚本。打开PowerShell（以管理员身份），并运行以下命令：
   
   ```powershell
   Set-ExecutionPolicy RemoteSigned
   ```

   选择 [Y] 是（Yes）以确认更改。

3. **将脚本添加到启动文件夹**：
   使用和批处理文件相同的方法将 `startup.ps1` 文件放入 `shell:startup` 文件夹。

这两种方法都能达到在Windows电脑每次开机时自动启动指定应用的目的。根据你对批处理和PowerShell的熟悉度，可以选择其中一种方式实施。如果你更熟悉Windows环境并且有一定的编程基础，PowerShell 脚本提供了更多灵活和强大的操作选项。

在进行Windows启动脚本的配置过程中，关于应用程序路径的处理取决于具体情况：

1. **如果应用程序位于系统PATH环境变量中的路径**：在这种情况下，你不需要在脚本中指定完整的应用程序路径。像 `notepad.exe` 和 `calc.exe` 这样的系统应用程序通常都可以直接调用，因为它们的执行文件路径已被包含在系统的PATH环境变量中。

2. **如果应用程序不在系统的PATH环境变量中**：这种情况下，你需要在脚本中提供应用程序的完整路径。例如，如果你想启动一个位于 `C:\Program Files\MyApp` 文件夹中的应用程序 `myapp.exe`，你需要在脚本中这样写：

   **对于批处理脚本**：
   ```batch
   @echo off
   start "" "C:\Program Files\MyApp\myapp.exe"
   ```

   **对于PowerShell脚本**：
   ```powershell
   Start-Process "C:\Program Files\MyApp\myapp.exe"
   ```

在实际操作中，以下几个步骤可帮助确认是否需要完整路径：

- 尝试在命令行（CMD或PowerShell）中直接输入程序名运行，如能成功启动，则无需完整路径。
- 如果直接运行失败，提示找不到文件，那么则需要在脚本中使用完整路径。

确保测试你的脚本以验证它是否正常工作。这可以通过直接在命令行手动运行脚本来完成，看看是否如预期那样启动了需要的应用程序。

如果你想在启动时运行多个程序，你可以很简单地在同一个脚本中按顺序添加多个 `Start-Process` 命令行。每一个 `Start-Process` 命令都会启动一个程序。以下是一个PowerShell脚本的例子，展示如何同时启动多个应用程序。

### 创建一个PowerShell脚本

1. 打开记事本或任何文本编辑器。
2. 将以下代码输入到文本编辑器中。这里以启动 `Snipaste.exe` 和 Microsoft Word（假设它的路径为 `C:\Program Files\Microsoft Office\root\Office16\WINWORD.EXE`）为例：

```powershell
Start-Process "C:\Users\tushaokun\Downloads\Snipaste-2.8.8-Beta-x64\Snipaste.exe"
Start-Process "C:\Program Files\Microsoft Office\root\Office16\WINWORD.EXE"
```

3. 保存这个文件，确保文件扩展名为 `.ps1`，例如 `startup.ps1`。

### 设置执行策略（如果之前未设置）

打开PowerShell管理员窗口，执行以下命令（如果之前已做过这步，可以跳过）：
```powershell
Set-ExecutionPolicy RemoteSigned
```
选择 `[A] 是, 全部允许` 或 `[Y] 是` 来允许执行本地脚本。

### 将脚本添加到启动文件夹

1. 按 `Win + R` 来打开运行对话框。
2. 输入 `shell:startup` 并按回车。
3. 打开后的文件夹中，将你的 `startup.ps1` 脚本复制或移动到此位置。

### 重启你的电脑

重启电脑后，你应该会看到这些程序在用户登录后自动启动。

### 添加更多程序

如果你想添加更多的启动程序，只需按照上面相同的格式在脚本中添加更多的 `Start-Process` 行，每行对应一个程序的启动路径即可。

确保检查每个程序的路径是否正确，并确保PowerShell脚本没有语法错误。这样，你可以自定义多个程序在Windows用户登录时自动启动。这个方法非常灵活，可以根据需要添加任何数量的程序。

### Vue的provide和inject使用中出现的问题

```javascript
    
    // 解构赋值多模型对比属性,数据来自父组件index.vue
    const { multi: isMulti } = inject("settings");
	console.log(settings)
	//[Vue warn]: Error in data(): "ReferenceError: Cannot access 'settings' before initialization"
	const settings = inject("settings");
	console.log(settings)//输出正常
```

### console的各种方法

在JavaScript中，`console`对象提供了许多方法用于发送消息到浏览器的控制台。以下是一些常用的`console`方法的列表和简单描述：

1. **console.log()**
   - 最常用的方法，用于输出信息到控制台。
   - 示例: `console.log('Hello, world!');`

2. **console.info()**
   - 与`console.log()`相似，通常用于输出信息性的消息。
   - 示例: `console.info('Information message');`

3. **console.warn()**
   - 输出警告消息到控制台。
   - 示例: `console.warn('Warning message');`

4. **console.error()**
   - 输出错误消息到控制台。
   - 示例: `console.error('Error message');`

5. **console.debug()**
   - 输出调试信息到控制台，与`console.log()`类似，但可以通过控制台设置过滤只显示调试信息。
   - 示例: `console.debug('Debugging message');`

6. **console.table()**
   - 将数据以表格形式展示。
   - 示例: `console.table([{a: 1, b: 'Y'}, {a: 2, b: 'Z'}]);`

7. **console.assert()**
   - 用于进行断言测试，如果第一个参数的评估结果为`false`，则输出错误信息。
   - 示例: `console.assert(1 === 2, 'Assertion failed');`

8. **console.count()**
   - 输出特定标签被调用的次数。
   - 示例: `console.count('MyLabel');`

9. **console.countReset()**
   - 重置特定标签的计数器。
   - 示例: `console.countReset('MyLabel');`

10. **console.group() / console.groupEnd()**
    - 创建一个新的行内分组，使得输出的消息可以分组显示。
    - 示例:
      ```javascript
      console.group('My group');
      console.log('Info inside group');
      console.groupEnd();
      ```

11. **console.groupCollapsed()**
    - 类似`console.group()`，但新创建的分组默认是折叠的状态。
    - 示例:
      ```javascript
      console.groupCollapsed('My collapsed group');
      console.log('Info inside collapsed group');
      console.groupEnd();
      ```

12. **console.time() / console.timeEnd()**
    - 启动一个计时器，用以计算操作的持续时间。
    - 示例:
      ```javascript
      console.time('MyTimer');
      // 延时操作
      setTimeout(() => {
        console.timeEnd('MyTimer');
      }, 1000);
      ```

13. **console.dir()**
    - 显示一个对象的所有属性和方法。
    - 示例: `console.dir(document.body);`

14. **console.dirxml()**
    - 如果参数是一个 HTML 或 XML 元素，`console.dirxml()`会显示元素的树形视图。
    - 示例: `console.dirxml(document);`

15. **console.trace()**
    - 显示代码在控制台的堆栈跟踪。
    - 示例: `console.trace('Trace message');`

16. **console.clear()**
    
    - 清空控制台的所有输出。
    - 示例: `console.clear();`

这些方法在日常开发中非常有用，尤其是在调试和优化代码的过程中。在不同的浏览器和Node.js环境中，这些方法的表现可能略有不同。

## pdf

![1](../assets/1.png)

![2](../assets/2.png)

![3](../assets/3.png)
