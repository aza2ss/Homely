import { addItem } from '../services/cartStore.js';
import { fetchProductById, formatPrice } from '../services/dataService.js';
import { showToast } from './toast.js';

export function renderProductCard(product) {
  const getAvailabilityInfo = (availability) => {
    switch(availability) {
      case 'in_stock': return { text: 'В наличии', cls: 'badge--success' };
      case 'to_order': return { text: 'Под заказ', cls: 'badge--warning' };
      case 'out_of_stock': return { text: 'Нет в наличии', cls: 'badge--danger' };
      default: return { text: '', cls: '' };
    }
  };

  const avail = getAvailabilityInfo(product.availability);
  const isHit = product.isHit ? '<span class="badge badge--hit">Хит</span>' : '';
  const availBadge = avail.text ? `<span class="badge ${avail.cls}" style="position:absolute; top:10px; right:10px;">${avail.text}</span>` : '';

  return `
    <article class="product-card" data-id="${product.id}">
      <div class="product-card__img-wrap">
        <a href="#/product/${product.id}">
          <img src="${product.images[0]}" alt="${product.name}" class="product-card__img">
        </a>
        <div style="position:absolute; top:10px; left:10px; display:flex; flex-direction:column; gap:5px;">
          ${isHit}
        </div>
        ${availBadge}
      </div>
      <div class="product-card__content">
        <span class="product-card__category">${product.categoryName}</span>
        <h3 class="product-card__title">
          <a href="#/product/${product.id}">${product.name}</a>
        </h3>
        <div class="product-card__footer">
          <span class="product-card__price">${formatPrice(product.price)} ₸</span>
          <button class="product-card__add-btn" aria-label="Добавить в корзину" ${product.availability === 'out_of_stock' ? 'disabled' : ''}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `;
}

export function renderProductGrid(products = [], gridClass = 'grid grid-4') {
  if (!products || products.length === 0) {
    return '<p class="no-products">Товары не найдены</p>';
  }
  return `
    <div class="${gridClass}">
      ${products.map(p => renderProductCard(p)).join('')}
    </div>
  `;
}

export function initProductCards() {
  document.querySelectorAll('.product-card__add-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const card = e.target.closest('.product-card');
      if (card) {
        const id = card.getAttribute('data-id');
        const product = await fetchProductById(id);
        if (product) {
          addItem(product);
          showToast('Товар добавлен в корзину', 'success');
        }
      }
    });
  });
}
