import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Stack, Typography, Switch } from "@mui/material";
import styles from "./brand.module.css";
import { IBrand } from "../../../interfaces/calc-interfaces";

interface Iprops {
  brandInfo: IBrand;
  getCost: (any) => { brand: number };
  pickedAmount: { storage: number; transfer: number };
}

export default function Brand({
  brandInfo,
  getCost,
  pickedAmount = { storage: 0, transfer: 0 },
}: Iprops) {
  const [switchValue, setSwitchValue] = useState<boolean>(true);
  const [currentPrices, setCurrentPrices] = useState({
    storage: 0,
    transfer: 0,
  });

  const {
    brandName,
    pricePerStorage,
    pricePerTransfer,
    altPricePerStorage,
    altPricePerTransfer,
    minPayment,
    maxPayment,
    togglingOption,
    freeSpace = 0,
  } = brandInfo;
  const { storage, transfer } = pickedAmount;
  const findActualPrice = (
    pricePerStorage,
    pricePerTransfer,
    altPricePerStorage,
    altPricePerTransfer
  ) => {
    if (switchValue) {
      setCurrentPrices({
        storage: altPricePerStorage ? altPricePerStorage : pricePerStorage,
        transfer: altPricePerTransfer ? altPricePerTransfer : pricePerTransfer,
      });
    } else {
      setCurrentPrices({
        storage: pricePerStorage,
        transfer: pricePerTransfer,
      });
    }
  };
  useEffect(() => {
    findActualPrice(
      pricePerStorage,
      pricePerTransfer,
      altPricePerStorage,
      altPricePerTransfer
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchValue, brandInfo]);
  const switchChangedHandler = () => {
    setSwitchValue(!switchValue);
  };
  const limitNumberWithinRange = (
    price: number,
    min?: number,
    max?: number
  ) => {
    const MIN = min || 0;
    const MAX = max || 1000;
    const num = price;
    return Math.min(Math.max(num, MIN), MAX);
  };

  const calculateCost = useCallback(() => {
    let storageAmount = storage;
    let transferAmount = transfer;
    if (freeSpace) {
      storageAmount -= freeSpace;
      transferAmount -= freeSpace;
    }
    let endPrice = parseFloat(
      (
        storageAmount * currentPrices.storage +
        transferAmount * currentPrices.transfer
      ).toFixed(2)
    );

    return limitNumberWithinRange(endPrice, minPayment, maxPayment);
  }, [
    currentPrices.storage,
    currentPrices.transfer,
    freeSpace,
    maxPayment,
    minPayment,
    storage,
    transfer,
  ]);

  useEffect(() => {
    getCost({ [brandName]: calculateCost() });
  }, [brandName, calculateCost, getCost]);
  return (
    <Fragment>
      {togglingOption && (
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>HDD</Typography>
          <Switch
            onChange={switchChangedHandler}
            defaultChecked
            inputProps={{ "aria-label": "drive type" }}
          />
          <Typography>SSD</Typography>
        </Stack>
      )}
      <div className={styles.container}>
        {brandName} price for each Storage GB: {pricePerStorage}$. price for
        each Transfer GB:
        {pricePerTransfer}$ Total cost:
        {calculateCost()}$
      </div>
    </Fragment>
  );
}
