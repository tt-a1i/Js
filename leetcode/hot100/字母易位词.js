var groupAnagrams = function(strs) {
    const map = {}
    for(let str of strs){
        const arr = new Array(26).fill(0)
        for(let c of str){
            arr[c.charCodeAt() - 'a'.charCodeAt()]++
        }
        //对str进行添加而不是arr,arr是字母异位词的判定
        map[arr] ? map[arr].push(str) : map[arr] = [str]
    }
    return Object.values(map)
}
let strs = ["eat","tea","tan","ate","nat","bat"]
console.log(groupAnagrams(strs));