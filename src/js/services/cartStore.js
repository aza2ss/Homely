// Reactive cart store

const CART_STORAGE_KEY = 'homely_cart';

class CartStore {
  constructor() {
    this.items = this.loadCart();
    this.listeners = [];
  }

  loadCart() {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
      this.notifyListeners();
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }

  addItem(product, qty = 1) {
    const existing = this.items.find(item => item.product.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      this.items.push({ product, qty });
    }
    this.saveCart();
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.product.id !== productId);
    this.saveCart();
  }

  updateQuantity(productId, qty) {
    const existing = this.items.find(item => item.product.id === productId);
    if (existing) {
      if (qty <= 0) {
        this.removeItem(productId);
      } else {
        existing.qty = qty;
        this.saveCart();
      }
    }
  }

  getItems() {
    return [...this.items];
  }

  getTotal() {
    return this.items.reduce((total, item) => total + (item.product.price * item.qty), 0);
  }

  getCount() {
    return this.items.reduce((count, item) => count + item.qty, 0);
  }

  clear() {
    this.items = [];
    this.saveCart();
  }

  subscribe(callback) {
    this.listeners.push(callback);
    callback(); // immediate trigger with current state
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback());
    // Dispatch custom event for vanilla JS global listening if needed
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: { count: this.getCount() } }));
  }
}

export const cartStore = new CartStore();

export const addItem = (product, qty) => cartStore.addItem(product, qty);
export const removeItem = (productId) => cartStore.removeItem(productId);
export const updateQuantity = (productId, qty) => cartStore.updateQuantity(productId, qty);
export const getItems = () => cartStore.getItems();
export const getTotal = () => cartStore.getTotal();
export const getSubtotal = () => cartStore.getTotal();
export const getCount = () => cartStore.getCount();
export const clearCart = () => cartStore.clear();
export const clear = () => cartStore.clear();

