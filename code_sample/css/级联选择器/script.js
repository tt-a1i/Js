// 数据：国家、对应的省份/州、城市
const data = {
    china: {
      provinces: {
        'guangdong': ['广州市', '深圳市', '珠海市'],
        'beijing': ['北京市'],
        'shanghai': ['上海市']
      }
    },
    usa: {
      provinces: {
        'california': ['洛杉矶', '旧金山', '圣地亚哥'],
        'new_york': ['纽约市', '布法罗', '罗切斯特'],
        'texas': ['休斯顿', '达拉斯', '奥斯汀']
      }
    }
  };
  
  // 获取 DOM 元素
  const countrySelect = document.getElementById('country');
  const provinceSelect = document.getElementById('province');
  const citySelect = document.getElementById('city');
  
  // 监听国家选择变化
  countrySelect.addEventListener('change', function() {
    const country = this.value;
    updateProvinces(country);
    citySelect.innerHTML = '<option value="">请选择城市</option>'; // 清空城市选项
  });
  
  // 监听省份/州选择变化
  provinceSelect.addEventListener('change', function() {
    const country = countrySelect.value;
    const province = this.value;
    updateCities(country, province);
  });
  
  // 更新省份/州下拉菜单
  function updateProvinces(country) {
    provinceSelect.innerHTML = '<option value="">请选择省份/州</option>'; // 清空之前的选项
    if (country && data[country]) {
      const provinces = data[country].provinces;
      for (let province in provinces) {
        const option = document.createElement('option');
        option.value = province;
        option.textContent = province.charAt(0).toUpperCase() + province.slice(1); // 省份首字母大写
        provinceSelect.appendChild(option);
      }
    }
  }
  
  // 更新城市下拉菜单
  function updateCities(country, province) {
    citySelect.innerHTML = '<option value="">请选择城市</option>'; // 清空之前的选项
    if (country && data[country] && data[country].provinces[province]) {
      const cities = data[country].provinces[province];
      cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
      });
    }
  }
  