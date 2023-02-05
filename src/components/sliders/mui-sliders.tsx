import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
//@ts-ignore
import styles from "./slider.module.css";

interface slidersValues {
  sliderStorageValue: number;
  sliderTransferValue: number;
}

export default function MemorySliders({ getValues }) {
  const [values, setValues] = useState<slidersValues>({
    sliderStorageValue: 10,
    sliderTransferValue: 10,
  });

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setValues((prevState) => ({
        ...prevState, //@ts-ignore
        [event.target!.name]: newValue,
      }));
    }
  };

  function valueLabelFormat(value: number) {
    const unit = "GB";
    return `${value} ${unit}`;
  }

  useEffect(() => {
    getValues(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <div className={styles.container}>
      <Box sx={{ width: 250 }}>
        <Typography variant="h5" id="non-linear-slider" gutterBottom>
          Storage: {valueLabelFormat(values.sliderStorageValue)}
        </Typography>
        <Slider
          name="sliderStorageValue"
          value={values.sliderStorageValue}
          min={0}
          step={1}
          max={1000}
          getAriaValueText={valueLabelFormat}
          valueLabelFormat={valueLabelFormat}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
        />
      </Box>
      <Box sx={{ width: 250 }}>
        <Typography  variant="h5" id="non-linear-slider" gutterBottom>
          Transfer: {valueLabelFormat(values.sliderTransferValue)}
        </Typography>
        <Slider
          name="sliderTransferValue"
          value={values.sliderTransferValue}
          min={0}
          step={1}
          max={1000}
          getAriaValueText={valueLabelFormat}
          valueLabelFormat={valueLabelFormat}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
        />
      </Box>
    </div>
  );
}
