export function renderHero() {
  return `
    <section class="hero">
      <div class="hero__slider">
        <div class="hero__slide active" style="background-image: url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80')">
          <div class="container hero__content">
            <h1 class="hero__title">Премиальная мебель для вашего дома</h1>
            <p class="hero__subtitle">Создайте уют с нашей новой коллекцией мебели в скандинавском стиле</p>
            <a href="#/catalog" class="btn btn--primary">Смотреть каталог</a>
          </div>
        </div>
        <div class="hero__slide" style="background-image: url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80')">
          <div class="container hero__content">
            <h1 class="hero__title">Стиль и комфорт</h1>
            <p class="hero__subtitle">Идеальные решения для современного интерьера</p>
            <a href="#/catalog" class="btn btn--primary">Выбрать диван</a>
          </div>
        </div>
      </div>
      <button class="hero__arrow hero__arrow--prev" aria-label="Предыдущий слайд">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <button class="hero__arrow hero__arrow--next" aria-label="Следующий слайд">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
      <div class="hero__indicators">
        <button class="hero__dot active" aria-label="Слайд 1"></button>
        <button class="hero__dot" aria-label="Слайд 2"></button>
      </div>
    </section>
  `;
}

export function initHero() {
  const slides = document.querySelectorAll('.hero__slide');
  const dots = document.querySelectorAll('.hero__dot');
  const prevBtn = document.querySelector('.hero__arrow--prev');
  const nextBtn = document.querySelector('.hero__arrow--next');
  let currentSlide = 0;
  let slideInterval;

  if (!slides.length) return;

  const goToSlide = (index) => {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  };

  const nextSlide = () => goToSlide(currentSlide + 1);
  const prevSlide = () => goToSlide(currentSlide - 1);

  const startAutoPlay = () => {
    slideInterval = setInterval(nextSlide, 5000);
  };

  const stopAutoPlay = () => {
    clearInterval(slideInterval);
  };

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoPlay();
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoPlay();
      startAutoPlay();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      stopAutoPlay();
      startAutoPlay();
    });
  });

  startAutoPlay();
}
