import React, { useEffect, useState } from "react";
// @ts-ignore
import ColumnChart from "../../charts/column.tsx";
// @ts-ignore
import styles from "./brand.module.css";
import { IProps } from "../../../interfaces/calc-interfaces";
import OptionPicker from "../../switch"; //@ts-ignore
import cloudIcon from "../../../media/cloud-storage-free-svg.svg";

export default function Brand({
  bestPrice = 0,
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
    brandColor,
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
    <>
      <div className={styles.container}>
        <OptionPicker
          togglingOption={togglingOption}
          switchOptions={switchOptions}
          switchChangedHandler={switchChangedHandler}
        />
        {brandName}
        <img
          alt="cloud"
          src={cloudIcon}
          style={{
            height: "24px",
            display: "block",
          }}
        />
        <ColumnChart
          price={finalPrice}
          color={brandColor ? brandColor : 'silver'}
          bestPrice={bestPrice}
        />
        <span style={{ textAlign:'center'}}>{finalPrice}</span>
      </div>
    </>
  );
}
