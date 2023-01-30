import React, { useEffect, useState } from "react";
import BackBlazeOffer from "../brands/backblaze";
import VultrOffer from "../brands/vultr";
import MemorySliders from "../sliders";
import { debounce } from "@mui/material";

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
      <MemorySliders getValues={getSlidersValues} />
      <BackBlazeOffer pickedValues={slidersValues} />
      <VultrOffer pickedValues={slidersValues} />
    </>
  );
}
