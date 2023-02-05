import React, { useEffect, useState, useRef } from "react";
import Brand from "../brands/multi-brand-component";
// @ts-ignore
import brandsArray from "../../data/brands-data.tsx";
// @ts-ignore
import styles from "./calc-component.module.css";
import { IPrices } from "../../interfaces/calc-interfaces";
import MemorySliders from "../sliders";
import { ISliderValues } from "../../interfaces/calc-interfaces";

export default function Calculator() {
  const [slidersValues, setSlidersValues] = useState<ISliderValues>();
  const [bestPrice, setBestPrice] = useState<number>(0);
  const [allPrices, setAllPrices] = useState<IPrices>();
  const brands = useRef([{}]);

  const getSlidersValues = (values: ISliderValues) => {
    setSlidersValues(values);
  };
  const getTotalCosts = (price) => {
    if (price) {
      setAllPrices((prevPrices) => ({ ...prevPrices, ...price }));
    }
  };

  useEffect(() => {
    if (allPrices) {
      const minimalNumber = Math.min(...Object.values<number>(allPrices));
      if (bestPrice !== minimalNumber) {
        setBestPrice(minimalNumber);
      }
    }
  }, [allPrices, bestPrice]);
  //fetch imitation
  useEffect(() => {
    brands.current = brandsArray;
  }, []);

  return (
    <div style={{ width:'100vw', height:'100vh'}}>
    <div className={styles.container}>
      <div className={styles.brandContainer}>
        {brands.current.map((brand, index) => {
          return (
            <Brand
              key={index}
              brandInfo={brand}
              getCost={getTotalCosts}
              pickedAmount={slidersValues}
              bestPrice={bestPrice}
            />
          );
        })}
      </div>
        <MemorySliders getValues={getSlidersValues} />
    </div>
    </div>
  );
}
