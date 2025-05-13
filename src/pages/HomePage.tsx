import React from 'react';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { AppUsage, CategorySummary } from '../types';
import Header from '../components/Header';
import DonutChart from '../components/DonutChart';
import AppList from '../components/AppList';
import Summary from '../components/Summary';

const HomePage: React.FC = () => {
  const [apps, setApps] = React.useState<AppUsage[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'appUsage'));
        const data: AppUsage[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as AppUsage));
        setApps(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalMinutes = apps.reduce((sum, app) => sum + app.minutes, 0);
  const categoryMap = apps.reduce((acc, app) => {
    acc[app.category] = (acc[app.category] || 0) + app.minutes;
    return acc;
  }, {} as Record<string, number>);
  const summaries: CategorySummary[] = Object.entries(categoryMap).map(([category, minutes]) => ({
    category,
    minutes,
  }));
  const mostUsed = summaries.length > 0
    ? summaries.reduce((a, b) => (a.minutes > b.minutes ? a : b)).category
    : 'None';
  const percentageChange = 15;

  React.useEffect(() => {
    const initializeData = async () => {
      const snapshot = await getDocs(collection(db, 'appUsage'));
      if (snapshot.empty) {
        const dummyData: AppUsage[] = [
          { id: '1', name: 'Pinterest', minutes: 104, category: 'Social Networks' },
          { id: '2', name: 'YouTube', minutes: 24, category: 'Social Networks' },
          { id: '3', name: 'Facebook', minutes: 24, category: 'Social Networks' },
          { id: '4', name: 'Chrome', minutes: 24, category: 'Productivity' },
          { id: '5', name: 'Figma', minutes: 24, category: 'Productivity' },
          { id: '6', name: 'Strava', minutes: 30, category: 'Sports' },
        ];
        dummyData.forEach(async (app) => {
          await setDoc(doc(db, 'appUsage', app.id), app);
        });
      }
    };
    initializeData();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div>
      <Header />
      <div className="p-4">
        <div className="bg-white rounded-lg shadow p-4">
          <DonutChart summaries={summaries} />
          <Summary totalMinutes={totalMinutes} mostUsed={mostUsed} percentageChange={percentageChange} />
          <AppList apps={apps} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;