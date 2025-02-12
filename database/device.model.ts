import { model, models, Schema, Types } from "mongoose";

export interface IDevice {
  id: string;
  deviceSimNumber: string;
  registrationNumber: string;

  vehicleType:
    | "Car"
    | "Bike"
    | "Micro-Bus"
    | "Bus"
    | "Truck"
    | "CNG"
    | "Ship"
    | "Tractor"
    | "Others";

  reference: Types.ObjectId;

  vehicleModel?: string;
  driverName?: string;
  driverPhone?: string;
  driverPhoto?: string;
  code?: string;
  centerNumber?: string;
  mileage?: number;
  congestionConsumption?: number;
  serviceCharge?: number;
  speedLimit?: number;
  maxTemp?: number;
  minTemp?: number;
  deviceModel: Types.ObjectId;
  user?: Types.ObjectId;
}

export interface IDeviceDoc extends IDevice, Document {}

const DeviceSchema = new Schema<IDevice>(
  {
    id: { type: String, required: true, unique: true },
    deviceSimNumber: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    vehicleModel: { type: String },
    driverName: { type: String },
    driverPhone: { type: String },
    driverPhoto: { type: String },
    code: { type: String, default: "" },
    centerNumber: { type: String },
    vehicleType: {
      type: String,
      enum: [
        "Car",
        "Bike",
        "Micro-Bus",
        "Bus",
        "Truck",
        "CNG",
        "Ship",
        "Tractor",
        "Others",
      ],
      default: "Car",
    },
    mileage: { type: Number },
    congestionConsumption: { type: Number, default: 2 },
    serviceCharge: { type: Number, default: 300 },
    speedLimit: { type: Number, default: 80 },
    maxTemp: { type: Number, default: 40 },
    minTemp: { type: Number, default: 20 },
    deviceModel: { type: Schema.Types.ObjectId, ref: "Model", required: true },
    reference: {
      type: Schema.Types.ObjectId,
      ref: "Reference",
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Device = models?.Device || model<IDevice>("Device", DeviceSchema);

export default Device;
