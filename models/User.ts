import mongoose, { Schema, model, models } from "mongoose";
import "./Role"; // Ensure Role is registered for population

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role: mongoose.Types.ObjectId;
  orders: string[];
  savedItems: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    phone: {
      type: String,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: [true, "Role is required"],
    },
    orders: {
      type: [String],
      default: [],
    },
    savedItems: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

const User = models.User || model<IUser>("User", UserSchema);

export default User;
