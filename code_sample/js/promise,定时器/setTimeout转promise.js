function delay(ms){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}

console.log('开始等待');

delay(2000).then(() => {
    console.log('2秒后输出这句话');
});

// 验证 async/await 方式
async function testDelay() {
    console.log('开始测试 async/await');
    await delay(3000);
    console.log('3秒后输出这句话');
}

testDelay();