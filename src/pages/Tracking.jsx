import React, { useState } from 'react';
import useStore from '../store/useStore';
import Map from '../components/Map';

const Tracking = () => {
  const trucks = useStore(state => state.trucks);
  const [showGeofences, setShowGeofences] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredTrucks = trucks.filter(t => filterStatus === 'all' || t.status === filterStatus);

  return (
    <div className="flex flex-col gap-4 h-full" style={{ height: 'calc(100vh - 120px)' }}>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">Live Fleet Tracking</h1>
        
        <div className="flex gap-4 items-center">
          <select 
            className="panel py-2 px-3 bg-bg-secondary text-sm border border-border-color rounded-md text-text-primary"
            style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', outline: 'none', border: '1px solid var(--border-color)' }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="outgoing">Outgoing</option>
            <option value="incoming">Incoming</option>
            <option value="loading">Loading</option>
            <option value="unloading">Unloading</option>
            <option value="idle">Idle</option>
            <option value="service">Service</option>
          </select>
          
          <button 
            className={`btn ${showGeofences ? 'btn-primary' : 'btn-secondary'} text-sm`}
            onClick={() => setShowGeofences(!showGeofences)}
          >
            Geofences: {showGeofences ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div className="panel flex-1 p-0 overflow-hidden relative">
         <Map trucks={filteredTrucks} zoom={11} showGeofences={showGeofences} />
      </div>
    </div>
  );
};

export default Tracking;
