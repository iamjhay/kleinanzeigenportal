"use client";

import { useState } from "react";
import { updateLeadStatus } from "@/app/actions/lead";
import { ChevronDown, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/useToast";

interface StatusSelectorProps {
  leadId: string;
  currentStatus: string;
}

const statuses = [
  { id: "new", label: "New", color: "text-blue-600 bg-blue-50" },
  { id: "engaged", label: "Engaged", color: "text-amber-600 bg-amber-50" },
  { id: "success", label: "Success", color: "text-emerald-600 bg-emerald-50" },
  { id: "closed", label: "Closed", color: "text-gray-600 bg-gray-50" },
];

export default function StatusSelector({
  leadId,
  currentStatus,
}: StatusSelectorProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [status, setStatus] = useState(currentStatus);
  const { addToast } = useToast();

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === status) return;

    setIsUpdating(true);
    const result = await updateLeadStatus(leadId, newStatus);

    if (result.success) {
      setStatus(newStatus);
      addToast("success", "Status Updated", "The inquiry status has been changed successfully.");
    } else {
      addToast("error", "Update Failed", result.error || "Failed to update status.");
    }
    setIsUpdating(false);
  };

  const currentStatusObj = statuses.find((s) => s.id === status) || statuses[0];

  return (
    <div className="relative group">
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-mono font-bold">
          Status:
        </span>
        <div className="relative">
          <select
            value={status}
            disabled={isUpdating}
            onChange={(e) => handleStatusChange(e.target.value)}
            className={`
              appearance-none px-4 py-1.5 pr-8 rounded text-[11px] font-black uppercase tracking-widest cursor-pointer
              transition-all outline-none border border-transparent
              ${currentStatusObj.color}
              ${isUpdating ? "opacity-50 pointer-events-none" : "hover:ring-1 hover:ring-offset-1 hover:ring-secondary/20"}
            `}
          >
            {statuses.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
            {isUpdating ? (
              <Loader2 size={12} className="animate-spin text-muted" />
            ) : (
              <ChevronDown size={12} className="text-muted" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
