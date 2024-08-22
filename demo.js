function myNew(constructor, ...args) {
  const obj = {};
  obj.__proto__ = constructor.prototype;

  const result = constructor.apply(obj, args);
   return 
}