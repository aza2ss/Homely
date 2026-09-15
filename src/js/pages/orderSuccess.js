export function renderOrderSuccess(orderNumber) {
  return `
    <div class="container page-section" style="display: flex; justify-content: center; align-items: center; min-height: 60vh;">
      <div class="order-success" style="background: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); text-align: center; max-width: 500px; width: 100%;">
        <div class="order-success__icon" style="color: #27ae60; margin-bottom: 20px; display: inline-flex; justify-content: center; align-items: center; width: 80px; height: 80px; background: #eafaf1; border-radius: 50%;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <h1 style="margin-bottom: 15px;">Заказ оформлен!</h1>
        <p style="margin-bottom: 10px; font-size: 18px;">Номер вашего заказа: <strong class="order-success__number" style="color: #1866AD;">#${orderNumber || '0000'}</strong></p>
        <p style="margin-bottom: 30px; color: #666;">Мы свяжемся с вами в ближайшее время для подтверждения.</p>
        <a href="#/" class="btn btn--primary" style="display: inline-block;">На главную</a>
      </div>
    </div>
  `;
}

export function initOrderSuccess() {
  // Animation if needed
}
