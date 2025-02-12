import { model, models, Schema } from "mongoose";

export interface IModel {
  name: string;
  supplierName: string;
}

export interface IModelDoc extends IModel, Document {}

const ModelSchema = new Schema<IModel>(
  {
    name: { type: String, required: true, unique: true },
    supplierName: { type: String, required: true },
  },
  { timestamps: true }
);

const Model = models?.Model || model<IModel>("Model", ModelSchema);

export default Model;
