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

    // console.log(dailyReport);

    // console.log(locations[0].datas);
    //   const device = await Device.findById(_id);

    //   if (!device) throw new NotFoundError('Device');

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
