# Campaign Comparison App

A React + Redux application to browse, select, and compare investment campaigns.

## Features

- Display a list of campaigns with details (category, funding goal, min investment, expected return).  
- Select 2–4 campaigns to compare side-by-side.  
- Compare key metrics like funding goal, minimum investment, and expected return in a modal.  
- Clear selections with a single click.  

## Tech Stack

- React  
- Redux Toolkit  
- Material-UI (MUI)  
- Jest & React Testing Library for tests  

## Getting Started

1. Clone the repo:
   ```bash
   git clone <repo-url>
   ```
   ```bash
   npm install
   ```

   ```bash
   npm start
   ```

    ```bash
   npm run dev
   ```

   ```bash
   npm test
   ```

## File Structure

`components/CampaignComparison/` – Campaign, Comparison, and ComparisonBar components

`store/campaignComparisonSlice.js` – Redux slice for managing selected campaigns

`pages/CampaignsPage.jsx` – Main page showing campaigns and comparison modal