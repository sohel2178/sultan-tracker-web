import { notFound, redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import ModelForm from "@/components/forms/ModelForm";
import ROUTES from "@/constants/route";
import { GetModelbyId } from "@/lib/actions/model.action";

async function EditModel({ params }: RouteParams) {
  const { id } = await params;

  if (!id) return notFound();

  const session = await auth();

  if (!session) {
    redirect(ROUTES.LOGIN);
  }

  const { data: model, success } = await GetModelbyId({ modelId: id });

  if (!success) return notFound();
  return (
    <main>
      <div className="mt-9">
        <ModelForm model={model} isEdit />
      </div>
    </main>
  );
}

export default EditModel;
