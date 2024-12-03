function longestMountain(arr) {
    if (arr.length < 3) return 0;

    let maxLength = 0;

    for (let i = 1; i < arr.length - 1; i++) {
        // 找到山脉的顶点
        if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) {
            let left = i - 1;
            let right = i + 1;

            // 向左扩展，找到山脉的左边界
            while (left > 0 && arr[left] > arr[left - 1]) {
                left--;
            }

            // 向右扩展，找到山脉的右边界
            while (right < arr.length - 1 && arr[right] > arr[right + 1]) {
                right++;
            }

            // 计算山脉的长度
            let mountainLength = right - left + 1;
            maxLength = Math.max(maxLength, mountainLength);
        }
    }

    return maxLength;
}

// 示例测试
console.log(longestMountain([2, 1, 4, 7, 3, 2, 5])); // 输出 5
console.log(longestMountain([2, 2, 2])); // 输出 0
