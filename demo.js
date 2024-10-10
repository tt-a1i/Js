let str = 'aabbc'
let res = [...str].reduce((prev, curr) => (prev[curr]++ || (prev[curr] = 1), prev), {})
console.log(res);
