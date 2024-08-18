const arr = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];

const index = 1;         // 需要修改第二个元素
const property = 'name'; // 需要修改的属性
const newValue = 'John'; // 新的属性值

const newArray = arr.map((item, i) => i === index ? { ...item, [property]: newValue } : item);

console.log(newArray);
/*
输出:
[
    { id: 1, name: 'Alice' },
    { id: 2, name: 'John' },
    { id: 3, name: 'Charlie' }
]
*/

// 原数组不变
console.log(arr);
/*
输出:
[
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
]
*/