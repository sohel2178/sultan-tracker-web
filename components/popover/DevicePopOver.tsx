'use client';

import React, { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { useSession } from 'next-auth/react';

import { FixedSizeList as List, ListChildComponentProps } from 'react-window';

// import { devices as data } from '@/constants/devices';
import ClientSearch from '../search/ClientSearch';
import { cn } from '@/lib/utils';
import {
  GetAdminPopDevices,
  GetUserPopDevices,
} from '@/lib/actions/device.action';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface RecyclerViewProps {
  items: RedisDevice[] | PopDevice[];
  selectedDevice: RedisDevice | PopDevice;
}

interface DevicePopOverProps {
  selectedDevice: RedisDevice;
}

const RecyclerView: React.FC<RecyclerViewProps> = ({
  items,
  selectedDevice,
}) => {
  const pathname = usePathname();
  // console.log(pathname);
  const Row = ({ index, style }: ListChildComponentProps) => (
    <div
      style={style}
      className={cn('flex w-full p-1 background-light900_dark200')}
    >
      <Link
        href={pathname.replace(selectedDevice._id, items[index]._id)}
        className="w-full"
      >
        <div
          className={cn(
            'flex border rounded-md w-full h-full flex-col px-4 cursor-pointer',
            items[index].id === selectedDevice.id
              ? 'bg-primary-500'
              : 'background-light900_dark200'
          )}
          // onClick={() => setSelectedDevice(items[index])}
        >
          <span>{items[index].registration_number}</span>
          <span className="subtle-regular">{items[index].id}</span>
        </div>
      </Link>
    </div>
  );

  return (
    <List height={400} itemCount={items.length} itemSize={50} width="100%">
      {Row}
    </List>
  );
};

function DevicePopOver({ selectedDevice }: DevicePopOverProps) {
  const { data: session } = useSession();
  const pathname = usePathname();

  //   const deviceData: PopDevice[] = [];

  const [devices, setDevices] = useState<RedisDevice[] | PopDevice[]>([]);
  const [filterDevices, setfilterDevices] = useState<
    RedisDevice[] | PopDevice[]
  >([]);

  useEffect(() => {
    if (session?.user.accountType === 'Admin' && pathname.includes('admin')) {
      GetAdminPopDevices({ _id: session.user.id })
        .then((response) => {
          if (response.success && response.data) {
            // deviceData.push(...data);
            setDevices(response.data);
            setfilterDevices(response.data);
          }
        })
        .catch((err) => console.log(err));
    } else if (session?.user) {
      GetUserPopDevices({ _id: session.user.id })
        .then((response) => {
          if (response.success && response.data) {
            // deviceData.push(...data);
            setDevices(response.data);
            setfilterDevices(response.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  // console.log(session?.user);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">{selectedDevice.registration_number}</Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="background-light900_dark200 light-border w-[300px]"
      >
        <div className="flex w-full flex-col gap-2">
          <ClientSearch
            imgSrc="/icons/search.svg"
            callback={setfilterDevices}
            data={devices}
            placeholder="search device"
            fields={['id', 'registration_number']}
          />
          <RecyclerView items={filterDevices} selectedDevice={selectedDevice} />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default DevicePopOver;
