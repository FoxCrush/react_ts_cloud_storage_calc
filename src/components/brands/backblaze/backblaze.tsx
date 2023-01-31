import React, { useEffect, useCallback } from "react";
import styles from "./backblaze.module.css";

export default function BackBlazeOffer({
  pickedValues = { storage: 0, transfer: 0 },
  getCost,
}) {
  const brandName = "Backblaze";
  const minPayment = 7;
  const costPerStorage = 0.005;
  const costPerTransfer = 0.01;

  const calculateCost = useCallback(() => {
    const { storage, transfer } = pickedValues;
    const endPrice = parseFloat(
      (storage * costPerStorage + transfer * costPerTransfer).toFixed(2)
    );
    if (endPrice < minPayment) {
      return minPayment;
    }
    return endPrice;
  }, [pickedValues]);

  useEffect(() => {
    console.log("test envoke");
    getCost(calculateCost());
  }, [calculateCost, getCost]);

  return (
    <div className={styles.container}>
      {brandName} price for each Storage GB: {costPerStorage}$. price for each
      Transfer GB:
      {costPerTransfer}$ Total cost:
      {calculateCost()}$
    </div>
  );
}
