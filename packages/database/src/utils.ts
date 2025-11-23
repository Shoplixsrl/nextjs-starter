/**
 * Utility functions for database schema
 */

/**
 * Generate a unique ID using timestamp + random string
 * Format: {timestamp}_{random}
 */
export function createId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 15);
  return `${timestamp}_${random}`;
}

/**
 * Format currency amount (from cents to euros)
 */
export function formatCurrency(cents: number | string): string {
  const amount = typeof cents === 'string' ? parseFloat(cents) : cents;
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

/**
 * Parse currency string to cents
 */
export function parseCurrencyToCents(amount: string): number {
  return Math.round(parseFloat(amount.replace(',', '.')) * 100);
}
