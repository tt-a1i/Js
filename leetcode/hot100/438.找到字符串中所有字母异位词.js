var findAnagrams = function (s, p) {
  let l = 0, r = 0, res = [], arr = new Array(26).fill(0)
  const code = 'a'.charCodeAt()
  for(const c of p){
    arr[c.charCodeAt() - code]++
  }
  while(r < s.length){
    arr[s[r].charCodeAt() - code]--
    while(arr[s[r].charCodeAt() - code] < 0){
      arr[s[l].charCodeAt() - code]++
      l++
    }
    if(r - l + 1 === p.length) {
      res.push(l)
    }
    r++
  }
  return res
};
let s = "cba",
	p = "abc";
console.log(findAnagrams(s, p));
