function addLargeNumbers(num1, num2) {
    let carry = 0;
    let result = '';
    let i = num1.length - 1;
    let j = num2.length - 1;

    while (i >= 0 || j >= 0 || carry > 0) {
        const digit1 = i >= 0 ? parseInt(num1[i]) : 0;
        const digit2 = j >= 0 ? parseInt(num2[j]) : 0;

        const sum = digit1 + digit2 + carry;
        result = (sum % 10) + result;
        carry = Math.floor(sum / 10);

        i--;
        j--;
    }

    return result;
}
console.log(addLargeNumbers('123456789', '987654321')); // 输出: "1111111110"
console.log(addLargeNumbers('9007199254740991', '1')); // 输出: "9007199254740992"