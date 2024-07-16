/*
首先，我们将列表中的区间按照左端点升序排序。然后我们将第一个区间加入 merged 数组中，并按顺序依次考虑之后的每个区间：

如果当前区间的左端点在数组 merged 中最后一个区间的右端点之后，那么它们不会重合，我们可以直接将这个区间加入数组 merged 的末尾；

否则，它们重合，我们需要用当前区间的右端点更新数组 merged 中最后一个区间的右端点，将其置为二者的较大值。
*/
var merge = function (intervals) {
    intervals = intervals.sort((a, b) => a[0] - b[0])
    const res = [intervals[0]]
    for(let i = 1; i < intervals.length; i++){
        if(intervals[i][0] > res[res.length - 1][1]){
            res.push(intervals[i])
        }else{
            res[res.length - 1][1] = Math.max(intervals[i][1], res[res.length - 1][1])
        }
    }
    return res
}