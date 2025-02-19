'use client';

import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useUser } from '@/context/UserProvider';
import { Button } from '../ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery } from '@/lib/url';

function SelectClientDevicePopOver({ _id }: { _id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { devices } = useUser();

  const handleClick = (dev: RedisDevice) => {
    if (dev._id === _id) return;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'deviceId',
      value: dev.id,
    }).replace(_id, dev._id);

    router.push(newUrl, { scroll: false });

    // console.log(newUrl);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Select vehicle</Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="background-light900_dark200 light-border w-[300px]"
      >
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="flex flex-col gap-2"
          >
            {devices.map((x) => (
              <div
                key={x._id}
                className={cn(
                  'p-4 border rounded-md flex w-full flex-col gap-2 cursor-pointer',
                  x._id === _id
                    ? 'background-light700_dark300'
                    : 'background-light900_dark200'
                )}
                onClick={() => handleClick(x)}
              >
                <p>{x.id}</p>
                <p>{x.registration_number}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </PopoverContent>
    </Popover>
  );
}

export default SelectClientDevicePopOver;
