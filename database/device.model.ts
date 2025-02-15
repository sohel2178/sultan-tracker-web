import { model, models, Schema, Types } from 'mongoose';

export interface IDevice {
  id: string;
  device_sim_number: string;
  registration_number: string;

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

  reference: Types.ObjectId;

  vehicle_model?: string;
  driver_name?: string;
  driver_phone?: string;
  driver_photo?: string;
  code?: string;
  center_number?: string;
  mileage?: number;
  congestion_consumption?: number;
  service_charge?: number;
  speed_limit?: number;
  max_temp?: number;
  min_temp?: number;
  device_model: Types.ObjectId;
  user?: Types.ObjectId;
}

export interface IDeviceDoc extends IDevice, Document {}

const DeviceSchema = new Schema<IDevice>(
  {
    id: { type: String, required: true, unique: true },
    device_sim_number: { type: String, required: true },
    registration_number: { type: String, required: true },
    vehicle_model: { type: String },
    driver_name: { type: String },
    driver_phone: { type: String },
    driver_photo: { type: String },
    code: { type: String, default: '' },
    center_number: { type: String },
    vehicle_type: {
      type: String,
      enum: [
        'Car',
        'Bike',
        'Micro-Bus',
        'Bus',
        'Truck',
        'CNG',
        'Ship',
        'Tractor',
        'Others',
      ],
      default: 'Car',
    },
    mileage: { type: Number },
    congestion_consumption: { type: Number, default: 2 },
    service_charge: { type: Number, default: 300 },
    speed_limit: { type: Number, default: 80 },
    max_temp: { type: Number, default: 40 },
    min_temp: { type: Number, default: 20 },
    device_model: { type: Schema.Types.ObjectId, ref: 'Model', required: true },
    reference: {
      type: Schema.Types.ObjectId,
      ref: 'Reference',
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Device = models?.Device || model<IDevice>('Device', DeviceSchema);

export default Device;
