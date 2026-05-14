import { auth } from "@/auth";
import WelcomeWidget from "@/components/widgets/WelcomeWidget";
import ProfileWidget from "@/components/widgets/ProfileWidget";
import StatsWidget from "@/components/widgets/StatsWidget";
import RecentLeads from "@/components/widgets/RecentLeads";
import dbConnect from "@/lib/mongoose";
import Category from "@/models/Category";
import Lead from "@/models/Lead";
import User from "@/models/User";
import { routing } from "@/i18n/routing";

export default async function DashboardOverview({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  if (!session) return null;

  await dbConnect();

  // Fetch real statistics, recent leads, and current user
  const [categoriesCount, leadsCount, usersCount, rawRecentLeads, dbUser] =
    await Promise.all([
      Category.countDocuments(),
      Lead.countDocuments(),
      User.countDocuments(),
      Lead.find().sort({ createdAt: -1 }).limit(5).lean(),
      User.findById(session.user?.id).populate("role").lean(),
    ]);

  // Serialize Mongoose documents to plain objects for Client Components
  const recentLeads = JSON.parse(JSON.stringify(rawRecentLeads));
  const currentUser = dbUser ? JSON.parse(JSON.stringify(dbUser)) : null;

  const stats = {
    totalListings: 0, // Placeholder until Listing model is created
    publishedListings: 0,
    categories: categoriesCount,
    contactSubmissions: leadsCount,
    adminUsers: usersCount,
    locales: routing.locales.length,
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <WelcomeWidget
            userName={currentUser?.name || session.user?.name || "Admin"}
            locale={locale}
          />
        </div>
        <div className="lg:col-span-1">
          <ProfileWidget
            user={{
              name: currentUser?.name || session.user?.name,
              email: currentUser?.email || session.user?.email,
              role: currentUser?.role?.name || (session.user as any).role,
            }}
          />
        </div>
      </div>

      <StatsWidget stats={stats} />

      <RecentLeads leads={recentLeads as any} />
    </div>
  );
}
