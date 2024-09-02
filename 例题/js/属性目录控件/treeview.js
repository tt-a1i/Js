const directoryData = [
	{
		name: "Folder 1",
		children: [
			{ name: "File 1.1" },
			{
				name: "Folder 1.2",
				children: [{ name: "File 1.2.1" }, { name: "File 1.2.2" }],
			},
		],
	},
	{
		name: "Folder 2",
		children: [{ name: "File 2.1" }],
	},
];
function createTreeView(container, data) {
	const ul = document.createElement("ul");

	data.forEach((item) => {
		const li = document.createElement("li");
		const span = document.createElement("span");

		span.textContent = item.name;
		span.className = item.children ? "toggle folder" : "file";

		if (item.children) {
			span.addEventListener("click", function () {
				const siblingUl = this.nextElementSibling;
				if (siblingUl) {
					siblingUl.classList.toggle("hidden");
				}
			});

			const childUl = createTreeView(container, item.children);
			childUl.classList.add("hidden");
			li.appendChild(span);
			li.appendChild(childUl);
		} else {
			li.appendChild(span);
		}

		ul.appendChild(li);
	});

	return ul;
}

document.addEventListener("DOMContentLoaded", function () {
	const directoryContainer = document.getElementById("directory");
	const treeView = createTreeView(directoryContainer, directoryData);
	directoryContainer.appendChild(treeView);
});
