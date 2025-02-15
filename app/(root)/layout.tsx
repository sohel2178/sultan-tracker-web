import { ReactNode } from 'react';

import LeftSideBar from '@/components/navigation/LeftSideBar';
import Navbar from '@/components/navigation/navbar';
import { sidebarLinks } from '@/constants';
import UserProvider from '@/context/UserProvider';
import { auth } from '@/auth';
import { GetUserDevices } from '@/lib/actions/device.action';

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth(); // Get user session
  const userId = session?.user?.id || '';
  let devices: RedisDevice[] = [];

  if (userId) {
    const { data } = await GetUserDevices({ _id: userId });
    devices = data ? [...data] : []; // ✅ Ensure 'data' is not undefined
  }

  // const {} = userId ? await GetUserDevices({ _id: userId }) : [];
  return (
    <UserProvider initialDevices={devices}>
      <main className="background-light850_dark100 relative">
        <Navbar data={sidebarLinks} />
        <div className="flex">
          <LeftSideBar data={sidebarLinks} />
          <section className="flex min-h-screen flex-1 flex-col pt-20">
            <div className="mx-auto w-full"> {children}</div>
          </section>

          {/* <RightSideBar /> */}
        </div>
      </main>
    </UserProvider>
  );
};

export default RootLayout;
