import { renderProductGrid, initProductCards } from '../components/productCard.js';
import { fetchProducts, getCategories } from '../services/dataService.js';

let currentProducts = [];
let allCategories = [];
let currentCategory = null;

export async function renderCatalog(categorySlug) {
  currentCategory = categorySlug;
  const allProducts = await fetchProducts();
  allCategories = await getCategories();
  
  currentProducts = categorySlug 
    ? allProducts.filter(p => p.category === categorySlug) 
    : allProducts;

  const categoryName = categorySlug 
    ? allCategories.find(c => c.slug === categorySlug)?.name || 'Каталог'
    : 'Каталог';

  return `
    <div class="container page-section">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item"><a href="#/">Главная</a></li>
        <span class="breadcrumbs__separator">/</span>
        ${categorySlug 
          ? `<li class="breadcrumbs__item"><a href="#/catalog">Каталог</a></li><span class="breadcrumbs__separator">/</span><li class="breadcrumbs__item breadcrumbs__item--active">${categoryName}</li>` 
          : `<li class="breadcrumbs__item breadcrumbs__item--active">Каталог</li>`}
      </ul>

      <div class="catalog-layout">
        <aside class="catalog-sidebar">
          <div class="filter-group">
            <h3 class="filter-group__title">Категории</h3>
            ${allCategories.map(cat => `
              <label class="checkbox-label">
                <input type="checkbox" name="category" value="${cat.slug}" ${cat.slug === categorySlug ? 'checked' : ''}>
                <span>${cat.name}</span>
              </label>
            `).join('')}
          </div>
          
          <div class="filter-group">
            <h3 class="filter-group__title">Цена</h3>
            <div class="range-input-group">
              <input type="number" id="price-min" placeholder="От">
              <span>-</span>
              <input type="number" id="price-max" placeholder="До">
            </div>
          </div>
          
          <div class="filter-group">
            <h3 class="filter-group__title">Наличие</h3>
            <label class="checkbox-label">
              <input type="radio" name="availability" value="all" checked>
              <span>Все</span>
            </label>
            <label class="checkbox-label">
              <input type="radio" name="availability" value="in_stock">
              <span>В наличии</span>
            </label>
            <label class="checkbox-label">
              <input type="radio" name="availability" value="to_order">
              <span>Под заказ</span>
            </label>
          </div>
        </aside>

        <main class="catalog-main">
          <div class="catalog-main__header">
            <h1>${categoryName}</h1>
            <div class="catalog-main__actions">
              <span id="product-count">${currentProducts.length} товаров</span>
              <select class="sort-select" id="sort-select">
                <option value="default">Сначала популярные</option>
                <option value="price_asc">Сначала дешевые</option>
                <option value="price_desc">Сначала дорогие</option>
              </select>
              <button class="btn btn--secondary mobile-filter-btn" id="mobile-filter-btn">Фильтры</button>
            </div>
          </div>
          <div id="catalog-grid">
            ${renderProductGrid(currentProducts)}
          </div>
        </main>
      </div>
    </div>
  `;
}

export function initCatalog() {
  initProductCards();
  
  const sortSelect = document.getElementById('sort-select');
  const catCheckboxes = document.querySelectorAll('input[name="category"]');
  const priceMin = document.getElementById('price-min');
  const priceMax = document.getElementById('price-max');
  const availRadios = document.querySelectorAll('input[name="availability"]');
  
  const filterAndRender = async () => {
    let allProducts = await fetchProducts();
    
    // Filters
    const selectedCats = Array.from(catCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
    const pMin = parseFloat(priceMin.value) || 0;
    const pMax = parseFloat(priceMax.value) || Infinity;
    const avail = document.querySelector('input[name="availability"]:checked').value;
    
    let filtered = allProducts.filter(p => {
      const matchCat = selectedCats.length === 0 || selectedCats.includes(p.category);
      const matchPrice = p.price >= pMin && p.price <= pMax;
      const matchAvail = avail === 'all' || p.availability === avail;
      return matchCat && matchPrice && matchAvail;
    });
    
    // Sort
    const sort = sortSelect.value;
    if (sort === 'price_asc') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') filtered.sort((a, b) => b.price - a.price);
    if (sort === 'default') filtered.sort((a, b) => (b.isHit ? 1 : 0) - (a.isHit ? 1 : 0));
    
    document.getElementById('catalog-grid').innerHTML = renderProductGrid(filtered);
    document.getElementById('product-count').innerText = `${filtered.length} товаров`;
    initProductCards();
  };
  
  sortSelect?.addEventListener('change', filterAndRender);
  catCheckboxes.forEach(cb => cb.addEventListener('change', filterAndRender));
  priceMin?.addEventListener('input', filterAndRender);
  priceMax?.addEventListener('input', filterAndRender);
  availRadios.forEach(r => r.addEventListener('change', filterAndRender));
  
  const mobileFilterBtn = document.getElementById('mobile-filter-btn');
  const sidebar = document.querySelector('.catalog-sidebar');
  mobileFilterBtn?.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
}
