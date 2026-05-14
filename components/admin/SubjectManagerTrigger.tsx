"use client";

import { useState } from "react";
import { Settings2 } from "lucide-react";
import Drawer from "@/components/ui/Drawer";
import SubjectManager from "./SubjectManager";

export default function SubjectManagerTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-fit md:w-auto flex items-center gap-2 px-6 py-3 rounded-full bg-[#122e1e] hover:bg-primary cursor-pointer border border-[#b5e941] text-sm font-medium text-[#b5e941] hover:border-[#122e1e] transition-all"
      >
        <Settings2 className="w-4 h-4 text-[#b5e941]" />
        Create Subjects
      </button>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Manage Subjects"
      >
        <SubjectManager />
      </Drawer>
    </>
  );
}
