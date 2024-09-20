function sum(a){
    function helper(b){
        if(arguments.length === 0) return a;
        return sum(a + b);
    }
    return helper;
}
let s = sum(1)(2)(3)()
console.log(s);
