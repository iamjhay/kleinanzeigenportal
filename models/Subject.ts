import mongoose, { Schema, model, models } from "mongoose";

export interface ISubject {
  label: string;
  value: string;
  createdAt: Date;
}

const SubjectSchema = new Schema<ISubject>(
  {
    label: { type: String, required: true },
    value: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

const Subject = models.Subject || model<ISubject>("Subject", SubjectSchema);

export default Subject;
