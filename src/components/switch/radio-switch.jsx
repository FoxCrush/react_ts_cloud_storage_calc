import * as React from "react";
import Box from "@mui/joy/Box";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";

export default function OptionPicker({
  togglingOption,
  switchOptions,
  switchChangedHandler,
}) {
  const [option, setOption] = React.useState(switchOptions[0]);
  React.useEffect(() => {
    switchChangedHandler(option);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option]);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
      visibility={togglingOption ? "" : "hidden"}
    >
      <RadioGroup
        orientation="vertical"
        aria-labelledby="segmented-controls-example"
        name="justify"
        value={option}
        onChange={(event) => setOption(event.target.value)}
        sx={{
          minHeight: 48,
          padding: "4px",
          borderRadius: "md",
          bgcolor: "silver",
          "--RadioGroup-gap": "4px",
          "--Radio-action-radius": "8px",
        }}
      >
        {switchOptions.map((item) => (
          <Radio
            key={item}
            color="neutral"
            value={item}
            disableIcon
            label={item}
            variant="plain"
            sx={{
              px: 2,
              alignItems: "center",
            }}
            slotProps={{
              action: ({ checked }) => ({
                sx: {
                  ...(checked && {
                    bgcolor: "azure",
                    boxShadow: "md",
                    "&:hover": {
                      bgcolor: "azure",
                    },
                  }),
                },
              }),
            }}
          />
        ))}
      </RadioGroup>
    </Box>
  );
}
