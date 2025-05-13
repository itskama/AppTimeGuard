import { Typography } from '@mui/material';

interface SummaryProps {
  totalMinutes: number;
  mostUsed: string;
  percentageChange: number;
}

const Summary: React.FC<SummaryProps> = ({ totalMinutes, mostUsed, percentageChange }) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <div className="text-center">
      <Typography variant="h4" gutterBottom>
        {hours}h {minutes}m
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Most Used: {mostUsed}
      </Typography>
      <Typography variant="body2" color="success.main">
        +{percentageChange}%
      </Typography>
    </div>
  );
};

export default Summary;