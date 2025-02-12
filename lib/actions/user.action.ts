"use server";

import { FilterQuery } from "mongoose";

import { User } from "@/database";
import { IUserDoc } from "@/database/user.model";

import action from "../handlers/action";
import handleError from "../handlers/error";
import { PaginatedBaseParamsSchema } from "../validation";

export async function GetSearchedAssignUsers(
  params: PaginatedBaseParams
): Promise<
  ActionResponse<{
    users: IUserDoc[];
  }>
> {
  const validationResult = await action({
    params,
    schema: PaginatedBaseParamsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { query } = params;

  const filterQuery: FilterQuery<typeof User> = {};

  if (!query) {
    return {
      success: true,
      data: {
        users: [],
      },
    };
  }

  filterQuery.$or = [
    { name: { $regex: new RegExp(query, "i") } },
    { username: { $regex: new RegExp(query, "i") } },
    { email: { $regex: new RegExp(query, "i") } },
  ];

  try {
    // throw new Error("Not Implemented");
    // const totalUsers = await User.countDocuments();

    const users = await User.find(filterQuery).sort({ createdAt: -1 });

    // console.log(users, "Users");

    // const isNext = totalUsers > skip + users.length;

    return {
      success: true,
      data: {
        users: JSON.parse(JSON.stringify(users)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function GetUsers(params: PaginatedBaseParams): Promise<
  ActionResponse<{
    users: IUserDoc[];
    isNext: boolean;
    totalUsers: number;
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

  const filterQuery: FilterQuery<typeof User> = {};

  if (query) {
    filterQuery.$or = [
      { name: { $regex: new RegExp(query, "i") } },
      { username: { $regex: new RegExp(query, "i") } },
      { email: { $regex: new RegExp(query, "i") } },
      { contact: { $regex: new RegExp(query, "i") } },
    ];
  }

  try {
    // throw new Error("Not Implemented");
    const totalUsers = await User.countDocuments();

    const users = await User.find(filterQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const isNext = totalUsers > skip + users.length;

    return {
      success: true,
      data: {
        users: JSON.parse(JSON.stringify(users)),
        isNext,
        totalUsers,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
