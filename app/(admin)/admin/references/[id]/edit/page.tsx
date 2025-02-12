import { notFound, redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import ReferenceForm from "@/components/forms/ReferenceForm";
import ROUTES from "@/constants/route";
import { GetReferencebyId } from "@/lib/actions/reference.action";

async function EditReference({ params }: RouteParams) {
  const { id } = await params;

  if (!id) return notFound();

  const session = await auth();

  if (!session) {
    redirect(ROUTES.LOGIN);
  }

  const { data: reference } = await GetReferencebyId({
    referenceId: id,
  });
  return (
    <main>
      <div className="mt-9">
        <ReferenceForm reference={reference} isEdit />
      </div>
    </main>
  );
}

export default EditReference;
