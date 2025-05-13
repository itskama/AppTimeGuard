import React from 'react';
import { Chart } from 'chart.js';
import 'chart.js/auto';
import { CategorySummary } from '../types';

interface DonutChartProps {
  summaries: CategorySummary[];
}

const DonutChart: React.FC<DonutChartProps> = ({ summaries }) => {
  React.useEffect(() => {
    const ctx = document.getElementById('categoryChart') as HTMLCanvasElement;
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: summaries.map(s => s.category),
        datasets: [{
          data: summaries.map(s => s.minutes),
          backgroundColor: ['#FFD700', '#1E90FF', '#FF4500', '#32CD32'],
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
        },
      },
    });

    return () => chart.destroy();
  }, [summaries]);

  return <canvas id="categoryChart" className="w-full max-w-xs mx-auto"></canvas>;
};

export default DonutChart;