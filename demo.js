function deleteNth(arr, n) {
    const map = new Map();
    return arr.filter((num) => {
        const count = map.get(num) || 0;
        if (count >= n) {
            return false;
        }
        map.set(num, count + 1);
        return true;
    });
}

// 测试
console.log(deleteNth([1, 1, 3, 3, 7, 2, 2, 2, 2], 3)); //  [1, 1, 3, 3, 7, 2, 2, 2]
