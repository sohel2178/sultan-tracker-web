import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import ROUTES from '@/constants/route';
import { DeleteDevice } from '@/lib/actions/device.action';

import DeleteDialog from '../dialog/DeleteDialog';

interface Props {
  device: Device;
}

function DeviceCard({ device: { _id, id, device_model, reference } }: Props) {
  return (
    <div className="shadow-light100_darknone flex w-full sm:w-[300px] md:w-[350px]">
      <div className="background-light900_dark200 light-border flex w-full items-center justify-between rounded-2xl border px-8 py-10">
        <div className="flex flex-col">
          <p className="base-bold text-dark500_light700  line-clamp-1 w-full">
            {id}
          </p>
          <p className="paragraph-semibold text-dark500_light700 mt-2 line-clamp-1 w-full">
            {device_model.name}
          </p>

          <p className="small-regular text-dark500_light700 mt-3 line-clamp-2 w-full">
            {reference.name}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Link href={ROUTES.EDIT_DEVICE(_id)}>
            <Image src="/icons/edit.svg" width={20} height={20} alt="Edit" />
          </Link>

          <Link href={ROUTES.ASSIGN_DEVICE(_id)}>
            <Image
              src="/icons/assign.svg"
              width={20}
              height={20}
              alt="Assign"
            />
          </Link>

          <DeleteDialog
            title="Are you absolutely Sure??"
            content="This action cannot be undone. This will permanently delete your
            device and remove your data from our servers."
            onDelete={DeleteDevice}
            id={id}
          />
        </div>
      </div>
    </div>
  );
}

export default DeviceCard;
