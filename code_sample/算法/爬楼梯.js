function climbStairs1(n) {
    if (n <= 2) return n;
    
    let dp = new Array(n + 1);
    dp[1] = 1;
    dp[2] = 2;
    
    for (let i = 3; i <= n; i++) {
      dp[i] = dp[i-1] + dp[i-2];
    }
    
    return dp[n];
  }
  function climbStairs2(n) {
    if (n <= 2) return n;
    
    let prev = 1;
    let curr = 2;
    
    for (let i = 3; i <= n; i++) {
      let temp = curr;
      curr = prev + curr;
      prev = temp;
    }
    
    return curr;
  }