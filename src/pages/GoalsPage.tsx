import React, { useState, useEffect } from "react";
import { Container, Typography, Card, CardContent, List, LinearProgress } from "@mui/material";
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
              <div key={appName} style={{ marginBottom: "16px" }}>
                <GoalItem appName={appName} limit={limit} progress={progress} />
                <LinearProgress
                  variant="determinate"
                  value={Math.min((progress / limit) * 100, 100)} // Ограничиваем до 100%
                  sx={{
                    height: 10,
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: progress > limit ? "#EF4444" : "#4CAF50" // Красный, если превышен лимит
                    }
                  }}
                />
                <Typography variant="caption" align="right">
                  {progress} / {limit} мин
                </Typography>
              </div>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default GoalsPage;