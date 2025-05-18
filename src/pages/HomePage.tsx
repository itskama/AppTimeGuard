import React, { useState, useEffect } from "react";
import { Container, Typography, Card, CardContent, Chip, Box } from "@mui/material";
import { fetchUserData } from "../services/firebaseApi";
import { CustomPieChart } from "../components/PieChart";
import AppList from "../components/AppList";
import ToggleSwitch from "../components/ToggleSwitch";

const HomePage: React.FC = () => {
  const [userData, setUserData] = useState<any>({});
  const [period, setPeriod] = useState<"day" | "week">("day");

  useEffect(() => {
    fetchUserData(setUserData);
  }, []);

  const appUsage = userData.appUsage || {};
  const today = "2025-05-18";
  const productiveApps = ["Browser"];
  const entertainmentApps = ["Instagram", "YouTube", "Telegram", "GameApp", "TikTok"];

  const filterByPeriod = (data: Record<string, { timeSpent: number; date: string }>) =>
    period === "day"
      ? Object.fromEntries(Object.entries(data).filter(([, { date }]) => date === today))
      : data;

  const filteredApps = filterByPeriod(appUsage);
  const productiveTime = Object.entries(filteredApps)
    .filter(([app]) => productiveApps.includes(app))
    .reduce((sum, [, { timeSpent }]) => sum + timeSpent, 0);
  const entertainmentTime = Object.entries(filteredApps)
    .filter(([app]) => entertainmentApps.includes(app))
    .reduce((sum, [, { timeSpent }]) => sum + timeSpent, 0);
  const totalTime = productiveTime + entertainmentTime;
  const percentageChange = Math.round(((totalTime - 160) / 160) * 100); // Пример расчёта изменения

  return (
    <Container maxWidth="sm">
      <ToggleSwitch value={period} onChange={setPeriod} />
      <Card sx={{ mt: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            {totalTime} мин
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
            <Chip
              label={`+${percentageChange}%`}
              color={percentageChange > 0 ? "error" : "success"}
              size="small"
              sx={{ position: "absolute", mt: -4, ml: 10 }}
            />
            <CustomPieChart productive={productiveTime} entertainment={entertainmentTime} />
          </Box>
          <Box display="flex" justifyContent="center" gap={2} mb={2}>
            <Chip label="Развлечения" color="warning" variant="outlined" />
            <Chip label="Продуктивность" color="primary" variant="outlined" />
          </Box>
        </CardContent>
      </Card>
      <Typography variant="subtitle1" align="center" sx={{ mt: 2 }}>
        Самые используемые
      </Typography>
      <Card sx={{ mt: 1, boxShadow: 2 }}>
        <CardContent>
          <AppList apps={filteredApps} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default HomePage;