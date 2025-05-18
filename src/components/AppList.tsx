import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

const AppList: React.FC<{ apps: Record<string, { timeSpent: number; date: string }> }> = ({ apps }) => (
  <List>
    {Object.entries(apps).map(([appName, { timeSpent }]) => (
      <ListItem key={appName}>
        <ListItemText primary={appName} secondary={`${timeSpent} мин`} />
      </ListItem>
    ))}
  </List>
);

export default AppList;