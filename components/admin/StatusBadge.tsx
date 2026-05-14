import React from "react";

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    new: "bg-blue-50 text-blue-600 border-blue-100",
    engaged: "bg-amber-50 text-amber-600 border-amber-100",
    success: "bg-green-50 text-green-600 border-green-100",
    closed: "bg-gray-50 text-gray-600 border-gray-100",
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status.toLowerCase()] || styles.new}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
