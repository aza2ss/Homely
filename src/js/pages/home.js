import { renderHero, initHero } from '../components/hero.js';
import { renderCategories, initCategories } from '../components/categories.js';
import { renderProductGrid, initProductCards } from '../components/productCard.js';
import { fetchProducts } from '../services/dataService.js';

export async function renderHome() {
  const allProducts = await fetchProducts();
  const hitProducts = allProducts.filter(p => p.isHit).slice(0, 4);

  const html = `
    ${renderHero()}
    <section class="page-section">
      <div class="container">
        ${renderCategories()}
      </div>
    </section>
    
    <section class="page-section">
      <div class="container">
        <h2 class="section-title">Хиты продаж</h2>
        ${renderProductGrid(hitProducts)}
      </div>
    </section>

    <section class="page-section">
      <div class="container">
        <h2 class="section-title">Почему Homely?</h2>
        <div class="advantages-grid grid grid-4">
          <div class="advantage-card">
            <div class="advantage-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <h3 class="advantage-card__title">Высокое качество</h3>
            <p class="advantage-card__text">Тщательно отбираем материалы и контролируем производство.</p>
          </div>
          <div class="advantage-card">
            <div class="advantage-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
            </div>
            <h3 class="advantage-card__title">Бережная доставка</h3>
            <p class="advantage-card__text">Доставляем мебель в сохранности точно в срок.</p>
          </div>
          <div class="advantage-card">
            <div class="advantage-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <h3 class="advantage-card__title">Гарантия до 5 лет</h3>
            <p class="advantage-card__text">Уверены в своей мебели и предоставляем долгую гарантию.</p>
          </div>
          <div class="advantage-card">
            <div class="advantage-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
            </div>
            <h3 class="advantage-card__title">Удобная оплата</h3>
            <p class="advantage-card__text">Различные способы оплаты для вашего комфорта.</p>
          </div>
        </div>
      </div>
    </section>
  `;

  return html;
}

export function initHome() {
  initHero();
  initCategories();
  initProductCards();
}
