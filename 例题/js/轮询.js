const axios = require('axios');

function poll(endpoint, interval) {
  setInterval(async () => {
    try {
      const response = await axios.get(endpoint);
      console.log(response.data);
    } catch (error) {
      console.error('Error during polling:', error);
    }
  }, interval);
}

// 使用轮询请求
poll('https://api.example.com/data', 5000); // 每5秒请求一次


//setTimeout 实现较为灵活的轮询
const axios = require('axios');

function pollWithTimeout(endpoint, interval) {
  async function request() {
    try {
      const response = await axios.get(endpoint);
      console.log(response.data);
    } catch (error) {
      console.error('Error during polling:', error);
    } finally {
      // 调度下一个轮询
      setTimeout(request, interval);
    }
  }

  // 启动轮询
  request();
}

// 使用轮询请求
pollWithTimeout('https://api.example.com/data', 5000); // 每5秒请求一次