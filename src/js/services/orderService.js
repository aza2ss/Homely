// Укажите ссылку на ваш Google Apps Script Web App (Webhook):
export const GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyZ8EpbSCWCYmf4nA6HRGr5dKlVjPcHYlhoP8xLslF0eDogDEHV1jOZVqiA6vqijC0/exec';
 

/**
 * Generates a random order number like 'HML-123456'
 */
export function generateOrderNumber() {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `HML-${randomNum}`;
}

/**
 * Submits the order to Google Sheets (if webhook configured) and localStorage
 * @param {Object} orderData { orderNumber, name, phone, email, city, address, comment, paymentMethod, items, total }
 */
export async function submitOrder(orderData) {
  const dateStr = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' });

  // Форматируем список товаров в читаемую строку для таблицы
  const itemsSummary = (orderData.items || [])
    .map(i => `${i.product.name} (x${i.quantity}) - ${i.product.price * i.quantity} ₸`)
    .join('; ');

  const paymentText = {
    cash: 'Наличными при получении',
    card: 'Банковская карта / Google Pay (Онлайн)',
    installment: 'Рассрочка / Kaspi Pay'
  }[orderData.paymentMethod] || orderData.paymentMethod || 'Наличными';

  const payload = {
    date: dateStr,
    orderNumber: orderData.orderNumber,
    customerName: orderData.name || '',
    phone: orderData.phone || '',
    email: orderData.email || '',
    city: orderData.city || '',
    address: orderData.address || '',
    comment: orderData.comment || '',
    paymentMethod: paymentText,
    items: itemsSummary,
    total: `${orderData.total} ₸`
  };

  saveOrderToLocal({ ...orderData, payload, createdAt: dateStr });

  if (GOOGLE_SHEET_WEBHOOK_URL && GOOGLE_SHEET_WEBHOOK_URL.trim() !== '') {
    try {
      // Отправляем данные в Google Таблицу через Google Apps Script
      await fetch(GOOGLE_SHEET_WEBHOOK_URL.trim(), {
        method: 'POST',
        mode: 'no-cors', // Позволяет отправлять данные в Apps Script без блокировок CORS
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      console.log('Order sent to Google Sheet Webhook:', payload);
    } catch (error) {
      console.error('Error sending order to Google Sheets:', error);
    }
  }

  return { success: true, orderNumber: orderData.orderNumber };
}

/**
 * Gets saved orders from localStorage
 */
export function getOrders() {
  try {
    const orders = localStorage.getItem('homely_orders');
    return orders ? JSON.parse(orders) : [];
  } catch (e) {
    console.error('Error reading orders from localStorage', e);
    return [];
  }
}

function saveOrderToLocal(order) {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem('homely_orders', JSON.stringify(orders));
}

