/**
 * 创建SKU的所有组合
 * @param {string} spu - 基本的产品单元符号
 * @param {Array} specList - 一个包含所有规格组合的数组
 * @return {Array<string>} - 包含所有SKU组合的数组
 */
function createSKU(spu, specList) {
    const result = [];
  
    // 递归函数，用于生成SKU组合
    function generateCombination(current, index) {
      if (index === specList.length) {
        result.push(`${spu}-${current.join('-')}`);
        return;
      }
  
      // 迭代当前规格的每个选项
      for (const option of specList[index]) {
        // 添加选项到当前组合中，然后递归生成其后的组合
        generateCombination([...current, option], index + 1);
      }
    }
  
    // 开始递归，初始组合为空，从第0个规格开始
    generateCombination([], 0);
  
    return result;
  }
  
  // 调用示例
  const spu = 'AB1234567';
  const specList = [ 
    ['red', 'yellow'],
    ['XL', 'S'], 
    ['a1', 'a2'],
    ['b1', 'b2'],
  ];
  
  console.log(createSKU(spu, specList))