import React from "react";

export default function BackBlazeOffer({
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
    <>
      Backblaze price for each Storage GB: {costPerStorage}$. price for each
      Transfer GB:
      {costPerTransfer}$ Total cost:
      {calculateCost()}$
    </>
  );
}
