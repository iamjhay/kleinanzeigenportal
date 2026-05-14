"use client";

import React, { useState, useEffect } from "react";
import {
  Smartphone,
  Car,
  Home as HomeIcon,
  Shirt,
  Sprout,
  Briefcase,
  PawPrint,
  ChevronRight,
  HelpCircle,
  LucideIcon,
} from "lucide-react";
import { getCategories } from "@/app/actions/category";
import CategoryModal from "@/components/CategoryModal";
import CategorySkeleton from "./CategorySkeleton";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

// Icon mapping helper
const iconMap: Record<string, LucideIcon> = {
  Smartphone,
  Car,
  Home: HomeIcon,
  Shirt,
  Sprout,
  Briefcase,
  PawPrint,
  HelpCircle,
};

// Luxury Palette for cycling
const luxuryPalette = [
  "bg-[#eafdc5]", // Soft Lime
  "bg-[#e9eff0]", // Mist Gray
  "bg-[#f0f9d9]", // Sage Tint
  "bg-[#dad9f9]", // Lavender Blue
  "bg-[#fce7f3]", // Soft Petal
  "bg-[#dcfce7]", // Mint White
  "bg-[#e0f2fe]", // Sky Tint
];

const ExploreCategories = () => {
  const tCat = useTranslations("Categories");
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        // Add a slight delay for better UX of the skeleton
        setTimeout(() => setLoading(false), 800);
      }
    }
    fetchCategories();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 py-14 sm:py-16">
      <CategoryModal
        isOpen={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
        category={selectedCategory}
      />

      <div className="mb-12 flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-primary font-montserrat uppercase">
            {tCat("title")}
          </h2>
          <p className="mt-1 text-sm text-muted font-medium">
            {tCat("subtitle")}
          </p>
        </div>
        <Link
          href="/marketplace"
          className="group hidden md:flex items-center gap-1 text-sm font-semibold text-secondary hover:underline transition-all"
        >
          View All
          <ChevronRight size={16} />
        </Link>
      </div>

      {loading ? (
        <CategorySkeleton />
      ) : (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-3 lg:grid-cols-7">
          {categories.map((cat, index) => {
            const IconComponent = iconMap[cat.icon] || HelpCircle;
            const bgColor = luxuryPalette[index % luxuryPalette.length];

            return (
              <div
                key={cat._id || index}
                onClick={() => setSelectedCategory(cat)}
                className={`group cursor-pointer rounded-lg p-4 md:p-6 flex flex-col h-[120px] md:h-[160px] transition-all duration-500 hover:scale-[0.95] hover:shadow-xs ${bgColor} hover:ring-1 hover:border border-[#b5e941] ring-offset-2 hover:ring-secondary`}
              >
                <div className="flex-1">
                  <h3 className="font-bold text-[#1d4b00] text-sm sm:text-[15px] leading-tight font-montserrat tracking-tight mb-1">
                    {cat.name}
                  </h3>
                </div>

                <div className="my-4 border-t border-dashed border-[#1d4b00]/10 w-full" />

                <div className="flex justify-start text-[#1d4b00] opacity-80 group-hover:opacity-100 transition-all group-hover:scale-110">
                  <IconComponent size={24} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ExploreCategories;
