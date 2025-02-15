import { ReactNode } from 'react';

import LeftSideBar from '@/components/navigation/LeftSideBar';
import Navbar from '@/components/navigation/navbar';
import { sidebarLinks } from '@/constants';
import UserProvider from '@/context/UserProvider';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <UserProvider>
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
