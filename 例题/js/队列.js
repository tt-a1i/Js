class Queue {
	constructor() {
		this.stack1 = [];
		this.stack2 = [];
	}
	enqueue(val) {
		this.stack1.push(val);
	}
	dequeue() {
		if (this.stack2.length === 0) {
			while (this.stack1.length > 0) {
				this.stack2.push(this.stack1.pop());
			}
		}
		if (this.stack2.length === 0) {
			throw new Error("queue is empty");
		}
		return this.stack2.pop();
	}
	front() {
		if (this.stack2.length > 0) {
			return this.stack2[0];
		} else if (this.stack1.length > 0) {
			return this.stack1[0];
		} else {
			throw new Error("queue is empty");
		}
	}
	isEmpty() {
		return this.stack1.length === 0 && this.stack2.length === 0;
	}
}
// 测试用例
const queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
console.log(queue.front()); // 输出 10
console.log(queue.dequeue()); // 输出 10
console.log(queue.dequeue()); // 输出 20
console.log(queue.isEmpty()); // 输出 true
