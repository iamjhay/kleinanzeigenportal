import React from "react";
import { User, Mail, Shield, ExternalLink } from "lucide-react";
import Link from "next/link";

interface ProfileWidgetProps {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string;
  };
}

const ProfileWidget = ({ user }: ProfileWidgetProps) => {
  return (
    <div className="bg-white rounded border border-gray-100 shadow-xs p-8 h-full flex flex-col">
      <h2 className="text-xl font-black text-primary font-serif relative inline-block">
        Profile
      </h2>
      <span className="text-gray-400 font-medium font-mono text-[13px] pt-2 mb-6">
        Your current account details and role permissions across the. Portal.
      </span>

      <div className="flex-1 space-y-6">
        <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl ">
          <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-white text-3xl font-black border-4 border-gray-200 shadow-sm uppercase">
            {user.name
              ? user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
              : "A"}
          </div>
          <div className="flex flex-col items-center justify-center gap-2 ">
            <div className="flex flex-col items-center justify-center">
              <h3 className="font-bold mb-0 text-center text-primary text-lg">
                {user.name}
              </h3>
              <p className="text-primary text-xs font-medium">{user.email}</p>
            </div>
            <p className="text-gray-400 font-medium font-mono text-[10px] text-center">
              {user.role}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-50">
        <Link
          href="/admin/settings"
          className="flex items-center justify-center w-full text-sm font-bold text-secondary border rounded py-2"
        >
          Manage Account Settings
        </Link>
      </div>
    </div>
  );
};

export default ProfileWidget;
