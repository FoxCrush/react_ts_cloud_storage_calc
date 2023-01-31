import React from "react";

export default function VultrOffer({
  pickedValues = { storage: 0, transfer: 0 },
  getCost,
}) {
  const brandName = "Vultr";
  const minPayment = 5;
  const costPerStorage = 0.01;
  const costPerTransfer = 0.01;

  const calculateCost = () => {
    const { storage, transfer } = pickedValues;
    const endPrice = parseFloat(
      (storage * costPerStorage + transfer * costPerTransfer).toFixed(2)
    );
    if (endPrice < minPayment) {
      getCost({ [brandName]: minPayment });
      return minPayment;
    }
    getCost({ [brandName]: endPrice });
    return endPrice;
  };
  return (
    <>
      {brandName} price for each Storage GB: {costPerStorage}$. price for each
      Transfer GB:
      {costPerTransfer}$ Total cost:
      {calculateCost()}$
    </>
  );
}
