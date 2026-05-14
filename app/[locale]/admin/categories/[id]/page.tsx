import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongoose";
import Category from "@/models/Category";
import CategoryEditor from "@/components/admin/CategoryEditor";

interface PageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { locale, id } = await params;

  await dbConnect();

  let categoryData;
  try {
    const rawCategory = await Category.findById(id).lean();
    if (!rawCategory) return notFound();

    // Serialize for Client Component
    categoryData = JSON.parse(JSON.stringify(rawCategory));
  } catch (err) {
    return notFound();
  }

  return (
    <div>
      <CategoryEditor category={categoryData} locale={locale} />
    </div>
  );
}
