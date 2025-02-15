import Link from 'next/link';

// import DeviceCard from "@/components/cards/DeviceCard";
import AdminDeviceCard from '@/components/cards/AdminDeviceCard';
import DataRenderer from '@/components/DataRenderer';
import Pagination from '@/components/Pagination';
import LocalSearch from '@/components/search/LocalSearch';
import { Button } from '@/components/ui/button';
// import devices from "@/constants/devices";
import ROUTES from '@/constants/route';
import { EMPTY_DEVICES } from '@/constants/states';
import { GetDevices } from '@/lib/actions/device.action';

async function Devices({ searchParams }: RouteParams) {
  const { page, pageSize, query } = await searchParams;

  const { success, data, error } = await GetDevices({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
  });

  const { devices, totalDevices = 0 } = data || {};

  // const devices =

  // console.log(devices);
  // console.log(devices);
  return (
    <div className="h-full px-6 pb-6 max-md:pb-14 sm:px-14">
      <div className="relative flex w-full flex-col">
        <div className="background-light850_dark100 sticky top-20 flex w-full flex-col">
          <div className=" flex w-full flex-col-reverse gap-4 pt-6 sm:flex-row sm:justify-between">
            <h1 className="h1-bold text-dark100_light900">Devices</h1>
            <Pagination
              totalItems={totalDevices}
              // onPageChange={onPageChange}
            />

            <Button
              className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
              asChild
            >
              <Link href={ROUTES.ADD_DEVICE}>Create Device</Link>
            </Button>
          </div>

          <section className="mt-4">
            <LocalSearch
              route={ROUTES.DEVICES}
              imgSrc="/icons/search.svg"
              placeholder="Search Refereces..."
              otherClasses="flex-1"
            />
          </section>
        </div>

        <div className="flex h-10 flex-1 flex-col overflow-y-auto">
          <DataRenderer
            success={success}
            error={error}
            data={devices}
            empty={EMPTY_DEVICES}
            render={(devices) => (
              <div className="mt-10 flex w-full flex-wrap gap-4 overflow-y-auto">
                {devices.map((device) => (
                  <AdminDeviceCard device={device} key={device._id} />
                ))}
              </div>
            )}
          />
        </div>
      </div>
      {/* <section className=" sticky top-24 flex w-full flex-col-reverse gap-4 sm:flex-row sm:justify-between">
       

        

      <section className="sticky top-36">
        <LocalSearch
          route={ROUTES.DEVICES}
          imgSrc="/icons/search.svg"
          placeholder="Search Refereces..."
          otherClasses="flex-1"
        />
      </section>

      <DataRenderer
        success={success}
        error={error}
        data={devices}
        empty={EMPTY_DEVICES}
        render={(devices) => (
          <div className="mt-10 flex w-full flex-wrap gap-4 overflow-y-auto">
            {devices.map((device) => (
              <DeviceCard device={device} key={device._id} />
            ))}
          </div>
        )}
      /> */}
    </div>
  );
}

export default Devices;
