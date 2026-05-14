import { Layers } from "lucide-react";
import dbConnect from "@/lib/mongoose";
import Category from "@/models/Category";
import CategoryManager from "@/components/admin/CategoryManager";

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  await dbConnect();
  const rawCategories = await Category.find().sort({ createdAt: -1 }).lean();

  // Serialize Mongoose documents for Client Components
  const categories = JSON.parse(JSON.stringify(rawCategories));

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-xl font-black uppercase tracking-tight font-serif">
            Categories
          </h1>
        </div>
        <p className="text-gray-400 text-sm font-medium">
          Manage the listing categories displayed on your marketplace.
        </p>
      </div>

      <CategoryManager categories={categories} locale={locale} />
    </div>
  );
}
