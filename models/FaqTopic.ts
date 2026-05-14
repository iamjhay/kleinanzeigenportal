import mongoose, { Schema, model, models } from "mongoose";

export interface IFaqTopic {
  _id: string;
  title_en: string;
  title_de: string;
  slug: string;
  icon?: string;
  order: number;
}

const FaqTopicSchema = new Schema<IFaqTopic>(
  {
    title_en: { type: String, required: true },
    title_de: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    icon: { type: String, default: "HelpCircle" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const FaqTopic =
  models.FaqTopic || model<IFaqTopic>("FaqTopic", FaqTopicSchema);

export default FaqTopic;
