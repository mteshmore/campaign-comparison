// currencyFormatter.js

function formatCurrency(amount, currencyCode = 'USD', locale = 'en-US') {
    if (amount === null || amount === undefined || isNaN(amount)) return '';
  
    const supportedCurrencies = ['CAD', 'USD', 'EUR', 'GBP'];
    if (!supportedCurrencies.includes(currencyCode)) {
      throw new Error(`Unsupported currency: ${currencyCode}`);
    }

    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    
      let result = formatter.format(Math.abs(amount));
    
      if (amount < 0) {
        result = `-${result}`;  // prepend negative sign
      }
    
      return result;
  }
  
  // CommonJS export
  module.exports = { formatCurrency };