//创建map存储id和元素的映射,并添加children数组, 遍历map.values  判断添加根节点到tree  将对应子节点添加到根节点的children
function arrayToTree(items) {
	const map = new Map();
	const tree = [];

	for (const item of items) {
		map.set(item.id, { ...item, children: [] });
	}

	for (const item of map.values()) {
		if (!item.parentId) {
			tree.push(item);
		} else {
			const parent = map.get(item.parentId);
			if (parent) {
				parent.children.push(item);
			} else {
				tree.push(item);
			}
		}
	}

	return tree;
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
