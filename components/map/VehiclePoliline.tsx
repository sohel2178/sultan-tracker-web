'use client';

import React from 'react';
import { Polyline } from '@react-google-maps/api';

interface MyPolylineProps {
  locations: Geo[];
}

const VehiclePoliline: React.FC<MyPolylineProps> = ({ locations }) => {
  const options = {
    strokeColor: '#000000',
    strokeOpacity: 0.8,
    strokeWeight: 4,
    fillColor: '#555555',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1,
  };
  const getPath = (): Geo[] => {
    return locations.map((x) => ({ lat: x.lat, lng: x.lng }));
  };

  return <Polyline path={getPath()} options={options} />;
};

export default VehiclePoliline;
