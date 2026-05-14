import mongoose, { Schema, model, models } from "mongoose";

export interface ILead {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: "new" | "engaged" | "success" | "closed";
  isRead: boolean;
  location?: {
    state?: string;
    country?: string;
  };
  createdAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    location: {
      state: { type: String },
      country: { type: String },
    },
    status: {
      type: String,
      enum: ["new", "engaged", "success", "closed"],
      default: "new",
    },
  },
  { timestamps: true },
);

if (process.env.NODE_ENV === "development") {
  delete models.Lead;
}

const Lead = models.Lead || model<ILead>("Lead", LeadSchema);

export default Lead;
