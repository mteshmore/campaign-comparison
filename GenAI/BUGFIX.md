## React InvestmentCalculator Component – Bug Fix Log
### **1. Missing useState import**

*Found by: Manual review*

Description: The component uses useState but does not import it from React.

Why it matters: React will throw a runtime error (useState is not defined) and the component will fail to render.

Fix: 
- Added `import { useState }` from `"react"` at the top of the file.

### **2. Input type set to text**

*Found by: Manual review*

Description: The investment amount input is type="text".

Why it matters: Users can type non-numeric values, which can break calculations and cause NaN errors.

Fix: 
- Changed input to `type="number"` with `min="0"` and `step="0.01"` to allow only valid numeric input.

### **3. handleInvest has no error handling**

*Found by: Manual review*

Description: The async function does not catch API errors; network failures or non-200 responses crash the app.

Why it matters: Poor UX; users see no feedback when the investment fails.

Fix: 
- Wrapped the API call in try/catch and display error messages inline. Added loading state for UX clarity.

### **4. Equity calculation may produce long floats or NaN**

*Found by: Manual review + AI suggestion*

Description: equity is calculated as `(e.target.value / campaign.fundingGoal) * 100`. `e.target.value` is a string, which can produce NaN. The resulting equity may have many decimal places.

Why it matters: Incorrect equity display, confusing UX, and potential rendering issues.

Fix:
- Parsed `e.target.value` as parseFloat before calculation.
- Added `isNaN` check and fallback to 0 if input is invalid.
- Rounded equity to 2 decimal places using `toFixed(2)`.

### **5. e.target.value is a string in calculations**

*Found by: Manual review*

Description: The input value is a string; arithmetic operations convert it implicitly, which can cause errors with empty input or invalid characters.

Why it matters: Can result in NaN or unexpected behavior in the equity calculation.

Fix: 
- Explicitly converted e.target.value to a number using parseFloat and validated it before using it in calculations.

### **6. UX – No validation on investment amount**

*Found by: AI suggestion*

Description: Users can submit empty, negative, or zero amounts.

Why it matters: Invalid API requests, poor UX, potential backend errors.

Fix: 
- Added validation before submitting: investment amount must be a positive number.

### **7. UX – Alert() used for feedback**

*Found by: AI suggestion*

Description: Using `alert()` for investment success/failure is disruptive.

Why it matters: Breaks UX flow, not accessible for screen readers.

Fix: 
- Replaced with inline message `<p role="alert">...</p>`.

### **8. Accessibility – Missing input label**

*Found by: AI suggestion*

Description: `<input>` has no `<label>`, which is inaccessible for screen readers.

Why it matters: Violates accessibility best practices (WCAG).

Fix: 
- Added `<label htmlFor="investment-amount">Investment Amount:</label>` and `id="investment-amount"` on input.

### **9. Accessibility – No disabled state on button**

*Found by: AI suggestion*

Description: Button is always clickable, even with invalid input or while submitting.

Why it matters: Users may submit multiple times or submit invalid data.

Fix: 
- Disabled button when loading or input is empty/invalid.