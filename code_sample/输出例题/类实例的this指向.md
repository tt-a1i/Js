```javascript
var name = 2
class test{
    name: 1,
    test: () => {
        console.log(this.name)
    }
}
```
### 为什么不能写成这样的形式

你说得没错，箭头函数确实会继承**外部作用域**的 `this`。不过，在类中，箭头函数继承的是**类实例**的 `this`，而不是全局的 `this`。这需要看箭头函数是在**什么上下文**中定义的。

### 具体解释

1. **全局环境中的箭头函数**：
   如果箭头函数是在全局作用域中定义的，它会继承全局的 `this`（即 `window` 对象或者在 Node.js 中是 `global` 对象）。

   ```javascript
   var name = 2;
   const test = () => {
       console.log(this.name);  // 在全局作用域，this 指向全局对象
   }
   test();  // 输出 undefined，因为全局的 this 没有 name 属性（非严格模式下 this.name 为 undefined）
   ```

2. **类中的箭头函数**：
   在类中，箭头函数继承的是定义该箭头函数时的**外部作用域**，而类的外部作用域是**类实例**，不是全局作用域。因此，箭头函数中的 `this` 指向类的实例，而不是全局的 `this`。

   ### 示例：
   ```javascript
   var name = 2;
   class Test {
       name = 1;  // 类实例的属性 name
       test = () => {
           console.log(this.name);  // this 指向类的实例
       }
   }

   let n = new Test();
   n.test();  // 输出 1
   ```

   在这个例子中，`test` 是一个箭头函数，它定义在 `Test` 类的内部。由于箭头函数继承了它定义时的外部 `this`，而这个外部 `this` 指向的是类的实例 `n`，因此 `this.name` 访问的是 `n` 实例的 `name` 属性，值为 `1`。

### 为什么不是全局的 `this`？
- 如果你定义的箭头函数是在类的内部，那么外部作用域就是类的实例，而不是全局作用域。
- 箭头函数不会改变 `this` 的指向，它永远使用它定义时的作用域中的 `this`。
- 在类的上下文中，`this` 代表的是当前类的实例，而不是全局对象。

### 举例对比全局 `this` 和类的 `this`：

- **全局环境**:
   ```javascript
   var name = 2;
   const test = () => {
       console.log(this.name);  // 在全局作用域，this 是全局对象
   };
   test();  // 输出 undefined（严格模式下为 undefined）
   ```

- **类中的箭头函数**:
   ```javascript
   var name = 2;
   class Test {
       name = 1;
       test = () => {
           console.log(this.name);  // this 继承自类实例
       }
   }
   let n = new Test();
   n.test();  // 输出 1（this 指向类的实例）
   ```

### 总结：
- 箭头函数继承的是定义它时的 `this`，而不是调用它时的 `this`。
- 在类中，箭头函数继承的是类的实例的 `this`，所以在类中 `this` 指向类实例，而不是全局对象。