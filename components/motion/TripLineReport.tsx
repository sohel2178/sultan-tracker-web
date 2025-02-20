'use client';

import { cn, findMinDuration } from '@/lib/utils';
import React from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Props {
  trips: Trip[];
}

function TripLineReport({ trips }: Props) {
  // const actual_trip = [...trips].filter((x) => x.duration > 0);
  //   console.log(actual_trip);

  const modifiedTrip = [...trips];

  const total = trips.reduce((acc, trip) => acc + trip.duration, 0);

  if (total < 86400) {
    modifiedTrip.push({
      status: 'OFF',
      duration: 86400 - total,
      start: '',
      end: '',
      distance: 0,
    });
  }

  // console.log(total);

  // const minDuration = findMinDuration(actual_trip) || 1;

  // console.log(minDuration);
  const TripLine = ({ trip }: { trip: Trip }) => {
    // console.log(((trip.duration * 100) / 86400).toFixed(0));
    // return (
    //   <div
    //     className={cn(
    //       `flex-[${Math.ceil(trip.duration / minDuration)}]  h-full`,
    //       trip.status === 'OFF' ? 'bg-red-500' : 'bg-green-500'
    //     )}
    //   ></div>
    // );

    const width = Math.ceil(trip.duration / 864) + '%';

    // console.log(width);

    return (
      <Popover>
        <PopoverTrigger asChild>
          <div
            className="h-full cursor-pointer"
            style={{
              width: width,
              backgroundColor: trip.status === 'OFF' ? 'red' : 'green',
            }}
          ></div>
        </PopoverTrigger>

        <PopoverContent
          className="w-auto p-0 background-light900_dark200 light-border"
          align="end"
        >
          <div className="flex justify-center items-center p-4">
            <p>{`start at ${trip.start} and end at ${trip.end} distance travel in that time is ${trip.distance}`}</p>
          </div>
        </PopoverContent>
      </Popover>
    );
  };
  return (
    <div className="w-full flex bg-gray-600 h-[40px] p-[1px] max-sm:hidden">
      {modifiedTrip.map((x, i) => (
        <TripLine key={i} trip={x} />
      ))}
    </div>
  );
}

export default TripLineReport;
