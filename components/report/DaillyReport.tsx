'use client';
import React, { useEffect, useState, useTransition } from 'react';
import DevicePopOver from '../popover/DevicePopOver';
import DailyReportDate from '../popover/DailyReportDate';
import { GetDailyReport } from '@/lib/actions/location.action';
import {
  createMonthlyReportBody,
  formatDuration,
  getFuelConsumption,
} from '@/lib/utils';
import DailyReportInfoCard from '../cards/DailyReportInfoCard';
import { ReloadIcon } from '@radix-ui/react-icons';
import TripLineReport from '../motion/TripLineReport';
import TripReport from '../motion/TripReport';
import HourlyReport from '../motion/HourlyReport';

const Info = ({
  dailyData,
  device,
}: {
  dailyData: DailyReport;
  device: RedisDevice;
}) => {
  return (
    <div className="flex  w-full justify-between">
      <DailyReportInfoCard
        title="Total Distance"
        value={dailyData?.total_distance || 0}
        unit="Km"
      />

      <DailyReportInfoCard
        title="Running Time"
        value={
          dailyData?.running_time
            ? formatDuration(dailyData.running_time)
            : 'O min'
        }
      />

      {device.mileage !== undefined && device.mileage > 0 && (
        <DailyReportInfoCard
          title="Fuel Consume"
          value={getFuelConsumption(
            dailyData.total_distance ? dailyData.total_distance * 1000 : 0,
            device.mileage,
            device.congestion_consumption,
            dailyData.congestion_time
          )}
          unit="Lit"
        />
      )}
    </div>
  );
};

function DaillyReport({ device }: { device: RedisDevice }) {
  const [isPending, startTransition] = useTransition();
  const [date, setDate] = useState(new Date());
  const [dailyData, setDailyData] = useState<DailyReport>({});

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      startTransition(() => {
        const body = createMonthlyReportBody(date, device);
        body.id = '359015560323896';

        GetDailyReport(body)
          .then((response) => {
            console.log(response);
            if (response.success && response.data) {
              console.log(response.data);
              setDailyData(response.data);
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
        <Info dailyData={dailyData} device={device} />
        <div className="flex justify-between gap-2 items-center">
          <DevicePopOver selectedDevice={device} />
          <DailyReportDate date={date} setDate={setDate} />
        </div>
      </div>

      <div className="w-full mt-4">
        {isPending ? (
          <div className="flex justify-center">
            <ReloadIcon className="mt-10 size-16 animate-spin" />
          </div>
        ) : (
          <div className="w-full flex flex-col gap-8 ">
            {dailyData?.trip_report && (
              <TripLineReport trips={dailyData?.trip_report} />
            )}
            <div className="w-full flex flex-col gap-8 lg:flex-row lg:justify-between">
              <div className="w-full">
                {dailyData?.trip_report && (
                  <TripReport trips={dailyData?.trip_report} />
                )}
              </div>
              <div className="w-full">
                {dailyData?.hourly_report && (
                  <HourlyReport hourly={dailyData.hourly_report} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DaillyReport;
