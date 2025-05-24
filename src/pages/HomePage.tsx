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
  const today = "2025-05-24";
  const oneWeekAgo = "2025-05-17";

  const filterByPeriod = (data: Record<string, { timeSpent: number; date: string; category: string }>) => {
    if (period === "day") {
      return Object.fromEntries(Object.entries(data).filter(([, { date }]) => date === today));
    } else {
      return Object.fromEntries(Object.entries(data).filter(([, { date }]) => {
        const dateObj = new Date(date);
        const todayObj = new Date(today);
        const diffTime = Math.abs(todayObj.getTime() - dateObj.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
      }));
    }
  };

  const filteredApps = filterByPeriod(appUsage);

  
  const sortedApps = Object.entries(filteredApps)
    .sort(([, a], [, b]) => b.timeSpent - a.timeSpent)
    .reduce((acc, [appName, appData]) => {
      acc[appName] = appData;
      return acc;
    }, {} as Record<string, { timeSpent: number; date: string; category: string }>);

  
  const categories = ["social", "entertainment", "education", "work", "other"];
  const categoryTimes = categories.reduce((acc, category) => {
    acc[category] = Object.entries(filteredApps)
      .filter(([, { category: appCategory }]) => appCategory === category)
      .reduce((sum, [, { timeSpent }]) => sum + timeSpent, 0);
    return acc;
  }, {} as Record<string, number>);

  const totalTime = Object.values(categoryTimes).reduce((sum, time) => sum + time, 0);
  const percentageChange = totalTime > 0 ? Math.round(((totalTime - 160) / 160) * 100) : 0;


  const categoryColors: Record<string, string> = {
    social: "#FF6F61",
    entertainment: "#FFD700",
    education: "#4CAF50",
    work: "#3B82F6",
    other: "#9E9E9E"
  };


  const pieChartData = categories
    .filter((category) => categoryTimes[category] > 0)
    .map((category) => ({
      title: category,
      value: categoryTimes[category],
      color: categoryColors[category]
    }));

  return (
    <Container maxWidth="md">
      <ToggleSwitch value={period} onChange={setPeriod} />
      <Card sx={{ mt: 2, boxShadow: 3, padding: 2 }}>
        <CardContent>
          <Box display="flex" flexDirection="row" gap={4} alignItems="flex-start">

            <Box flex={1} minWidth={0}>
              <Typography variant="h4" gutterBottom sx={{ fontSize: "2rem" }}>
                {totalTime} мин
              </Typography>
              <Chip
                label={`+${percentageChange}%`}
                color={percentageChange > 0 ? "error" : "success"}
                size="medium"
                sx={{ mb: 3, fontSize: "1rem" }}
              />
              <Box display="flex" flexDirection="column" gap={2}>
                {categories.map((category) => (
                  categoryTimes[category] > 0 && (
                    <Box key={category} display="flex" alignItems="center" gap={2}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          backgroundColor: categoryColors[category],
                          borderRadius: "50%"
                        }}
                      />
                      <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                        {category === "social" ? "Соцсети" :
                         category === "entertainment" ? "Развлечения" :
                         category === "education" ? "Образование" :
                         category === "work" ? "Работа" : "Другое"}: {categoryTimes[category]} мин
                      </Typography>
                    </Box>
                  )
                ))}
              </Box>
            </Box>

            <Box flex={1} display="flex" justifyContent="center" maxWidth="300px">
              <CustomPieChart data={pieChartData} radius={50} />
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Typography variant="h6" align="center" sx={{ mt: 4, fontSize: "1.3rem" }}>
        Самые используемые
      </Typography>
      <Card sx={{ mt: 2, boxShadow: 2, padding: 2 }}>
        <CardContent>
          <AppList apps={sortedApps} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default HomePage;