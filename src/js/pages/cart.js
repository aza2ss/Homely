import { cartStore } from '../services/cartStore.js';
import { formatPrice } from '../services/dataService.js';
import { navigateTo } from '../router.js';

export function renderCart() {
  const items = cartStore.getItems();
  
  if (items.length === 0) {
    return `
      <div class="container page-section empty-cart" style="text-align: center; padding: 60px 0;">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2" style="margin-bottom: 20px;">
          <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <h2 style="margin-bottom: 20px;">Ваша корзина пуста</h2>
        <a href="#/catalog" class="btn btn--primary">Перейти в каталог</a>
      </div>
    `;
  }

  const getWord = (count) => {
    const v = count % 100;
    if (v >= 11 && v <= 19) return 'товаров';
    const d = count % 10;
    if (d === 1) return 'товар';
    if (d >= 2 && d <= 4) return 'товара';
    return 'товаров';
  };

  const count = cartStore.getCount();

  return `
    <div class="container page-section">
      <h1 style="margin-bottom: 30px;">Корзина</h1>
      <div class="cart-layout" style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px; align-items: start;">
        <div class="cart-items">
          ${items.map(item => `
            <div class="cart-item" style="display: flex; gap: 20px; padding: 20px; background: #fff; border-radius: 12px; margin-bottom: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); align-items: center;">
              <img class="cart-item__img" src="${item.product.images[0]}" alt="${item.product.name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;">
              <div class="cart-item__info" style="flex: 1;">
                <h3 class="cart-item__title" style="margin-bottom: 10px;">${item.product.name}</h3>
                <div class="cart-item__price" style="font-weight: bold; color: #1866AD;">${formatPrice(item.product.price)}</div>
              </div>
              <div class="qty-selector" style="display: flex; align-items: center; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                <button class="qty-selector__btn cart-qty-minus" data-id="${item.product.id}" style="padding: 5px 10px; border: none; background: #f7f8fa; cursor: pointer;">-</button>
                <input class="qty-selector__input" type="number" value="${item.quantity}" style="width: 40px; text-align: center; border: none; background: transparent; pointer-events: none;">
                <button class="qty-selector__btn cart-qty-plus" data-id="${item.product.id}" style="padding: 5px 10px; border: none; background: #f7f8fa; cursor: pointer;">+</button>
              </div>
              <button class="cart-item__remove btn btn--ghost" data-id="${item.product.id}" style="color: #ff4d4f;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          `).join('')}
        </div>
        
        <aside class="cart-summary" style="background: #fff; padding: 25px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); position: sticky; top: 20px;">
          <h2 class="cart-summary__title" style="margin-bottom: 20px;">Итого</h2>
          <div class="cart-summary__row" style="display: flex; justify-content: space-between; margin-bottom: 15px; color: #666;">
            <span>${count} ${getWord(count)}</span>
            <span>${formatPrice(cartStore.getTotal())}</span>
          </div>
          <div class="cart-summary__row" style="display: flex; justify-content: space-between; margin-bottom: 25px; font-size: 20px; font-weight: bold;">
            <span>К оплате</span>
            <span class="cart-summary__total" style="color: #1866AD;">${formatPrice(cartStore.getTotal())}</span>
          </div>
          <button id="btn-checkout" class="btn btn--primary btn--block" style="width: 100%;">Оформить заказ</button>
        </aside>
      </div>
    </div>
  `;
}

export function initCart() {
  const app = document.getElementById('app');
  
  const reRender = () => {
    app.innerHTML = renderCart();
    initCart();
  };

  document.querySelectorAll('.cart-qty-minus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      const item = cartStore.getItems().find(i => i.product.id === id);
      if (item && item.quantity > 1) {
        cartStore.updateQuantity(id, item.quantity - 1);
        reRender();
      }
    });
  });

  document.querySelectorAll('.cart-qty-plus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      const item = cartStore.getItems().find(i => i.product.id === id);
      if (item) {
        cartStore.updateQuantity(id, item.quantity + 1);
        reRender();
      }
    });
  });

  document.querySelectorAll('.cart-item__remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      cartStore.removeItem(id);
      reRender();
    });
  });

  document.getElementById('btn-checkout')?.addEventListener('click', () => {
    navigateTo('#/checkout');
  });
}
