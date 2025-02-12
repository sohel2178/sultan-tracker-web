"use server";

import { FilterQuery } from "mongoose";

import { Reference } from "@/database";

import action, { emptyParamAction } from "../handlers/action";
import handleError from "../handlers/error";
import { NotFoundError } from "../http-error";
import {
  EditReferenceSchema,
  GetReferenceSchema,
  PaginatedBaseParamsSchema,
  ReferenceSchema,
} from "../validation";

export async function CreateReference(
  params: CreateReferenceParams
): Promise<ActionResponse<Reference>> {
  const validationResult = await action({
    params,
    schema: ReferenceSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { name, contact, address } = validationResult.params!;
  //   const userId = validationResult?.session?.user?.id;

  try {
    const reference = await Reference.create({ name, contact, address });

    if (!reference) {
      throw new Error("Failed to create question");
    }

    return { success: true, data: JSON.parse(JSON.stringify(reference)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function GetReferences(params: PaginatedBaseParams): Promise<
  ActionResponse<{
    references: Reference[];
    isNext: boolean;
    totalReferences: number;
  }>
> {
  const validationResult = await action({
    params,
    schema: PaginatedBaseParamsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 50, query } = params;

  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  const filterQuery: FilterQuery<typeof Reference> = {};

  if (query) {
    filterQuery.$or = [
      { name: { $regex: new RegExp(query, "i") } },
      { contact: { $regex: new RegExp(query, "i") } },
      { address: { $regex: new RegExp(query, "i") } },
    ];
  }

  try {
    // throw new Error("Not Implemented");
    const totalReferences = await Reference.countDocuments();

    const references = await Reference.find(filterQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const isNext = totalReferences > skip + references.length;

    return {
      success: true,
      data: {
        references: JSON.parse(JSON.stringify(references)),
        isNext,
        totalReferences,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function GetReferencebyId(
  params: GetReferenceParams
): Promise<ActionResponse<Reference>> {
  const validationResult = await action({
    params,
    schema: GetReferenceSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { referenceId } = validationResult.params!;

  try {
    const reference = await Reference.findById(referenceId);

    if (!reference) throw new NotFoundError("Reference");

    return { success: true, data: JSON.parse(JSON.stringify(reference)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function EditReference(
  params: EditReferenceParams
): Promise<ActionResponse<Reference>> {
  const validationResult = await action({
    params,
    schema: EditReferenceSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { referenceId, name, contact, address } = validationResult.params!;
  //   const userId = validationResult?.session?.user?.id;

  try {
    const reference = await Reference.findById(referenceId);

    if (!reference) {
      throw new NotFoundError("Reference");
    }

    if (
      reference.name !== name ||
      reference.contact !== contact ||
      reference.address !== address
    ) {
      reference.name = name;
      reference.contact = contact;
      reference.address = address;
    }

    await reference.save();

    return { success: true, data: JSON.parse(JSON.stringify(reference)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function GetAllReferences(): Promise<
  ActionResponse<{ references: Reference[] }>
> {
  const validationResult = await emptyParamAction({
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    // throw new Error("Not Implemented");

    const references = await Reference.find().sort({ createdAt: -1 });

    return {
      success: true,
      data: {
        references: JSON.parse(JSON.stringify(references)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
