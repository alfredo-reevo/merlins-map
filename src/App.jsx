// src/App.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Crucial: imports the map styles
import { memories } from './memories'; // Import the data file you just made
import './App.css';

// Helper function to turn emojis into map markers
const createIcon = (emoji) => {
  return new L.DivIcon({
    className: 'custom-marker', // We style this in App.css to remove borders
    html: `<div style="font-size: 2rem; line-height: 1;">${emoji}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30] // Centers the emoji on the specific lat/long
  });
};

function App() {
  // Center the map roughly between points (UK Centric)
  const centerPosition = [52.5, -1.5]; 

  // Create an array of coordinates for the "connecting line"
  const routePath = memories.map(memory => memory.position);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <MapContainer 
        center={centerPosition} 
        zoom={6} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
      >
        {/* 1. The Visual Map Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* 2. The Dotted Line connecting you */}
        <Polyline 
            positions={routePath} 
            pathOptions={{ color: 'red', dashArray: '10, 10', weight: 2, opacity: 0.5 }} 
        />

        {/* 3. The Markers */}
        {memories.map((mem) => (
          <Marker 
            key={mem.id} 
            position={mem.position} 
            icon={createIcon(mem.emoji)}
          >
            <Popup>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{mem.title}</h3>
                <small style={{ color: '#666' }}>{mem.date}</small>
                <p style={{ margin: '10px 0 0 0' }}>{mem.desc}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;