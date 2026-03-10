// Base coordinates around a central hub (e.g., Dallas, TX for logistics)
const HUB_LAT = 32.7767;
const HUB_LNG = -96.7970;

const generateRandomOffset = (range = 0.5) => {
  return (Math.random() - 0.5) * range;
};

export const initialTrucks = [
  {
    id: 't-1001',
    truck_number: 'TRK-1001',
    driver_name: 'John Doe',
    status: 'outgoing', // 'loading', 'unloading', 'incoming', 'outgoing', 'idle', 'service'
    mileage: 45200,
    insurance_expiry: '2024-12-31',
    lastUpdate: new Date().toISOString(),
    current_lat: HUB_LAT + generateRandomOffset(),
    current_lng: HUB_LNG + generateRandomOffset(),
  },
  {
    id: 't-1002',
    truck_number: 'TRK-1002',
    driver_name: 'Sarah Smith',
    status: 'loading',
    mileage: 82140,
    insurance_expiry: '2025-06-15',
    lastUpdate: new Date(Date.now() - 3600000).toISOString(), // 1 hr ago
    current_lat: HUB_LAT + 0.01,
    current_lng: HUB_LNG - 0.02,
  },
  {
    id: 't-1003',
    truck_number: 'TRK-1003',
    driver_name: 'Michael Johnson',
    status: 'incoming',
    mileage: 120500,
    insurance_expiry: '2024-08-22',
    lastUpdate: new Date().toISOString(),
    current_lat: HUB_LAT + generateRandomOffset(1.5),
    current_lng: HUB_LNG + generateRandomOffset(1.5),
  },
  {
    id: 't-1004',
    truck_number: 'TRK-1004',
    driver_name: 'David Brown',
    status: 'idle',
    mileage: 93400,
    insurance_expiry: '2024-11-05',
    lastUpdate: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    current_lat: HUB_LAT + 0.03,
    current_lng: HUB_LNG + 0.01,
  },
  {
    id: 't-1005',
    truck_number: 'TRK-1005',
    driver_name: 'Emily Davis',
    status: 'service',
    mileage: 154020,
    insurance_expiry: '2025-01-10',
    lastUpdate: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    current_lat: HUB_LAT - 0.05,
    current_lng: HUB_LNG - 0.05,
  },
  {
    id: 't-1006',
    truck_number: 'TRK-1006',
    driver_name: 'Robert Wilson',
    status: 'unloading',
    mileage: 23100,
    insurance_expiry: '2026-03-20',
    lastUpdate: new Date(Date.now() - 1800000).toISOString(), // 30 mins ago
    current_lat: HUB_LAT - 0.02,
    current_lng: HUB_LNG + 0.04,
  }
];

export const initialGeofences = [
  {
    id: 'gf-1',
    zone_name: 'Main Hub',
    latitude: HUB_LAT,
    longitude: HUB_LNG,
    radius: 5000, // meters
  },
  {
    id: 'gf-2',
    zone_name: 'North Warehouse',
    latitude: HUB_LAT + 0.1,
    longitude: HUB_LNG,
    radius: 2000,
  }
];

export const initialActivityLogs = [
  {
    id: 'al-1',
    truck_id: 't-1002',
    truck_number: 'TRK-1002',
    old_status: 'incoming',
    new_status: 'loading',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    user: 'Warehouse Dept'
  },
  {
    id: 'al-2',
    truck_id: 't-1001',
    truck_number: 'TRK-1001',
    old_status: 'loading',
    new_status: 'outgoing',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    user: 'Admin User'
  }
];

// Helper to simulate truck movements
export const simulateMovements = (getCurrentLocations, updateLocation) => {
  const locations = getCurrentLocations();
  
  Object.keys(locations).forEach(truckId => {
    // Only move a portion of trucks to simulate reality
    if (Math.random() > 0.4) {
      const loc = locations[truckId];
      // Small random drift
      const newLat = loc.lat + generateRandomOffset(0.005);
      const newLng = loc.lng + generateRandomOffset(0.005);
      updateLocation(truckId, newLat, newLng);
    }
  });
};
