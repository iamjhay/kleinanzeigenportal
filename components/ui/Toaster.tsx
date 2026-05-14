"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";
import { Toast } from "@/hooks/useToast";

interface ToasterProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

const ToastItem = ({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: string) => void;
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const enter = setTimeout(() => setVisible(true), 10);
    const leave = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(toast.id), 350);
    }, 4500);
    return () => {
      clearTimeout(enter);
      clearTimeout(leave);
    };
  }, [toast.id, onDismiss]);

  const isSuccess = toast.type === "success";

  return (
    <div
      className={`flex items-start gap-4 bg-white rounded-xl border shadow-2xl p-5 w-[340px] transition-all duration-350 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${isSuccess ? "border-green-100" : "border-red-100"}`}
    >
      {/* Icon */}
      <div
        className={`shrink-0 p-1.5 rounded-full ${
          isSuccess ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500"
        }`}
      >
        {isSuccess ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-primary leading-snug">
          {toast.title}
        </p>
        {toast.message && (
          <p className="text-xs text-muted mt-0.5 leading-relaxed">
            {toast.message}
          </p>
        )}
      </div>

      {/* Dismiss */}
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(() => onDismiss(toast.id), 350);
        }}
        className="shrink-0 text-gray-300 hover:text-gray-500 transition-colors mt-0.5"
      >
        <X size={15} />
      </button>

      {/* Progress bar */}
      <div
        className={`absolute bottom-0 left-0 h-0.5 rounded-b-xl ${
          isSuccess ? "bg-secondary" : "bg-red-400"
        }`}
        style={{
          animation: "toast-progress 4.5s linear forwards",
        }}
      />

      <style>{`
        @keyframes toast-progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

const Toaster = ({ toasts, onDismiss }: ToasterProps) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-9999 flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto relative">
          <ToastItem toast={toast} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  );
};

export default Toaster;
