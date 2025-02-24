'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Button } from '../ui/button';
import {
  createMonthlyReportBody,
  formatDuration,
  formatMonthlyDate,
  getFuelConsumption,
  getMonthlyDataInfo,
} from '@/lib/utils';
import DevicePopOver from '../popover/DevicePopOver';
import { GetMonthlyReport } from '@/lib/actions/location.action';
import DailyReportInfoCard from '../cards/DailyReportInfoCard';
import MonthlyItem from '../motion/MonthlyItem';
import { ReloadIcon } from '@radix-ui/react-icons';

interface Props {
  device: RedisDevice;
}

interface MonthSelectorProps {
  date: Date;
  setDate: (date: Date) => void;
}

const Info = ({
  monthlyData,
  device,
}: {
  monthlyData: MonthlyItem[];
  device: RedisDevice;
}) => {
  const info = getMonthlyDataInfo(monthlyData);

  return (
    <div className="flex justify-between w-full">
      <DailyReportInfoCard
        title="Total Distance"
        value={(info.totalDistance / 1000).toFixed(2)}
        unit="km"
      />
      <DailyReportInfoCard
        title="Running Time"
        value={formatDuration(info.totalRunningTime)}
      />
      {device.mileage !== undefined && device.mileage > 0 && (
        <DailyReportInfoCard
          title="Fuel Consume"
          value={getFuelConsumption(
            info.totalDistance,
            device.mileage,
            device.congestion_consumption,
            info.totalCongestionTime
          )}
          unit="Lit"
        />
      )}
    </div>
  );
};

const MonthSelector = ({ date, setDate }: MonthSelectorProps) => {
  const handleNextClick = () => {
    const d = new Date(date);
    d.setMonth(d.getMonth() + 1);
    setDate(d);
  };

  const handlePrevClick = () => {
    const d = new Date(date);
    d.setMonth(d.getMonth() - 1);
    setDate(d);
  };
  return (
    <div className="flex gap-3 items-center">
      <Button onClick={handlePrevClick} variant="outline">
        <FaChevronLeft className="text-xl sm:text-2xl" />
      </Button>

      <span className="subtle-regular">{formatMonthlyDate(date)}</span>

      <Button onClick={handleNextClick} variant="outline">
        <FaChevronRight className="text-xl sm:text-2xl" />
      </Button>
    </div>
  );
};

function MonthlyReport({ device }: Props) {
  const [isPending, startTransition] = useTransition();
  const [date, setDate] = useState(new Date());
  const [monthlyData, setMonthlyData] = useState<MonthlyItem[]>([]);

  console.log(device, 'device');

  // device.congestion_consumption

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      startTransition(() => {
        const body = createMonthlyReportBody(date, device);
        body.id = '359015560323896';

        GetMonthlyReport(body)
          .then((response) => {
            // console.log(response);
            if (response.success && response.data) {
              console.log(response.data);
              setMonthlyData(response.data);
            }
          })
          .catch((err) => console.log(err));
      });
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [device, date]);
  return (
    <div className="w-full flex flex-col  p-4">
      <div className="w-full flex flex-col gap-4 sticky top-20 left-0 right-0 background-light900_dark200 pb-4">
        <Info device={device} monthlyData={monthlyData} />

        <div className="flex justify-between gap-2 items-center">
          <MonthSelector date={date} setDate={setDate} />
          <DevicePopOver selectedDevice={device} />
        </div>
      </div>

      <div className="w-full mt-4">
        {isPending ? (
          <div className="flex justify-center">
            <ReloadIcon className="mt-10 size-16 animate-spin" />
          </div>
        ) : (
          <div className="flex w-full flex-wrap gap-4 xl:gap-8">
            {monthlyData.map((x) => (
              <MonthlyItem key={x._id.day} item={x} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MonthlyReport;
