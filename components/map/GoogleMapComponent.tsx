'use client';

import { GoogleMap, TrafficLayer, useLoadScript } from '@react-google-maps/api';
import React from 'react';

import LocationMarker from './LocationMarker';

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

  // const [currentDevice, setCurrentDevice] = useState(device);
  // const [carPosition, setCarPosition] = useState({
  //   lat: device.geo.lat,
  //   lng: device.geo.lng,
  // });

  // useEffect(() => {
  //   // Listen for real-time car location updates from Firebase
  //   const carRef = ref(database, `devices/${device.id}/geo`);
  //   onValue(carRef, (snapshot) => {
  //     if (snapshot.exists()) {
  //       // setCarPosition(snapshot.val());

  //       const val = snapshot.val();

  //       if (val.geo) {
  //         setCarPosition(val.geo);
  //       }

  //       console.log(snapshot.val());
  //     }
  //   });
  // }, [device]);

  if (!isLoaded) return <p>Loading Map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={{ lat: device.geo.lat, lng: device.geo.lng }}
      zoom={14}
    >
      <LocationMarker device={device} />

      <TrafficLayer />
    </GoogleMap>
  );
}

export default GoogleMapComponent;
