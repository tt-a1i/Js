// 定义表格数据
let students = [
    { name: 'Alice', class: '1A' },
    { name: 'Bob', class: '1B' },
    { name: 'Charlie', class: '1A' },
    { name: 'David', class: '1C' },
    { name: 'Eva', class: '1B' }
];

// 初始化表格
window.onload = function() {
    populateTable(students);
};

// 填充表格数据
function populateTable(data) {
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = ""; // 清空表格内容

    data.forEach(student => {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        const classCell = document.createElement("td");
        
        nameCell.textContent = student.name;
        classCell.textContent = student.class;

        row.appendChild(nameCell);
        row.appendChild(classCell);

        tableBody.appendChild(row);
    });
}

// 搜索功能
function search() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filteredStudents = students.filter(student => 
        student.name.toLowerCase().includes(searchInput)
    );
    populateTable(filteredStudents);
}