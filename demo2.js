let thenable = {
    then: function(resolve, reject){
        reject(1)
    }
}
let p = new Promise((resolve, reject) => {
    resolve(thenable)
})
p.then(val => {console.log(val)}, err => {console.log(err + 1)})