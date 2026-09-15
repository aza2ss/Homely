export function renderContacts() {
  return `
    <div class="container page-section">
      <h1 style="margin-bottom: 30px;">Контакты</h1>
      <div class="contacts-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
        <div class="contacts-info" style="display: flex; flex-direction: column; gap: 20px;">
          <div class="contact-card" style="display: flex; gap: 15px; padding: 20px; background: #fff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <div class="contact-card__icon" style="color: #1866AD;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <div class="contact-card__content">
              <h3 style="margin-bottom: 5px;">Адрес</h3>
              <p style="color: #666;">г. Алматы, ул. Абая 150</p>
            </div>
          </div>
          
          <div class="contact-card" style="display: flex; gap: 15px; padding: 20px; background: #fff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <div class="contact-card__icon" style="color: #1866AD;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <div class="contact-card__content">
              <h3 style="margin-bottom: 5px;">Email</h3>
              <p style="color: #666;">info@homely.kz</p>
            </div>
          </div>
          
          <div class="contact-card" style="display: flex; gap: 15px; padding: 20px; background: #fff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <div class="contact-card__icon" style="color: #1866AD;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <div class="contact-card__content">
              <h3 style="margin-bottom: 5px;">График работы</h3>
              <p style="color: #666;">Пн–Сб: 09:00–19:00</p>
            </div>
          </div>

          <div class="contact-card" style="display: flex; gap: 15px; padding: 20px; background: #fff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <div class="contact-card__icon" style="color: #1866AD;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </div>
            <div class="contact-card__content">
              <h3 style="margin-bottom: 5px;">Соцсети</h3>
              <p style="color: #666;">Instagram, WhatsApp</p>
            </div>
          </div>
        </div>

        <div class="map-container" style="border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.776667104321!2d76.9069503154868!3d43.23933597913757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836931707925bd%3A0xc62daecb0e00fdf!2sAbay%20Ave%20150%2C%20Almaty%20050000%2C%20Kazakhstan!5e0!3m2!1sen!2s!4v1689255874052!5m2!1sen!2s" width="100%" height="100%" style="border:0; min-height: 400px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  `;
}

export function initContacts() {
  // Empty
}
