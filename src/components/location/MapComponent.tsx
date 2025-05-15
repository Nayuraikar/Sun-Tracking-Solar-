import React, { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents
} from 'react-leaflet';
import { useWeather } from '../../contexts/WeatherContext';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';

import { icon } from 'leaflet';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';

// Fix Leaflet's default marker issue in React
const defaultIcon = icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Component to handle click and place marker
const LocationMarker: React.FC = () => {
  const { location, setLocation } = useWeather();

  const map = useMapEvents({
    click(e) {
      setLocation({
        lat: e.latlng.lat,
        lon: e.latlng.lng
      });
    }
  });

  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lon], map.getZoom());
    }
  }, [location, map]);

  return location ? (
    <Marker position={[location.lat, location.lon]} icon={defaultIcon} />
  ) : null;
};

// Component to add geocoder search bar
const GeocoderControl: React.FC = () => {
  const map = useMap();
  const { setLocation } = useWeather();

  useEffect(() => {
    const geocoder = (L.Control as any).Geocoder.nominatim();

    const control = (L.Control as any).geocoder({
      defaultMarkGeocode: false,
      geocoder: geocoder,
      placeholder: 'Search location...',
      showResultIcons: true
    })
      .on('markgeocode', (e: any) => {
        const center = e.geocode.center;
        map.setView(center, 13);

        setLocation({
          lat: center.lat,
          lon: center.lng
        });
      })
      .addTo(map);

    return () => {
      map.removeControl(control);
    };
  }, [map, setLocation]);

  return null;
};

const MapComponent: React.FC = () => {
  const { location } = useWeather();

  const defaultPosition: [number, number] = location
    ? [location.lat, location.lon]
    : [28.6139, 77.2090]; // Default: New Delhi

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
      <GeocoderControl />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapComponent;
