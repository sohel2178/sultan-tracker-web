"use server";

import { FilterQuery } from "mongoose";

import { Model } from "@/database";
// import { IModel } from "@/database/model.model";

import action, { emptyParamAction } from "../handlers/action";
import handleError from "../handlers/error";
import { NotFoundError } from "../http-error";
import {
  EditModelSchema,
  GetModelSchema,
  ModelSchema,
  PaginatedBaseParamsSchema,
} from "../validation";

export async function CreateModel(
  params: CreateModelParams
): Promise<ActionResponse<Model>> {
  const validationResult = await action({
    params,
    schema: ModelSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { name, supplierName } = validationResult.params!;
  //   const userId = validationResult?.session?.user?.id;

  try {
    const model = await Model.create({ name, supplierName });

    if (!model) {
      throw new Error("Failed to create question");
    }

    return { success: true, data: JSON.parse(JSON.stringify(model)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function GetModels(
  params: PaginatedBaseParams
): Promise<
  ActionResponse<{ models: Model[]; isNext: boolean; totalModels: number }>
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

  const filterQuery: FilterQuery<typeof Model> = {};

  if (query) {
    filterQuery.$or = [
      { name: { $regex: new RegExp(query, "i") } },
      { supplierName: { $regex: new RegExp(query, "i") } },
    ];
  }

  try {
    // throw new Error("Not Implemented");
    const totalModels = await Model.countDocuments(filterQuery);

    const models = await Model.find(filterQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const isNext = totalModels > skip + models.length;

    return {
      success: true,
      data: {
        models: JSON.parse(JSON.stringify(models)),
        isNext,
        totalModels,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function GetModelbyId(
  params: GetModelParams
): Promise<ActionResponse<Model>> {
  const validationResult = await action({
    params,
    schema: GetModelSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { modelId } = validationResult.params!;

  try {
    const model = await Model.findById(modelId);

    if (!model) throw new NotFoundError("Model");

    return { success: true, data: JSON.parse(JSON.stringify(model)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function EditModel(
  params: EditModelParams
): Promise<ActionResponse<Model>> {
  const validationResult = await action({
    params,
    schema: EditModelSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { modelId, name, supplierName } = validationResult.params!;
  //   const userId = validationResult?.session?.user?.id;

  try {
    const model = await Model.findById(modelId);

    if (!model) {
      throw new NotFoundError("Model");
    }

    if (model.name !== name || model.supplierName !== supplierName) {
      model.name = name;
      model.supplierName = supplierName;
    }

    await model.save();

    return { success: true, data: JSON.parse(JSON.stringify(model)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function GetAllModels(): Promise<
  ActionResponse<{ models: Model[] }>
> {
  const validationResult = await emptyParamAction({
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    // throw new Error("Not Implemented");

    const models = await Model.find().sort({ createdAt: -1 });

    return {
      success: true,
      data: {
        models: JSON.parse(JSON.stringify(models)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
