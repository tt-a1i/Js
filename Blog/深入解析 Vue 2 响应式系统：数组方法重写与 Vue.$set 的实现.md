## 深入解析 Vue 2 响应式系统：数组方法重写与 Vue.$set 的实现

Vue 2 的响应式系统为我们提供了强大的数据驱动视图更新的能力，其中有两个核心技术点值得深入探讨：**数组方法的重写**和**动态属性添加的 Vue.$set**。这篇文章将逐步解析这两部分的实现原理和代码细节。

其中的示例部分也可以复制粘贴尝试一下

---

### 一、Vue 2 中重写数组方法的实现方式

在 Vue 2 中，数组的变更（如 `push`、`pop` 等操作）并不会直接触发响应式更新。为了解决这个问题，Vue 对数组的一些方法进行了重写，使得数组的变化能够触发依赖更新并反映到视图中。

#### 实现原理

1. **创建一个新的数组方法对象**：
   - Vue 先创建一个对象 `arrayMethods`，其原型指向原生的 `Array.prototype`。
   - 这个对象会拦截数组的一些特定方法，并在方法执行后触发依赖更新。

2. **重写需要拦截的方法**：
   - Vue 重写了以下数组方法：`push`、`pop`、`shift`、`unshift`、`splice`、`sort` 和 `reverse`。

3. **将数组的原型指向新对象**：
   - Vue 在初始化数组时，将其原型指向 `arrayMethods`，以拦截这些方法的调用。

4. **通知视图更新**：
   - 重写的方法在执行原生逻辑后，会调用观察者的 `notify` 方法通知依赖更新。

#### 核心代码实现

```javascript
// 保存原始的 Array 原型
const arrayProto = Array.prototype;

// 创建一个新的对象继承自 Array.prototype
const arrayMethods = Object.create(arrayProto);

// 需要拦截的数组方法
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

// 重写这些方法
methodsToPatch.forEach(function (method) {
  const original = arrayProto[method]; // 保存原始方法
  Object.defineProperty(arrayMethods, method, {
    value: function (...args) {
      const result = original.apply(this, args); // 调用原始方法

      // 获取该数组的观察者对象
      const ob = this.__ob__;

      // 对新增元素进行响应式处理
      let inserted;
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;
        case 'splice':
          inserted = args.slice(2); // splice 的第三个参数是新插入的元素
          break;
      }
      if (inserted) ob.observeArray(inserted); // 对新增元素进行响应式处理

      // 通知依赖更新
      ob.dep.notify();

      return result;
    },
    configurable: true,
    writable: true
  });
});
```

#### 使用示例

```javascript
const data = [];
data.__proto__ = arrayMethods; // 手动设置响应式

data.__ob__ = {
  dep: {
    notify: () => console.log('视图更新！')
  },
  observeArray: (items) => console.log('新元素变为响应式', items)
};

data.push(1); // 输出：新元素变为响应式 [1]，视图更新！
data.pop();   // 输出：视图更新！
```

---

### 二、Vue.$set 的实现原理

在 Vue 2 中，直接添加对象属性（如 `obj.newProp = value`）或修改数组索引（如 `arr[1] = value`）不会触发响应式更新。这是因为 Vue 的响应式系统是基于 `Object.defineProperty` 的，无法检测这些操作。

#### Vue.$set 的目的

1. **动态添加对象属性**：
   - Vue.$set 使用 `Object.defineProperty` 将新属性转换为响应式，并触发依赖更新。

2. **修改数组索引**：
   - Vue.$set 对于数组的索引修改，实际上是通过 `splice` 方法模拟实现的，因为 `splice` 是响应式的。

#### 核心实现

```javascript
function set(target, key, value) {
  // 如果目标是数组
  if (Array.isArray(target)) {
    target.splice(key, 1, value); // 使用 splice 替代
    return value;
  }

  // 如果目标是对象且属性已存在
  if (key in target && !(key in Object.getOwnPropertyDescriptor(target))) {
    target[key] = value; // 直接赋值
    return value;
  }

  // 获取目标的观察者对象
  const ob = target.__ob__;

  // 如果目标不是响应式对象，直接赋值
  if (!ob) {
    target[key] = value;
    return value;
  }

  // 动态添加属性
  defineReactive(ob.value, key, value);

  // 通知依赖更新
  ob.dep.notify();

  return value;
}

function defineReactive(obj, key, val) {
  const dep = new Dep(); // 创建依赖收集器
  let childOb = observe(val); // 递归转换为响应式
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
      }
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      val = newVal;
      childOb = observe(newVal); // 如果是对象，递归转换
      dep.notify(); // 通知更新
    }
  });
}
```

#### 使用示例

```javascript
const obj = {};
Vue.set(obj, 'newKey', 'newValue'); // 动态添加属性
console.log(obj.newKey); // 输出：'newValue'

const arr = [1, 2, 3];
Vue.set(arr, 1, 42); // 修改数组索引
console.log(arr); // 输出：[1, 42, 3]
```

---

### 总结

#### 数组方法重写
Vue 2 重写了数组的部分方法，通过替换数组的原型链实现拦截操作，结合观察者通知依赖更新。

#### Vue.$set
为了解决动态添加属性和数组索引变更无法响应的问题，Vue.$set 提供了兼容方案，手动触发依赖更新。

#### 局限性
Vue 2 的响应式系统由于基于 `Object.defineProperty`，无法直接监听属性的添加和数组的索引变更。而 Vue 3 基于 `Proxy` 的响应式系统解决了这些问题，直接操作即可触发响应更新。