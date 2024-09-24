const trafficLight = {
	redDuration: 2000,
	greenDuration: 5000,
	currentLight: "red",
	count: 0,
};
function switchLight() {
	if (trafficLight.currentLight === "red") {
		console.log("red");
		trafficLight.currentLight = "green";
	} else {
		console.log("green");
		trafficLight.currentLight = "red";
	}
	trafficLight.count++;
	if (trafficLight.count >= 100) {
        clearInterval(timer)
	}else{
        clearInterval(timer)
        timer = setInterval(
            switchLight,
            trafficLight.currentLight === "red"
                ? trafficLight.redDuration
                : trafficLight.greenDuration
        );
    }
}
let timer = setInterval(
	switchLight,
	trafficLight.currentLight === "red"
		? trafficLight.redDuration
		: trafficLight.greenDuration
);
