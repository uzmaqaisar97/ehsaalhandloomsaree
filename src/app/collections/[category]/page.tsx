import Link from "next/link";
import { notFound } from "next/navigation";

import { SareeCard } from "@/components/saree/saree-card";
import {
  getFilteredSarees,
  getAllCategories,
  isSareeCategory,
} from "@/lib/sarees";
import {
  formatCategoryLabel,
  formatOccasionLabel,
  SAREE_CATEGORIES,
  type SareeCategory,
  type SareeSortOption,
} from "@/types/saree";
import { cn } from "@/lib/utils";

type CollectionsPageProps = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{
    occasion?: string;
    sort?: SareeSortOption;
  }>;
};

export async function generateStaticParams() {
  return SAREE_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: CollectionsPageProps) {
  const { category } = await params;
  if (!isSareeCategory(category)) {
    return { title: "Collection Not Found" };
  }
  return {
    title: `${formatCategoryLabel(category)} Sarees`,
    description: `Browse our curated ${category} saree collection.`,
  };
}

export default async function CategoryCollectionPage({
  params,
  searchParams,
}: CollectionsPageProps) {
  const { category: categoryParam } = await params;
  const { occasion, sort = "title-asc" } = await searchParams;

  if (!isSareeCategory(categoryParam)) {
    notFound();
  }

  const category = categoryParam as SareeCategory;
  const categories = await getAllCategories();
  const sarees = await getFilteredSarees(
    category,
    occasion ? { occasions: [occasion] } : {},
    sort,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs font-medium tracking-[0.25em] text-gold uppercase">
          Collections
        </p>
        <h1 className="mt-3 font-heading text-3xl text-primary sm:text-4xl">
          {formatCategoryLabel(category)} Sarees
        </h1>
        {occasion && (
          <p className="mt-2 text-sm text-muted-foreground">
            Filtered for{" "}
            <span className="font-medium text-foreground">
              {formatOccasionLabel(occasion)}
            </span>
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {SAREE_CATEGORIES.filter((cat) => categories.includes(cat)).map((cat) => (
          <Link
            key={cat}
            href={
              occasion
                ? `/collections/${cat}?occasion=${occasion}`
                : `/collections/${cat}`
            }
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              cat === category
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary",
            )}
          >
            {formatCategoryLabel(cat)}
          </Link>
        ))}
      </div>

      {occasion && (
        <div className="mt-4">
          <Link
            href={`/collections/${category}`}
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            Clear occasion filter
          </Link>
        </div>
      )}

      {sarees.length === 0 ? (
        <div className="mt-12 rounded-xl border border-dashed border-border bg-card p-10 text-center">
          <p className="font-heading text-xl text-primary">No sarees found</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try another category or remove filters.
          </p>
          <Link
            href="/collections"
            className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
          >
            Browse all collections
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sarees.map((saree) => (
            <SareeCard key={saree.slug} saree={saree} />
          ))}
        </div>
      )}
    </div>
  );
}
