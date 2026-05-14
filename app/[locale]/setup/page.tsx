import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import { redirect } from "next/navigation";
import SetupForm from "@/components/SetupForm";

export default async function SetupPage() {
  await dbConnect();
  const userCount = await User.countDocuments();

  if (userCount > 0) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA] p-6">
      <div className="w-full max-w-[480px] bg-white rounded-2xl border border-gray-200 p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block mb-1">
            <span className="text-[#002147] font-black text-2xl font-serif">
              Initial System Setup
            </span>
          </div>
          <p className="text-gray-400 text-base mt-1 px-2">
            Create the primary Super Admin account to get started
          </p>
        </div>

        <SetupForm />
      </div>

      <p className="mt-8 text-[11px] font-bold text-gray-300 uppercase tracking-widest">
        © 2026 ZUFRIEDENE VERKÄUFE
      </p>
    </div>
  );
}
