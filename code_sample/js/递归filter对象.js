const menu = [
	{
		name: "menu1",
		hidden: false,
		children: [
			{ name: "menu1-1", hidden: true },
			{
				name: "menu1-2",
				hidden: false,
				children: [
					{ name: "menu1-2-1", hidden: false },
					{ name: "menu1-2-2", hidden: true },
				],
			},
		],
	},
];

function filterMenu(menu) {
	return menu.filter((item) => {
		if (item.children) {
			item.children = filterMenu(item.children);
		}
		return item.hidden === false;
	});
}

const newMenu = filterMenu(menu);
console.log(JSON.stringify(newMenu, null, 2));
