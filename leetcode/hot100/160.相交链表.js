var getIntersectionNode = function(headA, headB) {
    let p1 = headA, p2 = headB
    while(p1 !== p2){
        p1 = p1 ? p1.next : headB
        p2 = p2 ? p2.next : headA
    }
    return p1
}
