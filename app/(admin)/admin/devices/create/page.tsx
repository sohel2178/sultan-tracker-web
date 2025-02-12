import React from "react";

import DeviceForm from "@/components/forms/DeviceForm";
import { GetAllModels } from "@/lib/actions/model.action";
import { GetAllReferences } from "@/lib/actions/reference.action";

async function CreateDevice() {
  const [{ data: modelData }, { data: referenceData }] = await Promise.all([
    GetAllModels(),
    GetAllReferences(),
  ]);

  const { models } = modelData || {};
  const { references } = referenceData || {};

  // console.log(modelData?.models);
  // console.log(referenceData?.references);

  return (
    <div className="px-6 pb-6 pt-10 max-md:pb-14 sm:px-14">
      <DeviceForm models={models} references={references} />
    </div>
  );
}

export default CreateDevice;
