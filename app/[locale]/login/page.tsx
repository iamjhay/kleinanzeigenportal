import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LoginClient from "@/components/auth/LoginClient";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();

  if (session) {
    redirect(`/${locale}/admin/dashboard`);
  }

  return <LoginClient locale={locale} />;
}
