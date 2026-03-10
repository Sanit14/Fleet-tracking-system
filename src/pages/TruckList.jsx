import React from 'react';
import useStore from '../store/useStore';
import { useNavigate } from 'react-router-dom';

const TruckList = () => {
  const trucks = useStore(state => state.trucks);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Fleet Management</h1>
        <button className="btn btn-primary">+ Add New Truck</button>
      </div>

      <div className="panel table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Truck ID</th>
              <th>Driver</th>
              <th>Status</th>
              <th>Mileage</th>
              <th>Last Update</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trucks.map(truck => (
              <tr key={truck.id}>
                <td className="font-semibold text-white">{truck.truck_number}</td>
                <td>{truck.driver_name}</td>
                <td>
                  <span className={`badge status-${truck.status}`}>
                    {truck.status}
                  </span>
                </td>
                <td>{truck.mileage.toLocaleString()} mi</td>
                <td>{new Date(truck.lastUpdate).toLocaleTimeString()}</td>
                <td>
                  <button 
                    className="btn btn-secondary text-sm"
                    onClick={() => navigate(`/trucks/${truck.id}`)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TruckList;
