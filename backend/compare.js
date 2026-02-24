// compare.js
import express from "express";
import cors from "cors"; 
import { z } from "zod";
import compareSchema from './validation'

const app = express();

app.use(cors());       
app.use(express.json());


// In-memory campaign data
const campaigns = [
    { id: 1, campaignName: 'Saratoga Inc.', category: 'Healthcare', fundingGoal: 100000, minInvestment: 10000, expectedReturn: 7.5, fundingPercentage: 0.75, teamSize: 5, daysRemaining: 20, investorCount: 50 },
    { id: 2, campaignName: 'Dwell Group.', category: 'Education', fundingGoal: 23000, minInvestment: 2300, expectedReturn: 5, fundingPercentage: 0.6, teamSize: 8, daysRemaining: 15, investorCount: 40 },
    { id: 3, campaignName: 'Scooters For All', category: 'Lifestyle', fundingGoal: 250000, minInvestment: 25000, expectedReturn: 9.9, fundingPercentage: 0.9, teamSize: 3, daysRemaining: 10, investorCount: 30 },
    { id: 4, campaignName: 'Wearables', category: 'Retail', fundingGoal: 1000, minInvestment: 100, expectedReturn: 99, fundingPercentage: 0.4, teamSize: 6, daysRemaining: 25, investorCount: 60 },
    { id: 5, campaignName: 'Offland & Market', category: 'Agriculture', fundingGoal: 3900000, minInvestment: 39000, expectedReturn: 4.4, fundingPercentage: 0.3, teamSize: 10, daysRemaining: 30, investorCount: 25 },
    { id: 6, campaignName: 'Eye Center', category: 'Healthcare', fundingGoal: 88000, minInvestment: 8800, expectedReturn: 34.2, fundingPercentage: 0.8, teamSize: 7, daysRemaining: 12, investorCount: 45 }
  ]

// Zod schema for validation
const result = compareSchema.safeParse(req.body);

const normalize = (value, min, max) => (max - min === 0 ? 0 : (value - min) / (max - min));

app.post("/api/campaigns/compare", (req, res) => {
  try {
    // Validate input
    const result = compareSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors.map(e => e.message).join(", ") });
    }

    const { campaignIds } = result.data;

    // Filter campaigns
    const selectedCampaigns = campaigns.filter(c => campaignIds.includes(c.id) || campaignIds.includes(String(c.id)));
    if (selectedCampaigns.length !== campaignIds.length) {
      return res.status(400).json({ error: "One or more campaign IDs do not exist." });
    }

    // Compute comparisonScore
    const metrics = ["fundingPercentage", "teamSize", "daysRemaining", "investorCount"];
    const minMax = {};
    metrics.forEach(metric => {
      const values = selectedCampaigns.map(c => c[metric]);
      minMax[metric] = { min: Math.min(...values), max: Math.max(...values) };
    });

    const weightedScores = selectedCampaigns.map(c => {
      const score =
        normalize(c.fundingPercentage, minMax.fundingPercentage.min, minMax.fundingPercentage.max) * 0.4 +
        normalize(c.teamSize, minMax.teamSize.min, minMax.teamSize.max) * 0.2 +
        normalize(c.daysRemaining, minMax.daysRemaining.min, minMax.daysRemaining.max) * 0.2 +
        normalize(c.investorCount, minMax.investorCount.min, minMax.investorCount.max) * 0.2;

      return { ...c, comparisonScore: parseFloat(score.toFixed(2)) };
    });

    res.json({ campaigns: weightedScores });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error: could not process request." });
  }
});

// Start server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));