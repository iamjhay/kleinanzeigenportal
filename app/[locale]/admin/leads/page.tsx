import { Users, MailWarning, Tag, Clock } from "lucide-react";
import dbConnect from "@/lib/mongoose";
import Lead from "@/models/Lead";
import Subject from "@/models/Subject";
import SubjectManagerTrigger from "@/components/admin/SubjectManagerTrigger";
import LeadsList from "@/components/admin/LeadsList";

export default async function LeadsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  await dbConnect();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const [totalLeads, todayLeads, unreadLeads, totalSubjects, rawAllLeads] =
    await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ createdAt: { $gte: startOfToday } }),
      Lead.countDocuments({ isRead: false }),
      Subject.countDocuments(),
      Lead.find().sort({ createdAt: -1 }).lean(),
    ]);

  // Serialize Mongoose documents for Client Components
  const allLeads = JSON.parse(JSON.stringify(rawAllLeads));

  const stats = [
    {
      label: "Total",
      value: totalLeads,
      subtext: "All-time leads",
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Today",
      value: todayLeads,
      subtext: "New submissions",
      icon: Clock,
      color: "bg-cyan-50 text-cyan-600",
    },
    {
      label: "Unread",
      value: unreadLeads,
      subtext: "Messages to open",
      icon: MailWarning,
      color: "bg-orange-50 text-orange-600",
    },
    {
      label: "Subjects",
      value: totalSubjects,
      subtext: "Contact topics",
      icon: Tag,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black uppercase tracking-tight font-serif">
            All Inquiries
          </h1>
          <p className="text-gray-400 text-sm mt-1 font-medium">
            This page shows all leads that have been submitted through the
            website.
          </p>
        </div>
        <SubjectManagerTrigger />
      </div>

      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100 rounded border border-gray-200 overflow-hidden">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white p-6 flex flex-col justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-full ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted">
                  {stat.label}
                </span>
              </div>
              <div>
                <p className="text-3xl font-black text-primary">{stat.value}</p>
                <p className="text-[10px] font-bold text-muted uppercase mt-1 tracking-wider">
                  {stat.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>

        <LeadsList leads={allLeads} locale={locale} />
      </div>
    </div>
  );
}
