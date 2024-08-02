class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
class binarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value);
        if (!this.root) {
            this.root = newNode;
            return this;
        }
        let current = this.root;
        while (true) {
            if (value === current.value) return this;
            const dir = value < current.value ? 'left' : 'right';
            if (!current[dir]) {
                current[dir] = newNode;
                return this;
            }
            current = current[dir];
        }
    }

    search(value) {
        let current = this.root;
        while (current) {
            if (value === current.value) return true;
            current = value < current.value ? current.left : current.right;
        }
        return false;
    }

    delete(value) {
        const removeNode = (node, val) => {
            if (!node) return null;
            
            if (val < node.value) {
                node.left = removeNode(node.left, val);
            } else if (val > node.value) {
                node.right = removeNode(node.right, val);
            } else {
                if (!node.left && !node.right) return null;
                if (!node.left) return node.right;
                if (!node.right) return node.left;
                
                let temp = node.right;
                while (temp.left) temp = temp.left;
                node.value = temp.value;
                node.right = removeNode(node.right, temp.value);
            }
            
            return node;
        };
    
        this.root = removeNode(this.root, value);
    }
}

// 测试用例
const bst = new binarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);
console.log(bst.search(10)); // 应输出 true
console.log(bst.search(7));  // 应输出 false
bst.insert(3);
bst.insert(7);
console.log(bst.search(7));  // 应输出 true
bst.delete(10);
console.log(bst.search(10)); // 应输出 false
console.log(bst.search(15)); // 应输出 true