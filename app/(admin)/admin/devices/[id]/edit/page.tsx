import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import DeviceForm from "@/components/forms/DeviceForm";
import ROUTES from "@/constants/route";
import { GetDevicebyId } from "@/lib/actions/device.action";
import { GetAllModels } from "@/lib/actions/model.action";
import { GetAllReferences } from "@/lib/actions/reference.action";

async function EditDevice({ params }: RouteParams) {
  const { id } = await params;

  if (!id) return notFound();

  const session = await auth();

  if (!session) {
    redirect(ROUTES.LOGIN);
  }

  const [{ data: modelData }, { data: referenceData }] = await Promise.all([
    GetAllModels(),
    GetAllReferences(),
  ]);

  const { models } = modelData || {};
  const { references } = referenceData || {};

  const { data: device, success } = await GetDevicebyId({ _id: id });

  if (!success) return notFound();
  return (
    <div className="px-6 pb-6 pt-10 max-md:pb-14 sm:px-14">
      <DeviceForm
        models={models}
        references={references}
        device={device}
        isEdit
      />
    </div>
  );
}

export default EditDevice;
