name = 'a'
let obj = {
    name: 'b',
    func: () => console.log(this.name)
}
obj.func()