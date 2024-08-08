function isInheritedFrom(A, B) {
    return A.prototype instanceof B;
  }
  
class Animal{}
class Dog extends Animal{}
class Cat{}


console.log(isInheritedFrom(Dog, Animal));
console.log(isInheritedFrom(Cat, Animal));  
