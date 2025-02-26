'use client';

import { GetSpeedReport } from '@/lib/actions/location.action';
import { createMonthlyReportBody } from '@/lib/utils';
import React, { useEffect, useState, useTransition } from 'react';
import DevicePopOver from '../popover/DevicePopOver';
import DailyReportDate from '../popover/DailyReportDate';
import FrequencyChart from '../chart/FrequencyChart';
import TimeLineChart from '../chart/TimeLineChart';
import DailyReportInfoCard from '../cards/DailyReportInfoCard';
import { ReloadIcon } from '@radix-ui/react-icons';

const Info = ({ speedReport }: { speedReport: DailySpeedReport }) => {
  return (
    <div className="flex  w-full justify-between">
      <DailyReportInfoCard
        title="Max Speed"
        value={speedReport?.info?.max || 0}
        unit="Km/hr"
      />

      <DailyReportInfoCard
        title="Avg Speed"
        value={speedReport?.info?.avg || 0}
        unit="Km/hr"
      />

      <DailyReportInfoCard
        title="Min Speed"
        value={speedReport?.info?.min || 0}
        unit="Km/hr"
      />
    </div>
  );
};

function SpeedReport({ device }: { device: RedisDevice }) {
  const [isPending, startTransition] = useTransition();
  const [date, setDate] = useState(new Date());

  const [speedReport, setSpeedReport] = useState<DailySpeedReport>({});

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      startTransition(() => {
        const body = createMonthlyReportBody(date, device);
        body.id = '359015560323896';

        GetSpeedReport(body)
          .then((response) => {
            // console.log(response);
            if (response.success && response.data) {
              console.log(response.data);
              //   setDailyData(response.data);
              setSpeedReport(response.data);
            }
          })
          .catch((err) => console.log(err));
      });
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [device, date]);
  return (
    <div className="w-full flex flex-col  p-4">
      <div className="w-full flex flex-col gap-4 sticky top-20 left-0 right-0 background-light900_dark200 pb-4 z-10">
        <Info speedReport={speedReport} />
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
          <div className="w-full gap-4 flex flex-col z-0 lg:flex-row lg:justify-between">
            <FrequencyChart data={speedReport?.frequency || []} />
            <TimeLineChart data={speedReport?.data || []} />
          </div>
        )}
      </div>
    </div>
  );
}

export default SpeedReport;
