function isAnagram(s1, s2){
    if(s1.length !== s2.length) return false
    let arr = new Array(100).fill(0)
    for(let c of s1){
        arr[c.charCodeAt() - 65]++
    }
    for(let c of s2){
        arr[c.charCodeAt() - 65]--
    }
    for(let n of arr){
        if(n !== 0) return false
    }
    return true;
}
console.log(isAnagram('listen', 'silent')); // true
console.log(isAnagram('hello', 'world'));   // false