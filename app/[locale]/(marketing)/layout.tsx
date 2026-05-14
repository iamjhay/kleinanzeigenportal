import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { auth } from "@/auth";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const authKey = session?.user?.id || "guest";

  return (
    <>
      <Navbar key={authKey} />
      {children}
      <Footer />
    </>
  );
}
