function splitRedEnvelop(totalAmount, numEnvelopes, minAmount, maxAmount) {
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
		let maxPossible = Math.min(
			maxAmount,
			remainingAmount - minAmount * (numEnvelopes - 1)
		);
		let minPossible = minAmount;
		let envelope = Math.floor(
			Math.random() * (maxPossible - minPossible + 1) + minPossible
		);
		envelopes.push(envelope);
		remainingAmount -= envelope;
		remainingEnvelopes--;
	}
	envelopes.push(remainingAmount);
	return envelopes;
}
try {
	let result = splitRedEnvelop(100, 5, 30, 30);
	console.log(result);
} catch (e) {
	console.log(e.message);
}
