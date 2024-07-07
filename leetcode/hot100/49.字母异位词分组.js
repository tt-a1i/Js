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
    //Object.values() 方法是在JavaScript中用于获取给定对象自身的所有可枚举属性值的数组。
    //换句话说，该方法会提取对象中每个属性的值并将这些值作为数组中的元素返回。
    return Object.values(map)
}
let strs = ["eat","tea","tan","ate","nat","bat"]
console.log(groupAnagrams(strs));