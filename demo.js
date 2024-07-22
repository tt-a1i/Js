class ListNode{
	constructor(val){
		this.value = val
		this.next = null
	}
}
function hasCycle(head){
	let h1 = head, h2 = head
	while(h1 && h1.next){
		h1 = h1.next
		h2 = h2.next.next
		if(h1 === h2){
			return true
		}
	}
	return false
}
let node1 = new ListNode(1);
let node2 = new ListNode(2);
let node3 = new ListNode(3);
let node4 = new ListNode(4);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node2; // 创建一个环

console.log(hasCycle(node1)); 