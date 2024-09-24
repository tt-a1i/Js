class Node {
	constructor(val) {
		this.next = null;
		this.value = val;
	}
}
class LinkList {
	constructor() {
		this.head = null;
	}
	add(value) {
		const newNode = new Node(value);
		if (!this.head) {
			this.head = newNode;
			return;
		}
		let pointer = this.head;
		while (pointer.next) {
			pointer = pointer.next;
		}
		pointer.next = newNode;
	}
	remove(value) {
		if (!this.head) {
			return;
		}
		if (this.head.value === value) {
			this.head = this.head.next;
			return;
		}
		let current = this.head;
		let previous = null;
		while (current !== null && current.value !== value) {
			previous = current;
			current = current.next;
		}
		if (current === null) {
			console.log("value not found in the list");
			return;
		}
		previous.next = current.next;
	}
	print() {
		const results = [];
		let current = this.head;
		while (current) {
			results.push(current.value);
			current = current.next;
		}
		console.log(results.join("-->"));
	}
}
const linkedList = new LinkList();
linkedList.add(10);
linkedList.add(20);
linkedList.add(30);
linkedList.print(); // 输出: 10 -> 20 -> 30

linkedList.remove(20);
linkedList.print(); // 输出: 10 -> 30

linkedList.remove(10);
linkedList.print(); // 输出: 30

linkedList.remove(30);
linkedList.print(); // 输出: (空链表)
