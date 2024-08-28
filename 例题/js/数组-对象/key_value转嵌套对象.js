function unflattenObject(obj) {
	const nestedObject = {};
	for (let flatKey in obj) {
		const keys = flatKey.split(".");
		let currentLevel = nestedObject;
		keys.forEach((key, index) => {
			if (!currentLevel[key]) {
				currentLevel[key] = {};
			}
			if (index === keys.length - 1) {
				currentLevel[key] = obj[flatKey];
			}
			currentLevel = currentLevel[key];
		});
	}
	return nestedObject;
}
const flatObject = {
	"a.b.c": 2,
	"a.b.d": 3,
	"x.y": 5,
};

const nestedObject = unflattenObject(flatObject);
console.log(nestedObject);
