import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import FlagIcon from "@mui/icons-material/Flag";
import SettingsIcon from "@mui/icons-material/Settings";
import HomePage from "./pages/HomePage";
import ReportPage from "./pages/ReportPage";
import GoalsPage from "./pages/GoalsPage";
import SettingsPage from "./pages/SettingsPage";

const App: React.FC = () => {
  const [value, setValue] = useState(0);

  return (
    <Router>
      <Box sx={{ pb: 7 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          showLabels
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        >
          <BottomNavigationAction label="Главная" icon={<HomeIcon />} component={Link} to="/" />
          <BottomNavigationAction label="Отчёт" icon={<BarChartIcon />} component={Link} to="/report" />
          <BottomNavigationAction label="Цели" icon={<FlagIcon />} component={Link} to="/goals" />
          <BottomNavigationAction label="Настройки" icon={<SettingsIcon />} component={Link} to="/settings" />
        </BottomNavigation>
      </Box>
    </Router>
  );
};

export default App;