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











