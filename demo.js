function unflattenObject(flatObject) {
    const nestedObject = {};
  
    for (const flatKey in flatObject) {
      const keys = flatKey.split('.');
      let currentLevel = nestedObject;

      keys.forEach((key, index) => {
        if (!currentLevel[key]) {
          currentLevel[key] = {};
        }
  
        if (index === keys.length - 1) {
          currentLevel[key] = flatObject[flatKey];
        }
  
        currentLevel = currentLevel[key];
      });
    }
  
    return nestedObject;
  }
  
  // 示例使用
  const flatObject = {
    'a.b.c': 2,
    'a.b.d': 3,
    'x.y': 5
  };
  
  const nestedObject = unflattenObject(flatObject);
  console.log(nestedObject);