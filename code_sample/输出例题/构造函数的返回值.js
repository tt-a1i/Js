function Person() {
    this.name = 'Jack';
}
var p = new Person();
console.log(p.name);
var q = Person();
//这里调用 Person() 时没有使用 new 关键字，导致 this 指向全局对象（在浏览器中是 window）
//window.name 被设置为 'Jack'。构造函数没有返回值, q是undefined
console.log(q);
console.log(name);
console.log(q.name);//q 是 undefined，尝试访问 q.name 会导致错误