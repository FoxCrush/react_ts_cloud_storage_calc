import React, { useEffect, useState } from "react";
import BackBlazeOffer from "../brands/backblaze";
import VultrOffer from "../brands/vultr";
import MemorySliders from "../sliders";
import { debounce } from "@mui/material";
import styles from "./calc-comopnent.module.css";
import BunnyOffer from "../brands/bunny";

interface slidersValues {
  storage: number;
  transfer: number;
}

export default function Calculator() {
  const [slidersValues, setSlidersValues] = useState<slidersValues>();
  const getSlidersValues = debounce((values: slidersValues) => {
    setSlidersValues(values);
  }, 1000);
  useEffect(() => {
    console.log("slidersValues", slidersValues);
  }, [slidersValues]);

  return (
    <>
      <div className={styles.brandContainer}>
        <BackBlazeOffer pickedValues={slidersValues} />
        <BunnyOffer pickedValues={slidersValues} />
        <VultrOffer pickedValues={slidersValues} />
      </div>
      <div>
        <MemorySliders getValues={getSlidersValues} />
      </div>
    </>
  );
}
