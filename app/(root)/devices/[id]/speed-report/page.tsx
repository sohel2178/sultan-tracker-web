import SpeedReport from '@/components/report/SpeedReport';
import { GetRedisDevice } from '@/lib/actions/device.action';
import { notFound } from 'next/navigation';
import React from 'react';

async function ClientSpeedReport({ params }: RouteParams) {
  const { id } = await params;

  const { success, data } = await GetRedisDevice({ _id: id });

  if (!(success && data)) return notFound();
  return <SpeedReport device={data} />;
}

export default ClientSpeedReport;
