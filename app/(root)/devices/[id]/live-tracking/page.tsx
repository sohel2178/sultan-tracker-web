import { auth } from '@/auth';
import GoogleMapComponent from '@/components/map/GoogleMapComponent';
import ROUTES from '@/constants/route';
import { GetRedisDevice } from '@/lib/actions/device.action';
import { redirect } from 'next/navigation';

async function LiveTracking() {
  const id: string = '359015562295878';

  const session = await auth();

  if (!session?.user) return redirect(ROUTES.LOGIN);

  const { success, data: device } = await GetRedisDevice({ _id: id });

  if (!success || !device?.geo) return redirect(ROUTES.DEVICES);

  // console.log(device);
  return (
    <div className="h-[calc(100vh-5rem)] w-full">
      <GoogleMapComponent device={device} />
    </div>
  );
}

export default LiveTracking;
