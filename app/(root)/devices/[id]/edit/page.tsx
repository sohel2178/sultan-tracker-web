import { auth } from '@/auth';
import ClientDeviceForm from '@/components/forms/ClientDeviceForm';
import ROUTES from '@/constants/route';
import { GetDevicebyId } from '@/lib/actions/device.action';
import { notFound, redirect } from 'next/navigation';
import React from 'react';

async function EditDeviceClient({ params }: RouteParams) {
  const { id } = await params;

  if (!id) return notFound();

  const session = await auth();

  if (!session) {
    redirect(ROUTES.LOGIN);
  }

  const { data: device, success } = await GetDevicebyId({ _id: id });

  if (!success) return notFound();

  return (
    <div className="p-8">
      <ClientDeviceForm device={device} isEdit />
    </div>
  );
}

export default EditDeviceClient;
