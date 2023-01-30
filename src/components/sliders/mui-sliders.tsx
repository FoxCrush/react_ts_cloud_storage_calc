import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";

interface slidersValues {
  storage: number;
  transfer: number;
}

export default function MemorySliders({ getValues }) {
  const [values, setValues] = React.useState<slidersValues>({
    storage: 10,
    transfer: 10,
  });

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setValues((prevState) => ({
        ...prevState,
        [event.target!.name]: newValue,
      }));
    }
  };
  React.useMemo(() => {
    getValues(values);
  }, [getValues, values]);

  function valueLabelFormat(value: number) {
    const unit = "GB";
    return `${value} ${unit}`;
  }

  return (
    <>
      <Box sx={{ width: 250 }}>
        <Typography id="non-linear-slider" gutterBottom>
          Storage: {valueLabelFormat(values.storage)}
        </Typography>
        <Slider
          name="storage"
          value={values.storage}
          min={1}
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
        <Typography id="non-linear-slider" gutterBottom>
          Transfer: {valueLabelFormat(values.transfer)}
        </Typography>
        <Slider
          name="transfer"
          value={values.transfer}
          min={1}
          step={1}
          max={1000}
          getAriaValueText={valueLabelFormat}
          valueLabelFormat={valueLabelFormat}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
        />
      </Box>
    </>
  );
}
