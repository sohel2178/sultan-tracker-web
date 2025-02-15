import { auth } from '@/auth';
import ClientDevices from '@/components/ClientDevices';
// import ClientSearch from '@/components/search/ClientSearch';
import ROUTES from '@/constants/route';
import { GetUserDevices } from '@/lib/actions/device.action';
import { redirect } from 'next/navigation';
import React from 'react';

async function Devices() {
  const session = await auth();

  if (!session?.user) return redirect(ROUTES.LOGIN);

  const { success, data, error } = await GetUserDevices({
    _id: session.user.id,
  });

  if (!data) return;

  // console.log(data);
  return <ClientDevices devices={data} success={success} error={error} />;
}

export default Devices;
