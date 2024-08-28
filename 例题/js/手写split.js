function mySplit(str, separator){
    const result = []
    let curr = ''
    for(let i = 0; i < str.length; i++){
        if(str.slice(i, i + separator.length) === separator){
            result.push(curr)
            curr = ''
            i += separator.length - 1
        }else{
            curr += str[i]
        }
    }
    result.push(curr)
    return result
}
console.log(mySplit('hello, world', ','));
