import { asyncOnce } from './util.js';

// 模拟 API 请求（真实的网络请求）
function fetchData(param) {
  return fetch(`https://jsonplaceholder.typicode.com/todos/1`)  // 模拟一个简单的API请求
      .then((response) => response.json())
      .then((data) => `Fetched data: ${JSON.stringify(data)}`);
}

// 使用 asyncOnce 包装 fetchData
const fetchDataOnce = asyncOnce(fetchData);

// 在页面上发起两个相同的请求
document.getElementById('fetch-button').addEventListener('click', async () => {
  console.log('First request');
  const dataDiv = document.getElementById('data');
  dataDiv.textContent = 'Loading...';

  // 第一次请求
  fetchDataOnce('exampleParam').then((data) => {
    console.log('First response:', data);
    dataDiv.textContent = data;
  });

  // 第二次相同的请求
  fetchDataOnce('exampleParam').then((data) => {
    console.log('Second response:', data);  // 这个会立即返回第一个请求的结果
  });
});
