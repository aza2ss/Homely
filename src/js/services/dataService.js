import productsData from '../../data/products.json';

const DATA_SOURCE = 'local'; // 'local' or 'google_sheets'
const GOOGLE_SHEETS_CONFIG = { sheetId: '', apiKey: '', range: 'Products!A:K' };

/**
 * Fetch all products
 */
export async function fetchProducts() {
  if (DATA_SOURCE === 'local') {
    return productsData;
  }
  
  if (DATA_SOURCE === 'google_sheets') {
    // Prepare for Google Sheets API integration
    // const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_CONFIG.sheetId}/values/${GOOGLE_SHEETS_CONFIG.range}?key=${GOOGLE_SHEETS_CONFIG.apiKey}`;
    // try {
    //   const response = await fetch(url);
    //   const data = await response.json();
    //   return mapSheetsToProducts(data.values);
    // } catch (e) {
    //   console.error('Failed to fetch from Google Sheets', e);
    //   return [];
    // }
    return [];
  }
  
  return [];
}

/**
 * Fetch single product by ID
 */
export async function fetchProductById(id) {
  const products = await fetchProducts();
  return products.find(p => p.id === id);
}

/**
 * Fetch products by category slug
 */
export async function fetchProductsByCategory(categorySlug) {
  const products = await fetchProducts();
  return products.filter(p => p.category === categorySlug);
}

/**
 * Get unique categories with counts
 */
export async function getCategories() {
  const products = await fetchProducts();
  const categoryMap = new Map();
  
  products.forEach(p => {
    if (categoryMap.has(p.category)) {
      const cat = categoryMap.get(p.category);
      cat.count++;
    } else {
      categoryMap.set(p.category, { slug: p.category, name: p.categoryName, count: 1 });
    }
  });
  
  return Array.from(categoryMap.values());
}

/**
 * Format price in Kazakh Tenge (₸)
 * Examples: 245000 -> "245 000 ₸"
 */
export function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₸";
}
