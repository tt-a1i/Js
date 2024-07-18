//空间复杂度O(1), 翻转前半部分链表,快慢指针找链表中点,从翻转后的位置和链表中点进行比较
var isPalindrome = function (head) {
    let p1 = head, p2 = head, curr = null, tmp
    while(p2 && p2.next !== null){
        tmp = p1
        p1 = p1.next
        p2 = p2.next.next
        tmp.next = curr
        curr = tmp
    }
    //链表长度为奇数,跳过中点
    if(p2 !== null){
        p1 = p1.next
    }
    while(p1 !== null){
        if(p1.val === curr.val) return false
        p1 = p1.next
        p2 = p2.next
    }
    return true
}