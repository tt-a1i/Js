var longestConsecutive = function(nums) {
    //为什么使用set,只需要判断数字是否存在,set更为简单
    const set = new Set()
    for(let n of nums) set.add(n)
    let longestStreak = 0
    for(let i = 0; i < nums.length; i++){
        //当存在nums[i] + 1时,会造成重复花费多余时间,做判断进行优化,只进行一次遍历
        if(set.has(nums[i] + 1)) continue
        let curr = 1
        let n = nums[i]
        while(set.has(n - 1)){
            n--
            curr++
        }
        longestStreak = Math.max(curr, longestStreak)
    }
    return longestStreak
}
let nums = [100,4,200,1,3,2]
console.log(longestConsecutive(nums));