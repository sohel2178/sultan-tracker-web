// import { IUser } from "@/database/user.model";

interface Tag {
  _id: string;
  name: string;
}

interface Author {
  _id: string;
  name: string;
  image: string;
}

interface Question {
  _id: string;
  title: string;
  content?: string;
  tags: Tag[];
  author: Author;
  createdAt: Date;
  upvotes: number;
  answers: number;
  views: number;
}

// export interface UserParams {
//   _id: string;
//   name: string;
//   username: string;
//   email: string;
//   bio?: string;
//   image?: string;
//   location?: string;
//   portfolio?: string;
//   contact?: string;
//   organization_name?: string;
//   address?: string;
//   reputation?: number;
// }

interface CreateAccountParams {
  userId: string;
  name: string;
  image?: string;
  password?: string;
  accountType: 'User' | 'Admin' | 'Manager';
  provider: string;
  providerAccountId: string;
}

interface Account extends CreateAccountParams {
  _id: string;
}

interface CreateModelParams {
  name: string;
  supplierName: string;
}

interface Model extends CreateModelParams {
  _id: string;
}

interface CreateReferenceParams {
  name: string;
  contact: string;
  address: string;
}

interface Reference extends CreateReferenceParams {
  _id: string;
}

interface CreateDeviceParams {
  id: string;
  device_sim_number: string;
  registration_number: string;
  vehicle_model?: string;
  driver_name?: string;
  driver_phone?: string;
  driver_photo?: string;
  code?: string;
  center_number?: string;
  vehicle_type:
    | 'Car'
    | 'Bike'
    | 'Micro-Bus'
    | 'Bus'
    | 'Truck'
    | 'CNG'
    | 'Ship'
    | 'Tractor'
    | 'Others';
  mileage?: number;
  congestion_consumption?: number;
  service_charge?: number;
  speed_limit?: number;
  max_temp?: number;
  min_temp?: number;
  device_model: string;
  reference: string;
  user?: string;
}

interface Device extends CreateDeviceParams {
  _id: string;
  reference: Reference;
  device_model: Model;
  user?: {
    _id: string;
    name: string;
    email: string;
  };
}

interface Geo {
  lat: number;
  lng: number;
  speed?: number;
  acc?: 'OFF' | 'ON';
  milage?: number;
  fuel_line?: 'OFF' | 'ON';
  charging?: 'OFF' | 'ON';
  voltage_level?: string;
  update_time?: string;
  latest_time?: string;
  active_time?: string;
  bearing?: number;
  number_of_satellite?: number;
  gsm_signal_strength?: number;
  pto_io_status?: string;
  over_speed?: boolean;
  temperature?: number;
}

interface Trip {
  status: 'ON' | 'OFF';
  start: string;
  end: string;
  duration: number;
  distance: number;
  congestion_time?: number;
}

interface Hourly {
  _id: number;
  start: string;
  end: string;
  distance: number;
}

interface DailyReport {
  trip_report?: Trip[];
  hourly_report?: Hourly[];
  actual_distance?: number;
  total_distance?: number;
  running_time?: number;
  congestion_time?: number;
}

//   date: {
//     year: { type: Number },
//     month: { type: Number },
//     day: { type: Number },
//     hour: { type: Number },
//     minute: { type: Number },
//     second: { type: Number }
//   }

interface GeoDate {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

interface RedisDevice extends Device {
  device_model: string;
  geo: Geo;
}

interface GetDeviceParams {
  deviceId: string;
}

interface EditDeviceParams extends CreateDeviceParams {
  _id: string;
}

interface EditClientDeviceParams
  extends Omit<CreateDeviceParams, 'device_model' | 'reference'> {
  _id: string;
}

interface GetBaseParams {
  _id: string;
}

interface DeleteDeviceParams {
  id: string;
}

interface AssignDeviceParams {
  userId: string;
  deviceId: string;
}

interface SignInWithOAuthParam {
  provider: 'github' | 'google' | 'facebook';
  providerAccountId: string;
  user: {
    name: string;
    username: string;
    email: string;
    image: string;
  };
}

interface AuthCredentials {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
}

interface EditQuestionParams extends CreateQuestionParams {
  questionId: string;
}

interface EditReferenceParams extends CreateReferenceParams {
  referenceId: string;
}

interface GetQuestionParams {
  questionId: string;
}

interface GetModelParams {
  modelId: string;
}

interface GetReferenceParams {
  referenceId: string;
}

interface EditModelParams extends CreateModelParams {
  modelId: string;
}

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

interface PaginatedBaseParams {
  page?: number;
  pageSize?: number;
  query?: string;
  sort?: string;
}

interface MonthlyReportParams {
  id: string;
  year: number;
  month: number;
  vehicle_type: string;
}

interface DailyReportParams extends MonthlyReportParams {
  day: number;
}

interface RLocation {
  geo: Geo;
  date: GeoDate;
}

interface DLocation {
  _id: number;
  datas: RLocation[];
}

interface MonthlyId {
  day: number;
  month: number;
  year: number;
}

interface MonthlyData {
  _id: MonthlyId;
  count: number;
  datas: RLocation[];
}

interface MonthlyItem {
  _id: MonthlyId;
  total_time: number;
  running_time: number;
  congestion_time: number;
  idle_time: number;
  duration: number;
  distance: number;
  count: number;
  start_time: Date | null;
  end_time: Date | null;
}

interface MTrip {
  status: 'ON' | 'OFF';
  duration: number;
  distance: number;
  congestion_factor: number;
  congestion_time: number;
  running_time: number;
}

interface PopDevice {
  id: string;
  registration_number: string;
}

interface PaginatedSearchParams extends PaginatedBaseParams {
  filter?: string;
}

interface GetTagQuestionParams extends Omit<PaginatedSearchParams, 'filter'> {
  tagId: string;
}

interface NavLink {
  imgURL: string;
  route: string;
  label: string;
}

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
};

type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
type ErrorResponse = ActionResponse<undefined> & { success: false };

type APIErrorResponse = NextResponse<ErrorResponse>;
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;
