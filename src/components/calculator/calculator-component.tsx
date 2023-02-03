import React, { useState, useRef, useEffect } from "react";
import styles from "./calc-component.module.css";
import MemorySliders from "../sliders";
import { debounce } from "@mui/material";
// @ts-ignore
import brandsData from "../../data/brands-data.tsx";
// @ts-ignore
import ColumnChart from "../charts/column.tsx";
import Brand from "../brands/multi-brand-component";
import { ISlidervalues, IPrices } from "../../interfaces/calc-interfaces";

export default function Calculator() {
  const [slidersValues, setSlidersValues] = useState<ISlidervalues>();
  const [bestPrice, setBestPrice] = useState<number>(0);
  const [allPrices, setAllPrices] = useState<IPrices>();
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
      <ColumnChart data={{ allPrices, bestPrice }} />

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
    </>
  );
}
