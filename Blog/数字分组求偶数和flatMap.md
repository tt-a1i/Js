### 问题描述

小M面对一组从 1 到 9 的数字，这些数字被分成多个小组，并从每个小组中选择一个数字组成一个新的数。目标是使得这个新数的各位数字之和为偶数。任务是计算出有多少种不同的分组和选择方法可以达到这一目标。

- `numbers`: 一个由多个整数字符串组成的列表，每个字符串可以视为一个数字组。小M需要从每个数字组中选择一个数字。

例如对于`[123, 456, 789]`，14个符合条件的数为：`147 149 158 167 169 248 257 259 268 347 349 358 367 369`。

------

### 测试样例

***样例1：***

> 输入：`numbers = [123, 456, 789]`
> 输出：`14`

***样例2：***

> 输入：`numbers = [123456789]`
> 输出：`4`

***样例3：***

> 输入：`numbers = [14329, 7568]`
> 输出：`10`

### code

```javascript
function solution(numbers) {
  //生成所有的组合, 再对每组组合求和
  let combinations = numbers.reduce((acc, cur) => {
    return acc.flatMap(x => String(cur).split('').map(digit => x + digit))
  }, [''])

  let count = 0
  for(let combination of combinations){
    let digit = combination.split('').reduce((acc, cur) => acc + Number(cur), 0)
    if(digit % 2 === 0) count++
  }
  return count
}

function main() {
  // You can add more test cases here
  console.log(solution([123, 456, 789]) === 14);
  console.log(solution([123456789]) === 4);
  console.log(solution([14329, 7568]) === 10);
}

main();
```

