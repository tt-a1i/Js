class Node {
	constructor(key, value) {
		this.key = key;
		this.value = value;
		this.prev = null;
		this.next = null;
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

	get(key) {
		if (this.cache.has(key)) {
			const node = this.cache.get(key);
			this.moveToHead(node);
			return node.value;
		}
		return null;
	}

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
				const removedNode = this.removeTail();
				this.cache.delete(removedNode.key);
			}
		}
	}

	moveToHead(node) {
		this.removeNode(node);
		this.addToHead(node);
	}

	removeNode(node) {
		const prevNode = node.prev;
		const nextNode = node.next;
		prevNode.next = nextNode;
		nextNode.prev = prevNode;
	}

	addToHead(node) {
		node.prev = this.head;
		node.next = this.head.next;
		this.head.next.prev = node;
		this.head.next = node;
	}

	removeTail() {
		const tailNode = this.tail.prev;
		this.removeNode(tailNode);
		return tailNode;
	}
}

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
