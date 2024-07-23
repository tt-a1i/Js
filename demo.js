function arrayToTree(arr){
	const tree = []
	const map = new Map()
	for(let item of arr){
		map.set(item.id, {...item, children: []})
	}
	for(let item of map.values()){
		if(item.parentId === null) tree.push(item);
		else{
			const parent = map.get(item.parentId)
			if(parent) parent.children.push(item)
			else tree.push(item)
		}
	}
	return tree
}
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