import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminLayoutClient from "@/components/admin/AdminLayoutClient";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  await dbConnect();
  const dbUser = await User.findById(session.user.id).populate("role");

  const user = {
    name: dbUser?.name || session.user.name,
    role: dbUser?.role?.name || (session.user as any).role,
  };

  return <AdminLayoutClient user={user}>{children}</AdminLayoutClient>;
}
