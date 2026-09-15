(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[];function t(t){e=t,window.addEventListener(`hashchange`,n),n()}function n(){let e=window.location.hash||`#/`,t=r(e);t&&t.handler?t.handler(t.params):window.location.hash=`#/`,a(e)}function r(t){let n=t.split(`?`)[0];for(let t of e){let e=t.path.split(`/`),r=n.split(`/`);if(e.length!==r.length)continue;let i=!0,a={};for(let t=0;t<e.length;t++)if(e[t].startsWith(`:`)){let n=e[t].slice(1);a[n]=r[t]}else if(e[t]!==r[t]){i=!1;break}if(i)return{handler:t.handler,params:a}}return null}function i(e){window.location.hash=e}function a(e){document.querySelectorAll(`nav a, .nav-link`).forEach(t=>{t.classList.remove(`active`);let n=t.getAttribute(`href`);(n===e||n===`#/catalog`&&e.startsWith(`#/catalog`))&&t.classList.add(`active`)})}var o=`homely_cart`,s=new class{constructor(){this.items=this.loadCart(),this.listeners=[]}loadCart(){try{let e=localStorage.getItem(o);return e?JSON.parse(e):[]}catch(e){return console.error(`Error loading cart from localStorage`,e),[]}}saveCart(){try{localStorage.setItem(o,JSON.stringify(this.items)),this.notifyListeners()}catch(e){console.error(`Error saving cart to localStorage`,e)}}addItem(e,t=1){let n=this.items.find(t=>t.product.id===e.id);n?n.qty+=t:this.items.push({product:e,qty:t}),this.saveCart()}removeItem(e){this.items=this.items.filter(t=>t.product.id!==e),this.saveCart()}updateQuantity(e,t){let n=this.items.find(t=>t.product.id===e);n&&(t<=0?this.removeItem(e):(n.qty=t,this.saveCart()))}getItems(){return[...this.items]}getTotal(){return this.items.reduce((e,t)=>e+t.product.price*t.qty,0)}getCount(){return this.items.reduce((e,t)=>e+t.qty,0)}clear(){this.items=[],this.saveCart()}subscribe(e){return this.listeners.push(e),e(),()=>{this.listeners=this.listeners.filter(t=>t!==e)}}notifyListeners(){this.listeners.forEach(e=>e()),window.dispatchEvent(new CustomEvent(`cart-updated`,{detail:{count:this.getCount()}}))}},c=(e,t)=>s.addItem(e,t),l=()=>s.getCount();function u(){return`
    <div class="container site-header__inner">
      <a href="#/" class="site-header__logo">Home<span>ly</span></a>
      <nav class="site-header__nav">
        <a href="#/" class="site-header__nav-link">Главная</a>
        <a href="#/catalog" class="site-header__nav-link">Каталог</a>
        <a href="#/contacts" class="site-header__nav-link">Контакты</a>
      </nav>
      <div class="site-header__actions">
        <a href="#/cart" class="cart-btn" aria-label="Корзина">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span class="cart-btn__badge" id="cart-badge">${l()}</span>
        </a>
        <button class="burger-menu" id="burger-menu" aria-label="Меню">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
    <div class="mobile-nav-overlay" id="mobile-nav-overlay"></div>
    <div class="mobile-nav" id="mobile-nav">
      <div class="mobile-nav__header">
        <a href="#/" class="site-header__logo">Home<span>ly</span></a>
        <button class="mobile-nav__close" id="mobile-nav-close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="mobile-nav__links">
        <a href="#/" class="mobile-nav__link">Главная</a>
        <a href="#/catalog" class="mobile-nav__link">Каталог</a>
        <a href="#/contacts" class="mobile-nav__link">Контакты</a>
      </div>
    </div>
  `}function d(){let e=document.querySelector(`.site-header`),t=document.getElementById(`burger-menu`),n=document.getElementById(`mobile-nav-close`),r=document.getElementById(`mobile-nav-overlay`),i=document.getElementById(`mobile-nav`),a=()=>{r.classList.toggle(`active`),i.classList.toggle(`active`)};t&&t.addEventListener(`click`,a),n&&n.addEventListener(`click`,a),r&&r.addEventListener(`click`,a),document.querySelectorAll(`.mobile-nav__link`).forEach(e=>{e.addEventListener(`click`,()=>{r.classList.remove(`active`),i.classList.remove(`active`)})}),window.addEventListener(`scroll`,()=>{window.scrollY>10?e&&e.classList.add(`site-header--scrolled`):e&&e.classList.remove(`site-header--scrolled`)}),window.addEventListener(`cart-updated`,()=>{let e=document.getElementById(`cart-badge`);e&&(e.textContent=l())})}function f(){return`
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
  `}function p(){return`
    <section class="hero">
      <div class="hero__slider">
        <div class="hero__slide active" style="background-image: url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80')">
          <div class="container hero__content">
            <h1 class="hero__title">Премиальная мебель для вашего дома</h1>
            <p class="hero__subtitle">Создайте уют с нашей новой коллекцией мебели в скандинавском стиле</p>
            <a href="#/catalog" class="btn btn--primary">Смотреть каталог</a>
          </div>
        </div>
        <div class="hero__slide" style="background-image: url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80')">
          <div class="container hero__content">
            <h1 class="hero__title">Стиль и комфорт</h1>
            <p class="hero__subtitle">Идеальные решения для современного интерьера</p>
            <a href="#/catalog" class="btn btn--primary">Выбрать диван</a>
          </div>
        </div>
      </div>
      <button class="hero__arrow hero__arrow--prev" aria-label="Предыдущий слайд">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <button class="hero__arrow hero__arrow--next" aria-label="Следующий слайд">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
      <div class="hero__indicators">
        <button class="hero__dot active" aria-label="Слайд 1"></button>
        <button class="hero__dot" aria-label="Слайд 2"></button>
      </div>
    </section>
  `}function m(){let e=document.querySelectorAll(`.hero__slide`),t=document.querySelectorAll(`.hero__dot`),n=document.querySelector(`.hero__arrow--prev`),r=document.querySelector(`.hero__arrow--next`),i=0,a;if(!e.length)return;let o=n=>{e[i].classList.remove(`active`),t[i].classList.remove(`active`),i=(n+e.length)%e.length,e[i].classList.add(`active`),t[i].classList.add(`active`)},s=()=>o(i+1),c=()=>o(i-1),l=()=>{a=setInterval(s,5e3)},u=()=>{clearInterval(a)};r&&r.addEventListener(`click`,()=>{s(),u(),l()}),n&&n.addEventListener(`click`,()=>{c(),u(),l()}),t.forEach((e,t)=>{e.addEventListener(`click`,()=>{o(t),u(),l()})}),l()}function h(e=[]){return(!e||e.length===0)&&(e=[{id:`1`,slug:`divany`,name:`Диваны`,img:`https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80`},{id:`2`,slug:`krovati`,name:`Кровати`,img:`https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80`},{id:`3`,slug:`shkafy`,name:`Шкафы`,img:`https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=400&q=80`},{id:`4`,slug:`stoly`,name:`Столы`,img:`https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=400&q=80`},{id:`5`,slug:`kresla`,name:`Кресла`,img:`https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=400&q=80`}]),`
    <section class="page-section">
      <div class="container">
        <h2 class="section-title">Популярные категории</h2>
        <div class="grid grid-5">
          ${e.map(e=>`
    <a href="#/catalog?category=${e.slug}" class="category-card">
      <img src="${e.img}" alt="${e.name}" class="category-card__img">
      <div class="category-card__overlay">
        <h3 class="category-card__title">${e.name}</h3>
      </div>
    </a>
  `).join(``)}
        </div>
      </div>
    </section>
  `}var g=JSON.parse(`[{"id":"item-001","name":"Диван угловой \\"Комфорт\\"","category":"divany","categoryName":"Диваны","price":185000,"images":["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=600&fit=crop"],"specs":{"material":"Велюр, каркас из массива берёзы","dimensions":"240×160×85 см","color":"Серый","weight":"68 кг"},"origin":"Алматы, Казахстан","deliveryTime":"3–5 дней","availability":"in_stock","description":"Просторный угловой диван с мягкими подушками. Раскладной механизм \\"дельфин\\", встроенный ящик для белья.","isHit":true},{"id":"item-002","name":"Кровать двуспальная \\"Милана\\"","category":"krovati","categoryName":"Кровати","price":120000,"images":["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1522771731478-4a69ebda0bc0?w=800&h=600&fit=crop"],"specs":{"material":"Массив дуба, экокожа","dimensions":"210×170×110 см","color":"Светло-коричневый","weight":"80 кг"},"origin":"Алматы, Казахстан","deliveryTime":"2–4 дня","availability":"in_stock","description":"Шикарная двуспальная кровать с мягким изголовьем.","isHit":true},{"id":"item-003","name":"Шкаф-купе 3-дверный","category":"shkafy","categoryName":"Шкафы","price":95000,"images":["https://images.unsplash.com/photo-1595526114101-2a71bc97855b?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1595526051245-4506e0005bd0?w=800&h=600&fit=crop"],"specs":{"material":"ЛДСП, зеркало","dimensions":"220×180×60 см","color":"Светлый дуб","weight":"110 кг"},"origin":"Астана, Казахстан","deliveryTime":"5–7 дней","availability":"in_stock","description":"Вместительный шкаф-купе с большими зеркалами.","isHit":true},{"id":"item-004","name":"Стол обеденный \\"Прага\\"","category":"stoly","categoryName":"Столы","price":65000,"images":["https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&h=600&fit=crop"],"specs":{"material":"Массив дуба","dimensions":"160×90×75 см","color":"Натуральный дуб","weight":"45 кг"},"origin":"Усть-Каменогорск, Казахстан","deliveryTime":"В наличии","availability":"in_stock","description":"Прочный деревянный стол для всей семьи.","isHit":true},{"id":"item-005","name":"Стул мягкий \\"Вена\\"","category":"kresla","categoryName":"Кресла и стулья","price":18000,"images":["https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&h=600&fit=crop"],"specs":{"material":"Велюр, металлический каркас","dimensions":"50×55×85 см","color":"Серый","weight":"6 кг"},"origin":"Алматы, Казахстан","deliveryTime":"В наличии","availability":"in_stock","description":"Элегантный и удобный обеденный стул с мягкой обивкой.","isHit":true},{"id":"item-006","name":"Кресло-качалка","category":"kresla","categoryName":"Кресла","price":45000,"images":["https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1567538096621-38d228f41e06?w=800&h=600&fit=crop"],"specs":{"material":"Ротанг, ткань","dimensions":"80×90×100 см","color":"Орех","weight":"14 кг"},"origin":"Алматы, Казахстан","deliveryTime":"В наличии","availability":"in_stock","description":"Комфортное кресло-качалка для идеального отдыха.","isHit":true},{"id":"item-007","name":"Тумба прикроватная","category":"krovati","categoryName":"Кровати и спальни","price":22000,"images":["https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=800&h=600&fit=crop"],"specs":{"material":"ЛДСП","dimensions":"45×40×50 см","color":"Белый","weight":"12 кг"},"origin":"Шымкент, Казахстан","deliveryTime":"В наличии","availability":"in_stock","description":"Компактная прикроватная тумба с 2 ящиками.","isHit":false},{"id":"item-008","name":"Комод 4-секционный","category":"shkafy","categoryName":"Шкафы и комоды","price":58000,"images":["https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=600&fit=crop"],"specs":{"material":"МДФ","dimensions":"90×45×100 см","color":"Дуб венге","weight":"38 кг"},"origin":"Караганда, Казахстан","deliveryTime":"В наличии","availability":"in_stock","description":"Удобный комод с выдвижными ящиками для хранения вещей.","isHit":false},{"id":"item-009","name":"Матрас ортопедический","category":"krovati","categoryName":"Кровати и матрасы","price":78000,"images":["https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&h=600&fit=crop"],"specs":{"material":"Независимые пружины, кокос, трикотаж","dimensions":"160×200×22 см","color":"Белый","weight":"24 кг"},"origin":"Алматы, Казахстан","deliveryTime":"В наличии","availability":"in_stock","description":"Ортопедический матрас средней жесткости с анатомическим эффектом.","isHit":false},{"id":"item-010","name":"Диван-книжка \\"Ева\\"","category":"divany","categoryName":"Диваны","price":92000,"images":["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=600&fit=crop"],"specs":{"material":"Шенилл, ПБ","dimensions":"210×95×90 см","color":"Серый","weight":"52 кг"},"origin":"Алматы, Казахстан","deliveryTime":"В наличии","availability":"in_stock","description":"Классический диван-книжка с бельевым ящиком.","isHit":false},{"id":"item-011","name":"Стенка модульная \\"Атланта\\"","category":"shkafy","categoryName":"Шкафы и гостиные","price":210000,"images":["https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop"],"specs":{"material":"ЛДСП, стекло","dimensions":"280×45×200 см","color":"Белый глянец / Сонома","weight":"115 кг"},"origin":"Астана, Казахстан","deliveryTime":"3–5 дней","availability":"in_stock","description":"Современная гостиная стенка с ТВ-нишей.","isHit":false},{"id":"item-012","name":"Журнальный столик","category":"stoly","categoryName":"Столы","price":27000,"images":["https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&h=600&fit=crop"],"specs":{"material":"МДФ, металл","dimensions":"60×60×45 см","color":"Черный / Дерево","weight":"8 кг"},"origin":"Алматы, Казахстан","deliveryTime":"В наличии","availability":"in_stock","description":"Стильный журнальный столик для гостиной.","isHit":false},{"id":"item-013","name":"Пуф мягкий","category":"kresla","categoryName":"Кресла и пуфы","price":12000,"images":["https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800&h=600&fit=crop"],"specs":{"material":"Велюр","dimensions":"40×40×42 см","color":"Изумрудный","weight":"4 кг"},"origin":"Алматы, Казахстан","deliveryTime":"В наличии","availability":"in_stock","description":"Компактный мягкий пуф с вместительной нишей.","isHit":false},{"id":"item-014","name":"Зеркало напольное","category":"shkafy","categoryName":"Предметы интерьера","price":34000,"images":["https://images.unsplash.com/photo-1618220179428-22790b46a0eb?w=800&h=600&fit=crop"],"specs":{"material":"Зеркало, металлическая рама","dimensions":"50×160 см","color":"Черный","weight":"9 кг"},"origin":"Алматы, Казахстан","deliveryTime":"В наличии","availability":"in_stock","description":"Элегантное напольное зеркало в тонкой металлической раме.","isHit":false},{"id":"item-015","name":"Полка навесная","category":"shkafy","categoryName":"Полки","price":15000,"images":["https://images.unsplash.com/photo-1595526051245-4506e0005bd0?w=800&h=600&fit=crop"],"specs":{"material":"Массив сосны","dimensions":"80×20×25 см","color":"Натуральное дерево","weight":"3 кг"},"origin":"Алматы, Казахстан","deliveryTime":"В наличии","availability":"in_stock","description":"Настенная полка для книг и декора.","isHit":false}]`);async function _(){return g}async function v(e){return(await _()).find(t=>t.id===e)}async function y(e){return(await _()).filter(t=>t.category===e)}async function b(){let e=await _(),t=new Map;return e.forEach(e=>{if(t.has(e.category)){let n=t.get(e.category);n.count++}else t.set(e.category,{slug:e.category,name:e.categoryName,count:1})}),Array.from(t.values())}function x(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,` `)+` ₸`}function S(e,t=`success`,n=3e3){let r=document.getElementById(`toast-container`);if(!r)return;let i=document.createElement(`div`);i.className=`toast toast--${t}`;let a=``;a=t===`success`?`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`:t===`error`?`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,i.innerHTML=`
    ${a}
    <div class="toast__content">
      <div class="toast__title">${t===`success`?`Успешно`:t===`error`?`Ошибка`:`Уведомление`}</div>
      <div class="toast__msg">${e}</div>
    </div>
    <button class="toast__close" aria-label="Закрыть">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  `,r.appendChild(i);let o=i.querySelector(`.toast__close`),s=()=>{i.classList.add(`hiding`),setTimeout(()=>{i.parentElement&&i.remove()},300)};o.addEventListener(`click`,s),setTimeout(()=>{i.parentElement&&s()},n)}function C(e){let t=(e=>{switch(e){case`in_stock`:return{text:`В наличии`,cls:`badge--success`};case`to_order`:return{text:`Под заказ`,cls:`badge--warning`};case`out_of_stock`:return{text:`Нет в наличии`,cls:`badge--danger`};default:return{text:``,cls:``}}})(e.availability),n=e.isHit?`<span class="badge badge--hit">Хит</span>`:``,r=t.text?`<span class="badge ${t.cls}" style="position:absolute; top:10px; right:10px;">${t.text}</span>`:``;return`
    <article class="product-card" data-id="${e.id}">
      <div class="product-card__img-wrap">
        <a href="#/product/${e.id}">
          <img src="${e.images[0]}" alt="${e.name}" class="product-card__img">
        </a>
        <div style="position:absolute; top:10px; left:10px; display:flex; flex-direction:column; gap:5px;">
          ${n}
        </div>
        ${r}
      </div>
      <div class="product-card__content">
        <span class="product-card__category">${e.categoryName}</span>
        <h3 class="product-card__title">
          <a href="#/product/${e.id}">${e.name}</a>
        </h3>
        <div class="product-card__footer">
          <span class="product-card__price">${x(e.price)} ₸</span>
          <button class="product-card__add-btn" aria-label="Добавить в корзину" ${e.availability===`out_of_stock`?`disabled`:``}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `}function w(e=[],t=`grid grid-4`){return!e||e.length===0?`<p class="no-products">Товары не найдены</p>`:`
    <div class="${t}">
      ${e.map(e=>C(e)).join(``)}
    </div>
  `}function T(){document.querySelectorAll(`.product-card__add-btn`).forEach(e=>{e.addEventListener(`click`,async e=>{let t=e.target.closest(`.product-card`);if(t){let e=await v(t.getAttribute(`data-id`));e&&(c(e),S(`Товар добавлен в корзину`,`success`))}})})}async function E(){let e=(await _()).filter(e=>e.isHit).slice(0,4);return`
    ${p()}
    <section class="page-section">
      <div class="container">
        ${h()}
      </div>
    </section>
    
    <section class="page-section">
      <div class="container">
        <h2 class="section-title">Хиты продаж</h2>
        ${w(e)}
      </div>
    </section>

    <section class="page-section">
      <div class="container">
        <h2 class="section-title">Почему Homely?</h2>
        <div class="advantages-grid grid grid-4">
          <div class="advantage-card">
            <div class="advantage-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <h3 class="advantage-card__title">Высокое качество</h3>
            <p class="advantage-card__text">Тщательно отбираем материалы и контролируем производство.</p>
          </div>
          <div class="advantage-card">
            <div class="advantage-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
            </div>
            <h3 class="advantage-card__title">Бережная доставка</h3>
            <p class="advantage-card__text">Доставляем мебель в сохранности точно в срок.</p>
          </div>
          <div class="advantage-card">
            <div class="advantage-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <h3 class="advantage-card__title">Гарантия до 5 лет</h3>
            <p class="advantage-card__text">Уверены в своей мебели и предоставляем долгую гарантию.</p>
          </div>
          <div class="advantage-card">
            <div class="advantage-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
            </div>
            <h3 class="advantage-card__title">Удобная оплата</h3>
            <p class="advantage-card__text">Различные способы оплаты для вашего комфорта.</p>
          </div>
        </div>
      </div>
    </section>
  `}function D(){m(),T()}var O=[],k=[];async function A(e){let t=await _();k=await b(),O=e?t.filter(t=>t.category===e):t;let n=e&&k.find(t=>t.slug===e)?.name||`Каталог`;return`
    <div class="container page-section">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item"><a href="#/">Главная</a></li>
        <span class="breadcrumbs__separator">/</span>
        ${e?`<li class="breadcrumbs__item"><a href="#/catalog">Каталог</a></li><span class="breadcrumbs__separator">/</span><li class="breadcrumbs__item breadcrumbs__item--active">${n}</li>`:`<li class="breadcrumbs__item breadcrumbs__item--active">Каталог</li>`}
      </ul>

      <div class="catalog-layout">
        <aside class="catalog-sidebar">
          <div class="filter-group">
            <h3 class="filter-group__title">Категории</h3>
            ${k.map(t=>`
              <label class="checkbox-label">
                <input type="checkbox" name="category" value="${t.slug}" ${t.slug===e?`checked`:``}>
                <span>${t.name}</span>
              </label>
            `).join(``)}
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
            <h1>${n}</h1>
            <div class="catalog-main__actions">
              <span id="product-count">${O.length} товаров</span>
              <select class="sort-select" id="sort-select">
                <option value="default">Сначала популярные</option>
                <option value="price_asc">Сначала дешевые</option>
                <option value="price_desc">Сначала дорогие</option>
              </select>
              <button class="btn btn--secondary mobile-filter-btn" id="mobile-filter-btn">Фильтры</button>
            </div>
          </div>
          <div id="catalog-grid">
            ${w(O)}
          </div>
        </main>
      </div>
    </div>
  `}function j(){T();let e=document.getElementById(`sort-select`),t=document.querySelectorAll(`input[name="category"]`),n=document.getElementById(`price-min`),r=document.getElementById(`price-max`),i=document.querySelectorAll(`input[name="availability"]`),a=async()=>{let i=await _(),a=Array.from(t).filter(e=>e.checked).map(e=>e.value),o=parseFloat(n.value)||0,s=parseFloat(r.value)||1/0,c=document.querySelector(`input[name="availability"]:checked`).value,l=i.filter(e=>{let t=a.length===0||a.includes(e.category),n=e.price>=o&&e.price<=s,r=c===`all`||e.availability===c;return t&&n&&r}),u=e.value;u===`price_asc`&&l.sort((e,t)=>e.price-t.price),u===`price_desc`&&l.sort((e,t)=>t.price-e.price),u==="default"&&l.sort((e,t)=>+!!t.isHit-!!e.isHit),document.getElementById(`catalog-grid`).innerHTML=w(l),document.getElementById(`product-count`).innerText=`${l.length} товаров`,T()};e?.addEventListener(`change`,a),t.forEach(e=>e.addEventListener(`change`,a)),n?.addEventListener(`input`,a),r?.addEventListener(`input`,a),i.forEach(e=>e.addEventListener(`change`,a));let o=document.getElementById(`mobile-filter-btn`),s=document.querySelector(`.catalog-sidebar`);o?.addEventListener(`click`,()=>{s.classList.toggle(`active`)})}var M=null;async function N(e){if(M=await v(e),!M)return`<div class="container page-section"><h2>Товар не найден</h2></div>`;let t=(await y(M.category)).filter(e=>e.id!==M.id).slice(0,4);return`
    <div class="container page-section">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item"><a href="#/">Главная</a></li>
        <span class="breadcrumbs__separator">/</span>
        <li class="breadcrumbs__item"><a href="#/catalog">Каталог</a></li>
        <span class="breadcrumbs__separator">/</span>
        <li class="breadcrumbs__item"><a href="#/catalog/${M.category}">${M.categoryName}</a></li>
        <span class="breadcrumbs__separator">/</span>
        <li class="breadcrumbs__item breadcrumbs__item--active">${M.name}</li>
      </ul>

      <div class="product-detail grid" style="grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 20px;">
        <div class="product-detail__gallery">
          <div class="product-detail__main-img">
            <img id="main-img" src="${M.images[0]}" alt="${M.name}" style="width: 100%; border-radius: 12px; object-fit: cover;">
          </div>
          <div class="product-detail__thumbnails" style="display: flex; gap: 10px; margin-top: 15px; overflow-x: auto;">
            ${M.images.map((e,t)=>`
              <img class="product-detail__thumb ${t===0?`active`:``}" src="${e}" data-src="${e}" alt="Thumb" style="width: 80px; height: 80px; border-radius: 8px; cursor: pointer; border: 2px solid ${t===0?`#1866AD`:`transparent`};">
            `).join(``)}
          </div>
        </div>

        <div class="product-detail__info">
          <div class="product-detail__header">
            <h1 class="product-detail__title" style="margin-bottom: 10px; font-size: 28px;">${M.name}</h1>
            <div class="product-detail__meta" style="margin-bottom: 20px;">
              ${M.availability===`in_stock`?`<span class="badge badge--success">В наличии</span>`:M.availability===`to_order`?`<span class="badge badge--warning">Под заказ</span>`:`<span class="badge badge--danger">Нет в наличии</span>`}
              ${M.isHit?`<span class="badge badge--hit" style="margin-left: 10px;">Хит</span>`:``}
            </div>
          </div>
          
          <div class="product-detail__price-wrap" style="margin-bottom: 20px;">
            <div class="product-detail__price" style="font-size: 32px; font-weight: bold; color: #1866AD;">${x(M.price)}</div>
          </div>

          <div style="margin-bottom: 30px;">
            <p>${M.description}</p>
          </div>

          <div class="product-detail__actions" style="display: flex; align-items: center; gap: 20px; margin-bottom: 40px;">
            <div class="qty-selector" style="display: flex; align-items: center; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
              <button class="qty-selector__btn" id="qty-minus" style="padding: 10px 15px; border: none; background: #f7f8fa; cursor: pointer;">-</button>
              <input class="qty-selector__input" id="qty-input" type="number" value="1" min="1" max="10" style="width: 50px; text-align: center; border: none; background: transparent; pointer-events: none;">
              <button class="qty-selector__btn" id="qty-plus" style="padding: 10px 15px; border: none; background: #f7f8fa; cursor: pointer;">+</button>
            </div>
            <button class="btn btn--primary" id="btn-add-cart" style="flex: 1;" ${M.availability===`out_of_stock`?`disabled`:``}>В корзину</button>
          </div>

          <div class="product-detail__specs">
            <h3 style="margin-bottom: 15px;">Характеристики</h3>
            <table class="specs-table" style="width: 100%; border-collapse: collapse;">
              ${Object.entries(M.specs||{}).map(([e,t])=>`
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 10px 0; color: #666;">${e}</td>
                  <td style="padding: 10px 0; text-align: right; font-weight: 500;">${t}</td>
                </tr>
              `).join(``)}
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666;">Производство</td>
                <td style="padding: 10px 0; text-align: right; font-weight: 500;">${M.origin||`-`}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666;">Доставка</td>
                <td style="padding: 10px 0; text-align: right; font-weight: 500;">${M.deliveryTime||`-`}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      ${t.length?`
      <section style="margin-top: 60px;">
        <h2 class="section-title">Похожие товары</h2>
        ${w(t)}
      </section>
      `:``}
    </div>
  `}function P(){if(!M)return;T();let e=document.getElementById(`main-img`),t=document.querySelectorAll(`.product-detail__thumb`);t.forEach(n=>{n.addEventListener(`click`,n=>{e.src=n.target.dataset.src,t.forEach(e=>{e.classList.remove(`active`),e.style.borderColor=`transparent`}),n.target.classList.add(`active`),n.target.style.borderColor=`#1866AD`})});let n=document.getElementById(`qty-input`),r=document.getElementById(`qty-minus`),i=document.getElementById(`qty-plus`);r?.addEventListener(`click`,()=>{let e=parseInt(n.value,10);e>1&&(n.value=e-1)}),i?.addEventListener(`click`,()=>{let e=parseInt(n.value,10);e<10&&(n.value=e+1)}),document.getElementById(`btn-add-cart`)?.addEventListener(`click`,()=>{let e=parseInt(n.value,10);s.addItem(M,e),S(`Товар добавлен в корзину!`)})}function F(){let e=s.getItems();if(e.length===0)return`
      <div class="container page-section empty-cart" style="text-align: center; padding: 60px 0;">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2" style="margin-bottom: 20px;">
          <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <h2 style="margin-bottom: 20px;">Ваша корзина пуста</h2>
        <a href="#/catalog" class="btn btn--primary">Перейти в каталог</a>
      </div>
    `;let t=e=>{let t=e%100;if(t>=11&&t<=19)return`товаров`;let n=e%10;return n===1?`товар`:n>=2&&n<=4?`товара`:`товаров`},n=s.getCount();return`
    <div class="container page-section">
      <h1 style="margin-bottom: 30px;">Корзина</h1>
      <div class="cart-layout" style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px; align-items: start;">
        <div class="cart-items">
          ${e.map(e=>`
            <div class="cart-item" style="display: flex; gap: 20px; padding: 20px; background: #fff; border-radius: 12px; margin-bottom: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); align-items: center;">
              <img class="cart-item__img" src="${e.product.images[0]}" alt="${e.product.name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;">
              <div class="cart-item__info" style="flex: 1;">
                <h3 class="cart-item__title" style="margin-bottom: 10px;">${e.product.name}</h3>
                <div class="cart-item__price" style="font-weight: bold; color: #1866AD;">${x(e.product.price)}</div>
              </div>
              <div class="qty-selector" style="display: flex; align-items: center; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                <button class="qty-selector__btn cart-qty-minus" data-id="${e.product.id}" style="padding: 5px 10px; border: none; background: #f7f8fa; cursor: pointer;">-</button>
                <input class="qty-selector__input" type="number" value="${e.quantity}" style="width: 40px; text-align: center; border: none; background: transparent; pointer-events: none;">
                <button class="qty-selector__btn cart-qty-plus" data-id="${e.product.id}" style="padding: 5px 10px; border: none; background: #f7f8fa; cursor: pointer;">+</button>
              </div>
              <button class="cart-item__remove btn btn--ghost" data-id="${e.product.id}" style="color: #ff4d4f;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          `).join(``)}
        </div>
        
        <aside class="cart-summary" style="background: #fff; padding: 25px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); position: sticky; top: 20px;">
          <h2 class="cart-summary__title" style="margin-bottom: 20px;">Итого</h2>
          <div class="cart-summary__row" style="display: flex; justify-content: space-between; margin-bottom: 15px; color: #666;">
            <span>${n} ${t(n)}</span>
            <span>${x(s.getTotal())}</span>
          </div>
          <div class="cart-summary__row" style="display: flex; justify-content: space-between; margin-bottom: 25px; font-size: 20px; font-weight: bold;">
            <span>К оплате</span>
            <span class="cart-summary__total" style="color: #1866AD;">${x(s.getTotal())}</span>
          </div>
          <button id="btn-checkout" class="btn btn--primary btn--block" style="width: 100%;">Оформить заказ</button>
        </aside>
      </div>
    </div>
  `}function I(){let e=document.getElementById(`app`),t=()=>{e.innerHTML=F(),I()};document.querySelectorAll(`.cart-qty-minus`).forEach(e=>{e.addEventListener(`click`,e=>{let n=e.currentTarget.dataset.id,r=s.getItems().find(e=>e.product.id===n);r&&r.quantity>1&&(s.updateQuantity(n,r.quantity-1),t())})}),document.querySelectorAll(`.cart-qty-plus`).forEach(e=>{e.addEventListener(`click`,e=>{let n=e.currentTarget.dataset.id,r=s.getItems().find(e=>e.product.id===n);r&&(s.updateQuantity(n,r.quantity+1),t())})}),document.querySelectorAll(`.cart-item__remove`).forEach(e=>{e.addEventListener(`click`,e=>{let n=e.currentTarget.dataset.id;s.removeItem(n),t()})}),document.getElementById(`btn-checkout`)?.addEventListener(`click`,()=>{i(`#/checkout`)})}function L(){return`HML-${Math.floor(1e5+Math.random()*9e5)}`}async function R(e){let t=L(),n={...e,orderNumber:t,date:new Date().toISOString()};return B(n),console.log(`Order submitted locally:`,n),new Promise(e=>{setTimeout(()=>{e({success:!0,orderNumber:t,message:`Заказ успешно сохранен локально`})},800)})}function z(){try{let e=localStorage.getItem(`homely_orders`);return e?JSON.parse(e):[]}catch(e){return console.error(`Error reading orders from localStorage`,e),[]}}function B(e){let t=z();t.push(e),localStorage.setItem(`homely_orders`,JSON.stringify(t))}function V(){let e=s.getItems();return e.length===0?`
      <div class="container page-section empty-cart" style="text-align: center; padding: 60px 0;">
        <h2>Ваша корзина пуста</h2>
        <a href="#/catalog" class="btn btn--primary" style="margin-top: 20px;">В каталог</a>
      </div>
    `:`
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
            ${e.map(e=>`
              <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px;">
                <span>${e.product.name} x${e.quantity}</span>
                <span style="font-weight: 500;">${x(e.product.price*e.quantity)}</span>
              </div>
            `).join(``)}
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;">
          <div class="cart-summary__row" style="display: flex; justify-content: space-between; font-size: 20px; font-weight: bold;">
            <span>Итого</span>
            <span class="cart-summary__total" style="color: #1866AD;">${x(s.getTotal())}</span>
          </div>
        </aside>
      </div>
    </div>
  `}function H(){let e=document.getElementById(`checkout-form`),t=document.getElementById(`checkout-phone`);t&&t.addEventListener(`input`,e=>{let t=e.target.value.replace(/\D/g,``);(t.startsWith(`7`)||t.startsWith(`8`))&&(t=`7`+t.slice(1)),t.length>0&&!t.startsWith(`7`)&&(t=`7`+t),e.target.value=t.length>0?`+`+t:``}),e?.addEventListener(`submit`,async e=>{e.preventDefault();let t={name:document.getElementById(`checkout-name`).value,phone:document.getElementById(`checkout-phone`).value,email:document.getElementById(`checkout-email`).value,city:document.getElementById(`checkout-city`).value,address:document.getElementById(`checkout-address`).value,comment:document.getElementById(`checkout-comment`).value,items:s.getItems(),total:s.getTotal()},n=L();await R({...t,orderNumber:n}),s.clear(),i(`#/order-success/${n}`)})}function U(){return`
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
  `}function W(){}function G(e){return`
    <div class="container page-section" style="display: flex; justify-content: center; align-items: center; min-height: 60vh;">
      <div class="order-success" style="background: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); text-align: center; max-width: 500px; width: 100%;">
        <div class="order-success__icon" style="color: #27ae60; margin-bottom: 20px; display: inline-flex; justify-content: center; align-items: center; width: 80px; height: 80px; background: #eafaf1; border-radius: 50%;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <h1 style="margin-bottom: 15px;">Заказ оформлен!</h1>
        <p style="margin-bottom: 10px; font-size: 18px;">Номер вашего заказа: <strong class="order-success__number" style="color: #1866AD;">#${e||`0000`}</strong></p>
        <p style="margin-bottom: 30px; color: #666;">Мы свяжемся с вами в ближайшее время для подтверждения.</p>
        <a href="#/" class="btn btn--primary" style="display: inline-block;">На главную</a>
      </div>
    </div>
  `}function K(){}var q=document.getElementById(`main-content`),J=document.getElementById(`site-header`),Y=document.getElementById(`site-footer`);J.innerHTML=u(),Y.innerHTML=f(),d();function X(){window.scrollTo({top:0,behavior:`instant`})}async function Z(e,t,...n){q.innerHTML=`<div class="page-loading"><div class="spinner"></div></div>`,X();try{q.innerHTML=await e(...n),t&&await t(...n),Q()}catch(e){console.error(`Page render error:`,e),q.innerHTML=`
      <section class="page-section">
        <div class="container" style="text-align:center;padding:80px 0;">
          <h2>Произошла ошибка</h2>
          <p style="margin-top:16px;color:var(--text-secondary)">Попробуйте обновить страницу</p>
          <a href="#/" class="btn btn--primary" style="margin-top:24px;">На главную</a>
        </div>
      </section>
    `}}t([{path:`#/`,handler:()=>Z(E,D)},{path:`#/catalog`,handler:()=>Z(A,j)},{path:`#/catalog/:category`,handler:e=>Z(A,j,e.category)},{path:`#/product/:id`,handler:e=>Z(N,P,e.id)},{path:`#/cart`,handler:()=>Z(F,I)},{path:`#/checkout`,handler:()=>Z(V,H)},{path:`#/contacts`,handler:()=>Z(U,W)},{path:`#/order-success/:orderNumber`,handler:e=>Z(G,K,e.orderNumber)}]);function Q(){let e=document.querySelectorAll(`.scroll-reveal:not(.visible)`);if(!e.length)return;let t=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add(`visible`),t.unobserve(e.target))})},{threshold:.1,rootMargin:`0px 0px -50px 0px`});e.forEach(e=>t.observe(e))}window.addEventListener(`hashchange`,()=>{let e=window.location.hash||`#/`;document.querySelectorAll(`.nav-link`).forEach(t=>{let n=t.getAttribute(`href`);n===e||n===`#/catalog`&&e.startsWith(`#/catalog`)?t.classList.add(`active`):t.classList.remove(`active`)})}),console.log(`🏠 Homely — Интернет-магазин мебели загружен`);