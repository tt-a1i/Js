const images = document.querySelectorAll(".lazy");

function loadImage(image) {
	const src = image.getAttribute("data-src");
	if (src) {
		image.setAttribute("src", src);
		image.removeAttribute("data-src");
	}
}

const observer = new IntersectionObserver((entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			loadImage(entry.target);
			observer.unobserve(entry.target);
		}
	});
});

images.forEach((image) => {
	observer.observe(image);
});
