import { create } from 'zustand';
import { initialTrucks, initialGeofences, initialActivityLogs } from '../lib/mockData';

const useStore = create((set, get) => ({
  // Auth state
  user: { role: 'admin', name: 'Admin User' }, // 'admin' or 'user'
  setUser: (user) => set({ user }),
  
  // Trucks state
  trucks: initialTrucks,
  setTrucks: (trucks) => set({ trucks }),
  
  addTruck: (newTruck) => set((state) => ({ 
    trucks: [...state.trucks, { ...newTruck, id: Date.now().toString(), status: 'idle', mileage: 0, lastUpdate: new Date().toISOString() }] 
  })),
  
  removeTruck: (id) => set((state) => ({ 
    trucks: state.trucks.filter(t => t.id !== id) 
  })),
  
  updateTruckStatus: (id, newStatus) => set((state) => {
    // Add to activity logs
    const truck = state.trucks.find(t => t.id === id);
    if(truck) {
      get().addActivityLog({
        truck_id: id,
        truck_number: truck.truck_number,
        old_status: truck.status,
        new_status: newStatus,
        timestamp: new Date().toISOString(),
        user: state.user.name
      });
    }

    return {
      trucks: state.trucks.map(t => 
        t.id === id ? { ...t, status: newStatus, lastUpdate: new Date().toISOString() } : t
      )
    };
  }),

  // Locations State (Live tracking)
  // Maps truck_id to current location object
  locations: initialTrucks.reduce((acc, truck) => {
    acc[truck.id] = { lat: truck.current_lat, lng: truck.current_lng };
    return acc;
  }, {}),
  
  updateLocation: (truckId, lat, lng) => set((state) => ({
    locations: { ...state.locations, [truckId]: { lat, lng } }
  })),

  // Geofence State
  geofences: initialGeofences,
  addGeofence: (fence) => set((state) => ({ geofences: [...state.geofences, { ...fence, id: Date.now().toString() }] })),
  removeGeofence: (id) => set((state) => ({ geofences: state.geofences.filter(g => g.id !== id) })),

  // Analytics & Activity Logic
  activityLogs: initialActivityLogs,
  addActivityLog: (log) => set((state) => ({ activityLogs: [{...log, id: Date.now().toString()}, ...state.activityLogs] })),
}));

export default useStore;
