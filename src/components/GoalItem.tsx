import React from "react";
import { ListItem, ListItemText } from "@mui/material";

const GoalItem: React.FC<{ appName: string; limit: number; progress: number }> = ({ appName, limit, progress }) => (
  <ListItem>
    <ListItemText primary={appName} secondary={`Прогресс: ${progress}/${limit} мин`} />
  </ListItem>
);

export default GoalItem;