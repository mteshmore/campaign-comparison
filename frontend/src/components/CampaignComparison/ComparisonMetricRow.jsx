// ComparisonMetricRow.jsx
import React from 'react'
import { Box, Typography } from '@mui/material'

function ComparisonMetricRow({ label, values, best }) {
  // Determine best value
  const bestValue = best === 'highest'
    ? Math.max(...values)
    : Math.min(...values)

  return (
    <Box display="flex" alignItems="center" mb={1}>
      <Box width="150px">
        <Typography fontWeight="bold">{label}</Typography>
      </Box>
      {values.map((value, index) => (
        <Box
          key={index}
          flex={1}
          textAlign="center"
          bgcolor={value === bestValue ? 'primary.main' : 'grey.200'}
          color={value === bestValue ? 'white' : 'black'}
          p={1}
          mx={0.5}
          borderRadius={1}
        >
          <Typography>{value.toLocaleString()}</Typography>
        </Box>
      ))}
    </Box>
  )
}

export default ComparisonMetricRow