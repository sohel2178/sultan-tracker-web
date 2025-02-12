import { notFound, redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import QuestionForm from "@/components/forms/QuestionForm";
import ROUTES from "@/constants/route";
import { GetQuestion } from "@/lib/actions/question.action";

async function EditQuestion({ params }: RouteParams) {
  const { id } = await params;

  if (!id) return notFound();

  const session = await auth();

  if (!session) {
    redirect(ROUTES.LOGIN);
  }

  const { data: question, success } = await GetQuestion({ questionId: id });

  if (!success) return notFound();

  //   console.log(question?.author);

  if (question?.author?.toString() !== session?.user?.id) {
    redirect(ROUTES.QUESTION(id));
  }
  return (
    <main>
      <div className="mt-9">
        <QuestionForm question={question} isEdit />
      </div>
    </main>
  );
}

export default EditQuestion;
