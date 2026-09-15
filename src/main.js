// Homely — Main Application Entry Point
import { initRouter } from './js/router.js';
import { renderHeader, initHeader } from './js/components/header.js';
import { renderFooter } from './js/components/footer.js';
import { renderHome, initHome } from './js/pages/home.js';
import { renderCatalog, initCatalog } from './js/pages/catalog.js';
import { renderProductDetail, initProductDetail } from './js/pages/productDetail.js';
import { renderCart, initCart } from './js/pages/cart.js';
import { renderCheckout, initCheckout } from './js/pages/checkout.js';
import { renderContacts, initContacts } from './js/pages/contacts.js';
import { renderOrderSuccess, initOrderSuccess } from './js/pages/orderSuccess.js';

const mainContent = document.getElementById('main-content');
const headerEl = document.getElementById('site-header');
const footerEl = document.getElementById('site-footer');

// Render static elements
headerEl.innerHTML = renderHeader();
footerEl.innerHTML = renderFooter();
initHeader();

// Scroll to top utility
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// Page render helper
async function renderPage(renderFn, initFn, ...args) {
  mainContent.innerHTML = '<div class="page-loading"><div class="spinner"></div></div>';
  scrollToTop();
  try {
    const html = await renderFn(...args);
    mainContent.innerHTML = html;
    if (initFn) await initFn(...args);
    // Trigger scroll reveal animations
    initScrollReveal();
  } catch (error) {
    console.error('Page render error:', error);
    mainContent.innerHTML = `
      <section class="page-section">
        <div class="container" style="text-align:center;padding:80px 0;">
          <h2>Произошла ошибка</h2>
          <p style="margin-top:16px;color:var(--text-secondary)">Попробуйте обновить страницу</p>
          <a href="#/" class="btn btn--primary" style="margin-top:24px;">На главную</a>
        </div>
      </section>
    `;
  }
}

// Define routes
const routes = [
  {
    path: '#/',
    handler: () => renderPage(renderHome, initHome)
  },
  {
    path: '#/catalog',
    handler: () => renderPage(renderCatalog, initCatalog)
  },
  {
    path: '#/catalog/:category',
    handler: (params) => renderPage(renderCatalog, initCatalog, params.category)
  },
  {
    path: '#/product/:id',
    handler: (params) => renderPage(renderProductDetail, initProductDetail, params.id)
  },
  {
    path: '#/cart',
    handler: () => renderPage(renderCart, initCart)
  },
  {
    path: '#/checkout',
    handler: () => renderPage(renderCheckout, initCheckout)
  },
  {
    path: '#/contacts',
    handler: () => renderPage(renderContacts, initContacts)
  },
  {
    path: '#/order-success/:orderNumber',
    handler: (params) => renderPage(renderOrderSuccess, initOrderSuccess, params.orderNumber)
  }
];

// Initialize router
initRouter(routes);

// Scroll reveal with Intersection Observer
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal:not(.visible)');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach((el) => observer.observe(el));
}

// Update active nav link
window.addEventListener('hashchange', () => {
  const hash = window.location.hash || '#/';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === hash || (href === '#/catalog' && hash.startsWith('#/catalog'))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

console.log('🏠 Homely — Интернет-магазин мебели загружен');
