"use client";

import { useToast } from "@/hooks/useToast";
import Toaster from "@/components/ui/Toaster";

export default function ToasterWrapper() {
  const { toasts, dismissToast } = useToast();
  return <Toaster toasts={toasts} onDismiss={dismissToast} />;
}
