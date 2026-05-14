import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ProfileManager from "@/components/admin/ProfileManager";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  await dbConnect();
  const dbUser = await User.findById(session.user.id).populate("role");

  if (!dbUser) {
    redirect("/login");
  }

  const user = {
    name: dbUser.name,
    email: dbUser.email,
    role: dbUser.role?.name || (session.user as any).role,
  };

  return <ProfileManager user={user} />;
}
