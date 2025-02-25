import DaillyReport from '@/components/report/DaillyReport';
import { GetRedisDevice } from '@/lib/actions/device.action';
import { notFound } from 'next/navigation';
import React from 'react';

async function AdminDailyReport({ params }: RouteParams) {
  const { id } = await params;

  const { success, data } = await GetRedisDevice({ _id: id });

  if (!(success && data)) return notFound();

  return <DaillyReport device={data} />;
}

export default AdminDailyReport;
