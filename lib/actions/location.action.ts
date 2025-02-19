'use server';

import { LocationDoc } from '@/database/location.model';
import action from '../handlers/action';
import handleError from '../handlers/error';
import { DailyReportSchema } from '../validation';
import { Location } from '@/database';

import { get_daily_report } from '@/lib/location-utils';

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

  const { id, year, month, day } = validationResult.params!;

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

    const dailyReport: DailyReport = get_daily_report(locations, 1);

    // console.log(locations[0].datas);
    //   const device = await Device.findById(_id);

    //   if (!device) throw new NotFoundError('Device');

    return { success: true, data: dailyReport };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
