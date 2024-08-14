/* 递归额外空间
function quickSort(arr) {
    if(arr.length === 1 || arr.length === 0) return arr
    let pivot = arr[0]
    let left = arr.slice(1).filter(n => n <= pivot)
    let right = arr.slice(1).filter(n => n > pivot)
    return [...quickSort(left), pivot, ...quickSort(right)]
} */
function quickSort(arr, low = 0, high = arr.length - 1) {
    if(low < high){
        let pivotIndex = partition(arr, low, high)
        quickSort(arr, low, pivotIndex - 1)
        quickSort(arr, pivotIndex + 1, high)
    }
    return arr
}

//原地置换
function partition(arr, low, high) {
    const pivot = arr[high]
    let i = low - 1
    for(let j = low; j < high; j++){
        if(arr[j] <= pivot){//左边的都小于枢轴
            i++
            [arr[i], arr[j]] = [arr[j], arr[i]]
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]//将枢轴放到最终的位置
    return i + 1
}
console.log(quickSort([1,3,5,2,8,1,2,5]));
/*
这两句代码在快速排序算法中的分区函数是关键步骤，它们的作用是将枢轴（pivot）放置到它在数组中的正确位置，确保枢轴左边的所有元素都不大于枢轴，而枢轴右边的所有元素都不小于枢轴。让我们逐步详细解释：

[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // 将 pivot 放到正确的位置
这行代码通过 ES6 的解构赋值来交换数组中的元素。arr[high] 是我们选择的枢轴元素，它在分区过程开始时被选为当前子数组的最后一个元素。
变量 i 是追踪小于等于枢轴值的元素的指标，它在循环结束时指向最后一个小于等于枢轴的元素的位置。
因此，arr[i + 1] 就是第一个大于枢轴的元素的位置或者是比枢轴大的一段元素的起始位置。
通过交换 arr[i + 1] 和 arr[high]，我们实际上是将枢轴元素 arr[high] 放到了正确的中间位置，这一位置即 i + 1。此时，枢轴元素左边的所有元素都不大于枢轴值，右边的所有元素都不小于它。
return i + 1;
这行代码返回枢轴元素的新位置，即 i + 1。这个返回值非常关键，因为它告诉 quickSort 函数下一步递归调用的分界点。
在得到枢轴的位置后，quickSort 函数将数组分为两部分进行递归排序：一部分是枢轴左边的（low 到 pivotIndex - 1），另一部分是枢轴右边的（pivotIndex + 1 到 high）。
通过这种方式，枢轴元素被安置在其最终排序后的正确位置，而且该位置是固定的，不会在后续的操作中改变。这是快速排序算法效率高的关键所在——每一次递归调用都确保至少有一个元素（枢轴）被放置在最终位置。 */
/*
当然可以。让我们用一个更复杂的例子来详细解释 partition 函数的工作原理。

假设我们有以下数组：
arr = [7, 2, 1, 6, 8, 5, 3, 4]

我们将使用最后一个元素 4 作为枢轴（pivot）。

下面是 partition 函数的执行过程：

1. 初始状态：
   pivot = 4
   i = -1 (low - 1)
   j = 0 (low)
   arr = [7, 2, 1, 6, 8, 5, 3, 4]

2. 开始遍历：

   j = 0: arr[0] = 7 > pivot, 不操作
   [7, 2, 1, 6, 8, 5, 3, 4], i = -1

   j = 1: arr[1] = 2 <= pivot, i++ 然后交换 arr[i] 和 arr[j]
   [2, 7, 1, 6, 8, 5, 3, 4], i = 0

   j = 2: arr[2] = 1 <= pivot, i++ 然后交换 arr[i] 和 arr[j]
   [2, 1, 7, 6, 8, 5, 3, 4], i = 1

   j = 3: arr[3] = 6 > pivot, 不操作
   [2, 1, 7, 6, 8, 5, 3, 4], i = 1

   j = 4: arr[4] = 8 > pivot, 不操作
   [2, 1, 7, 6, 8, 5, 3, 4], i = 1

   j = 5: arr[5] = 5 > pivot, 不操作
   [2, 1, 7, 6, 8, 5, 3, 4], i = 1

   j = 6: arr[6] = 3 <= pivot, i++ 然后交换 arr[i] 和 arr[j]
   [2, 1, 3, 6, 8, 5, 7, 4], i = 2

3. 遍历结束后，将枢轴（arr[high]）与 arr[i+1] 交换：
   [2, 1, 3, 4, 8, 5, 7, 6], i = 2

4. 返回 i + 1 = 3，这是枢轴的最终位置

最终结果：
- 枢轴（4）左边的所有元素都小于或等于它：[2, 1, 3]
- 枢轴（4）右边的所有元素都大于它：[8, 5, 7, 6]

这个过程的关键点是：

1. 我们使用 i 来跟踪小于或等于枢轴的元素的边界。
2. 每次找到一个小于或等于枢轴的元素，我们就增加这个边界（i++），并将该元素交换到边界内。
3. 最后，我们将枢轴放到它的正确位置，即 i+1。

这样，partition 函数就完成了它的主要任务：将数组分成两部分，左边的元素都小于或等于枢轴，右边的元素都大于枢轴。这为快速排序算法的下一步递归调用做好了准备。 */