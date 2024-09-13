// 定义红绿灯状态
const trafficLight = {
	redDuration: 2000,  // 红灯持续时间（2秒）
	greenDuration: 5000, // 绿灯持续时间（5秒）
	currentLight: "red", // 当前灯的状态
	count: 0,            // 计数器，记录切换次数
};

// 切换红绿灯状态的函数
function switchLight() {
	if (trafficLight.currentLight === "red") {
		trafficLight.currentLight = "green";
		console.log("绿灯亮");
	} else {
		trafficLight.currentLight = "red";
		console.log("红灯亮");
		trafficLight.count++; // 每次红灯亮时计数器加1
	}

	// 如果切换次数达到100次，停止切换
	if (trafficLight.count >= 100) {
		console.log("红绿灯切换100次，停止");
		return;
	}

	// 根据当前灯的状态设置下次切换时间
	const nextDuration =
		trafficLight.currentLight === "red"
			? trafficLight.redDuration
			: trafficLight.greenDuration;

	// 使用 setTimeout 重新设置下次切换
	setTimeout(switchLight, nextDuration);
}

// 初始状态为红灯亮
console.log("红灯亮");

// 启动红绿灯切换
setTimeout(switchLight, trafficLight.redDuration);

