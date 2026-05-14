"use client";

import { useState, useMemo } from "react";
import { Search, X, Check } from "lucide-react";
import DynamicIcon from "@/components/ui/DynamicIcon";
import Modal from "@/components/ui/Modal";

// A curated list of marketplace-relevant icons
const MARKETPLACE_ICONS = [
  // General
  "Tag",
  "ShoppingCart",
  "Package",
  "Award",
  "Star",
  "Heart",
  "Zap",
  "Bell",
  "Settings",
  "Search",
  // Vehicles
  "Car",
  "Bike",
  "Truck",
  "Ship",
  "Plane",
  "Navigation",
  "Fuel",
  "Key",
  "Tool",
  "Gauge",
  // Real Estate
  "Home",
  "Building",
  "Building2",
  "Hotel",
  "Warehouse",
  "MapPin",
  "Bed",
  "Bath",
  "Maximize",
  "Trees",
  // Tech & Electronics
  "Smartphone",
  "Laptop",
  "Monitor",
  "Camera",
  "Headphones",
  "Watch",
  "Tv",
  "Speaker",
  "Cpu",
  "HardDrive",
  // Fashion & Beauty
  "Shirt",
  "ShoppingBag",
  "Glasses",
  "Scissors",
  "Sparkles",
  "Umbrella",
  "Diamond",
  // Home & Garden
  "Lamp",
  "Sofa",
  "Armchair",
  "Refrigerator",
  "Utensils",
  "Coffee",
  "Wrench",
  "Hammer",
  "Paintbrush",
  "Flower",
  // Services & Business
  "Briefcase",
  "Coins",
  "CreditCard",
  "Wand2",
  "Stethoscope",
  "GraduationCap",
  "Music",
  "Ghost",
  "Gamepad2",
  // Sports & Leisure
  "Trophy",
  "Dumbbell",
  "Bicycle",
  "Tent",
  "Ticket",
  "Mic",
  "Palette",
  // Nature
  "Sun",
  "Moon",
  "Cloud",
  "Leaf",
  "Flame",
  "Droplets",
  "Wind",
  "Mountain",
  // Actions
  "Plus",
  "Minus",
  "Edit",
  "Trash",
  "Link",
  "ExternalLink",
  "Share",
  "Download",
  "Upload",
  "Eye",
];

interface IconPickerProps {
  selectedIcon?: string;
  onSelect: (iconName: string) => void;
  noStyles?: boolean;
}

export default function IconPicker({
  selectedIcon,
  onSelect,
  noStyles,
}: IconPickerProps) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredIcons = useMemo(() => {
    const uniqueIcons = Array.from(new Set(MARKETPLACE_ICONS));
    return uniqueIcons.filter((name) =>
      name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className={`flex items-center gap-3 md:p-3 bg-secondary/10 border border-secondary rounded cursor-pointer group transition-all ${noStyles ? "border-0 bg-transparent md:p-0!" : ""}`}
      >
        <div
          className={`w-8 h-8 md:w-10 md:h-10 rounded bg-white flex items-center justify-center border transition-all ${selectedIcon ? "border-gray-300" : "border-gray-100 group-hover:border-secondary"} ${noStyles ? "w-11 h-12 md:w-12 md:h-12" : ""} `}
        >
          <DynamicIcon
            name={selectedIcon || "Tag"}
            size={24}
            className={`${selectedIcon ? "text-primary group-hover:text-secondary" : "text-gray-400 group-hover:text-primary"} transition-colors `}
          />
        </div>
        <div className="flex-1 text-left">
          <p
            className={`${noStyles ? "text-[9px] md:text-[12px]" : "text-[10px]"} font-medium font-mono text-gray-400 text-start md:text-left`}
          >
            {selectedIcon ? "Selected Icon" : "Select Icon"}
          </p>
          <p
            className={`${noStyles ? "text-[14px] font-bold font-mono" : "text-[11px]"} text-secondary font-bold text-start md:text-left`}
          >
            {selectedIcon || "Click to browse icons..."}
          </p>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Choose Category Icon"
      >
        <div className="p-4 bg-gray-50/50 border-b border-gray-100">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search icons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-3 bg-white border border-gray-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-secondary/20 transition-all font-medium"
              autoFocus
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="max-h-[350px] overflow-y-auto p-4 grid grid-cols-4 sm:grid-cols-6 gap-2">
          {filteredIcons.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search size={20} className="text-gray-300" />
              </div>
              <p className="text-[12px] text-gray-400 font-medium italic">
                No icons match "{search}"
              </p>
            </div>
          ) : (
            filteredIcons.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  onSelect(name);
                  setIsOpen(false);
                }}
                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all hover:bg-secondary/10 group border ${
                  selectedIcon === name
                    ? "bg-secondary/5 border-secondary"
                    : "bg-white border-transparent hover:border-secondary/20"
                }`}
              >
                <DynamicIcon
                  name={name}
                  size={24}
                  className={`transition-colors ${
                    selectedIcon === name
                      ? "text-secondary"
                      : "text-gray-400 group-hover:text-secondary"
                  }`}
                />
                <span className="text-[9px] font-bold text-gray-400 mt-2 truncate w-full text-center group-hover:text-primary">
                  {name}
                </span>
              </button>
            ))
          )}
        </div>

        {selectedIcon && (
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Selected:
              </span>
              <span className="text-[11px] font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-md">
                {selectedIcon}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-primary text-white px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-secondary transition-all"
            >
              Select Icon
            </button>
          </div>
        )}
      </Modal>
    </>
  );
}
