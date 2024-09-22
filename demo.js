try {
  throw new Error('error')
  console.log(111)
} catch (e) {
  console.log(e);
}