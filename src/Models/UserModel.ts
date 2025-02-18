import { bool } from "aws-sdk/clients/signer";
import mongoose, { Document, Schema, model } from "mongoose";

interface UserType extends Document {
  name?: string;
  email: string;
  password: string;
  admin: boolean;
  phone: string;
  isDeleted: boolean;
  blocked:boolean
}

const userSchema: Schema<UserType> = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false, },
    phone: { type: String, required: true, },
    isDeleted: { type: Boolean, default: false },
    blocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model<UserType>("User", userSchema);

export default User;

