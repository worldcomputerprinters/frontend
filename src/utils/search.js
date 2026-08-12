// Simple client-side filter used by CategoryPage to narrow the products
// already loaded for that one category as the user types — no network
// round-trip per keystroke needed since the full list is already in memory.
// (Sitewide search on ProductsPage calls the backend directly instead —
// see src/pages/ProductsPage.jsx.)
export function searchProducts(products, query) {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
}
