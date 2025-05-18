import React from "react";
import { Box, FormControlLabel, Switch } from "@mui/material";

const ToggleSwitch: React.FC<{ value: string; onChange: (value: string) => void }> = ({ value, onChange }) => (
  <Box display="flex" justifyContent="center" my={2}>
    <FormControlLabel
      control={<Switch checked={value === "week"} onChange={() => onChange(value === "day" ? "week" : "day")} />}
      label={value === "day" ? "День" : "Неделя"}
    />
  </Box>
);

export default ToggleSwitch;