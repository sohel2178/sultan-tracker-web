import DailyReportInfoCard from '@/components/cards/DailyReportInfoCard';
import SelectClientDevicePopOver from '@/components/popover/SelectClientDevicePopOver';
import { GetDailyReport } from '@/lib/actions/location.action';
import React from 'react';
import DailyReportDate from '@/components/popover/DailyReportDate';
import TripReport from '@/components/motion/TripReport';
import HourlyReport from '@/components/motion/HourlyReport';

async function ClientDailyReport({ params, searchParams }: RouteParams) {
  const date = new Date();
  const { id } = await params;
  const { year, month, day } = await searchParams;

  const y = year ? Number(year) : date.getFullYear();
  const m = month ? Number(month) : date.getMonth();
  const d = day ? Number(day) : date.getDate();

  console.log(y, m, d);

  const calDate = new Date(y, m, d);

  const { data } = await GetDailyReport({
    id: '359015560323896',
    year: y,
    month: m,
    day: d,
  });

  return (
    <div className="flex w-full h-full flex-col relative">
      <div className="w-full flex flex-col sticky top-20 left-0 right-0 background-light900_dark200">
        <div className="flex  w-full justify-between p-4 gap-2">
          <DailyReportInfoCard
            title="Total Distance"
            value={data?.total_distance || 0}
            unit="Km"
          />

          <DailyReportInfoCard
            title="Total Distance"
            value={data?.total_distance || 0}
            unit="Km"
          />

          <DailyReportInfoCard
            title="Total Distance"
            value={data?.total_distance || 0}
            unit="Km"
          />
        </div>
        <div className="flex mx-4 justify-between items-center">
          <SelectClientDevicePopOver _id={id} />
          <DailyReportDate initialDate={calDate} />
        </div>
      </div>

      <div className="w-full p-4 flex flex-col gap-8 ">
        <div className="w-full flex flex-col gap-8 lg:flex-row lg:justify-between">
          <div className="w-full">
            {/* <TripReport/> */}
            {data?.trip_report && <TripReport trips={data?.trip_report} />}
          </div>
          <div className="w-full">
            {data?.hourly_report && (
              <HourlyReport hourly={data.hourly_report} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDailyReport;
