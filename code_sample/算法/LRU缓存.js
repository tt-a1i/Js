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

  // 获取缓存中的值，如果存在则将其移到链表头部
  get(key) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key);
      this.moveToHead(node);
      return node.value;
    }
    return null;
  }

  // 插入或更新缓存中的值，如果缓存已满则移除最近最少使用的节点
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

  // 将节点移到链表头部
  moveToHead(node) {
    this.removeNode(node);
    this.addToHead(node);
  }

  // 从链表中移除节点
  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  // 将节点添加到链表头部
  addToHead(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  // 移除链表尾部的节点
  removeTail() {
    const tailNode = this.tail.prev;
    this.removeNode(tailNode);
    return tailNode;
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