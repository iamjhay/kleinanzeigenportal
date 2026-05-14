import { Metadata } from "next";
import { FileText, ShieldCheck, Clock } from "lucide-react";
import dbConnect from "@/lib/mongoose";
import Page from "@/models/Page";
import PageManager from "@/components/admin/PageManager";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Pages Management | Admin Dashboard",
};

export default async function PagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();

  if (!session) {
    redirect(`/${locale}/login`);
  }

  await dbConnect();

  // Fetch stats
  const [totalCount, publishedCount, draftCount, rawPages] = await Promise.all([
    Page.countDocuments(),
    Page.countDocuments({ status: "published" }),
    Page.countDocuments({ status: "draft" }),
    Page.find().sort({ updatedAt: -1 }).lean(),
  ]);

  const stats = [
    {
      label: "Total Pages",
      value: totalCount,
      icon: FileText,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Published",
      value: publishedCount,
      icon: ShieldCheck,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Drafts",
      value: draftCount,
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  // Serialize for client component
  const pages = JSON.parse(JSON.stringify(rawPages));

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black uppercase tracking-tight font-serif">
            Site Pages
          </h1>
          <p className="text-gray-400 text-sm mt-1 font-medium">
            Manage your website content, legal pages, and custom sections.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-gray-100 rounded border border-gray-200 overflow-hidden">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white p-6 flex flex-col justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-full ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted">
                  {stat.label}
                </span>
              </div>
              <div>
                <p className="text-3xl font-black text-primary">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <PageManager initialPages={pages} locale={locale} />
      </div>
    </div>
  );
}
