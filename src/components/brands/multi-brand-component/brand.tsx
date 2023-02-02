import React, { Fragment, useEffect, useState } from "react";
import { Stack, Typography, Switch } from "@mui/material";
import styles from "./brand.module.css";
import { IBrand } from "../../../interfaces/calc-interfaces";

interface IProps {
  brandInfo: IBrand;
  getCost: (any) => { brand: number };
  pickedAmount: { sliderStorageValue: number; sliderTransferValue: number };
}

export default function Brand({
  brandInfo,
  getCost,
  pickedAmount = { sliderStorageValue: 0, sliderTransferValue: 0 },
}: IProps) {
  const [finalPrice, setFinalPrice] = useState(0);
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
    switchOptions = [],
    freeSpace = 0,
  } = brandInfo;
  const { sliderStorageValue: storage, sliderTransferValue: transfer } =
    pickedAmount;
  const switchChangedHandler = () => {
    setSwitchValue(!switchValue);
  };

  useEffect(() => {
    const findActualPrice = (
      pricePerStorage = 0,
      pricePerTransfer = 0,
      altPricePerStorage = 0,
      altPricePerTransfer = 0
    ) => {
      if (switchValue) {
        setCurrentPrices({
          storage: altPricePerStorage ? altPricePerStorage : pricePerStorage,
          transfer: altPricePerTransfer
            ? altPricePerTransfer
            : pricePerTransfer,
        });
      } else {
        setCurrentPrices({
          storage: pricePerStorage,
          transfer: pricePerTransfer,
        });
      }
    };
    findActualPrice(
      pricePerStorage,
      pricePerTransfer,
      altPricePerStorage,
      altPricePerTransfer
    );
  }, [
    altPricePerStorage,
    altPricePerTransfer,
    pricePerStorage,
    pricePerTransfer,
    switchValue,
  ]);
  useEffect(() => {
    const limitNumberWithinRange = (
      price: number,
      min?: number,
      max?: number
    ) => {
      const MIN = min || 0;
      const MAX = max || 500;
      return Math.min(Math.max(price, MIN), MAX);
    };
    const calculateCost = () => {
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
    };
    setFinalPrice(calculateCost());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPrices, storage, transfer]);
  useEffect(() => {
    if (brandName) {
      getCost({ [brandName]: finalPrice });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalPrice]);

  return (
    <Fragment>
      {togglingOption && (
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>
            {switchOptions[0].length > 0 ? switchOptions[0] : ""}
          </Typography>
          <Switch
            onChange={switchChangedHandler}
            defaultChecked
            inputProps={{ "aria-label": "drive type" }}
          />
          <Typography>
            {switchOptions[1].length > 0 ? switchOptions[1] : ""}
          </Typography>
        </Stack>
      )}
      <div className={styles.container}>
        {brandName} price for each Storage GB: {pricePerStorage}$. price for
        each Transfer GB:
        {pricePerTransfer}$ Total cost:
        {finalPrice}$
      </div>
    </Fragment>
  );
}
