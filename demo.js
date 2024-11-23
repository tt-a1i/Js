function solution(numbers) {
  // 生成所有可能的组合
  let combinations = numbers.reduce((acc, group) => {
    return acc.flatMap(x => String(group).split('').map(digit => x + digit));
}, ['']);
// 统计符合条件的组合数量
let count = 0;
for (let combination of combinations) {
    // 计算组合的各位数字之和
    let digitSum = combination.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    // 检查和是否为偶数
    if (digitSum % 2 === 0) {
        count++;
    }
}
return count;
}
function main() {
// You can add more test cases here
console.log(solution([123, 456, 789]) === 14);
console.log(solution([123456789]) === 4);
console.log(solution([14329, 7568]) === 10);
}

main();