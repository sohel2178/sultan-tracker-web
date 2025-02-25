import GoogleMapComponent from '@/components/map/GoogleMapComponent';
import ROUTES from '@/constants/route';
import { GetRedisDevice } from '@/lib/actions/device.action';
import { redirect } from 'next/navigation';

async function LiveTracking({ params }: RouteParams) {
  const { id } = await params;
  const qid: string = '359015562295878';

  const { success, data: device } = await GetRedisDevice({ _id: qid });

  // console.log(error);

  if (!success || !device?.geo) return redirect(ROUTES.CLIENT_DEVICES);

  device._id = id;

  // if (!success || !device?.geo) return redirect(ROUTES.DEVICES);

  // console.log(device);
  return (
    <div className="h-[calc(100vh-5rem)] w-full">
      <GoogleMapComponent device={device} />
    </div>
  );
}

export default LiveTracking;
