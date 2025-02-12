import Image from "next/image";
import Link from "next/link";
import React from "react";

import { auth } from "@/auth";
import UserAvatar from "@/components/UserAvater";

import MobileNavigation from "./MobileNavigation";
import Theme from "./Theme";

async function NavBar({ data }: { data: NavLink[] }) {
  const session = await auth();
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image
          width={23}
          height={23}
          alt="DevFlow Logo"
          src="/images/logo.svg"
        />
        <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Sultan<span className="text-primary-500">Tracker</span>
        </p>
      </Link>
      <p>Global Search</p>
      <div className="flex-between gap-5">
        <Theme />
        {session?.user?.id && (
          <UserAvatar
            id={session.user.id}
            name={session.user.name!}
            imageUrl={session.user?.image}
          />
        )}
        <MobileNavigation data={data} />
      </div>
    </nav>
  );
}

export default NavBar;
