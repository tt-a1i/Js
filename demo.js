function safeFlatten(array, parentArrays = []){
    const result = []
    for(let item of array){
        if(Array.isArray(item)){
            if(parentArrays.includes(item)){
                throw new Error('Detected a cycle in array');
            }
            parentArrays.push(item)
            result = result.concat(safeFlatten(item, parentArrays))
            parentArrays.pop()
        }else{
            result.push(item)
        }
    }
    return result
}
const a = [1];
const b = [2];
const c = [3, a, b];
a.push(c);
b.push(a);

try {
    console.log(safeFlatten(a));
} catch (error) {
    console.error(error);
}
/*
要了解为什么两段代码输出的错误不一样，首先要确认每段代码的 catch 语句是如何处理异常的。

在第一段代码中，异常处理如下：

try {
    console.log(safeFlatten(a));
} catch (e) {
    console.log(e.message); // 输出错误消息
}
在这里，当 safeFlatten 函数抛出错误时，catch 块捕获错误对象 e 并输出 e.message。e.message 应当是您在 throw new Error('Detected a cycle in array') 中设置的字符串 "Detected a cycle in array"。

在第二段代码中，异常处理如下：

try {
    console.log(safeFlatten(a));
} catch (error) {
    console.error(error);
}
在这里，异常处理使用了 console.error(error); 来输出错误，而不是 error.message。这将打印出整个错误对象，包括错误消息和栈追踪信息。

因此，第一段代码只显示了错误消息，而第二段代码则显示了完整的错误对象。这是两者输出不同原因的主要因素。

如果希望第二段代码的输出与第一段代码相同，则可以修改第二段代码中的 catch 块，让它只打印 error.message：

try {
    console.log(safeFlatten(a));
} catch (error) {
    console.log(error.message); // 现在只输出错误消息
}
这样修改后，两段代码的输出就应该是相同的。如果你的输出实际上不同，请确保两段代码确实被执行了，而且没有其他变动影响输出。
*/