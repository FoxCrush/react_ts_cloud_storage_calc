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
interface ItotalCosts {
  brand: number;
}

export default function Calculator() {
  const [slidersValues, setSlidersValues] = useState<IslidersValues>();
  const [totalCosts, setTotalCosts] = useState<ItotalCosts>();
  const brands = useRef([{}]);

  useEffect(() => {
    brands.current = brandsData;
    console.log("brands.current", brands.current);
  }, []);

  const getSlidersValues = debounce((values: IslidersValues) => {
    setSlidersValues(values);
  }, 100);

  const getTotalCosts = (price: ItotalCosts) => {
    if (price) {
      setTotalCosts(price);
    }
  };
  const devStr = `DEV ${totalCosts}`;
  return (
    <>
      <div className={styles.brandContainer}>
        {/* <BackBlazeOffer pickedValues={slidersValues} getCost={getTotalCosts} /> */}
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
