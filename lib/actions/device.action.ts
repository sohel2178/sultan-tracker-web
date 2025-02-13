'use server';

import { FilterQuery } from 'mongoose';
import { revalidatePath } from 'next/cache';

import { Device, Model, Reference, User } from '@/database';

import { db } from '../firebase';
import action from '../handlers/action';
import handleError from '../handlers/error';
import { NotFoundError } from '../http-error';
import redisConnect from '../redis';
import devices from '@/constants/devices';
import {
  AssignDeviceSchema,
  CreateDeviceSchema,
  DeleteDeviceSchema,
  EditDeviceSchema,
  GetBaseSchema,
  PaginatedBaseParamsSchema,
} from '../validation';

export async function CreateDevice(
  params: CreateDeviceParams
): Promise<ActionResponse<Device>> {
  const validationResult = await action({
    params,
    schema: CreateDeviceSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const {
    id,
    deviceSimNumber,
    reference,
    registrationNumber,
    deviceModel,
    vehicleModel,
    vehicleType,
    centerNumber,
    mileage,
    congestionConsumption,
    serviceCharge,
  } = validationResult.params!;
  //   const userId = validationResult?.session?.user?.id;

  try {
    const device = await Device.create({
      id,
      deviceSimNumber,
      registrationNumber,
      deviceModel,
      vehicleModel,
      reference,
      vehicleType,
      centerNumber,
      mileage,
      congestionConsumption,
      serviceCharge,
    });

    if (!device) {
      throw new Error('Failed to create question');
    }

    const ref = await Reference.findById(reference);
    const devModel = await Model.findById(deviceModel);

    const dev = JSON.parse(JSON.stringify(device));
    dev.deviceModel = devModel.name;
    dev.reference = ref.name;

    delete dev._id;
    delete dev.__v;

    // console.log(dev);
    // console.log(devModel);
    // console.log(ref);

    const redis = await redisConnect();
    await redis.set(id, JSON.stringify(dev));

    const firebaseRef = db.ref('devices').child(id);
    await firebaseRef.set(dev);

    return { success: true, data: JSON.parse(JSON.stringify(device)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function GetDevicebyId(
  params: GetBaseParams
): Promise<ActionResponse<EditDeviceParams>> {
  const validationResult = await action({
    params,
    schema: GetBaseSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { _id } = validationResult.params!;

  try {
    const device = await Device.findById(_id);

    if (!device) throw new NotFoundError('Device');

    return { success: true, data: JSON.parse(JSON.stringify(device)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function EditDevice(
  params: EditDeviceParams
): Promise<ActionResponse<Device>> {
  const validationResult = await action({
    params,
    schema: EditDeviceSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const {
    _id,
    id,
    deviceSimNumber,
    reference,
    registrationNumber,
    deviceModel,
    vehicleModel,
    vehicleType,
    centerNumber,
    mileage,
    congestionConsumption,
    serviceCharge,
  } = validationResult.params!;
  //   const userId = validationResult?.session?.user?.id;

  try {
    const device = await Device.findById(_id);

    if (!device) {
      throw new NotFoundError('Device');
    }

    if (
      device.id !== id ||
      device.deviceSimNumber !== deviceSimNumber ||
      device.reference !== reference ||
      device.registrationNumber !== registrationNumber ||
      device.deviceModel !== deviceModel ||
      device.vehicleModel !== vehicleModel ||
      device.vehicleType !== vehicleType ||
      device.centerNumber !== centerNumber ||
      device.mileage !== mileage ||
      device.congestionConsumption !== congestionConsumption ||
      device.serviceCharge !== serviceCharge
    ) {
      device.id = id;
      device.deviceSimNumber = deviceSimNumber;
      device.reference = reference;
      device.registrationNumber = registrationNumber;
      device.deviceModel = deviceModel;
      device.vehicleModel = vehicleModel;
      device.vehicleType = vehicleType;
      device.centerNumber = centerNumber;
      device.mileage = mileage;
      device.congestionConsumption = congestionConsumption;
      device.serviceCharge = serviceCharge;
    }

    await device.save();

    const ref = await Reference.findById(reference);
    const devModel = await Model.findById(deviceModel);

    const dev = JSON.parse(JSON.stringify(device));
    dev.deviceModel = devModel.name;
    dev.reference = ref.name;

    delete dev._id;
    delete dev.__v;

    const redis = await redisConnect();
    await redis.set(id, JSON.stringify(dev));

    const firebaseRef = db.ref('devices').child(id);
    await firebaseRef.update(dev);

    return { success: true, data: JSON.parse(JSON.stringify(device)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function DeleteDevice(
  params: DeleteDeviceParams
): Promise<ActionResponse> {
  // revalidatePath("/admin/devices");

  const validationResult = await action({
    params,
    schema: DeleteDeviceSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { id } = validationResult.params!;

  try {
    const device = await Device.findOne({ id });

    if (!device) throw new NotFoundError('Device');

    await Device.deleteOne({ id });
    const redis = await redisConnect();
    redis.del(id);

    const firebaseRef = db.ref('devices').child(id);
    await firebaseRef.set(null);

    revalidatePath('/admin/devices');

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function GetDevices(params: PaginatedBaseParams): Promise<
  ActionResponse<{
    devices: Device[];
    isNext: boolean;
    totalDevices: number;
  }>
> {
  const validationResult = await action({
    params,
    schema: PaginatedBaseParamsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query } = params;

  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  const filterQuery: FilterQuery<typeof Device> = {};

  if (query) {
    filterQuery.$or = [
      { id: { $regex: new RegExp(query, 'i') } },
      { deviceSimNumber: { $regex: new RegExp(query, 'i') } },
      { centerNumber: { $regex: new RegExp(query, 'i') } },
      { registrationNumber: { $regex: new RegExp(query, 'i') } },
    ];
  }

  try {
    // throw new Error("Not Implemented");
    const totalDevices = await Device.countDocuments();

    const devices = await Device.find(filterQuery)
      .sort({ createdAt: -1 })
      .populate('user', 'name email')
      .populate('reference', 'name')
      .populate('deviceModel', 'name')
      .skip(skip)
      .limit(limit);

    const isNext = totalDevices > skip + devices.length;

    // console.log(devices);

    return {
      success: true,
      data: {
        devices: JSON.parse(JSON.stringify(devices)),
        isNext,
        totalDevices,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function AssignUserToDevice(
  params: AssignDeviceParams
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: AssignDeviceSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { userId, deviceId } = validationResult.params!;

  try {
    const device = await Device.findById(deviceId);
    if (!device) throw new NotFoundError('Device');
    const user = await User.findById(userId);
    if (!user) throw new NotFoundError('User');

    device.user = userId;

    await device.save();

    const redis = await redisConnect();
    const redDevStr = await redis.get(device.id);

    if (redDevStr) {
      const redDev = JSON.parse(redDevStr);
      redDev.user = JSON.parse(JSON.stringify(user));
      await redis.set(device.id, JSON.stringify(redDev));
    }

    const firebaseRef = db.ref('devices').child(device.id);
    await firebaseRef.update({ user: userId });

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function UnAssignUserFromDevice(
  params: GetBaseParams
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: GetBaseSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { _id } = validationResult.params!;

  try {
    const device = await Device.findById(_id);
    if (!device) throw new NotFoundError('Device');

    device.user = null;

    await device.save();

    const redis = await redisConnect();
    const redDevStr = await redis.get(device.id);

    if (redDevStr) {
      const redDev = JSON.parse(redDevStr);
      delete redDev.user;
      await redis.set(device.id, JSON.stringify(redDev));
    }

    const firebaseRef = db.ref('devices').child(device.id);
    await firebaseRef.update({ user: null });

    // console.log("hello Dear");

    revalidatePath('/admin/devices');

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function GetRedisDevice(
  params: GetBaseParams
): Promise<ActionResponse<RedisDevice>> {
  const validationResult = await action({
    params,
    schema: GetBaseSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { _id } = validationResult.params!;

  try {
    let dev = null;
    const redis = await redisConnect();
    const redDevStr = await redis.get(_id);

    if (redDevStr) {
      dev = JSON.parse(redDevStr);
      dev.registrationNumber = dev.registration_number;
    }

    // const firebaseRef = db.ref('devices').child(device.id);
    // await firebaseRef.update({ user: null });

    // console.log("hello Dear");

    // revalidatePath('/admin/devices');

    return { success: true, data: dev };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function GetTestDevice(): Promise<ActionResponse<Device[]>> {
  return { success: true, data: devices };
}
