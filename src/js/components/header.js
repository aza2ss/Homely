import { getCount } from '../services/cartStore.js';

export function renderHeader() {
  const cartCount = getCount();
  return `
    <div class="container site-header__inner">
      <a href="#/" class="site-header__logo">Home<span>ly</span></a>
      <nav class="site-header__nav">
        <a href="#/" class="site-header__nav-link">Главная</a>
        <a href="#/catalog" class="site-header__nav-link">Каталог</a>
        <a href="#/contacts" class="site-header__nav-link">Контакты</a>
      </nav>
      <div class="site-header__actions">
        <a href="#/cart" class="cart-btn" aria-label="Корзина">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span class="cart-btn__badge" id="cart-badge">${cartCount}</span>
        </a>
        <button class="burger-menu" id="burger-menu" aria-label="Меню">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
    <div class="mobile-nav-overlay" id="mobile-nav-overlay"></div>
    <div class="mobile-nav" id="mobile-nav">
      <div class="mobile-nav__header">
        <a href="#/" class="site-header__logo">Home<span>ly</span></a>
        <button class="mobile-nav__close" id="mobile-nav-close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="mobile-nav__links">
        <a href="#/" class="mobile-nav__link">Главная</a>
        <a href="#/catalog" class="mobile-nav__link">Каталог</a>
        <a href="#/contacts" class="mobile-nav__link">Контакты</a>
      </div>
    </div>
  `;
}

export function initHeader() {
  const header = document.querySelector('.site-header');
  const burger = document.getElementById('burger-menu');
  const close = document.getElementById('mobile-nav-close');
  const overlay = document.getElementById('mobile-nav-overlay');
  const mobileNav = document.getElementById('mobile-nav');

  const toggleMenu = () => {
    overlay.classList.toggle('active');
    mobileNav.classList.toggle('active');
  };

  if (burger) burger.addEventListener('click', toggleMenu);
  if (close) close.addEventListener('click', toggleMenu);
  if (overlay) overlay.addEventListener('click', toggleMenu);

  document.querySelectorAll('.mobile-nav__link').forEach(link => {
    link.addEventListener('click', () => {
      overlay.classList.remove('active');
      mobileNav.classList.remove('active');
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      if (header) header.classList.add('site-header--scrolled');
    } else {
      if (header) header.classList.remove('site-header--scrolled');
    }
  });

  window.addEventListener('cart-updated', () => {
    const badge = document.getElementById('cart-badge');
    if (badge) {
      badge.textContent = getCount();
    }
  });
}
