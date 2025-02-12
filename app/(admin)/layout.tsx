// import { redirect } from "next/navigation";
import { ReactNode } from "react";

// import LeftSideBar from "@/components/navigation/LeftSideBar";
// import { auth } from "@/auth";
import LeftSideBar from "@/components/navigation/LeftSideBar";
import Navbar from "@/components/navigation/navbar";
import { adminSidebarLinks } from "@/constants";
// import ROUTES from "@/constants/route";
// import RightSideBar from "@/components/navigation/RightSidebar";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  // const session = await auth();

  // console.log(session);
  //   if (session?.user) {
  //     if (!session.user.admin) return redirect(ROUTES.HOME);
  //   } else {
  //     return redirect(ROUTES.LOGIN);
  //   }
  // className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14"
  return (
    <main className="background-light850_dark100 relative">
      <Navbar data={adminSidebarLinks} />
      <div className="flex">
        <LeftSideBar data={adminSidebarLinks} />
        <section className="flex min-h-screen flex-1 flex-col pt-20">
          <div className="mx-auto w-full"> {children}</div>
        </section>
      </div>
    </main>
  );
};

export default RootLayout;
