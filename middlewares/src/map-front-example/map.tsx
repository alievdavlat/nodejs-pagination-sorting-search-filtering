import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

interface Store {
  id: number;
  name: string;
  ip: string;
  latitude: number;
  longitude: number;
}

const Map: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    axios.get('/api/stores')
      .then(response => {
        setStores(response.data);
      })
      .catch(error => {
        console.error('Error fetching store data:', error);
      });
  }, []);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {stores.map(store => (
        <Marker key={store.id} position={[store.latitude, store.longitude]}>
          <Popup>
            {store.name} <br /> {store.ip}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
