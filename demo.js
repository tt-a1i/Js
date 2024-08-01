function findCommonElements(array1, array2) {
    const map = new Map(array2.map(item => [item.id, item]))
    return array1.filter(item => map.has(item.id))
}
const array1 = [
    { id: 11, name: 'Alice' },
    { id: 21, name: 'Bob' },
    { id: 31, name: 'Charlie' },
    { id: 41, name: 'David' }
  ];
  
  const array2 = [
    { id: 21, age: 30 },
    { id: 31, age: 25 },
    { id: 51, age: 35 }
  ];
  
  const result = findCommonElements(array1, array2);
  console.log(result);