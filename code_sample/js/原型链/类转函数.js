class Example1{
    constructor(){
        this.name = name
    }
    func(){
        console.log(this.name)
    }
}
//转换后
'use strict'
function Example(name){
    if(!new.target){
        throw new TypeError('only new')
    }
    this.name = name
}
Example.prototype.func = function(){
    console.log(this.name)
}
Example('a')//error
