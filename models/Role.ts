import mongoose, { Schema, model, models } from "mongoose";

export interface IRole {
  name: string;
  permissions: string[];
}

const RoleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: [true, "Role name is required"],
      unique: true,
    },
    permissions: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Role = models.Role || model<IRole>("Role", RoleSchema);

export default Role;
