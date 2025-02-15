'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';

import Link from 'next/link';

import React from 'react';
// import { CiMenuKebab } from "react-icons/ci";
import { RiMenu4Line } from 'react-icons/ri';

import ROUTES from '@/constants/route';
import { UnAssignUserFromDevice } from '@/lib/actions/device.action';

import UnAssignDialog from '../dialog/UnAssignDialog';
import { Button } from '../ui/button';

function ClientDeviceActionDropdown({ id }: { id: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <RiMenu4Line className="text-2xl text-orange-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="background-light900_dark200 w-56 px-4 pb-6 shadow-md">
        <DropdownMenuLabel className="mt-2 text-center">
          Device Action
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2 h-px bg-gray-300" />
        <DropdownMenuGroup className="mt-4 flex flex-col gap-2">
          <DropdownMenuItem className="cursor-pointer hover:scale-110" asChild>
            <Button variant="outline">
              <Link href={ROUTES.CLIENT_LIVE_TRACKING(id)}>Live Tracking</Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:scale-110" asChild>
            <Button variant="outline">
              <Link href={ROUTES.CLIENT_EDIT_DEVICE(id)}>Edit Device</Link>
            </Button>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer hover:scale-110">
            <Button variant="outline" className="w-full">
              Daily Report
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:scale-110">
            <Button variant="outline" className="w-full">
              Monthly Report
            </Button>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer hover:scale-110">
            <Button variant="outline" className="w-full">
              Speed Report
            </Button>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer hover:scale-110" asChild>
            <Button variant="outline">
              <Link href={ROUTES.ASSIGN_DEVICE(id)}>Assign Device</Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:scale-110" asChild>
            <UnAssignDialog
              title="Are you absolutely Sure to unassign User??"
              content="This action will unassign the device from the user. Click confirm to unassign device"
              deviceId={id}
              onUnAssign={UnAssignUserFromDevice}
            />
            {/* <Button variant="outline" className="w-full">
            
          </Button> */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ClientDeviceActionDropdown;
