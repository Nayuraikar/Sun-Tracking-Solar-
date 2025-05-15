import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useWeather } from '../../contexts/WeatherContext';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';

// Fix for default marker icon in React Leaflet
const defaultIcon = icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const LocationMarker: React.FC = () => {
  const { location, setLocation } = useWeather();

  const map = useMapEvents({
    click(e) {
      setLocation({
        lat: e.latlng.lat,
        lon: e.latlng.lng
      });
    },
  });

  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lon], map.getZoom());
    }
  }, [location, map]);

  return location ? (
    <Marker 
      position={[location.lat, location.lon]} 
      icon={defaultIcon}
    />
  ) : null;
};

const MapComponent: React.FC = () => {
  const { location } = useWeather();
  const defaultPosition: [number, number] = location 
    ? [location.lat, location.lon] 
    : [28.6139, 77.2090]; // Default to New Delhi if no location

  return (
    <MapContainer 
      center={defaultPosition} 
      zoom={13} 
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapComponent;