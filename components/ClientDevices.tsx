'use client';

import React, { useEffect, useState } from 'react';
import ClientSearch from './search/ClientSearch';
import DataRenderer from './DataRenderer';
import { DEFAULT_EMPTY } from '@/constants/states';
import ClientDeviceCard from './cards/ClientDeviceCard';
import { useUser } from '@/context/UserProvider';

// interface Props {
//   devices: RedisDevice[];
//   success: boolean;

//   error:
//     | { message: string; details?: Record<string, string[]> | undefined }
//     | undefined;
// }

function ClientDevices() {
  const { devices, getDevices, error, success } = useUser();
  const [filterDevices, setFilterDevice] = useState(devices);

  useEffect(() => {
    if (devices.length === 0) {
      getDevices();
    }
  }, []);
  return (
    <div className="w-full h-full p-4">
      <ClientSearch
        data={devices}
        callback={setFilterDevice}
        imgSrc="/icons/search.svg"
        placeholder="Search Device by id name"
        fields={['device_sim_number', 'id', 'registration_number']}
      />

      <section className="mt-6">
        <DataRenderer
          success={success}
          error={error}
          data={filterDevices}
          empty={DEFAULT_EMPTY}
          render={(devices) => (
            <div className="mt-10 flex w-full flex-wrap gap-4 overflow-y-auto">
              {devices.map((device) => (
                <ClientDeviceCard device={device} key={device._id} />
              ))}
            </div>
          )}
        />
      </section>
    </div>
  );
}

export default ClientDevices;
