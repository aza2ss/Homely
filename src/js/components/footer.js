export function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-top grid grid-4">
          <div>
            <a href="#/" class="footer-logo">Home<span>ly</span></a>
            <p class="footer-text">Премиальная мебель для вашего дома. Создаем уют и комфорт с 2026 года.</p>
          </div>
          <div>
            <h4 class="footer-title">Покупателям</h4>
            <ul class="footer-links">
              <li><a href="#/catalog">Каталог</a></li>
              <li><a href="#/delivery">Доставка и оплата</a></li>
              <li><a href="#/warranty">Гарантия</a></li>
            </ul>
          </div>
          <div>
            <h4 class="footer-title">О компании</h4>
            <ul class="footer-links">
              <li><a href="#/about">О нас</a></li>
              <li><a href="#/contacts">Контакты</a></li>
              <li><a href="#/policy">Политика конфиденциальности</a></li>
            </ul>
          </div>
          <div>
            <h4 class="footer-title">Контакты</h4>
            <ul class="footer-links">
              <li>г. Алматы, ул. Абая 150</li>
              <li><a href="mailto:info@homely.kz">info@homely.kz</a></li>
            </ul>
            <div class="social-links">
              <a href="#" class="social-link" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="WhatsApp">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 Homely. Все права защищены.</p>
        </div>
      </div>
    </footer>
  `;
}
