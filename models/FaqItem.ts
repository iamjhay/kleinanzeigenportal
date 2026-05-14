import mongoose, { Schema, model, models } from "mongoose";

export interface IFaqItem {
  _id: string;
  topicId: mongoose.Types.ObjectId;
  question_en: string;
  question_de: string;
  answer_en: string;
  answer_de: string;
  order: number;
}

const FaqItemSchema = new Schema<IFaqItem>(
  {
    topicId: { type: Schema.Types.ObjectId, ref: "FaqTopic", required: true },
    question_en: { type: String, required: true },
    question_de: { type: String, required: true },
    answer_en: { type: String, required: true },
    answer_de: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const FaqItem = models.FaqItem || model<IFaqItem>("FaqItem", FaqItemSchema);

export default FaqItem;
