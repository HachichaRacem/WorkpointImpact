import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { DatePicker, SelectPicker } from 'rsuite';
const Map = () => {
  const data = ['Member X', 'Member Y', 'Member Z'].map(item => ({ label: item, value: item }));
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <DatePicker
          format="MMM dd, yyyy"
          size="md"
          style={{ width: 200 }}
          placeholder="Select date"
        />
        <SelectPicker
          placeholder="Select member"
          size="md"
          defaultValue="Member X"
          data={data}
          style={{ width: 180, paddingLeft: 20, paddingTop: 3 }}
        />
      </div>
      <div style={{ paddingTop: 20 }}>
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};
export default Map;
