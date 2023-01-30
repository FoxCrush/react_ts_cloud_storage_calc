import React from "react";

export default function VultrOffer({
  pickedValues = { storage: 0, transfer: 0 },
}) {
  const minPayment = 5;
  const costPerStorage = 0.01;
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
      Vultr price for each Storage GB: {costPerStorage}$. price for each
      Transfer GB:
      {costPerTransfer}$ Total cost:
      {calculateCost()}$
    </>
  );
}
