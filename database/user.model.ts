import { Schema, model, models } from "mongoose";

export interface IUser {
  name: string;
  username: string;
  email: string;
  bio?: string;
  image?: string;
  location?: string;
  portfolio?: string;
  contact?: string;
  organization_name?: string;
  address?: string;
  reputation?: number;
}

export interface IUserDoc extends IUser {
  _id: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String },
    image: { type: String },
    location: { type: String },
    portfolio: { type: String },
    contact: { type: String },
    organization_name: { type: String },
    address: { type: String },
    reputation: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = models?.User || model<IUser>("User", UserSchema);

export default User;
