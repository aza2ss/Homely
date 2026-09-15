const ORDER_ENDPOINT = ''; // Google Apps Script web app URL (fill later)
const USE_WEBHOOK = false; // set to true when endpoint is ready

/**
 * Generates a random order number like 'HML-123456'
 */
export function generateOrderNumber() {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `HML-${randomNum}`;
}

/**
 * Submits the order either to a webhook or local storage
 * @param {Object} orderData { items, total, customer, paymentMethod }
 */
export async function submitOrder(orderData) {
  const orderNumber = generateOrderNumber();
  const finalOrder = {
    ...orderData,
    orderNumber,
    date: new Date().toISOString()
  };

  if (USE_WEBHOOK && ORDER_ENDPOINT) {
    try {
      const response = await fetch(ORDER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalOrder)
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      
      saveOrderToLocal(finalOrder);
      return { success: true, orderNumber, message: 'Заказ успешно оформлен' };
    } catch (error) {
      console.error('Error submitting order to webhook:', error);
      return { success: false, orderNumber: null, message: 'Ошибка при отправке заказа' };
    }
  } else {
    // Local fallback
    saveOrderToLocal(finalOrder);
    console.log('Order submitted locally:', finalOrder);
    
    // Simulate network delay
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true, orderNumber, message: 'Заказ успешно сохранен локально' });
      }, 800);
    });
  }
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
