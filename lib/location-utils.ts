'use server';

import geolib from 'geolib';

const DISTANCE_THRESHOLD = 10;
const TRIP_TIME_THRESHOLD = 10 * 60;

const getTimeDiff = (currentDate: GeoDate, prevDate: GeoDate) => {
  return (
    currentDate.hour * 3600 +
    currentDate.minute * 60 +
    currentDate.second -
    (prevDate.hour * 3600 + prevDate.minute * 60 + prevDate.second)
  );
};

const getDistanceFromLatLonInMeter = (start: RLocation, end: RLocation) => {
  return geolib.getDistance(
    { lat: start.geo.lat, lng: start.geo.lng },
    { lat: end.geo.lat, lng: end.geo.lng }
  );
};

const get_distance_from_two_locations = (loc1: RLocation, loc2: RLocation) => {
  return getDistanceFromLatLonInMeter(loc1, loc2);
};

const get_distance_from_locations = (datas: RLocation[]) => {
  let distance = 0;
  let first = null;
  let last = null;

  if (datas.length === 0) return 0;
  for (let i = 0; i < datas.length; i++) {
    if (i == 0) {
      first = datas[i];
    } else {
      last = datas[i];
      const dist = get_distance_from_two_locations(first || datas[0], last);

      if (dist >= DISTANCE_THRESHOLD) {
        // console.log(dist);
        distance = distance + dist;
        first = last;
      }
    }
  }

  return distance;
};

const create_trip_items_from_on_locations = (datas: RLocation[]): Trip => {
  const l: Trip = {
    status: 'ON',
    start: '',
    end: '',
    distance: 0,
    duration: 0,
  };
  l.start =
    datas[0].date.hour.toString().padStart(2, '0') +
    ':' +
    datas[0].date.minute.toString().padStart(2, '0');

  l.end =
    datas[datas.length - 1].date.hour.toString().padStart(2, '0') +
    ':' +
    datas[datas.length - 1].date.minute.toString().padStart(2, '0');

  l.duration = getTimeDiff(datas[datas.length - 1].date, datas[0].date);
  l.distance = Number((get_distance_from_locations(datas) / 1000).toFixed(2));

  return l;
};

const create_spans_from_datas = (all: RLocation[]) => {
  let ref = 0;

  const mySpans = [];

  let onData = all.filter((x) => x.geo.acc === 'ON');
  if (onData.length < 2) {
    onData = all.filter((x) => x.geo.speed && x.geo.speed >= 5);
  }

  for (let i = 0; i < onData.length; i++) {
    if (i === 0) {
      ref = 0;
    } else if (i === onData.length - 1) {
      // Last
      mySpans.push(onData.slice(ref, i));
      ref = 0;
    } else {
      const timediff = getTimeDiff(onData[i].date, onData[i - 1].date);
      if (timediff >= TRIP_TIME_THRESHOLD) {
        mySpans.push(onData.slice(ref, i));
        ref = i;
      }
    }
  }

  return mySpans;
};

const get_duration_from_start_end_text = (
  start: string,
  end: string
): number => {
  const startArr = start.split(':');
  const endArr = end.split(':');

  return (
    Number(endArr[0]) * 3600 +
    Number(endArr[1]) * 60 -
    (Number(startArr[0]) * 3600 + Number(startArr[1]) * 60)
  );
};

const create_off_span = (on_span: Trip[]): Trip[] => {
  // console.log(on_span);
  const off_span: Trip[] = [
    {
      status: 'OFF',
      start: '00:00',
      end: on_span[0].start,
      duration: get_duration_from_start_end_text('00:00', on_span[0].start),
      distance: 0.0,
    },
  ];

  for (let i = 0; i < on_span.length; i++) {
    if (i !== on_span.length - 1) {
      off_span.push({
        status: 'OFF',
        start: on_span[i].end,
        end: on_span[i + 1].start,
        duration: get_duration_from_start_end_text(
          on_span[i].end,
          on_span[i + 1].start
        ),
        distance: 0.0,
      });
    }
  }

  return off_span;
};

const trip_report_old = (all: RLocation[], vehicle_type: number) => {
  const mySpans = create_spans_from_datas(all);

  // console.log(vehicle_type, 'Vehicle Type');

  // console.log(mySpans);

  const on_span = mySpans
    .filter((x) => x.length > 1)
    .map((x) => create_trip_items_from_on_locations(x))
    .filter((x) => (vehicle_type === 8 ? x.distance >= 0 : x.distance >= 0.5));
  const off_span = on_span.length > 0 ? create_off_span(on_span) : [];

  return off_span.flatMap((item, index) => [item, on_span[index]]);
};

const get_hourly_report = (data: DLocation[]): Hourly[] => {
  // console.log(data);
  return data
    .map((x) => {
      const l: Hourly = { _id: 0, start: '', end: '', distance: 0 };
      l._id = x._id;
      let all_locations = [...x.datas];

      if (all_locations.length < 2) {
        all_locations = [...x.datas];
      }
      const onLocations = all_locations.filter((x) => x.geo.acc === 'ON');
      if (onLocations.length >= 2) {
        l['distance'] = Number(
          (get_distance_from_locations(onLocations) / 1000).toFixed(2)
        );
      } else {
        l['distance'] = Number(
          (get_distance_from_locations(all_locations) / 1000).toFixed(2)
        );
      }

      l['start'] =
        String(all_locations[0].date.hour).padStart(2, '0') +
        ':' +
        String(all_locations[0].date.minute).padStart(2, '0');
      l['end'] =
        String(all_locations[all_locations.length - 1].date.hour).padStart(
          2,
          '0'
        ) +
        ':' +
        String(all_locations[all_locations.length - 1].date.minute).padStart(
          2,
          '0'
        );

      return l;
    })
    .filter((x) => x.distance >= 0.25);
};

export const get_daily_report = async (
  datas: DLocation[],
  vehicle_type: number
) => {
  const all: RLocation[] = [];
  datas.forEach((x) => all.push(...x.datas));

  const trip_report = trip_report_old(all, vehicle_type);

  // console.log(trip_report);

  const hourly_report = get_hourly_report(datas);

  const onLocations = all.filter((x) => x.geo.acc === 'ON');

  const dailyReport: DailyReport = {};
  dailyReport.trip_report = trip_report;
  dailyReport.hourly_report = hourly_report;
  dailyReport.actual_distance = Number(
    trip_report
      .map((x) => x.distance)
      .reduce((partialSum, a) => partialSum + a, 0)
      .toFixed(2)
  );
  dailyReport.running_time = trip_report
    .map((x) => (x.status == 'ON' ? x.duration : 0))
    .reduce((partialSum, a) => partialSum + a, 0);

  if (onLocations.length >= 10) {
    dailyReport.total_distance = Number(
      (get_distance_from_locations(onLocations) / 1000).toFixed(2)
    );
  } else {
    dailyReport.total_distance = Number(
      (get_distance_from_locations(all) / 1000).toFixed(2)
    );
  }

  return dailyReport;
};
