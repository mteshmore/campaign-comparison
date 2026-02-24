import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_COMPARE, REMOVE_FROM_COMPARE } from '../../store/campaignComparisonSlice'
import { Grid, Card, CardContent, Typography, Checkbox, Box, Stack, FormControlLabel } from '@mui/material'

function Campaign({campaign}) {
  
  const dispatch = useDispatch()
  const selectedCampaigns = useSelector(state => state.campaignComparison.selected)

  const isSelected = selectedCampaigns.some(c => c.id === campaign.id)

  const toggleSelect = () => {
    if (isSelected) {
      dispatch(REMOVE_FROM_COMPARE(campaign))
    } else {
      dispatch(ADD_TO_COMPARE(campaign))
    }
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box mt={1}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6">{campaign.campaignName}</Typography>
            <Typography variant="body2">Category: {campaign.category}</Typography>
            <Typography variant="body2">
              Funding Goal: ${campaign.fundingGoal.toLocaleString()}
            </Typography>
            <Typography variant="body2">
              Min Investment: ${campaign.minInvestment.toLocaleString()}
            </Typography>
            <Typography variant="body2">
              Expected Return: {campaign.expectedReturn}%
            </Typography>

            {/* Accessible checkbox with label */}
            <Stack direction="row" mt={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isSelected}
                    onChange={toggleSelect}
                    data-testid={`checkbox-${campaign.id}`}
                  />
                }
                label={`Select ${campaign.campaignName}`}
                sx={{ m: 0 }} // remove default margin
              />
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  )
}

export default Campaign