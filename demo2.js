function deleteNth(arr, n) {
  // ...
  let res = [];
  const map = {};
  for (let k of arr) {
    map[k] ? (map[k] = 1) : (map[k] += 1);
    if (map[k] <= n) res.push(k);
  }
  return res;
}
console.log(deleteNth([20, 37, 20, 21], 1));
