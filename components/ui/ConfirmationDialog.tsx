"use client";

import { AlertCircle, Loader2 } from "lucide-react";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isPending?: boolean;
  variant?: "danger" | "primary";
}

export default function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isPending = false,
  variant = "primary",
}: ConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-primary/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div
              className={`p-3 rounded-full ${variant === "danger" ? "bg-red-50 text-red-500" : "bg-primary/5 text-primary"}`}
            >
              <AlertCircle size={24} />
            </div>
            <h3 className="text-lg font-black text-primary font-mono">
              {title}
            </h3>
          </div>

          <p className="text-muted text-sm font-medium leading-relaxed mb-8">
            {message}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              disabled={isPending}
              className="flex-1 px-6 py-4 rounded text-[11px] font-black uppercase tracking-widest text-muted bg-gray-50 hover:bg-gray-100 transition-all disabled:opacity-50 cursor-pointer"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={isPending}
              className={`flex-1 px-6 py-4 rounded text-[11px] font-black uppercase tracking-widest text-white transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer ${
                variant === "danger"
                  ? "bg-red-500 hover:bg-red-600 shadow-red-200"
                  : "bg-primary hover:bg-secondary"
              }`}
            >
              {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
