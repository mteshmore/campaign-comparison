// CampaignsPage.test.jsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import '@testing-library/jest-dom'

import campaignComparisonReducer, { ADD_TO_COMPARE } from '../store/campaignComparisonSlice'
import Campaign from './CampaignComparison/Campaign'
import CampaignComparison from './CampaignComparison/CampaignComparison'

// Helper to render components with Redux
const renderWithRedux = (
  component,
  {
    preloadedState,
    store = configureStore({
      reducer: { campaignComparison: campaignComparisonReducer },
      preloadedState,
    }),
  } = {}
) => {
  return { ...render(<Provider store={store}>{component}</Provider>), store }
}

describe('Campaigns Page', () => {
  const campaigns = [
    { id: 1, campaignName: 'Saratoga Inc.', category: 'Healthcare', fundingGoal: 100000, minInvestment: 10000, expectedReturn: 7.5 },
    { id: 2, campaignName: 'Dwell Group.', category: 'Education', fundingGoal: 23000, minInvestment: 2300, expectedReturn: 5 },
    { id: 3, campaignName: 'Scooters For All', category: 'Lifestyle', fundingGoal: 250000, minInvestment: 25000, expectedReturn: 9.9 },
    { id: 4, campaignName: 'Wearables', category: 'Retail', fundingGoal: 1000, minInvestment: 100, expectedReturn: 99 },
    { id: 5, campaignName: 'Offland & Market', category: 'Agriculture', fundingGoal: 3900000, minInvestment: 39000, expectedReturn: 4.4 },
  ]

  test('adding a campaign updates Redux store', async () => {
    const { store } = renderWithRedux(<Campaign campaign={campaigns[0]} />)
    
    // Query checkbox by accessible label (FormControlLabel)
    const checkbox = screen.getByRole('checkbox', { name: /select Saratoga Inc/i })

    // Initially nothing selected
    expect(store.getState().campaignComparison.selected).toHaveLength(0)

    await userEvent.click(checkbox)

    // After click, campaign should be in store
    expect(store.getState().campaignComparison.selected).toHaveLength(1)
    expect(store.getState().campaignComparison.selected[0]).toEqual(campaigns[0])
  })

  test('comparison view renders correct campaign names', () => {
    const preloadedState = { campaignComparison: { selected: campaigns.slice(0, 3) } }
    renderWithRedux(<CampaignComparison selectedCampaigns={campaigns.slice(0, 3)} />, { preloadedState })

    // Campaign names should appear in the comparison cards
    campaigns.slice(0, 3).forEach(campaign => {
      expect(screen.getByText(campaign.campaignName)).toBeInTheDocument()
    })
  })

  test('adding a 5th campaign enforces max 4 campaigns', () => {
    const store = configureStore({ reducer: { campaignComparison: campaignComparisonReducer } })

    // Add 4 campaigns
    campaigns.slice(0, 4).forEach(c => store.dispatch(ADD_TO_COMPARE(c)))
    expect(store.getState().campaignComparison.selected).toHaveLength(4)

    // Try to add 5th
    store.dispatch(ADD_TO_COMPARE(campaigns[4]))

    // Should still have only 4
    expect(store.getState().campaignComparison.selected).toHaveLength(4)
  })
})