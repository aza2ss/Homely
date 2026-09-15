import { cartStore } from '../services/cartStore.js';
import { formatPrice } from '../services/dataService.js';
import { submitOrder, generateOrderNumber } from '../services/orderService.js';
import { navigateTo } from '../router.js';

export function renderCheckout() {
  const items = cartStore.getItems();
  if (items.length === 0) {
    return `
      <div class="container page-section empty-cart" style="text-align: center; padding: 60px 0;">
        <h2>Ваша корзина пуста</h2>
        <a href="#/catalog" class="btn btn--primary" style="margin-top: 20px;">В каталог</a>
      </div>
    `;
  }

  return `
    <div class="container page-section">
      <h1 style="margin-bottom: 30px;">Оформление заказа</h1>
      <div class="checkout-layout" style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px; align-items: start;">
        <form id="checkout-form">
          <div class="checkout-section" style="background: #fff; padding: 25px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h2 class="checkout-section__title" style="margin-bottom: 20px;">1. Контактные данные</h2>
            <div class="form-group" style="margin-bottom: 15px;">
              <label class="form-label" style="display: block; margin-bottom: 5px;">Имя *</label>
              <input type="text" id="checkout-name" class="form-input" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px;">
            </div>
            <div class="form-group" style="margin-bottom: 15px;">
              <label class="form-label" style="display: block; margin-bottom: 5px;">Телефон *</label>
              <input type="tel" id="checkout-phone" class="form-input" required placeholder="+7" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px;">
            </div>
            <div class="form-group">
              <label class="form-label" style="display: block; margin-bottom: 5px;">Email</label>
              <input type="email" id="checkout-email" class="form-input" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px;">
            </div>
          </div>

          <div class="checkout-section" style="background: #fff; padding: 25px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h2 class="checkout-section__title" style="margin-bottom: 20px;">2. Доставка</h2>
            <div class="form-group" style="margin-bottom: 15px;">
              <label class="form-label" style="display: block; margin-bottom: 5px;">Город *</label>
              <select id="checkout-city" class="form-input" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px;">
                <option value="Алматы">Алматы</option>
                <option value="Астана">Астана</option>
                <option value="Шымкент">Шымкент</option>
              </select>
            </div>
            <div class="form-group" style="margin-bottom: 15px;">
              <label class="form-label" style="display: block; margin-bottom: 5px;">Адрес *</label>
              <input type="text" id="checkout-address" class="form-input" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px;">
            </div>
            <div class="form-group">
              <label class="form-label" style="display: block; margin-bottom: 5px;">Комментарий к заказу</label>
              <textarea id="checkout-comment" class="form-input" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; resize: vertical;"></textarea>
            </div>
          </div>

          <div class="checkout-section" style="background: #fff; padding: 25px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h2 class="checkout-section__title" style="margin-bottom: 20px;">3. Способ оплаты</h2>
            <div class="payment-methods" style="display: flex; flex-direction: column; gap: 10px;">
              <label class="payment-method-card" style="display: flex; align-items: center; gap: 15px; padding: 15px; border: 1px solid #1866AD; border-radius: 8px; cursor: pointer; background: #f0f7fc;">
                <input type="radio" name="payment" value="cash" checked>
                <span>Наличными при получении</span>
              </label>
              <label class="payment-method-card" style="display: flex; align-items: center; gap: 15px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; cursor: not-allowed; opacity: 0.6;">
                <input type="radio" name="payment" value="qr" disabled>
                <span>Kaspi QR</span>
                <span class="badge badge--warning" style="margin-left: auto;">Скоро</span>
              </label>
              <label class="payment-method-card" style="display: flex; align-items: center; gap: 15px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; cursor: not-allowed; opacity: 0.6;">
                <input type="radio" name="payment" value="card" disabled>
                <span>Банковская карта онлайн</span>
                <span class="badge badge--warning" style="margin-left: auto;">Скоро</span>
              </label>
              <label class="payment-method-card" style="display: flex; align-items: center; gap: 15px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; cursor: not-allowed; opacity: 0.6;">
                <input type="radio" name="payment" value="installment" disabled>
                <span>Рассрочка</span>
                <span class="badge badge--warning" style="margin-left: auto;">Скоро</span>
              </label>
            </div>
          </div>
          
          <button type="submit" class="btn btn--primary btn--block" style="width: 100%; padding: 15px; font-size: 18px;">Подтвердить заказ</button>
        </form>

        <aside class="cart-summary" style="background: #fff; padding: 25px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); position: sticky; top: 20px;">
          <h2 class="cart-summary__title" style="margin-bottom: 20px;">Ваш заказ</h2>
          <div style="margin-bottom: 20px; max-height: 300px; overflow-y: auto;">
            ${items.map(i => `
              <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px;">
                <span>${i.product.name} x${i.quantity}</span>
                <span style="font-weight: 500;">${formatPrice(i.product.price * i.quantity)}</span>
              </div>
            `).join('')}
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;">
          <div class="cart-summary__row" style="display: flex; justify-content: space-between; font-size: 20px; font-weight: bold;">
            <span>Итого</span>
            <span class="cart-summary__total" style="color: #1866AD;">${formatPrice(cartStore.getTotal())}</span>
          </div>
        </aside>
      </div>
    </div>
  `;
}

export function initCheckout() {
  const form = document.getElementById('checkout-form');
  const phone = document.getElementById('checkout-phone');

  if (phone) {
    phone.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.startsWith('7') || v.startsWith('8')) v = '7' + v.slice(1);
      if (v.length > 0 && !v.startsWith('7')) v = '7' + v;
      e.target.value = v.length > 0 ? '+' + v : '';
    });
  }

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const orderData = {
      name: document.getElementById('checkout-name').value,
      phone: document.getElementById('checkout-phone').value,
      email: document.getElementById('checkout-email').value,
      city: document.getElementById('checkout-city').value,
      address: document.getElementById('checkout-address').value,
      comment: document.getElementById('checkout-comment').value,
      items: cartStore.getItems(),
      total: cartStore.getTotal()
    };

    const orderNumber = generateOrderNumber();
    await submitOrder({ ...orderData, orderNumber });
    cartStore.clear();
    navigateTo(`#/order-success/${orderNumber}`);
  });
}
