function fabonaci(){
    let memo = [0, 1]
    for(let i = 1; i < 10; i++){
        memo.push(memo[i] + memo[i-1])
    }
    console.log(memo)
}
fabonaci()