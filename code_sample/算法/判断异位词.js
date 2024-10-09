function isAnagram(s1, s2) {
    if (s1.length !== s2.length) return false;
    let arr = new Array(26).fill(0);
    for (let i = 0; i < s1.length; i++) {
        arr[s1.charCodeAt(i) - 97]++;
        arr[s2.charCodeAt(i) - 97]--;
    }
    for (let n of arr) {
        if (n !== 0) return false;
    }
    return true;
}

console.log(isAnagram('listen', 'silent')); // true
console.log(isAnagram('hello', 'world'));   // false