'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { GetTestDevice } from '@/lib/actions/device.action';

import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import Link from 'next/link';
import ROUTES from '@/constants/route';
import { cn } from '@/lib/utils';
import ClientSearch from '../search/ClientSearch';

function MapDeviceList() {
  const [isOpen, setIsOpen] = useState(false);

  const [devices, setDevices] = useState<Device[]>([]);
  const [filterDevice, setFilterDevices] = useState<Device[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { success, data } = await GetTestDevice(); // Call the Server Action

      if (success && data) {
        setDevices(data);
        setFilterDevices(data);
      }

      // Load only 10 items for demo
    }

    fetchData();
  }, []);

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const device = filterDevice[index];

    return (
      <Link href={ROUTES.LIVE_TRACKING(device._id)} style={style}>
        <div className="px-4 py-1">
          <div
            className={cn(
              'flex flex-col justify-between bg-red-300 px-4 py-1 rounded-md',
              index % 2 === 0
                ? 'background-light700_dark400'
                : 'background-light800_dark300'
            )}
            //   style={style}
          >
            <p>{device.id}</p>
            <p>{device.registrationNumber}</p>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <motion.div
      initial={{ y: '80%' }} // Start off-screen
      animate={{ y: isOpen ? 0 : '80%' }} // Slide up when open
      exit={{ y: '80%' }} // Slide down when closed
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      className="max-sm:hidden background-light900_dark200 text-dark500_light700 flex flex-col h-[50%] absolute left-0 bottom-0 md:w-1/2 lg:w-1/3 xl:w-1/4"
    >
      <div className="flex justify-between items-center px-6 py-4 h-[20%]">
        <ClientSearch
          imgSrc="/icons/search.svg"
          data={devices}
          callback={setFilterDevices}
          placeholder="Search by Id or Reg"
          fields={['id', 'registrationNumber']}
        />
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
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
        {filterDevice.length > 0 && (
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                itemCount={filterDevice.length}
                itemSize={60}
                width={width}
              >
                {Row}
              </List>
            )}
          </AutoSizer>
        )}
      </div>
    </motion.div>
  );
}

export default MapDeviceList;
