'use client';

import React, { useState } from 'react';
import ClientSearch from './search/ClientSearch';
import DataRenderer from './DataRenderer';
import { DEFAULT_CLIENT_DEVICE } from '@/constants/states';
import ClientDeviceCard from './cards/ClientDeviceCard';
import { useUser } from '@/context/UserProvider';

function ClientDevices() {
  const { devices } = useUser();
  const [filterDevices, setFilterDevice] = useState(devices);
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
          success={true}
          error={undefined}
          data={filterDevices}
          empty={DEFAULT_CLIENT_DEVICE}
          render={(devices) => (
            <div className="mt-10 grid w-full grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2 xl:grid-cols-3">
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
