"use server";

import { FilterQuery } from "mongoose";

import { Account } from "@/database";

import action from "../handlers/action";
import handleError from "../handlers/error";
import { PaginatedBaseParamsSchema } from "../validation";

export async function GetAllAccounts(params: PaginatedBaseParams): Promise<
  ActionResponse<{
    accounts: Account[];
    isNext: boolean;
    totalAccounts: number;
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

  const filterQuery: FilterQuery<typeof Account> = {};

  if (query) {
    filterQuery.$or = [
      { name: { $regex: new RegExp(query, "i") } },
      { accountType: { $regex: new RegExp(query, "i") } },
      { provider: { $regex: new RegExp(query, "i") } },
    ];
  }

  try {
    // throw new Error("Not Implemented");
    const totalAccounts = await Account.countDocuments();

    const accounts = await Account.find(filterQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const isNext = totalAccounts > skip + accounts.length;

    return {
      success: true,
      data: {
        accounts: JSON.parse(JSON.stringify(accounts)),
        isNext,
        totalAccounts,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
