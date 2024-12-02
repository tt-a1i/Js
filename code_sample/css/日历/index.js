document.getElementById('datePicker').addEventListener('change', function() {
    const selectedDate = new Date(this.value);
    if (isNaN(selectedDate)) {
        document.getElementById('calendar').innerHTML = '';
        return;
    }
    generateCalendar(selectedDate);
});

function generateCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const today = new Date();

    // 获取当月第一天和最后一天
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // 获取第一天是星期几
    const startDay = firstDay.getDay();

    // 获取当月天数
    const totalDays = lastDay.getDate();

    // 创建表格
    let calendar = '<table class="calendar-table">';
    calendar += '<tr>';
    const days = ['日', '一', '二', '三', '四', '五', '六'];
    for (let day of days) {
        calendar += `<th>${day}</th>`;
    }
    calendar += '</tr><tr>';

    // 填充空白
    for (let i = 0; i < startDay; i++) {
        calendar += '<td></td>';
    }

    // 填充日期
    for (let dateNum = 1; dateNum <= totalDays; dateNum++) {
        const currentDate = new Date(year, month, dateNum);
        const isToday = currentDate.toDateString() === today.toDateString();
        calendar += `<td${isToday ? ' class="today"' : ''}>${dateNum}</td>`;
        if ((startDay + dateNum) % 7 === 0 && dateNum !== totalDays) {
            calendar += '</tr><tr>';
        }
    }

    // 填充剩余空白
    const remaining = (7 - (startDay + totalDays) % 7) % 7;
    for (let i = 0; i < remaining; i++) {
        calendar += '<td></td>';
    }

    calendar += '</tr></table>';

    document.getElementById('calendar').innerHTML = calendar;
}