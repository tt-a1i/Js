function myNew(constructor, ...args){
    const obj = {};
    Object.setPrototypeOf(obj, constructor.prototype)
    let result = constructor.apply(obj, args)
    return result instanceof Object ? result : obj;
}
function Person(name){
    this.name = name;
}
const tom = myNew(Person, 'tom')
console.log(tom.name);
