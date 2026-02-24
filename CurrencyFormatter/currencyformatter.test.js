// currencyFormatter.test.js
const { formatCurrency } = require('./currencyFormatter');

describe('Currency Formatter Utility', () => {

  // Test positive numbers in USD
  test('formats positive numbers in USD', () => {
    expect(formatCurrency(1234.56, 'USD', 'en-US')).toBe('$1,234.56');
  });

  // Test negative numbers in CAD
  test('formats negative numbers in CAD', () => {
    expect(formatCurrency(-98765.43, 'CAD', 'en-CA')).toBe('-CA$98,765.43');
  });

  // Test zero value
  test('formats zero correctly', () => {
    expect(formatCurrency(0, 'USD', 'en-US')).toBe('$0.00');
  });

  // Test null input returns empty string
  test('returns empty string for null', () => {
    expect(formatCurrency(null, 'USD', 'en-US')).toBe('');
  });

  // Test undefined input returns empty string
  test('returns empty string for undefined', () => {
    expect(formatCurrency(undefined, 'USD', 'en-US')).toBe('');
  });

  // Test very large numbers (> 1 billion)
  test('formats numbers greater than 1 billion', () => {
    expect(formatCurrency(1234567890, 'EUR', 'de-DE')).toBe('1.234.567.890,00 €');
  });

  // Test very small decimal numbers
  test('formats very small decimals', () => {
    expect(formatCurrency(0.0005, 'GBP', 'en-GB')).toBe('£0.00');
  });

  // Test unsupported currency throws an error
  test('throws error for unsupported currency', () => {
    expect(() => formatCurrency(100, 'JPY', 'en-US')).toThrow('Unsupported currency: JPY');
  });

});