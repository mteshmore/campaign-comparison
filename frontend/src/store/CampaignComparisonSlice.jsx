import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selected: [] // array of campaign objects
}

const campaignComparisonSlice = createSlice({
  name: 'campaignComparison',
  initialState,
  reducers: {
    ADD_TO_COMPARE: (state, action) => {
      const exists = state.selected.find(c => c.id === action.payload.id)
      if (!exists && state.selected.length < 4) {
        state.selected.push(action.payload)
      }
    },
    REMOVE_FROM_COMPARE: (state, action) => {
      state.selected = state.selected.filter(c => c.id !== action.payload.id)
    },
    CLEAR_COMPARISON: (state) => {
      state.selected = []
    }
  }
})

export const { ADD_TO_COMPARE, REMOVE_FROM_COMPARE, CLEAR_COMPARISON } = campaignComparisonSlice.actions
export default campaignComparisonSlice.reducer

// { id: 1, campaignName: 'Saratoga Inc.', category: 'Healthcare', fundingGoal: 100000, minInvestment: 10000, expectedReturn: 7.5 },
//     { id: 2, campaignName: 'Dwell Group.', category: 'Education', fundingGoal: 23000, minInvestment: 2300, expectedReturn: 5 },
//     { id: 3, campaignName: 'Scooters For All', category: 'Lifestyle', fundingGoal: 250000, minInvestment: 25000, expectedReturn: 9.9 },
//     { id: 4, campaignName: 'Wearables', category: 'Retail', fundingGoal: 1000, minInvestment: 100, expectedReturn: 99 },
//     { id: 5, campaignName: 'Offland & Market', category: 'Agriculture', fundingGoal: 3900000, minInvestment: 39000, expectedReturn: 4.4 },
//     { id: 6, campaignName: 'Eye Center', category: 'Healthcare', fundingGoal: 88000, minInvestment: 8800, expectedReturn: 34.2 },
  