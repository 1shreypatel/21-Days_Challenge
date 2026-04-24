const SLIDES = [
    { src: 'https://picsum.photos/seed/1/800/450', title: 'Alpine Peak' },
    { src: 'https://picsum.photos/seed/2/800/450', title: 'Coastal Serenity' },
    { src: 'https://picsum.photos/seed/3/800/450', title: 'Misty Forest' }
];

const slideTrack = document.getElementById('slideTrack');
const dotsContainer = document.getElementById('dotsContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

function init() {
    SLIDES.forEach((slide, i) => {
        const slideEl = document.createElement('div');
        slideEl.classList.add('slide');
        slideEl.innerHTML = `
            <img src="${slide.src}" alt="${slide.title}">
            <div class="slide-caption"><h3>${slide.title}</h3></div>
        `;
        slideTrack.appendChild(slideEl);

        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    });
}

function goToSlide(index) {
    currentIndex = index;
    slideTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % SLIDES.length;
    goToSlide(currentIndex);
};

prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + SLIDES.length) % SLIDES.length;
    goToSlide(currentIndex);
};

setInterval(() => {
    nextBtn.click();
}, 10000);

init();