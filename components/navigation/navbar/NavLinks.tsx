'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { SheetClose } from '@/components/ui/sheet';
// import { sidebarLinks } from "@/constants";
import { cn } from '@/lib/utils';

const NavLinks = ({
  isMobileNav = false,
  userId,
  sidebarLinks,
}: {
  sidebarLinks: NavLink[];
  isMobileNav?: boolean;
  userId?: string;
}) => {
  const pathname = usePathname();

  return (
    <>
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) &&
            (item.route.includes('admin')
              ? item.route.length > 6
              : item.route.length > 1)) ||
          pathname === item.route;

        if (item.route === '/profile') {
          if (userId) item.route = `${item.route}/${userId}`;
          else return null;
        }

        // if (item.route === '/devices') {
        //   if (userId) item.route = `users/${userId}/${item.route}`;
        //   else return null;
        // }

        const LinkComponent = (
          <Link
            href={item.route}
            key={item.label}
            className={cn(
              isActive
                ? 'primary-gradient rounded-lg text-light-900'
                : 'text-dark300_light900',
              'flex items-center justify-start gap-4 bg-transparent p-4'
            )}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={cn({ 'invert-colors': !isActive })}
            />
            <p
              className={cn(
                isActive ? 'base-bold' : 'base-medium',
                !isMobileNav && 'max-lg:hidden'
              )}
            >
              {item.label}
            </p>
          </Link>
        );

        return isMobileNav ? (
          <SheetClose asChild key={item.route}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <React.Fragment key={item.route}>{LinkComponent}</React.Fragment>
        );
      })}
    </>
  );
};

export default NavLinks;
