function decodeTimeBitmap(bitmap) {
    if (bitmap.length !== 48 || /[^01]/.test(bitmap)) {
        throw new Error("输入必须是48位的由'0'和'1'组成的字符串。");
    }

    const intervals = [];
    let start = null;

    for (let i = 0; i < 48; i++) {
        const bit = bitmap[i];
        if (bit === '1') {
            if (start === null) {
                start = i;
            }
        } else {
            if (start !== null) {
                intervals.push([start, i]);
                start = null;
            }
        }
    }

    // 如果最后一个区间持续到结束
    if (start !== null) {
        intervals.push([start, 48]);
    }
    console.log(intervals)
    // 将索引转换为时间格式
    function indexToTime(index) {
        const hour = Math.floor(index / 2);
        const minute = index % 2 === 0 ? '00' : '30';
        return `${hour.toString().padStart(2, '0')}:${minute}`;
    }

    const timeRanges = intervals.map(([startIdx, endIdx]) => {
        const startTime = indexToTime(startIdx);
        const endTime = indexToTime(endIdx);
        return `${startTime}-${endTime}`;
    });

    return timeRanges.join(',');
}

// 测试案例
const testCases = [
    {
        input: '110000000000000000000000000000000000000000000000',
        expected: '00:00-01:00',
    },
    // {
    //     input: "110010000000000000000000000000000000000000000001",
    //     expected: "00:00-01:00,02:00-02:30,23:30-24:00"
    // },
    // {
    //     input: "000000000000000000000000000000000000000000000000",
    //     expected: ""
    // },
    // {
    //     input: "111111111111111111111111111111111111111111111111",
    //     expected: "00:00-24:00"
    // },
    // {
    //     input: "101010101010101010101010101010101010101010101010",
    //     expected: "00:00-00:30,01:00-01:30,02:00-02:30,03:00-03:30,04:00-04:30,05:00-05:30,06:00-06:30,07:00-07:30,08:00-08:30,09:00-09:30,10:00-10:30,11:00-11:30,12:00-12:30,13:00-13:30,14:00-14:30,15:00-15:30,16:00-16:30,17:00-17:30,18:00-18:30,19:00-19:30,20:00-20:30,21:00-21:30,22:00-22:30,23:00-23:30"
    // }
];

testCases.forEach(({ input, expected }, index) => {
    const result = decodeTimeBitmap(input);
    console.log(`测试案例 ${index + 1}:`);
    console.log(`输入: ${input}`);
    console.log(`输出: ${result}`);
    console.log(`期望: ${expected}`);
    console.log(`测试 ${result === expected ? '通过' : '失败'}\n`);
});
