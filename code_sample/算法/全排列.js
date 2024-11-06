/*
给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
*/
function permute(nums) {
    const path = [], res = []

    function backTracking(used) {
        if (path.length === nums.length) {
            res.push([...path])
            return
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue
            path.push(nums[i])
            used[i] = true
            backTracking(used)
            path.pop()
            used[i] = false
        }
    }

    backTracking([])
    return res
}

const nums = [1, 2, 3]
console.log(permute(nums))
