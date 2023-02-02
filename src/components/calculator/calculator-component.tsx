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
  const [bestDealBrand, setBestDealBrand] = useState<string>("");
  const brands = useRef([{}]);
  const costsArray = useRef<{}[]>([]);

  useEffect(() => {
    brands.current = brandsData;
  }, []);

  const getSlidersValues = debounce((values: IslidersValues) => {
    setSlidersValues(values);
  }, 100);

  const getTotalCosts = (price: ItotalCosts) => {
    costsArray.current.push(price);
    setBestDealBrand("new brand");
    // console.log("totalCosts.current.brand in fn", costsArray.current);
  };

  useEffect(() => {
    // console.log("useEffect", bestDealBrand);
  }, [bestDealBrand]);

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
