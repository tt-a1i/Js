var trap = function(height) {
    const stack = []
    let area = 0
    let curr = 0
    while(curr < height.length){
        while(stack.length !== 0 && height[curr] > height[stack[stack.length - 1]]){
            const h = height[stack.pop()]
            if(stack.length === 0) break
            const distance = curr - stack[stack.length - 1] - 1
            const min = Math.min(height[curr], height[stack[stack.length - 1]])
            area += distance * (min - h)
        }
        stack.push(curr++)
    }
    return area
}
let height = [0,1,0,2,1,0,1,3,2,1,2,1]
console.log(trap(height));