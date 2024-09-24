class LinkList{
    constructor(val){
        this.val = val
        this.next = null
    }
}
function reverse(head){
    let curr = null, p = head
    while(p){
        let tmp = p;
        p = p.next;
        tmp.next = curr;
        curr = tmp;
    }
    const res = []
    p = curr;
    while(p){
        res.push(p.val)
        p = p.next;
    }
    console.log(res);
}
let l1 = new LinkList(1)
let l2 = new LinkList(2)
let l3 = new LinkList(3)
l1.next = l2;
l2.next = l3;
reverse(l1)