import * as React from "react";
import Box from "@mui/joy/Box";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import { useWindowSize } from "../../utility/dimensionsHook.tsx";

export default function OptionPicker({
  togglingOption,
  switchOptions,
  switchChangedHandler,
}) {
  const [option, setOption] = React.useState(switchOptions[0]);
  const viewSize= useWindowSize();
  const style = {
    justifyContent: 'center',
    minWidth:viewSize.width > 677 ? '160px' : '85px',
    minHeight:'48px',
    display: "flex",
    alignItems: "center",
    gap: 2,
  }
  React.useEffect(() => {
    switchChangedHandler(option);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option]);
  return (
    <Box
      sx={style}
      visibility={togglingOption ? "" : "hidden"}
    >
      <RadioGroup
        orientation={viewSize.width > 677 ? 'horizontal' : 'vertical'}
        aria-labelledby="segmented-controls-example"
        name="justify"
        value={option}
        onChange={(event) => setOption(event.target.value)}
        sx={{
          alignItems: "center",
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
