// 定义构造函数
function MyObject() {
    // 在构造函数中定义数组属性
    this.myArray = [];
  }
  
  // 创建两个实例
  let obj1 = new MyObject();
  let obj2 = new MyObject();
  
  // 修改第一个实例的数组
  obj1.myArray.push('item1');
  
  console.log('obj1.myArray:', obj1.myArray);  // 输出: ['item1']
  console.log('obj2.myArray:', obj2.myArray);  // 输出: []