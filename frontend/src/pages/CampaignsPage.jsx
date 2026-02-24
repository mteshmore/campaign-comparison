import React, { useState, useEffect } from 'react'
import Campaign from '../components/CampaignComparison/Campaign'
import CampaignComparison from '../components/CampaignComparison/CampaignComparison'
import ComparisonBar from '../components/CampaignComparison/ComparisonBar'
import { useSelector } from 'react-redux'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from '@mui/material'

function CampaignsPage() {
  const selectedCampaigns = useSelector(state => state.campaignComparison.selected)
  const [openModal, setOpenModal] = useState(false)
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const res = await fetch("http://localhost:3000/api/campaigns/compare", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ campaignIds: [1, 2, 3, 4] })
        });

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();
        setCampaigns(data.campaigns);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCampaigns();
  }, []);

  if (loading) return <p>Loading campaigns...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
    <h4>All Campaigns</h4>
      <Grid container spacing={2}>
        {campaigns.map(c => <Campaign key={c.id} campaign={c} />)}
      </Grid>
    
      <ComparisonBar
        selectedCampaigns={selectedCampaigns}
        onCompare={() => setOpenModal(true)}
      />

      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="lg">
        <DialogTitle>Compare Campaigns</DialogTitle>
        <DialogContent>
          <CampaignComparison selectedCampaigns={selectedCampaigns} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="secondary">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CampaignsPage