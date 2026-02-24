import { configureStore } from '@reduxjs/toolkit'
import campaignComparisonReducer from './campaignComparisonSlice'

export const store = configureStore({
  reducer: {
    campaignComparison: campaignComparisonReducer
  }
})