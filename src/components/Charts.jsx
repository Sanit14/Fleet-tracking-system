import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, LineChart, Line
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="panel glass p-3 border border-border-color shadow-lg" style={{ backgroundColor: 'rgba(19, 27, 40, 0.9)', minWidth: '120px' }}>
        <p className="font-semibold text-white mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex gap-2 items-center text-sm">
             <div style={{ width: '8px', height: '8px', backgroundColor: entry.color, borderRadius: '50%' }}></div>
             <span style={{ color: 'var(--text-secondary)' }}>
                {entry.name}: <span className="font-medium text-white">{entry.value}</span>
             </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const MileageAreaChart = ({ data, height = 300 }) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorMileage" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="var(--text-muted)" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            dy={10}
          />
          <YAxis 
            stroke="var(--text-muted)" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            dx={-10}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border-color)', strokeWidth: 1, strokeDasharray: '3 3' }} />
          <Area 
            type="monotone" 
            dataKey="mileage" 
            name="Mileage (mi)"
            stroke="var(--accent-primary)" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorMileage)" 
            activeDot={{ r: 6, fill: 'var(--accent-primary)', stroke: 'white', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const StatusBarChart = ({ data, height = 300 }) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" vertical={false} />
          <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
          <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--bg-tertiary)', opacity: 0.4 }} />
          <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px', color: 'var(--text-muted)' }} />
          <Bar dataKey="active" stackId="a" name="Active Time (hrs)" fill="var(--accent-success)" radius={[0, 0, 4, 4]} />
          <Bar dataKey="idle" stackId="a" name="Idle Time (hrs)" fill="var(--accent-warning)" />
          <Bar dataKey="service" stackId="a" name="Service Time (hrs)" fill="var(--accent-danger)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
