import Image from "next/image";
import React, { ReactNode } from "react";

import SocialAuth from "@/components/forms/SocialAuth";

function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-auth-light bg-cover bg-center bg-no-repeat px-4 py-10 dark:bg-auth-dark">
      <section className="light-border background-light800_dark200 shadow-light100_dark100 min-w-full rounded-[10px] border px-4 py-10 shadow-md sm:min-w-[520px] sm:px-8">
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-2.5">
            <h1 className="h2-bold text-dark100_light900">
              Welcome to Sultan Tracker
            </h1>
            <p className="paragraph-regular text-dark500_light400">
              Join to Track your vehicles from anywhere
            </p>
          </div>
          <Image
            src="/images/logo.svg"
            width={30}
            height={30}
            alt="site-logo"
            className="object-contain"
          />
        </div>
        {children}
        <SocialAuth />
      </section>
    </main>
  );
}

export default Layout;

// db.createUser({
//   user: "sohel2178",
//   pwd: "s0201078",
//   roles: [{ role: "readWrite", db: "sultantracker" }],
// });
