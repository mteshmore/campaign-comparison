// ComparisonBar.jsx
import React from 'react'
import { useDispatch } from 'react-redux'
import { CLEAR_COMPARISON, REMOVE_FROM_COMPARE } from '../../store/campaignComparisonSlice'
import { Box, Button, Typography, IconButton, Avatar, Stack } from '@mui/material'
//import CloseIcon from '@mui/icons-material/Close'

function ComparisonBar({ selectedCampaigns, onCompare, onClearAll }) {

  const dispatch = useDispatch()

  if (selectedCampaigns.length === 0) return null

  return (
    <Box
      position="sticky"
      bottom={0}
      bgcolor="white"
      borderTop="1px solid #ccc"
      p={2}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      zIndex={1000}
    >
      <h4>Selected Campaigns</h4>
        <Stack direction="row" spacing={1} alignItems="center">
            {selectedCampaigns.map((c, idx) => (
            <Avatar key={idx}>{c.campaignName[0]}</Avatar>
            ))}
            <Typography>{selectedCampaigns.length} selected</Typography>
            <IconButton size="small" onClick={() => dispatch(REMOVE_FROM_COMPARE(c))}>
              {/* <CloseIcon fontSize="small" /> */}
            </IconButton>
        </Stack>

        <Box>
            <Button variant="outlined" color="secondary" onClick={() => dispatch(CLEAR_COMPARISON())}>
            Clear All
            </Button>
            <Button variant="contained" color="primary" onClick={onCompare}>
            Compare
            </Button>
        </Box>
    </Box>
  )
}

export default ComparisonBar