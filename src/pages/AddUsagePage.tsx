import React, { useState, useEffect } from "react";
import { Container, Typography, Card, CardContent, TextField, Button, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import { getDatabase, ref, onValue, update, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  databaseURL: "https://apptimeguard-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const AddUsagePage: React.FC = () => {
  const [apps, setApps] = useState<string[]>([]);
  const [selectedApp, setSelectedApp] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [newAppName, setNewAppName] = useState("");
  const [newAppCategory, setNewAppCategory] = useState<"social" | "entertainment" | "education" | "work" | "other">("social");
  const navigate = useNavigate();

  // Загружаем список существующих приложений
  useEffect(() => {
    const userRef = ref(database, "users/user123/appUsage");
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const appList = Object.keys(data); // Теперь ключи — это названия приложений
        setApps(appList);
        if (appList.length > 0) setSelectedApp(appList[0]);
      }
    });
  }, []);

  // Добавление времени в существующее приложение
  const handleAddTime = () => {
    if (!selectedApp || !timeSpent || isNaN(Number(timeSpent))) return;

    const userRef = ref(database, `users/user123/appUsage/${selectedApp}`);
    onValue(userRef, (snapshot) => {
      const currentData = snapshot.val();
      const today = "2025-05-24";
      let newTimeSpent = Number(timeSpent);

      if (currentData && currentData.date === today) {
        newTimeSpent += currentData.timeSpent || 0;
      }

      update(userRef, {
        timeSpent: newTimeSpent,
        date: today
      }).then(() => {
        navigate("/");
      });
    }, { onlyOnce: true });
  };

  // Добавление нового приложения
  const handleAddNewApp = () => {
    if (!newAppName) return;

    // Используем название приложения как ключ
    const userRef = ref(database, `users/user123/appUsage/${newAppName}`);
    set(userRef, {
      timeSpent: 0,
      date: "2025-05-24",
      category: newAppCategory
    }).then(() => {
      setNewAppName("");
      setNewAppCategory("social");
      navigate("/");
    });
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Добавить время
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Приложение</InputLabel>
            <Select
              value={selectedApp}
              onChange={(e) => setSelectedApp(e.target.value)}
              label="Приложение"
            >
              {apps.map((app) => (
                <MenuItem key={app} value={app}>
                  {app}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Время (минуты)"
            type="number"
            value={timeSpent}
            onChange={(e) => setTimeSpent(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleAddTime} fullWidth>
            Добавить
          </Button>
        </CardContent>
      </Card>

      <Card sx={{ mt: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Добавить новое приложение
          </Typography>
          <TextField
            fullWidth
            label="Название приложения"
            value={newAppName}
            onChange={(e) => setNewAppName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Категория</InputLabel>
            <Select
              value={newAppCategory}
              onChange={(e) => setNewAppCategory(e.target.value as "social" | "entertainment" | "education" | "work" | "other")}
              label="Категория"
            >
              <MenuItem value="social">Соцсети</MenuItem>
              <MenuItem value="entertainment">Развлечения</MenuItem>
              <MenuItem value="education">Образование</MenuItem>
              <MenuItem value="work">Работа</MenuItem>
              <MenuItem value="other">Другое</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleAddNewApp} fullWidth>
            Добавить приложение
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddUsagePage;