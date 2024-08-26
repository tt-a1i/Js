const nums = [10, 9, 2, 5, 3, 7, 101, 18];
function func(arr){
  const dp = Array(arr.length).fill(1);
  for(let i = 1; i < arr.length; i++){
    for(let j = 0; j < i; j++){
      if(nums[i] > nums[j] && j === i - 1){
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }
  return Math.max(...dp)
}
console.log(func(nums));
