import React from 'react';
import { MileageAreaChart, StatusBarChart } from '../components/Charts';

const mockWeeklyMileage = [
  { name: 'Mon', mileage: 1240 },
  { name: 'Tue', mileage: 1430 },
  { name: 'Wed', mileage: 1100 },
  { name: 'Thu', mileage: 1890 },
  { name: 'Fri', mileage: 2100 },
  { name: 'Sat', mileage: 800 },
  { name: 'Sun', mileage: 400 },
];

const mockFleetPerformance = [
  { name: 'TRK-1001', active: 45, idle: 12, service: 0 },
  { name: 'TRK-1002', active: 38, idle: 8, service: 4 },
  { name: 'TRK-1003', active: 52, idle: 5, service: 0 },
  { name: 'TRK-1004', active: 10, idle: 48, service: 0 },
  { name: 'TRK-1005', active: 0, idle: 0, service: 60 },
];

const Analytics = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mileage & Analytics</h1>
        <select className="panel py-2 px-3 text-sm" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Year</option>
        </select>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="panel col-span-2">
            <h3 className="mb-6 font-semibold">Total Fleet Mileage Trend</h3>
            <MileageAreaChart data={mockWeeklyMileage} height={350} />
        </div>
        
        <div className="panel col-span-2">
            <h3 className="mb-6 font-semibold">Truck Performance Breakdown (Hours)</h3>
            <StatusBarChart data={mockFleetPerformance} height={350} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
