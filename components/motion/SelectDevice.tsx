'use client';

import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/context/UserProvider';
import { Button } from '../ui/button';
import { CardWrapper } from '../cards/CardWrapper';

function SelectDevice() {
  const [visible, setVisible] = useState(false);

  const { devices } = useUser();
  return (
    <div className="flex background-light850_dark100 w-full flex-col gap-4 items-start absolute">
      <div className="flex w-full justify-between">
        <Button
          className="ml-4"
          variant="outline"
          onClick={() => setVisible(!visible)}
        >
          Select Device
        </Button>

        <Button
          className="mr-4"
          variant="outline"
          onClick={() => setVisible(!visible)}
        >
          Select Date
        </Button>
      </div>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="ml-4"
          >
            <CardWrapper
              title="Select Device"
              description="Please Select a device to show Daily Report"
            >
              {devices.map((x) => (
                <div
                  key={x._id}
                  className="p-4 border rounded-md flex w-full flex-col gap-2 mt-2"
                >
                  <p>{x.id}</p>
                  <p>{x.registration_number}</p>
                </div>
              ))}
            </CardWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SelectDevice;
