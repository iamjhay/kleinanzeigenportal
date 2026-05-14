import { Metadata } from "next";
import dbConnect from "@/lib/mongoose";
import FaqTopic from "@/models/FaqTopic";
import FaqItem from "@/models/FaqItem";
import FaqClient from "@/components/FaqClient";

export const metadata: Metadata = {
  title: "FAQs | Zufriedene Verkäufe",
  description: "Frequently Asked Questions about our premium marketplace.",
};

export default async function FAQsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  await dbConnect();

  // Fetch all topics and their items
  const topics = await FaqTopic.find({}).sort({ order: 1 }).lean();

  // For each topic, fetch items
  const topicsWithFaqs = await Promise.all(
    topics.map(async (topic) => {
      const faqs = await FaqItem.find({ topicId: topic._id })
        .sort({ order: 1 })
        .lean();
      return {
        ...topic,
        faqs: faqs.map((f) => ({
          question_en: f.question_en,
          question_de: f.question_de,
          answer_en: f.answer_en,
          answer_de: f.answer_de,
        })),
      };
    }),
  );

  // Serialize
  const serializedTopics = JSON.parse(JSON.stringify(topicsWithFaqs));

  return <FaqClient topics={serializedTopics} locale={locale} />;
}
