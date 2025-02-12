import React from "react";

import { IUserDoc } from "@/database/user.model";
import { AssignUserToDevice } from "@/lib/actions/device.action";

import AssignDialog from "../dialog/AssignDialog";

interface Props {
  user: IUserDoc;
  isAssign?: boolean;
  deviceId?: string | undefined;
}

function UserCard({
  user: { _id, name, username, email, contact },
  deviceId,
  isAssign,
}: Props) {
  return (
    <div className="shadow-light100_darknone flex w-full sm:w-[320px]">
      <div className="background-light900_dark200 light-border flex flex-1 items-center justify-between rounded-2xl border px-8 py-10">
        <div className="flex flex-col">
          <p className="base-bold text-dark500_light700  line-clamp-1 w-full">
            {name}
          </p>
          <p className="paragraph-semibold text-dark500_light700  line-clamp-1 w-full">
            {username}
          </p>
          <p className="paragraph-semibold text-dark500_light700  line-clamp-1 w-full">
            {email}
          </p>

          {contact && (
            <p className="paragraph-semibold text-dark500_light700 mt-2 line-clamp-1 w-full">
              {contact}
            </p>
          )}
        </div>

        {isAssign && deviceId && (
          <AssignDialog
            title="Are you absolutely Sure to assign User??"
            content="This action will assign the device to the user. Click confirm to assign device"
            // onDelete={DeleteDevice}
            userId={_id}
            deviceId={deviceId}
            onAssign={AssignUserToDevice}
          />
        )}

        {/* <Link href={ROUTES.EDIT_REFERENCE(_id)}>
              <Image src="/icons/edit.svg" width={20} height={20} alt="Edit" />
            </Link> */}
      </div>
    </div>
  );
}

export default UserCard;
