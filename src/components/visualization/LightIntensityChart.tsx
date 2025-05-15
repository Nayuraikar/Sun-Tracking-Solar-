import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ArduinoData } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LightIntensityChartProps {
  data: ArduinoData[];
}

const LightIntensityChart: React.FC<LightIntensityChartProps> = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Light Intensity Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1023,
        title: {
          display: true,
          text: 'Light Intensity (0-1023)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
    },
  };

  const chartData = {
    labels: data.map((_, index) => {
      const timeAgo = data.length - 1 - index;
      if (timeAgo === 0) return 'Now';
      if (timeAgo === 1) return '0.5s ago';
      return `${(timeAgo / 2).toFixed(1)}s ago`;
    }),
    datasets: [
      {
        label: 'LDR Sensor 1',
        data: data.map(d => d.ldr1Value),
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
      },
      {
        label: 'LDR Sensor 2',
        data: data.map(d => d.ldr2Value),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  return <Line options={options} data={chartData} />;
};

export default LightIntensityChart;