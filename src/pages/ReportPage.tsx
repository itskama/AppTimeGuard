import React, { useState, useEffect } from "react";
import { Container, Typography, Card, CardContent } from "@mui/material";
import { fetchUserData } from "../services/firebaseApi";
import AppList from "../components/AppList";

const ReportPage: React.FC = () => {
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    fetchUserData(setUserData);
  }, []);

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Детальный отчёт
          </Typography>
          <Typography variant="subtitle1">Использование приложений</Typography>
          <AppList apps={userData.appUsage || {}} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default ReportPage;