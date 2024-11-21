const carousel = document.querySelector(".carousel");
const inner = document.querySelector(".carousel-inner");
const items = document.querySelectorAll(".carousel-item");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const itemCount = items.length;
let currentIndex = 0;
const itemWidth = carousel.clientWidth;

// 设置内部容器的宽度
inner.style.width = `${itemWidth * itemCount}px`;

// 设置每个轮播项的宽度
items.forEach((item) => {
	item.style.width = `${itemWidth}px`;
});

// 自动播放功能
let autoplayInterval;

function startAutoplay() {
	autoplayInterval = setInterval(() => {
		goToNext();
	}, 3000);
}

function stopAutoplay() {
	clearInterval(autoplayInterval);
}

carousel.addEventListener("mouseenter", stopAutoplay);
carousel.addEventListener("mouseleave", startAutoplay);

startAutoplay();

// 切换到下一个轮播项
function goToNext() {
	currentIndex = (currentIndex + 1) % itemCount;
	updateCarousel();
}

// 切换到上一个轮播项
function goToPrev() {
	currentIndex = (currentIndex - 1 + itemCount) % itemCount;
	updateCarousel();
}

// 更新轮播图位置和指示点
function updateCarousel() {
	inner.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

	// 更新指示点
	dots.forEach((dot, index) => {
		dot.classList.toggle("active", index === currentIndex);
	});
}

// 绑定按钮点击事件
prevBtn.addEventListener("click", goToPrev);
nextBtn.addEventListener("click", goToNext);

// 绑定指示点点击事件
dots.forEach((dot, index) => {
	dot.addEventListener("click", () => {
		currentIndex = index;
		updateCarousel();
	});
});

/* // 触摸滑动功能
let touchStartX = 0;
let touchEndX = 0;
let isDragging = false;

inner.addEventListener("touchstart", (e) => {
	touchStartX = e.touches[0].clientX;
	isDragging = true;
	stopAutoplay();
});

inner.addEventListener("touchmove", (e) => {
	touchEndX = e.touches[0].clientX;
	const delta = touchEndX - touchStartX;
	inner.style.transform = `translateX(-${
		currentIndex * itemWidth
	}px) translateX(${delta}px)`;
});

inner.addEventListener("touchend", () => {
	if (!isDragging) return;
	const delta = touchEndX - touchStartX;
	if (delta > 50) {
		goToPrev();
	} else if (delta < -50) {
		goToNext();
	} else {
		updateCarousel();
	}
	isDragging = false;
	inner.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
	startAutoplay();
}); */
