import React, { useState, useEffect } from "react";
import { Container, Typography, Card, CardContent, List } from "@mui/material";
import { fetchUserData } from "../services/firebaseApi";
import GoalItem from "../components/GoalItem";

const GoalsPage: React.FC = () => {
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    fetchUserData(setUserData);
  }, []);

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Ваши цели
          </Typography>
          <List>
            {Object.entries(userData.goals || {}).map(([appName, { limit, progress }]: [string, any]) => (
              <GoalItem key={appName} appName={appName} limit={limit} progress={progress} />
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default GoalsPage;