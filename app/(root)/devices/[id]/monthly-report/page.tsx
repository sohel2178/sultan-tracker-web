import MonthlyReport from '@/components/report/MonthlyReport';
import { GetRedisDevice } from '@/lib/actions/device.action';
import { notFound } from 'next/navigation';
import React from 'react';

async function ClientMonthlyReportPage({ params }: RouteParams) {
  // const date = new Date();
  const { id } = await params;
  // const { year, month } = await searchParams;

  // const y = year ? Number(year) : date.getFullYear();
  // const m = month ? Number(month) : date.getMonth();

  // const { data } = await GetMonthlyReport({
  //   id: '359015560323896',
  //   month: m,
  //   year: y,
  // });

  const { success, data } = await GetRedisDevice({ _id: id });

  // console.log(data);

  if (!(success && data)) return notFound();

  // console.log(data);
  return <MonthlyReport device={data} />;
}

export default ClientMonthlyReportPage;
