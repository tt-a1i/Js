function arrayToTree(items) {
	const rootItems = [];  // 存储根节点
	const lookup = {};     // 用于快速查找节点
  
	// 第一次遍历:创建所有节点的查找表
	for (const item of items) {
	  const itemId = item.id;
	  const parentId = item.parentId;
  
	  // 如果查找表中还没有这个节点,则创建它
	  if (!lookup[itemId]) {
		lookup[itemId] = { ...item, children: [] };
	  } else {
		// 如果已经存在(因为可能是之前某个节点的父节点),则更新它
		lookup[itemId] = { ...item, ...lookup[itemId] };
	  }
  
	  const node = lookup[itemId];
  
	  if (parentId === null || parentId === undefined) {
		// 如果没有父节点,则为根节点
		rootItems.push(node);
	  } else {
		// 如果有父节点
		if (!lookup[parentId]) {
		  lookup[parentId] = { children: [] };
		}
		lookup[parentId].children.push(node);
	  }
	}
  
	return rootItems;
  }
  
  // 测试数据
  const flatArray = [
	{ id: 1, name: "Node 1", parentId: null },
	{ id: 2, name: "Node 2", parentId: 1 },
	{ id: 3, name: "Node 3", parentId: 1 },
	{ id: 4, name: "Node 4", parentId: 2 },
	{ id: 5, name: "Node 5", parentId: 2 },
	{ id: 6, name: "Node 6", parentId: 3 },
  ];
  
  const tree = arrayToTree(flatArray);
  console.log(JSON.stringify(tree, null, 2));