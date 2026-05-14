import { Metadata } from "next";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongoose";
import FaqTopic from "@/models/FaqTopic";
import FaqItem from "@/models/FaqItem";
import FaqTopicEditor from "@/components/admin/FaqTopicEditor";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Edit FAQ Topic | Admin Dashboard",
};

export default async function EditFaqTopicPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  await dbConnect();

  const topic = await FaqTopic.findById(id).lean();
  if (!topic) notFound();

  const faqs = await FaqItem.find({ topicId: id }).sort({ order: 1 }).lean();

  // Serialize
  const serializedTopic = JSON.parse(JSON.stringify(topic));
  const serializedFaqs = JSON.parse(JSON.stringify(faqs));

  return (
    <div className="space-y-6">
      <FaqTopicEditor
        topic={serializedTopic}
        faqs={serializedFaqs}
        locale={locale}
      />
    </div>
  );
}
