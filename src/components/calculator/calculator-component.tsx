import React, { useState } from "react";
import MemorySliders from "../sliders";
import { debounce } from "@mui/material";
import styles from "./calc-comopnent.module.css";
import { useRef } from "react";
// @ts-ignore
import brandsData from "../../data/brands-data.tsx";
import { useEffect } from "react";
import Brand from "../brands/multi-brand-component";

interface IslidersValues {
  storage: number;
  transfer: number;
}

export default function Calculator() {
  const [slidersValues, setSlidersValues] = useState<IslidersValues>();
  const [bestPrice, setBestPrice] = useState<number>(0);
  const brands = useRef([{}]);
  const costsArray = useRef([0]);

  useEffect(() => {
    brands.current = brandsData;
  }, []);

  const getSlidersValues = debounce((values: IslidersValues) => {
    setSlidersValues(values);
  }, 100);

  const getTotalCosts = (price: number) => {
    costsArray.current.push(price);

    setBestPrice(Math.min(...costsArray.current));
  };

  useEffect(() => {
    costsArray.current = [];
    console.log("Best Price", bestPrice);
  }, [bestPrice]);

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
    </>
  );
}
