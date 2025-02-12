import Image from "next/image";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/route";

interface Props {
  model: Model;
}

function ModelCard({ model: { _id, name, supplierName } }: Props) {
  return (
    <div className="shadow-light100_darknone flex w-full sm:w-[300px]">
      <div className="background-light900_dark200 light-border flex w-full items-center justify-between rounded-2xl border px-8 py-10">
        <div className="flex flex-col">
          <p className="small-regular text-dark500_light700 mt-3 line-clamp-1 w-full">
            {name}
          </p>
          <p className="small-regular text-dark500_light700 mt-3 line-clamp-1 w-full">
            {supplierName}
          </p>
        </div>

        <Link href={ROUTES.EDIT_MODEL(_id)}>
          <Image src="/icons/edit.svg" width={20} height={20} alt="Edit" />
        </Link>
      </div>
    </div>
  );
}

export default ModelCard;
