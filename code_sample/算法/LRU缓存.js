class Node {
	constructor(key, value) {
		this.key = key;
		this.value = value;
		this.next = null;
		this.prev = null;
	}
}
class LRUCache {
	constructor(capacity) {
		this.capacity = capacity;
		this.cache = new Map();
		this.head = new Node(null, null);
		this.tail = new Node(null, null);
		this.head.next = this.tail;
		this.tail.prev = this.head;
	}
	//获取缓存中的值,如果存在将其移动到链表头部
	get(key) {
		if (this.cache.has(key)) {
			const node = this.cache.get(key);
			this.moveToHead(node);
			return node.value;
		}
		return null;
	}
	//插入新值或者更新已有值, 插入位置为链表头部,
	//如果插入后cache大于LRU大小, 删除尾结点的值, 更新值的节点移动到链表头, 并删除cache中对应的key
	put(key, value) {
		if (this.cache.has(key)) {
			const node = this.cache.get(key);
			node.value = value;
			this.moveToHead(node);
		} else {
			const newNode = new Node(key, value);
			this.cache.set(key, newNode);
			this.addToHead(newNode);
			if (this.cache.size > this.capacity) {
				this.removeTail();
			}
		}
	}
	//添加到头部
	addToHead(node) {
		node.prev = this.head;
		node.next = this.head.next;
		this.head.next.prev = node;
		this.head.next = node;
	}
	//移动到链表头部
	moveToHead(node) {
		this.removeNode(node);
		this.addToHead(node);
	}
	//删除节点
	removeNode(node) {
		node.prev.next = node.next;
		node.next.prev = node.prev;
		node.next = null;
		node.prev = null;
	}
	//删除尾结点
	removeTail() {
		const node = this.tail.prev;
		this.removeNode(node);
		this.cache.delete(node.key);
	}
}

// 测试代码
const cache = new LRUCache(2);

cache.put(1, "A");
cache.put(2, "B");
console.log(cache.get(1)); // 输出: 'A'
cache.put(3, "C"); // 缓存已满，移除键为2的项
console.log(cache.get(2)); // 输出: null
console.log(cache.get(3)); // 输出: 'C'
cache.put(4, "D"); // 缓存已满，移除键为1的项
console.log(cache.get(1)); // 输出: null
console.log(cache.get(3)); // 输出: 'C'
console.log(cache.get(4)); // 输出: 'D'
