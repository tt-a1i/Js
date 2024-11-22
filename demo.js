function solution(s) {
  // 去除前导零
  s = parseFloat(s).toString();

  // 分离整数部分和小数部分
  let parts = s.split('.');
  let integerPart = parts[0];
  let decimalPart = parts.length > 1 ? '.' + parts[1] : '';

  // 使用正则表达式为整数部分添加千分位逗号
  let formattedIntegerPart = '';
  let count = 0;
  for (let i = integerPart.length - 1; i >= 0; i--) {
      if (count > 0 && count % 3 === 0) {
          formattedIntegerPart = ',' + formattedIntegerPart;
      }
      formattedIntegerPart = integerPart[i] + formattedIntegerPart;
      count++;
  }

  // 返回格式化后的字符串
  return formattedIntegerPart + decimalPart;
}

function main() {
  console.log(solution("1294512.12412") === '1,294,512.12412');
  console.log(solution("0000123456789.99") === '123,456,789.99');
  console.log(solution("987654321") === '987,654,321');
}

main();