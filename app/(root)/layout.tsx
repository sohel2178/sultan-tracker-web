import { ReactNode } from "react";

import LeftSideBar from "@/components/navigation/LeftSideBar";
import Navbar from "@/components/navigation/navbar";
import RightSideBar from "@/components/navigation/RightSidebar";
import { sidebarLinks } from "@/constants";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <Navbar data={sidebarLinks} />
      <div className="flex">
        <LeftSideBar data={sidebarLinks} />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl"> {children}</div>
        </section>

        <RightSideBar />
      </div>
    </main>
  );
};

export default RootLayout;
