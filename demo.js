const data = [
	{ userId: 8, title: "title1" },
	{ userId: 11, title: "other" },
	{ userId: 15, title: null },
	{ userId: 19, title: "title2" },
];
function find(origin) {
	// todo
}
const result = find(data)
	.where({
		title: /\d$/,
	})
	.orderBy("userId", "desc");
console.log(result);
