import React, { useEffect } from 'react';
import useStore from '../store/useStore';
import Map from '../components/Map';

const Dashboard = () => {
  const trucks = useStore(state => state.trucks);
  const user = useStore(state => state.user);
  const activityLogs = useStore(state => state.activityLogs);
  
  const stats = {
    total: trucks.length,
    active: trucks.filter(t => ['loading', 'unloading', 'outgoing', 'incoming'].includes(t.status)).length,
    idle: trucks.filter(t => t.status === 'idle').length,
    service: trucks.filter(t => t.status === 'service').length
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="text-muted text-sm mt-1">Welcome back, {user.name}. Here's what's happening today.</p>
        </div>
        <button className="btn btn-primary">Download Report</button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        {[
          { label: 'Total Fleet', value: stats.total, color: 'var(--accent-primary)' },
          { label: 'Active Trucks', value: stats.active, color: 'var(--accent-success)' },
          { label: 'Idle Trucks', value: stats.idle, color: 'var(--accent-warning)' },
          { label: 'In Service', value: stats.service, color: 'var(--accent-danger)' }
        ].map((stat, i) => (
          <div key={i} className="panel flex flex-col gap-2">
            <span className="text-sm font-semibold text-muted text-transform-uppercase uppercase tracking-wider">{stat.label}</span>
            <span className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 mt-2">
        <div className="panel col-span-2 p-0 overflow-hidden" style={{ height: '450px' }}>
          <div className="p-4 border-b border-border-color absolute top-0 left-0 right-0 z-10 glass" style={{ borderBottom: '1px solid var(--border-color)' }}>
            <h3 className="font-semibold text-white">Live Fleet Map</h3>
          </div>
          <Map trucks={trucks} zoom={11} />
        </div>

        <div className="panel col-span-1 flex flex-col h-full" style={{ maxHeight: '450px' }}>
          <h3 className="mb-4 font-semibold pb-4 border-b border-border-color" style={{ borderBottom: '1px solid var(--border-color)' }}>Recent Activity</h3>
          
          <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4 mt-2">
             {activityLogs.slice(0, 10).map(log => (
               <div key={log.id} className="flex gap-3 item-start">
                 <div className="mt-1">
                   <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)' }}></div>
                 </div>
                 <div className="flex-1">
                   <p className="text-sm">
                     <span className="font-semibold text-white">{log.truck_number}</span> changed status 
                     from <span className={`text-xs badge status-${log.old_status}`}>{log.old_status}</span> 
                     to <span className={`text-xs badge status-${log.new_status}`}>{log.new_status}</span>
                   </p>
                   <div className="flex justify-between mt-1 text-xs text-muted">
                     <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                     <span>by {log.user}</span>
                   </div>
                 </div>
               </div>
             ))}
             {activityLogs.length === 0 && <p className="text-muted text-sm text-center mt-4">No recent activity.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
