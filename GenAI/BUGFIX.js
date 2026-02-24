import React, { useState } from "react";
import axios from "axios";

function InvestmentCalculator({ campaign }) {
  const [amount, setAmount] = useState("");
  const [equity, setEquity] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);

      const numericValue = parseFloat(value);
      if (!isNaN(numericValue) && campaign.fundingGoal > 0) {
        const pct = (numericValue / campaign.fundingGoal) * 100;
        setEquity(parseFloat(pct.toFixed(2)));
      } else {
        setEquity(0);
      }
    }
  };

  const handleInvest = async () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setMessage("Please enter a valid investment amount.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post("/api/invest", {
        campaignId: campaign.id,
        amount: numericAmount,
      });
      if (res.status === 200) {
        setMessage("Investment successful!");
        setAmount("");
        setEquity(0);
      } else {
        setMessage("Investment failed. Please try again.");
      }
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label htmlFor="investment-amount">Investment Amount:</label>
      <input
        id="investment-amount"
        type="number"
        min="0"
        step="0.01"
        value={amount}
        onChange={handleAmountChange}
        placeholder="Enter amount"
      />
      <p>Estimated equity: {equity}%</p>
      <button onClick={handleInvest} disabled={loading || !amount}>
        {loading ? "Processing..." : "Invest Now"}
      </button>
      {message && <p role="alert">{message}</p>}
    </div>
  );
}

export default InvestmentCalculator;