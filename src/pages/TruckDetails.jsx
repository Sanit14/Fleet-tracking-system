import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import Map from '../components/Map';
import { MileageAreaChart } from '../components/Charts';

const mockDailyMileage = [
  { name: 'D1', mileage: 120 }, { name: 'D2', mileage: 140 }, { name: 'D3', mileage: 100 },
  { name: 'D4', mileage: 180 }, { name: 'D5', mileage: 210 }, { name: 'D6', mileage: 80 },
  { name: 'D7', mileage: 40 },
];

const TruckDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const truck = useStore(state => state.trucks.find(t => t.id === id));
  const updateTruckStatus = useStore(state => state.updateTruckStatus);
  const user = useStore(state => state.user);
  
  const [statusUpdating, setStatusUpdating] = useState(false);

  if (!truck) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold mb-4">Truck Not Found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/trucks')}>Back to List</button>
      </div>
    );
  }

  const handleStatusChange = (e) => {
    setStatusUpdating(true);
    setTimeout(() => {
      updateTruckStatus(truck.id, e.target.value);
      setStatusUpdating(false);
    }, 500); // simulate network delay
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>← Back</button>
          <h1 className="text-2xl font-bold">{truck.truck_number}</h1>
          <span className={`badge status-${truck.status}`}>{truck.status}</span>
        </div>
        
        {/* Users (and Admins) can update status */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted">Update Status:</span>
          <select 
            className="panel py-2 px-3 text-sm font-semibold" 
            style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', opacity: statusUpdating ? 0.5 : 1 }}
            value={truck.status}
            onChange={handleStatusChange}
            disabled={statusUpdating}
          >
            <option value="incoming">Incoming</option>
            <option value="loading">Loading</option>
            <option value="outgoing">Outgoing</option>
            <option value="unloading">Unloading</option>
            <option value="idle">Idle</option>
            <option value="service">Service</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="panel col-span-1 flex flex-col gap-4">
          <h3 className="font-semibold text-white border-b border-border-color pb-3" style={{ borderBottom: '1px solid var(--border-color)' }}>Information</h3>
          
          <div className="flex flex-col gap-4 text-sm mt-2">
            <div className="flex justify-between items-center">
              <span className="text-muted">Driver</span> 
              <span className="font-semibold">{truck.driver_name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted">Total Mileage</span> 
              <span className="font-semibold">{truck.mileage.toLocaleString()} mi</span>
            </div>
            
            {user.role === 'admin' && (
              <div className="flex justify-between items-center">
                <span className="text-muted text-accent-warning">Insurance Expires</span> 
                <span className="font-semibold">{truck.insurance_expiry}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <span className="text-muted">Last Update</span> 
              <span className="font-semibold">{new Date(truck.lastUpdate).toLocaleString()}</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border-color" style={{ borderTop: '1px solid var(--border-color)' }}>
              <h4 className="text-sm font-semibold text-muted mb-3">Stay Detection</h4>
              <div className="p-3 bg-bg-tertiary rounded-md border border-border-light" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                {truck.status === 'idle' ? (
                   <div className="flex-col gap-1">
                      <p className="text-xs text-accent-warning flex items-center gap-1 font-semibold">⚠️ Extended Stay Detected</p>
                      <p className="text-xs text-text-secondary mt-1">Duration: {(Math.random() * 5 + 1).toFixed(1)} hrs</p>
                      <p className="text-xs text-text-secondary">Location: current coordinate</p>
                   </div>
                ) : (
                   <p className="text-xs text-text-secondary flex items-center justify-center py-2">No extended stays detected.</p>
                )}
              </div>
          </div>
        </div>

        <div className="panel col-span-2 p-0 overflow-hidden relative min-h-[350px]">
          <div className="p-4 border-b border-border-color absolute top-0 left-0 right-0 z-10 glass" style={{ borderBottom: '1px solid var(--border-color)' }}>
            <h3 className="font-semibold text-white text-sm">Real-time Location Tracker</h3>
          </div>
          <Map 
            trucks={[truck]} 
            center={null} // Map component handles center if not provided 
            zoom={15} 
          />
        </div>
      </div>

      <div className="panel mt-4">
         <h3 className="font-semibold mb-6">Recent Mileage History</h3>
         <MileageAreaChart data={mockDailyMileage} height={250} />
      </div>
    </div>
  );
};

export default TruckDetails;
