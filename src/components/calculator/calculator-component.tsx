import React, { useState, useRef, useEffect } from "react";
import MemorySliders from "../sliders";
import { debounce } from "@mui/material";
import styles from "./calc-component.module.css";
// @ts-ignore
import brandsData from "../../data/brands-data.tsx";
import Brand from "../brands/multi-brand-component";

interface ISlidervalues {
  sliderStorageValue: number;
  sliderTransferValue: number;
}
interface IPrices {
  [name: string]: number;
}

export default function Calculator() {
  const [slidersValues, setSlidersValues] = useState<ISlidervalues>();
  const [bestPrice, setBestPrice] = useState<number>(0);
  const [allPrices, setAllPrices] = useState<IPrices>({ brand: 0 });
  const brands = useRef([{}]);

  const getSlidersValues = debounce((values: ISlidervalues) => {
    setSlidersValues(values);
  }, 100);
  const getTotalCosts = (price) => {
    if (price) {
      setAllPrices((prevPrices) => ({ ...prevPrices, ...price }));
    }
  };

  useEffect(() => {
    console.log("allPrices", allPrices);
    if (allPrices) {
      const minimalNumber = Math.min(...Object.values<number>(allPrices));
      setBestPrice(minimalNumber);
    }
  }, [allPrices]);
  //fetch imitation
  useEffect(() => {
    brands.current = brandsData;
  }, []);

  return (
    <>
      <div className={styles.brandContainer}>
        {brands.current.length > 0 ? (
          brands.current.map((brand, index) => {
            return (
              <Brand
                key={index}
                brandInfo={brand}
                getCost={getTotalCosts}
                pickedAmount={slidersValues}
              />
            );
          })
        ) : (
          <h3>No brands data</h3>
        )}
      </div>
      <div>
        <MemorySliders getValues={getSlidersValues} />
      </div>
      <h3>{bestPrice}</h3>
    </>
  );
}
