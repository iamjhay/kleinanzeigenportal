import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongoose";
import Lead from "@/models/Lead";
import StatusBadge from "@/components/admin/StatusBadge";
import {
  User,
  Mail,
  Calendar,
  MessageSquare,
  ArrowLeft,
  Reply,
  CheckCircle2,
  Clock,
  Globe,
  Phone,
} from "lucide-react";
import Link from "next/link";
import LeadDetailActions from "@/components/admin/LeadDetailActions";
import ToasterWrapper from "@/components/admin/ToasterWrapper";
import StatusSelector from "@/components/admin/StatusSelector";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id, locale } = await params;

  await dbConnect();

  // Mark as read and fetch
  const lead = await Lead.findByIdAndUpdate(
    id,
    { isRead: true },
    { returnDocument: "after" },
  ).lean();

  if (!lead || !lead._id) {
    notFound();
  }

  // Cast lead to any for easier access to location nested fields in lean object
  const l = lead as any;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Top Navigation */}
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/admin/leads"
          className="flex items-center gap-2 text-sm font-bold text-muted hover:text-primary transition-colors group"
        >
          <div className="p-1.5 rounded-full bg-gray-100 group-hover:bg-primary/5 transition-colors">
            <ArrowLeft size={16} />
          </div>
          Back to Leads
        </Link>
        <LeadDetailActions leadId={id} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Message Content */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded border border-gray-200 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg text-secondary">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-mono font-bold">
                    Subject:
                  </span>
                  <h1 className="text-lg font-black text-primary font-serif uppercase tracking-tight">
                    {l.subject || "No Subject"}
                  </h1>
                  <p className="text-xs text-muted font-medium mt-0.5">
                    Inquiry received via Contact Form
                  </p>
                </div>
              </div>
              <div>
                <StatusSelector leadId={id} currentStatus={l.status} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded border border-gray-200 overflow-hidden">
            <div className="px-8 py-5 ">
              <div className="prose prose-slate max-w-none mb-4">
                <div className="grid grid-cols-2">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-mono font-bold">
                      Phone:
                    </span>
                    <p className="text-primary text-sm leading-relaxed whitespace-pre-wrap font-medium">
                      {l.phone || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-mono font-bold">
                      State/Country:
                    </span>
                    <p className="text-primary text-sm leading-relaxed whitespace-pre-wrap font-medium">
                      {l.location?.state ||
                        l.location?.country ||
                        "Unavailable"}{" "}
                      / {l.location?.country || ""}
                    </p>
                  </div>
                </div>
              </div>
              <div className="prose prose-slate max-w-none">
                <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-mono font-bold">
                  Message:
                </span>
                <p className="text-primary text-sm leading-relaxed whitespace-pre-wrap font-medium">
                  {l.message}
                </p>
              </div>
            </div>

            <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${l.email}&su=${encodeURIComponent(`Re: ${l.subject || "Inquiry"} - Zufriedene Verkäufe`)}&body=${encodeURIComponent(`Dear ${l.firstName},\n\nThank you for reaching out to Zufriedene Verkäufe regarding your inquiry about "${l.subject || "our services"}".\n\n[Write your response here]\n\nBest regards,\nThe Zufriedene Verkäufe Team\n\n---\nOriginal Message:\n"${l.message}"`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded text-xs font-black uppercase tracking-widest hover:bg-secondary transition-all shadow-lg active:scale-[0.98]"
              >
                <Reply size={16} />
                Reply to Inquiry
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Sender Info & Actions */}
        <div className="space-y-8">
          {/* Sender Card */}
          <div className="bg-white rounded border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center gap-3">
              <div className="p-2 bg-primary/5 rounded text-primary">
                <User size={18} />
              </div>
              <h3 className="text-sm font-black text-primary uppercase tracking-widest">
                Sender Details
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-sm font-black text-white shrink-0">
                  {l.firstName.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-black text-primary truncate">
                    {l.firstName} {l.lastName}
                  </p>
                  <div className="flex flex-col gap-1 mt-2">
                    <a
                      href={`mailto:${l.email}`}
                      className="text-xs font-mono text-secondary hover:underline flex items-center gap-1 truncate"
                    >
                      <Mail size={12} />
                      {l.email}
                    </a>
                  </div>
                </div>
              </div>

              {l.location && (
                <div className="p-4 rounded bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-2 text-[10px] font-black text-muted uppercase tracking-widest mb-2">
                    <Globe size={12} />
                    <span>Origin Location</span>
                  </div>
                  <p className="text-xs font-bold text-primary">
                    {l.location.state && `${l.location.state}, `}
                    {l.location.country || "Unknown Location"}
                  </p>
                </div>
              )}

              <div className="h-px bg-gray-100" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted">
                    <Calendar size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Received
                    </span>
                  </div>
                  <span className="text-xs font-mono text-primary font-bold">
                    {new Intl.DateTimeFormat(locale, {
                      dateStyle: "medium",
                    }).format(new Date(lead.createdAt))}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted">
                    <Clock size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Time
                    </span>
                  </div>
                  <span className="text-xs font-mono text-primary font-bold">
                    {new Intl.DateTimeFormat(locale, {
                      timeStyle: "short",
                    }).format(new Date(lead.createdAt))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
