import React from "react";

export default function ScalewayOffer({
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

// має бути можливість переключатись між опціями Multi та Single.
// ціна Storage:
// Multi - 75 GB безкоштовно, потім $0.06.
// Single - 75 GB безкоштовно, потім $0.03.
// ціна Transfer: будь-яка опція - 75 GB безкоштовно, потім $0.02.
