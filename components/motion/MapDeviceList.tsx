'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import {
  GetAdminPopDevices,
  GetUserPopDevices,
} from '@/lib/actions/device.action';

import ClientSearch from '../search/ClientSearch';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import DeviceRecyclerView from '../popover/DeviceRecyclerView';

interface Props {
  device: PopDevice | RedisDevice;
}

const MapDeviceList = ({ device }: Props) => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const [state, setState] = useState<{
    isOpen: boolean;
    devices: PopDevice[];
    renderDevices: PopDevice[];
  }>({
    isOpen: false,
    devices: [],
    renderDevices: [],
  });

  const setRenderDevices = (devices: PopDevice[]) => {
    if (devices.length > 0) {
      setState((old) => ({
        ...old, // Spread previous state to keep all properties
        renderDevices: devices, // Ensure response.data is an array
      }));
    }
  };

  useEffect(() => {
    const fetchDevices = async () => {
      let data: PopDevice[] = [];

      if (session?.user.accountType === 'Admin' && pathname.includes('admin')) {
        const response = await GetAdminPopDevices({ _id: session.user.id });
        if (response.success && response.data) {
          console.log(response.data, 'Hello ......Admin');
          data = response.data;
        }
      } else if (session?.user) {
        const response = await GetUserPopDevices({ _id: session.user.id });
        if (response.success && response.data) {
          console.log(response.data, 'Hello ......Client');
          data = response.data;
        }
      }

      // Single state update
      setState((old) => ({
        ...old,
        devices: data.length ? [...data] : old.devices,
        renderDevices: data.length ? [...data] : old.renderDevices,
      }));
    };

    fetchDevices();
  }, []);

  return (
    <motion.div
      initial={{ y: '80%' }} // Start off-screen
      animate={{ y: state.isOpen ? 0 : '80%' }} // Slide up when open
      exit={{ y: '80%' }} // Slide down when closed
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      className="max-sm:hidden background-light900_dark200 text-dark500_light700  flex flex-col h-[50%] absolute left-0 bottom-0 md:w-1/2 lg:w-1/3 xl:w-1/4"
    >
      <div className="flex gap-2 items-center px-6 py-4 h-[20%]">
        <ClientSearch
          imgSrc="/icons/search.svg"
          data={state.devices}
          callback={setRenderDevices}
          placeholder="Search by Id or Reg"
          fields={['id', 'registration_number']}
        />
        <Button
          variant="outline"
          onClick={() => setState((old) => ({ ...old, isOpen: !old.isOpen }))}
        >
          {state.isOpen ? (
            <FaChevronDown className="text-2xl" />
          ) : (
            <FaChevronUp className="text-2xl" />
          )}
        </Button>
      </div>

      <div
        className="w-full mx-5 bg-orange-200 h-[1px]"
        style={{ width: 'calc(100% - 2rem)' }}
      ></div>

      <div className="flex flex-1">
        <DeviceRecyclerView
          items={state.renderDevices}
          selectedDevice={device}
          pathname={pathname}
        />
      </div>
    </motion.div>
  );
};

export default MapDeviceList;
