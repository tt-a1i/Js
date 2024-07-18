var reverseList = function(head) {
    let p1 = head, p2 = null, tmp
    while(p1){
        tmp = p1
        p1 = p1.next
        tmp.next = p2
        p2 = tmp
    }
    return p2
}