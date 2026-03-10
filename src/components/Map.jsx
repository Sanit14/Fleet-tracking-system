import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useStore from '../store/useStore';

// Fix generic icon issues with react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom truck icon generator based on status
const createTruckIcon = (status) => {
  const colors = {
    loading: '#fbbf24',    // Warning
    unloading: '#fb923c',  // Orange
    incoming: '#818cf8',   // Indigo
    outgoing: '#34d399',   // Emerald
    idle: '#94a3b8',       // Slate
    service: '#f87171'     // Red
  };
  
  const color = colors[status] || '#3b82f6';

  return L.divIcon({
    className: 'custom-truck-icon',
    html: `<div style="
      background-color: ${color}; 
      width: 24px; height: 24px; 
      border-radius: 50%; 
      border: 3px solid white;
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
      display: flex; align-items: center; justify-content: center;
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if(center) {
       map.setView(center, zoom || map.getZoom());
    }
  }, [center, zoom, map]);
  return null;
};

// Props:
// trucks: Array of truck objects to display
// center: [lat, lng] array
// zoom: number
// showGeofences: boolean
const Map = ({ 
  trucks = [], 
  center = [32.7767, -96.7970], 
  zoom = 10,
  showGeofences = false
}) => {
  const locations = useStore(state => state.locations);
  const geofences = useStore(state => state.geofences);

  return (
    <div className="h-full w-full rounded-md overflow-hidden relative" style={{ zIndex: 1 }}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        <MapUpdater center={center} zoom={zoom} />

        {showGeofences && geofences.map(gf => (
          <Circle 
            key={gf.id}
            center={[gf.latitude, gf.longitude]}
            radius={gf.radius}
            pathOptions={{ color: 'var(--accent-primary)', fillColor: 'var(--accent-primary)', fillOpacity: 0.1 }}
          >
            <Popup className="glass">
              <strong>{gf.zone_name}</strong><br/>
              Radius: {gf.radius}m
            </Popup>
          </Circle>
        ))}

        {trucks.map(truck => {
          const loc = locations[truck.id];
          if (!loc) return null;
          
          return (
            <Marker 
              key={truck.id} 
              position={[loc.lat, loc.lng]}
              icon={createTruckIcon(truck.status)}
            >
              <Popup>
                <div className="flex flex-col gap-1 min-w-[150px]">
                  <strong className="text-lg">{truck.truck_number}</strong>
                  <span className={`badge status-${truck.status} w-max mt-1 mb-2`}>{truck.status}</span>
                  <div className="text-sm flex justify-between">
                     <span className="text-muted">Driver:</span>
                     <span>{truck.driver_name}</span>
                  </div>
                  <div className="text-sm flex justify-between">
                     <span className="text-muted">Speed:</span>
                     <span>{Math.floor(Math.random() * 65)} mph</span>
                  </div>
                  <a href={`/trucks/${truck.id}`} className="text-accent-primary mt-2 flex justify-end text-sm font-semibold hover:underline" style={{ color: 'var(--accent-primary)' }}>
                    View Details →
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
