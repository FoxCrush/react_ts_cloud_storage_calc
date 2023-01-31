import React, { useState } from "react";
import BackBlazeOffer from "../brands/backblaze";
import MemorySliders from "../sliders";
import { debounce } from "@mui/material";
import styles from "./calc-comopnent.module.css";

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

  const getSlidersValues = debounce((values: IslidersValues) => {
    setSlidersValues(values);
  }, 100);

  const getTotalCosts = (price: ItotalCosts) => {
    console.log("price", price);
    if (price) {
      setTotalCosts(price);
    }
  };

  return (
    <>
      <div className={styles.brandContainer}>
        <BackBlazeOffer pickedValues={slidersValues} getCost={getTotalCosts} />
      </div>
      <div>
        <MemorySliders getValues={getSlidersValues} />
      </div>
      <h3>DEV {totalCosts}</h3>
    </>
  );
}
