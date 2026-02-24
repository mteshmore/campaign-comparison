# Campaign Comparison API

## Endpoint

**POST /api/campaigns/compare**

---

## Request

**Content-Type:** `application/json`  

**Body:**

```json
{
  "campaignIds": [1, 2, 3]
}
```

## Success Response

Status: 200 OK
Example Response:

```json
{
  "campaigns": [
    {
      "id": 1,
      "campaignName": "Saratoga Inc.",
      "category": "Healthcare",
      "fundingGoal": 100000,
      "minInvestment": 10000,
      "expectedReturn": 7.5,
      "fundingPercentage": 0.75,
      "teamSize": 5,
      "daysRemaining": 20,
      "investorCount": 50,
      "comparisonScore": 0.68
    }
  ]
}
```

## Error Responses
### 1. Less than 2 campaigns
Status: 400 Bad Request

```json
{
  "error": "Select at least 2 campaigns."
}
```
### 2. More than 4 campaigns
Status: 400 Bad Request

```json
{
  "error": "Select no more than 4 campaigns."
}
```
### 3. Non-existent campaign IDs
Status: 400 Bad Request

```json
{
  "error": "One or more campaign IDs do not exist."
}
```

### 4. Server error
Status: 500 Internal Server Error

```json
{
  "error": "Server error: could not process request."
}

```