import { Metadata } from "next";
import dbConnect from "@/lib/mongoose";
import FaqTopic from "@/models/FaqTopic";
import FaqTopicManager from "@/components/admin/FaqTopicManager";
import FaqItem from "@/models/FaqItem";

export const metadata: Metadata = {
  title: "FAQ Topics | Admin Dashboard",
};

export default async function AdminFaqsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  await dbConnect();

  const topics = await FaqTopic.find({})
    .sort({ order: 1, createdAt: -1 })
    .lean();

  const topicsWithCounts = await Promise.all(
    topics.map(async (topic) => {
      const count = await FaqItem.countDocuments({ topicId: topic._id });
      return {
        ...topic,
        faqCount: count,
      };
    }),
  );

  // Serialize for client component
  const serializedTopics = JSON.parse(JSON.stringify(topicsWithCounts));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-black text-primary uppercase tracking-tight">
          FAQ Topics
        </h1>
        <p className="text-sm text-muted font-medium">
          Manage the topics for your frequently asked questions.
        </p>
      </div>

      <FaqTopicManager topics={serializedTopics} locale={locale} />
    </div>
  );
}
