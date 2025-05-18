import React, { useState, useEffect } from "react";
import { Container, Typography, Card, CardContent, FormControlLabel, Switch } from "@mui/material";
import { fetchUserData } from "../services/firebaseApi";

const SettingsPage: React.FC = () => {
  const [userData, setUserData] = useState<any>({});
  const [theme, setTheme] = useState<string>("light");
  const [notifications, setNotifications] = useState<boolean>(true);

  useEffect(() => {
    fetchUserData((data) => {
      setUserData(data);
      setTheme(data.settings?.theme || "light");
      setNotifications(data.settings?.notifications || true);
    });
  }, []);

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Настройки
          </Typography>
          <FormControlLabel
            control={<Switch checked={theme === "dark"} onChange={() => setTheme(theme === "light" ? "dark" : "light")} />}
            label="Тёмная тема"
          />
          <FormControlLabel
            control={<Switch checked={notifications} onChange={() => setNotifications(!notifications)} />}
            label="Уведомления"
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default SettingsPage;