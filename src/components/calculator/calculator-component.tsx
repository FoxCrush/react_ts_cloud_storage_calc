import React, { useEffect, useState, useRef } from "react";
import Brand from "../brands/multi-brand-component";
// @ts-ignore
import brandsArray from "../../data/brands-data.tsx";
// @ts-ignore
import styles from "./calc-component.module.css";
import MemorySliders from "../sliders";
import {
  ISliderValues,
  IPrices,
  IBrand,
} from "../../interfaces/calc-interfaces";

export default function Calculator() {
  const [slidersValues, setSlidersValues] = useState<ISliderValues>();
  const [allPrices, setAllPrices] = useState<IPrices>({});
  const [allCalculatedBrands, setAllCalculatedBrands] = useState<IBrand[]>([]);
  const bestPrice = useRef(0);
  const brandsToShow = useRef(brandsArray);

  const getSlidersValues = (values: ISliderValues) => {
    setSlidersValues(values);
  };
  const getTotalCosts = (brandWithFinalPrice) => {
    if (brandWithFinalPrice) {
      setAllPrices((prevPrices) => ({ ...prevPrices, ...brandWithFinalPrice }));
    }
  };
  useEffect(() => {
    if (allPrices) {
      const minimalNumber = Math.min(...Object.values<number>(allPrices));
      bestPrice.current = minimalNumber;
      if (brandsToShow.current && allPrices) {
        for (let brand of brandsToShow.current) {
          brand.hasBestPrice =
            allPrices[brand.brandName] <= minimalNumber ? true : false;
        }
      }
    }
    setAllCalculatedBrands([...brandsToShow.current]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allPrices]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className={styles.container}>
        <div className={styles.brandContainer}>
          {allCalculatedBrands.map((brand, index) => {
            return (
              <Brand
                key={index}
                brandInfo={brand}
                getCost={getTotalCosts}
                pickedAmount={slidersValues}
              />
            );
          })}
        </div>
        <MemorySliders getValues={getSlidersValues} />
      </div>
    </div>
  );
}
