import { notFound } from 'next/navigation';
import { GetRedisDevice } from '@/lib/actions/device.action';
import DaillyReport from '@/components/report/DaillyReport';

async function ClientDailyReport({ params }: RouteParams) {
  const { id } = await params;

  const { success, data } = await GetRedisDevice({ _id: id });

  if (!(success && data)) return notFound();

  return <DaillyReport device={data} />;
}

export default ClientDailyReport;
