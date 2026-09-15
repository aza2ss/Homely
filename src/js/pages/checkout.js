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
              <input type="text" id="checkout-name" class="form-input" required placeholder="Введите ваше имя" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px;">
            </div>
            <div class="form-group" style="margin-bottom: 15px;">
              <label class="form-label" style="display: block; margin-bottom: 5px;">Телефон *</label>
              <input type="tel" id="checkout-phone" class="form-input" required placeholder="+7 (707) 123-45-67" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px;">
            </div>
            <div class="form-group">
              <label class="form-label" style="display: block; margin-bottom: 5px;">Email</label>
              <input type="email" id="checkout-email" class="form-input" placeholder="example@mail.com" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px;">
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
                <option value="Караганда">Караганда</option>
              </select>
            </div>
            <div class="form-group" style="margin-bottom: 15px;">
              <label class="form-label" style="display: block; margin-bottom: 5px;">Адрес *</label>
              <input type="text" id="checkout-address" class="form-input" required placeholder="Улица, дом, квартира" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px;">
            </div>
            <div class="form-group">
              <label class="form-label" style="display: block; margin-bottom: 5px;">Комментарий к заказу</label>
              <textarea id="checkout-comment" class="form-input" placeholder="Укажите этаж, домофон или пожелания по доставке" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; resize: vertical;"></textarea>
            </div>
          </div>

          <div class="checkout-section" style="background: #fff; padding: 25px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h2 class="checkout-section__title" style="margin-bottom: 20px;">3. Способ оплаты</h2>
            <div class="payment-methods" style="display: flex; flex-direction: column; gap: 12px;">
              <label class="payment-method-card" style="display: flex; align-items: center; gap: 15px; padding: 15px; border: 1px solid #1866AD; border-radius: 8px; cursor: pointer; background: #f0f7fc;">
                <input type="radio" name="payment" value="cash" checked style="accent-color: #1866AD;">
                <div>
                  <strong>Наличными при получении</strong>
                  <div style="font-size: 13px; color: #666;">Оплата курьеру при доставке</div>
                </div>
              </label>
              
              <label class="payment-method-card" style="display: flex; align-items: center; gap: 15px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer;">
                <input type="radio" name="payment" value="card" style="accent-color: #1866AD;">
                <div>
                  <strong>Банковская карта / Google Pay</strong>
                  <div style="font-size: 13px; color: #666;">Быстрая онлайн-оплата картой любой страны</div>
                </div>
                <span class="badge badge--success" style="margin-left: auto;">Онлайн</span>
              </label>

              <label class="payment-method-card" style="display: flex; align-items: center; gap: 15px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer;">
                <input type="radio" name="payment" value="installment" style="accent-color: #1866AD;">
                <div>
                  <strong>Рассрочка 0-0-12 / Kaspi Pay</strong>
                  <div style="font-size: 13px; color: #666;">Без переплат до 12 месяцев</div>
                </div>
                <span class="badge badge--success" style="margin-left: auto;">0%</span>
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

      <!-- Online Payment Modal (Google Pay / Card / Installment simulated) -->
      <div id="payment-modal" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 1000; align-items: center; justify-content: center; padding: 20px;">
        <div style="background: #fff; width: 100%; max-width: 440px; border-radius: 16px; padding: 28px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); animation: fadeInUp 0.3s ease-out;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1866AD" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              <h3 id="modal-payment-title" style="margin: 0; font-size: 1.25rem;">Оплата картой / Google Pay</h3>
            </div>
            <button type="button" id="close-payment-modal" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #999;">&times;</button>
          </div>

          <div style="background: #F7F8FA; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
            <span style="color: #666; font-size: 14px;">Сумма к оплате:</span>
            <strong id="modal-payment-amount" style="font-size: 18px; color: #1866AD;">${formatPrice(cartStore.getTotal())}</strong>
          </div>

          <form id="pay-modal-form">
            <div style="margin-bottom: 15px;">
              <label style="display: block; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #555; margin-bottom: 6px;">Номер карты</label>
              <input type="text" id="pay-card-number" placeholder="4400 0000 0000 0000" value="4400 1234 5678 9012" required style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 8px; font-family: monospace; font-size: 15px;">
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
              <div>
                <label style="display: block; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #555; margin-bottom: 6px;">Срок (ММ/ГГ)</label>
                <input type="text" id="pay-card-exp" placeholder="12/28" value="12/28" required style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 8px; font-family: monospace; font-size: 15px; text-align: center;">
              </div>
              <div>
                <label style="display: block; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #555; margin-bottom: 6px;">CVC / CVV</label>
                <input type="password" id="pay-card-cvc" placeholder="***" value="777" maxlength="3" required style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 8px; font-family: monospace; font-size: 15px; text-align: center;">
              </div>
            </div>

            <button type="submit" id="pay-modal-submit" class="btn btn--primary btn--block" style="width: 100%; padding: 14px; font-size: 16px; border-radius: 8px; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px;">
              <span>Оплатить в 1 клик (Google Pay / Карта)</span>
            </button>
            <p style="text-align: center; font-size: 12px; color: #888; margin-top: 12px;">Тестовый режим оплаты. Можно использовать любые данные.</p>
          </form>
        </div>
      </div>
    </div>
  `;
}

export function initCheckout() {
  const form = document.getElementById('checkout-form');
  const phone = document.getElementById('checkout-phone');
  const modal = document.getElementById('payment-modal');
  const closeModal = document.getElementById('close-payment-modal');
  const payModalForm = document.getElementById('pay-modal-form');
  const modalTitle = document.getElementById('modal-payment-title');
  const modalSubmitBtn = document.getElementById('pay-modal-submit');

  let pendingOrderData = null;

  if (phone) {
    phone.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.startsWith('7') || v.startsWith('8')) v = '7' + v.slice(1);
      if (v.length > 0 && !v.startsWith('7')) v = '7' + v;
      e.target.value = v.length > 0 ? '+' + v : '';
    });
  }

  // Radio styling feedback
  document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.payment-method-card').forEach(card => {
        card.style.borderColor = '#ddd';
        card.style.background = '#fff';
      });
      const parent = radio.closest('.payment-method-card');
      if (parent) {
        parent.style.borderColor = '#1866AD';
        parent.style.background = '#f0f7fc';
      }
    });
  });

  if (closeModal && modal) {
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  const completeOrder = async (orderData) => {
    const orderNumber = generateOrderNumber();
    await submitOrder({ ...orderData, orderNumber });
    cartStore.clear();
    navigateTo(`#/order-success/${orderNumber}`);
  };

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || 'cash';

    pendingOrderData = {
      name: document.getElementById('checkout-name').value,
      phone: document.getElementById('checkout-phone').value,
      email: document.getElementById('checkout-email').value,
      city: document.getElementById('checkout-city').value,
      address: document.getElementById('checkout-address').value,
      comment: document.getElementById('checkout-comment').value,
      paymentMethod,
      items: cartStore.getItems(),
      total: cartStore.getTotal()
    };

    if (paymentMethod === 'cash') {
      await completeOrder(pendingOrderData);
    } else {
      // Show Google Pay / Card payment simulation modal
      if (paymentMethod === 'installment') {
        if (modalTitle) modalTitle.textContent = 'Оформление рассрочки / Kaspi Pay';
        if (modalSubmitBtn) modalSubmitBtn.innerHTML = '<span>Подтвердить рассрочку 0%</span>';
      } else {
        if (modalTitle) modalTitle.textContent = 'Оплата картой / Google Pay';
        if (modalSubmitBtn) modalSubmitBtn.innerHTML = '<span>Оплатить в 1 клик (Google Pay)</span>';
      }
      if (modal) modal.style.display = 'flex';
    }
  });

  payModalForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (modalSubmitBtn) {
      modalSubmitBtn.disabled = true;
      modalSubmitBtn.innerHTML = '<span style="display:inline-block; animation: pulse 1s infinite;">Обработка платежа...</span>';
    }

    setTimeout(async () => {
      if (modal) modal.style.display = 'none';
      if (pendingOrderData) {
        await completeOrder(pendingOrderData);
      }
    }, 1200);
  });
}

