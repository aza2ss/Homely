export function renderCategories(categories = []) {
  if (!categories || categories.length === 0) {
    categories = [
      { id: '1', slug: 'divany', name: 'Диваны', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80' },
      { id: '2', slug: 'krovati', name: 'Кровати', img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80' },
      { id: '3', slug: 'shkafy', name: 'Шкафы', img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=400&q=80' },
      { id: '4', slug: 'stoly', name: 'Столы', img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=400&q=80' },
      { id: '5', slug: 'kresla', name: 'Кресла', img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=400&q=80' }
    ];
  }

  const categoryCards = categories.map(cat => `
    <a href="#/catalog?category=${cat.slug}" class="category-card">
      <img src="${cat.img}" alt="${cat.name}" class="category-card__img">
      <div class="category-card__overlay">
        <h3 class="category-card__title">${cat.name}</h3>
      </div>
    </a>
  `).join('');

  return `
    <section class="page-section">
      <div class="container">
        <h2 class="section-title">Популярные категории</h2>
        <div class="grid grid-5">
          ${categoryCards}
        </div>
      </div>
    </section>
  `;
}

export function initCategories() {
  // Category card interaction initializers if needed
}
