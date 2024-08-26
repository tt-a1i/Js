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
		let maxPossible = Math.min(
			maxAmount,
			remainingAmount - minAmount * (remainingEnvelopes - 1)
		);
		let minPossible = minAmount;
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