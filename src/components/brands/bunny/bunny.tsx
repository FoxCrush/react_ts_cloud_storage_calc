import { Stack, Typography, Switch } from "@mui/material";
import React from "react";

export default function BunnyOffer({
  pickedValues = { storage: 0, transfer: 0 },
}) {
  const minPayment = 7;
  const costPerStorage = 0.005;
  const costPerTransfer = 0.01;

  const calculateCost = () => {
    const { storage, transfer } = pickedValues;
    const endPrice = storage * costPerStorage + transfer * costPerTransfer;
    if (endPrice < minPayment) {
      return minPayment;
    }
    return endPrice;
  };
  return (
    <div>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>HDD</Typography>
        <Switch defaultChecked inputProps={{ "aria-label": "drive type" }} />
        <Typography>SSD</Typography>
      </Stack>
      Backblaze price for each Storage GB: {costPerStorage}$. price for each
      Transfer GB:
      {costPerTransfer}$ Total cost:
      {calculateCost()}$
    </div>
  );
}

// має бути можливість переключатись між опціями HDD та SSD.
// максимальний платіж 10$.
// ціна Storage:
// HDD - $0.01.
// SSD - $0.02.
// ціна Transfer: будь-яка опція - $0.01.
