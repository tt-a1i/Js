async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async end')
  }
  async function async2() {
    console.log('async2')
  }
  console.log('script start')
  async1()
  setTimeout(() => {console.log('settimeout')})
  new Promise((resolve) => {
    console.log('promise')
    resolve()
  }).then(res => {
    console.log('promise then')
  })
  console.log('script end')