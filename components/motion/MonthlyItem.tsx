'use client';

import React from 'react';
import MonthlyItemWrapper from '../cards/MonthlyItemWrapper';
import { motion } from 'framer-motion';
// import { formatTo12HourTime } from '@/lib/utils';
import dateformat from 'dateformat';
import { formatDuration } from '@/lib/utils';

const Row = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex justify-between w-full  py-1">
      <span>{title}</span>
      <span>{value}</span>
    </div>
  );
};

function MonthlyItem({ item }: { item: MonthlyItem }) {
  return (
    <MonthlyItemWrapper day={item._id.day} distance={item.distance} unit="KM">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        layout
        className="w-full flex flex-col subtle-regular"
      >
        <Row
          title="Start At"
          value={
            item.start_time
              ? dateformat(item.start_time, 'hh:MM TT')
              : 'Undefined'
          }
        />

        <Row
          title="End At"
          value={
            item.end_time ? dateformat(item.end_time, 'hh:MM TT') : 'Undefined'
          }
        />
        <Row
          title="Running Time"
          value={
            item.running_time ? formatDuration(item.running_time) : '0 min'
          }
        />

        <Row
          title="Jam Time"
          value={
            item.congestion_time
              ? formatDuration(item.congestion_time)
              : '0 min'
          }
        />

        <Row
          title="Idle Time"
          value={item.idle_time ? formatDuration(item.idle_time) : '0 min'}
        />

        <Row
          title="Fuel Consumtion"
          value={item.idle_time ? formatDuration(item.idle_time) : '0 min'}
        />
      </motion.div>
    </MonthlyItemWrapper>
  );
}

export default MonthlyItem;
