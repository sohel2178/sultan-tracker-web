'use client';

import { GoogleMap, TrafficLayer, useLoadScript } from '@react-google-maps/api';
import React from 'react';

import LocationMarker from './LocationMarker';
import MapDeviceList from '../motion/MapDeviceList';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

interface Props {
  device: RedisDevice;
}

function GoogleMapComponent({ device }: Props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  if (!isLoaded) return <p>Loading Map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={{ lat: device.geo.lat, lng: device.geo.lng }}
      zoom={14}
    >
      <LocationMarker device={device} />

      <MapDeviceList device={device} />

      <TrafficLayer />
    </GoogleMap>
  );
}

export default GoogleMapComponent;
