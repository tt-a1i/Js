var maxArea = function (height) {
	let l = 0,
		r = height.length - 1,
		area = 0;
    while(l !== r){
        if(height[l] < height[r]){
            area = Math.max(area, (r - l) * height[l])
            l++
        }else{
            area = Math.max(area, (r - l) * height[r])
            r--
        }
    }
    return area
};
let height = [1,8,6,2,5,4,8,3,7]
console.log(maxArea(height))
