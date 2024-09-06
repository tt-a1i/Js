function asyncOperation1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Operation 1 completed');
            resolve('Result of operation 1');
        }, 1000);
    });
}

function asyncOperation2(previousResult) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Operation 2 completed with:', previousResult);
            resolve('Result of operation 2');
        }, 1000);
    });
}

function asyncOperation3(previousResult) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Operation 3 completed with:', previousResult);
            resolve('Result of operation 3');
        }, 1000);
    });
}

// 串行执行
asyncOperation1()
    .then(result1 => {
        return asyncOperation2(result1);
    })
    .then(result2 => {
        return asyncOperation3(result2);
    })
    .then(result3 => {
        console.log('All operations completed. Final result:', result3);
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });