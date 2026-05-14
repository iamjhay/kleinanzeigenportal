"use client";

import { useState, useTransition } from "react";
import { Trash2, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteLead } from "@/app/actions/lead";
import { useToast } from "@/hooks/useToast";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";

interface LeadDetailActionsProps {
  leadId: string;
}

export default function LeadDetailActions({ leadId }: LeadDetailActionsProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { addToast } = useToast();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteLead(leadId);
      if (result.success) {
        addToast(
          "success",
          "Lead Deleted",
          "The inquiry has been permanently removed.",
        );
        router.push("/admin/leads");
      } else {
        addToast("error", "Error", result.error || "Failed to delete lead");
        setIsConfirmOpen(false);
      }
    });
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsConfirmOpen(true)}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
        >
          <Trash2 size={20} />
        </button>
        <button className="p-2 text-gray-400 hover:text-primary transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>

      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        isPending={isPending}
        title="Delete Inquiry?"
        message="This action is permanent and cannot be undone. All data associated with this inquiry will be removed from our servers."
        confirmText="Confirm Delete"
        variant="danger"
      />
    </>
  );
}
