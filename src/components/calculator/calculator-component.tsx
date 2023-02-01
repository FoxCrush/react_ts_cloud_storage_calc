import React, { useCallback, useState } from "react";
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
interface ItotalCosts {
  brand: number;
}

export default function Calculator() {
  const [slidersValues, setSlidersValues] = useState<IslidersValues>();
  const totalCosts = useRef<ItotalCosts>();
  const brands = useRef([{}]);

  useEffect(() => {
    brands.current = brandsData;
    console.log("brands.current", brands.current);
  }, []);

  const getSlidersValues = debounce((values: IslidersValues) => {
    setSlidersValues(values);
  }, 100);

  const getTotalCosts = useCallback((price: number) => {
    if (price) {
      totalCosts.current = { brand: price };
    } else {
      totalCosts.current = { brand: 0 };
    }
  }, []);

  let devStr = "";
  if (totalCosts.current) {
    devStr = `DEV ${totalCosts.current.brand}`;
    console.log("totalCosts.current.brand", totalCosts.current.brand);
  } else {
    devStr = "no value";
  }

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
      <h3> {devStr} </h3>
    </>
  );
}
