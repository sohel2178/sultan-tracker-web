'use server';

import action from '../handlers/action';
import handleError from '../handlers/error';
import { DailyReportSchema, MonthlyReportSchema } from '../validation';
import { Location } from '@/database';

import {
  get_daily_report,
  get_new_monthly_data_object,
} from '@/lib/location-utils';

export async function GetDailyReport(
  params: DailyReportParams
): Promise<ActionResponse<DailyReport>> {
  const validationResult = await action({
    params,
    schema: DailyReportSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { id, year, month, day, vehicle_type } = validationResult.params!;

  try {
    const locations = await Location.aggregate([
      {
        $match: {
          id: id,
          'date.year': year,
          'date.month': month,
          'date.day': day,
        },
      },
      { $sort: { devicetime: 1 } },
      {
        $group: {
          _id: '$date.hour',
          datas: {
            $push: {
              geo: '$geo',
              date: '$date',
              // devicetime:"$devicetime"
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]).allowDiskUse(true);

    const dailyReport: DailyReport = get_daily_report(locations, vehicle_type);

    return { success: true, data: dailyReport };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function GetMonthlyReport(
  params: MonthlyReportParams
): Promise<ActionResponse<MonthlyItem[]>> {
  const validationResult = await action({
    params,
    schema: MonthlyReportSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { id, year, month, vehicle_type } = validationResult.params!;

  try {
    const datas = await Location.aggregate([
      { $sort: { devicetime: 1 } },
      {
        $match: { id: id, 'date.month': month, 'date.year': year },
      },
      {
        $group: {
          _id: {
            day: '$date.day',
            month: '$date.month',
            year: '$date.year',
          },
          count: {
            $sum: 1,
          },
          datas: {
            $push: {
              geo: '$geo',
              date: '$date',
            },
          },
        },
      },
      {
        $sort: {
          '_id.day': 1,
        },
      },
    ]).allowDiskUse(true);

    const monthlyData: MonthlyItem[] = datas.map((x) =>
      get_new_monthly_data_object(x, vehicle_type)
    );

    // const dailyReport: DailyReport = get_daily_report(locations, 1);

    // console.log(monthlyData);

    // console.log(locations[0].datas);
    //   const device = await Device.findById(_id);

    //   if (!device) throw new NotFoundError('Device');

    return { success: true, data: monthlyData };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function GetSpeedReport(
  params: DailyReportParams
): Promise<ActionResponse<DailySpeedReport>> {
  const validationResult = await action({
    params,
    schema: DailyReportSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { id, year, month, day } = validationResult.params!;

  try {
    const datas = await Location.aggregate([
      {
        $match: {
          id: id,
          'date.year': year,
          'date.month': month,
          'date.day': day,
          'geo.speed': { $gt: 5, $lt: 120 },
        },
      },
      {
        $facet: {
          info: [
            {
              $group: {
                _id: '$id',
                min: { $min: '$geo.speed' },
                max: { $max: '$geo.speed' },
                avg: { $avg: '$geo.speed' },
              },
            },
            {
              $project: {
                min: 1,
                max: 1,
                avg: { $round: ['$avg', 2] },
              },
            },
          ],
          frequency: [
            {
              $bucket: {
                groupBy: '$geo.speed',
                boundaries: [
                  0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120,
                ],
                output: {
                  count: { $sum: 1 },
                  avg: { $avg: '$geo.speed' },
                },
              },
            },
          ],
          data: [
            {
              $project: {
                _id: 0,
                date: 1,
                speed: '$geo.speed',
              },
            },
            {
              $group: {
                _id: { hour: '$date.hour', min: '$date.minute' },
                avg: { $avg: '$speed' },
                max: { $max: '$speed' },
                min: { $min: '$speed' },
              },
            },
            {
              $project: {
                _id: 0,
                time: { $add: ['$_id.min', { $multiply: ['$_id.hour', 60] }] },
                avg: { $ceil: '$avg' },
                max: { $ceil: '$max' },
                min: { $ceil: '$min' },
              },
            },
            { $sort: { time: 1 } },
          ],
        },
      },
    ]).allowDiskUse(true);

    const output = datas[0];
    output.info = output.info.length > 0 ? output.info[0] : {};

    console.log(output);

    return { success: true, data: output };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
