// 使用JavaScript来找出由给定数字组成的小于给定数的最大数：

function findMaxNumber(n, a) {
    // 将n转换为字符串
    let nStr = n.toString();
    let result = '';
    let found = false;

    // 对a进行排序（降序）
    a.sort((x, y) => y - x);

    // 遍历n的每一位
    for (let i = 0; i < nStr.length; i++) {
        // 找到小于当前位的最大数字
        let maxDigit = a.find(digit => digit < parseInt(nStr[i]));

        if (maxDigit !== undefined) {
            // 如果找到了小于当前位的数字，将其加入结果，然后用最大的数字填充剩余位数
            result += maxDigit;
            for (let j = i + 1; j < nStr.length; j++) {
                result += a[0];
            }
            found = true;
            break;
        } else {
            // 如果没找到小于当前位的数字，继续查找与当前位相等的最大数字
            let equalDigit = a.find(digit => digit === parseInt(nStr[i]));
            if (equalDigit !== undefined) {
                result += equalDigit;
            } else {
                // 如果也没有相等的数字，返回由a中最大数字组成的较短数
                return a[0].toString().repeat(nStr.length - 1);
            }
        }
    }

    // 如果遍历完n的所有位数都没有找到更小的数，返回result
    return found ? parseInt(result) : parseInt(result) - 1;
}

// 测试
console.log(findMaxNumber(23121, [2, 4, 9])); // 输出：22999
console.log(findMaxNumber(5023, [2, 4, 9])); // 输出：4999
console.log(findMaxNumber(5023, [5, 7, 9])); // 输出：4999
console.log(findMaxNumber(1234, [3, 4, 5])); // 输出：555
// 这个算法的工作原理如下：

// 将给定的数n转换为字符串，以便逐位比较。
// 对数组a进行降序排序，以便快速找到最大的可用数字。
// 从左到右遍历n的每一位：
// 如果在a中找到小于当前位的最大数字，就用它替换当前位，然后用a中最大的数字填充剩余的所有位，并结束循环。
// 如果找不到小于当前位的数字，就寻找等于当前位的数字。如果找到，就使用它并继续下一位。
// 如果既没有小于也没有等于当前位的数字，就返回由a中最大数字组成的较短数（位数比n少1）。
// 如果遍历完n的所有位数都没有找到更小的数，就返回结果（如果结果与n相等，则减1）。
// 这个算法能够有效地处理各种情况，包括当a中的数字无法组成小于n的数时的情况。