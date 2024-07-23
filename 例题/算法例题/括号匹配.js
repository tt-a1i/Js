function isValid(s){
    const map = {
        ')' : '(',
        '}' : '{',
        ']' : '['
    }
    const stack = []
    for(let i = 0; i < s.length; i++){
        // 如果是开括号，入栈
        if(!map[s[i]])
            stack.push(s[i])
        else{
            // 如果是闭括号，检查栈顶元素是否匹配
            if(stack.pop() !== map[s[i]]){
                return false
            }
        }
    }
    return stack.length === 0
}
console.log(func('()[]{[]}'));