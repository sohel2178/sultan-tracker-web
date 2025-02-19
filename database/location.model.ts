import { model, models, Schema } from 'mongoose';

export interface ILocation {
  id: string;
  geo: Geo;
  devicetime: Date;
  servertime: Date;
  date: GeoDate;
}

export interface LocationDoc extends ILocation {
  _id: string;
}

const LocationSchema = new Schema<ILocation>(
  {
    id: { type: String, required: true },
    geo: {
      lat: { type: Number },
      lng: { type: Number },
      acc: { type: String },
      speed: { type: Number },
    },
    devicetime: { type: Date },
    servertime: { type: Date, default: Date.now() },
    date: {
      year: { type: Number },
      month: { type: Number },
      day: { type: Number },
      hour: { type: Number },
      minute: { type: Number },
      second: { type: Number },
    },
  },
  { timestamps: true }
);

const Location =
  models?.Location || model<ILocation>('Location', LocationSchema);

export default Location;
