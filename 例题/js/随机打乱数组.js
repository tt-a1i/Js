function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // 生成一个随机索引 j，范围从 0 到 i
      const j = Math.floor(Math.random() * (i + 1));
      // 交换元素 array[i] 和 array[j]
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // 使用示例
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  console.log('Original Array:', arr);
  console.log('Shuffled Array:', shuffleArray(arr));