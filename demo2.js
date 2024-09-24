function formatNumber(num){
    if(num > 1000){
        return formatNumber(Math.floor(num / 1000)) + ',' + num % 1000;
    }else{
        return num
    }
}
console.log(formatNumber(1234567));
