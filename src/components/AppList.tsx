import { List, ListItem, ListItemText, Divider } from '@mui/material';
import { AppUsage } from '../types';

interface AppListProps {
  apps: AppUsage[];
}

const AppList: React.FC<AppListProps> = ({ apps }) => {
  return (
    <List>
      {apps.map(app => (
        <div key={app.id}>
          <ListItem>
            <ListItemText
              primary={app.name}
              secondary={`${Math.floor(app.minutes / 60)}h ${app.minutes % 60}m - ${app.category}`}
            />
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  );
};

export default AppList;