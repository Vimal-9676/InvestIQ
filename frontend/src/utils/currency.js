// Singleton: fetches the live USD→INR rate once and caches it.
// All components import `toINR()` and `formatINR()` from here.

const FALLBACK_RATE = 84.0;
let _rate = FALLBACK_RATE;
let _fetched = false;

/**
 * Fetch the live USD/INR rate from the backend.
 * Call this once at app startup (e.g., in Dashboard.jsx useEffect).
 */
export const fetchExchangeRate = async () => {
  if (_fetched) return _rate;
  try {
    const res = await fetch('http://localhost:5000/api/stocks/exchange-rate');
    const data = await res.json();
    if (data?.rate) {
      _rate = data.rate;
      _fetched = true;
    }
  } catch {
    // Silently fall back to the hardcoded rate
  }
  return _rate;
};

/**
 * Returns the current cached USD→INR rate.
 */
export const getRate = () => _rate;

/**
 * Convert a price to INR.
 * @param {number} price   The raw price value
 * @param {string} currency  The currency code returned by Yahoo Finance ('USD' | 'INR' | ...)
 */
export const toINR = (price, currency = 'USD') => {
  if (price == null) return null;
  if (currency === 'INR') return price;          // Already in INR
  return price * _rate;                          // USD (and others) → INR
};

/**
 * Format a price as an INR string with the ₹ symbol.
 * @param {number} price
 * @param {string} currency
 */
export const formatINR = (price, currency = 'USD') => {
  const inr = toINR(price, currency);
  if (inr == null) return '—';
  return `₹${inr.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
};
