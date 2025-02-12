import { model, models, Schema } from "mongoose";

export interface IReference {
  name: string;
  contact: string;
  address: string;
}

const ReferenceSchema = new Schema<IReference>(
  {
    name: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

const Reference =
  models?.Reference || model<IReference>("Reference", ReferenceSchema);

export default Reference;
