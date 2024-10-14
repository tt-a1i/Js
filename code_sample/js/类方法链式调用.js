class Calculator {
	constructor(value) {
		this.value = value;
	}

	add(number) {
		this.value += number;
		return this;
	}

	minus(number) {
		this.value -= number;
		return this;
	}

	multi(number) {
		this.value *= number;
		return this;
	}

	division(number) {
		if (number === 0) {
			throw new Error("Cannot divide by zero.");
		}
		this.value /= number;
		return this;
	}

	pow(number) {
		this.value = Math.pow(this.value, number);
		return this;
	}
}
let calc = new Calculator(1)
calc.add(1).pow(2).division(2).minus(2)
console.log(calc.value);