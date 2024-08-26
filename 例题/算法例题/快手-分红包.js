function splitRedEnvelope(totalAmount, numEnvelopes, minAmount, maxAmount) {
	if (
		minAmount * numEnvelopes > totalAmount ||
		maxAmount * numEnvelopes < totalAmount
	) {
		throw new Error("无法分配");
	}
	let envelopes = [];
	let remainingAmount = totalAmount;
	let remainingEnvelopes = numEnvelopes;
	for (let i = 0; i < numEnvelopes - 1; i++) {
        //remainingAmount - minAmount * (remainingEnvelopes - 1)保证此次分配后,剩余金额满足剩下未分配的最小金额要求
		let maxPossible = Math.min(
			maxAmount,
			remainingAmount - minAmount * (remainingEnvelopes - 1)
		);
		let minPossible = minAmount;
        //红包范围平移到[minPossible, maxPossible]
        //乘以 Math.random() 得到一个在 [0, maxPossible - minPossible + 1) 范围内的浮点数
        //Math.floor()向下取整，得到 [0, maxPossible - minPossible] 范围内的一个整数
		let envelope =
			Math.floor(Math.random() * (maxPossible - minPossible + 1)) + minPossible;
		envelopes.push(envelope);
		remainingAmount -= envelope;
		remainingEnvelopes--;
	}
	envelopes.push(remainingAmount);
	return envelopes;
}

try {
    let result = splitRedEnvelope(100, 5, 10, 30);
    console.log('红包金额集合:', result);
} catch (e) {
    console.error(e.message);
}