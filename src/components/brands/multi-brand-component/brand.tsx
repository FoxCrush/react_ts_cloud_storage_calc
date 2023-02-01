import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Stack, Typography, Switch } from "@mui/material";
import styles from "./brand.module.css";
import { IBrand } from "../../../interfaces/calc-interfaces";

interface Iprops {
  brandInfo: IBrand;
  getCost: (any) => number;
  pickedAmount: { storage: number; transfer: number };
}

export default function Brand({
  brandInfo,
  getCost,
  pickedAmount = { storage: 0, transfer: 0 },
}: Iprops) {
  const [switchValue, setSwitchValue] = useState<boolean>(true);
  const {
    brandName,
    pricePerStorage,
    pricePerTransfer,
    altPricePerStorage,
    altPricePerTransfer,
    minPayment,
    maxPayment,
    togglingOption,
    freeSpace,
  } = brandInfo;
  const { storage, transfer } = pickedAmount;
  const setCurrentPrice = (
    pricePerStorage,
    pricePerTransfer,
    altPricePerStorage,
    altPricePerTransfer
  ) => {
    if (togglingOption) {
      console.log("togglingOption", switchValue);
    }
  };
  useEffect(() => {
    setCurrentPrice(
      pricePerStorage,
      pricePerTransfer,
      altPricePerStorage,
      altPricePerTransfer
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchValue]);
  const switchChangedHandler = () => {
    setSwitchValue(!switchValue);
  };

  const calculateCost = useCallback(() => {
    const endPrice = parseFloat(
      (storage * pricePerStorage + transfer * pricePerTransfer).toFixed(2)
    );
    if (endPrice < minPayment) {
      return minPayment;
    }
    return endPrice;
  }, [pickedAmount]);

  useEffect(() => {
    getCost(calculateCost());
  }, [calculateCost, getCost]);
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
