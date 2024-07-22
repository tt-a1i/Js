var uniqueInOrder=function(iterable){
  //your code here - remember iterable can be a string or an array
  if(!iterable) return []
  return iterable.split('').reduce((prev, cur) => {
    if(!prev.includes(cur)){
      prev.push(cur)
    }
    return prev
  }, [])
}