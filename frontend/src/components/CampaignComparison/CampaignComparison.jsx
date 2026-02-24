// CampaignComparison.jsx
import React from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'
import ComparisonMetricRow from './ComparisonMetricRow'

function CampaignComparison({ selectedCampaigns }) {
  if (selectedCampaigns.length < 2) {
    return <Typography>Select at least 2 campaigns to compare</Typography>
  }

  const fundingGoals = selectedCampaigns.map(c => c.fundingGoal)
  const minInvestments = selectedCampaigns.map(c => c.minInvestment)
  const expectedReturns = selectedCampaigns.map(c => c.expectedReturn)

  return (
    <Box>
      {/* Campaign Names */}
      <Box display="flex" mb={2}>
        <Box width="150px" />
        {selectedCampaigns.map(campaign => (
          <Box key={campaign.id} flex={1} textAlign="center" p={1} mx={0.5}>
            <Card elevation={2}>
              <CardContent>
                <Typography fontWeight="bold">{campaign.campaignName}</Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Metrics */}
      <ComparisonMetricRow
        label="Funding Goal"
        values={fundingGoals}
        best="highest"
      />
      <ComparisonMetricRow
        label="Min Investment"
        values={minInvestments}
        best="lowest"
      />
      <ComparisonMetricRow
        label="Expected Return"
        values={expectedReturns}
        best="highest"
      />
    </Box>
  )
}

export default CampaignComparison