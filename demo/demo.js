var trap = function(height) {
    let sum = 0
    const stack = []
    let current = 0
    while(current < height.length){
        while(stack.length !== 0 && height[current] > height[stack[stack.length - 1]]){
            const h = height[stack.pop()]
            if(stack.length === 0) break
            const distance = current - stack[stack.length - 1] - 1
            const min = Math.min(height[current], height[stack[stack.length - 1]])
            sum += distance * (min - h)
        }
        stack.push(current++)
    }
    return sum
};
console.log(trap([0,1,0,2,1,0,1,3]))