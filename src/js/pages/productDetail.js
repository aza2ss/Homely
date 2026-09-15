import { fetchProductById, fetchProductsByCategory, formatPrice } from '../services/dataService.js';
import { renderProductGrid, initProductCards } from '../components/productCard.js';
import { cartStore } from '../services/cartStore.js';
import { showToast } from '../components/toast.js';

let currentProduct = null;

export async function renderProductDetail(productId) {
  currentProduct = await fetchProductById(productId);
  if (!currentProduct) return '<div class="container page-section"><h2>Товар не найден</h2></div>';
  
  const similarProducts = await fetchProductsByCategory(currentProduct.category);
  const others = similarProducts.filter(p => p.id !== currentProduct.id).slice(0, 4);

  return `
    <div class="container page-section">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item"><a href="#/">Главная</a></li>
        <span class="breadcrumbs__separator">/</span>
        <li class="breadcrumbs__item"><a href="#/catalog">Каталог</a></li>
        <span class="breadcrumbs__separator">/</span>
        <li class="breadcrumbs__item"><a href="#/catalog/${currentProduct.category}">${currentProduct.categoryName}</a></li>
        <span class="breadcrumbs__separator">/</span>
        <li class="breadcrumbs__item breadcrumbs__item--active">${currentProduct.name}</li>
      </ul>

      <div class="product-detail grid" style="grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 20px;">
        <div class="product-detail__gallery">
          <div class="product-detail__main-img">
            <img id="main-img" src="${currentProduct.images[0]}" alt="${currentProduct.name}" style="width: 100%; border-radius: 12px; object-fit: cover;">
          </div>
          <div class="product-detail__thumbnails" style="display: flex; gap: 10px; margin-top: 15px; overflow-x: auto;">
            ${currentProduct.images.map((img, idx) => `
              <img class="product-detail__thumb ${idx === 0 ? 'active' : ''}" src="${img}" data-src="${img}" alt="Thumb" style="width: 80px; height: 80px; border-radius: 8px; cursor: pointer; border: 2px solid ${idx===0 ? '#1866AD' : 'transparent'};">
            `).join('')}
          </div>
        </div>

        <div class="product-detail__info">
          <div class="product-detail__header">
            <h1 class="product-detail__title" style="margin-bottom: 10px; font-size: 28px;">${currentProduct.name}</h1>
            <div class="product-detail__meta" style="margin-bottom: 20px;">
              ${currentProduct.availability === 'in_stock' ? '<span class="badge badge--success">В наличии</span>' : currentProduct.availability === 'to_order' ? '<span class="badge badge--warning">Под заказ</span>' : '<span class="badge badge--danger">Нет в наличии</span>'}
              ${currentProduct.isHit ? '<span class="badge badge--hit" style="margin-left: 10px;">Хит</span>' : ''}
            </div>
          </div>
          
          <div class="product-detail__price-wrap" style="margin-bottom: 20px;">
            <div class="product-detail__price" style="font-size: 32px; font-weight: bold; color: #1866AD;">${formatPrice(currentProduct.price)}</div>
          </div>

          <div style="margin-bottom: 30px;">
            <p>${currentProduct.description}</p>
          </div>

          <div class="product-detail__actions" style="display: flex; align-items: center; gap: 20px; margin-bottom: 40px;">
            <div class="qty-selector" style="display: flex; align-items: center; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
              <button class="qty-selector__btn" id="qty-minus" style="padding: 10px 15px; border: none; background: #f7f8fa; cursor: pointer;">-</button>
              <input class="qty-selector__input" id="qty-input" type="number" value="1" min="1" max="10" style="width: 50px; text-align: center; border: none; background: transparent; pointer-events: none;">
              <button class="qty-selector__btn" id="qty-plus" style="padding: 10px 15px; border: none; background: #f7f8fa; cursor: pointer;">+</button>
            </div>
            <button class="btn btn--primary" id="btn-add-cart" style="flex: 1;" ${currentProduct.availability === 'out_of_stock' ? 'disabled' : ''}>В корзину</button>
          </div>

          <div class="product-detail__specs">
            <h3 style="margin-bottom: 15px;">Характеристики</h3>
            <table class="specs-table" style="width: 100%; border-collapse: collapse;">
              ${Object.entries(currentProduct.specs || {}).map(([k, v]) => `
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 10px 0; color: #666;">${k}</td>
                  <td style="padding: 10px 0; text-align: right; font-weight: 500;">${v}</td>
                </tr>
              `).join('')}
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666;">Производство</td>
                <td style="padding: 10px 0; text-align: right; font-weight: 500;">${currentProduct.origin || '-'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666;">Доставка</td>
                <td style="padding: 10px 0; text-align: right; font-weight: 500;">${currentProduct.deliveryTime || '-'}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      ${others.length ? `
      <section style="margin-top: 60px;">
        <h2 class="section-title">Похожие товары</h2>
        ${renderProductGrid(others)}
      </section>
      ` : ''}
    </div>
  `;
}

export function initProductDetail() {
  if (!currentProduct) return;
  initProductCards();

  const mainImg = document.getElementById('main-img');
  const thumbs = document.querySelectorAll('.product-detail__thumb');
  thumbs.forEach(t => {
    t.addEventListener('click', (e) => {
      mainImg.src = e.target.dataset.src;
      thumbs.forEach(th => {
        th.classList.remove('active');
        th.style.borderColor = 'transparent';
      });
      e.target.classList.add('active');
      e.target.style.borderColor = '#1866AD';
    });
  });

  const qtyInput = document.getElementById('qty-input');
  const qtyMinus = document.getElementById('qty-minus');
  const qtyPlus = document.getElementById('qty-plus');

  qtyMinus?.addEventListener('click', () => {
    let v = parseInt(qtyInput.value, 10);
    if (v > 1) qtyInput.value = v - 1;
  });
  qtyPlus?.addEventListener('click', () => {
    let v = parseInt(qtyInput.value, 10);
    if (v < 10) qtyInput.value = v + 1;
  });

  const btnAdd = document.getElementById('btn-add-cart');
  btnAdd?.addEventListener('click', () => {
    const qty = parseInt(qtyInput.value, 10);
    cartStore.addItem(currentProduct, qty);
    showToast('Товар добавлен в корзину!');
  });
}
