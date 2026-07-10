import Link from "next/link";

import { SareeCard } from "@/components/saree/saree-card";
import { getAllCategories, getFilteredAllSarees } from "@/lib/sarees";
import {
  formatCategoryLabel,
  formatOccasionLabel,
  SAREE_CATEGORIES,
} from "@/types/saree";

export const metadata = {
  title: "Collections",
  description:
    "Browse sarees by category — silk, cotton, Banarasi, Kanjivaram, and more.",
};

type CollectionsIndexPageProps = {
  searchParams: Promise<{ occasion?: string }>;
};

export default async function CollectionsIndexPage({
  searchParams,
}: CollectionsIndexPageProps) {
  const { occasion } = await searchParams;
  const categories = await getAllCategories();
  const occasionSarees = occasion
    ? await getFilteredAllSarees({ occasions: [occasion] })
    : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs font-medium tracking-[0.25em] text-gold uppercase">
          Collections
        </p>
        <h1 className="mt-3 font-heading text-3xl text-primary sm:text-4xl">
          {occasion
            ? `${formatOccasionLabel(occasion)} Sarees`
            : "Shop by weave"}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {occasion
            ? `Sarees curated for ${formatOccasionLabel(occasion).toLowerCase()} occasions across all weaves.`
            : "Explore our full catalogue organised by fabric and tradition — from bridal Banarasi silks to breezy everyday cottons."}
        </p>
        {occasion && (
          <Link
            href="/collections"
            className="mt-3 inline-block text-sm text-primary underline-offset-4 hover:underline"
          >
            ← View all categories
          </Link>
        )}
      </div>

      {occasion && (
        <>
          {occasionSarees.length === 0 ? (
            <div className="mt-10 rounded-xl border border-dashed border-border bg-card p-10 text-center">
              <p className="font-heading text-xl text-primary">No sarees found</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try another occasion or browse by category below.
              </p>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {occasionSarees.map((saree) => (
                <SareeCard key={saree.slug} saree={saree} />
              ))}
            </div>
          )}
        </>
      )}

      <div className={occasion ? "mt-16" : "mt-10"}>
        {!occasion && (
          <h2 className="font-heading text-xl text-primary sm:text-2xl">
            Browse by category
          </h2>
        )}
        {occasion && (
          <h2 className="font-heading text-xl text-primary sm:text-2xl">
            Or browse by category
          </h2>
        )}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SAREE_CATEGORIES.filter((category) =>
            categories.includes(category),
          ).map((category) => (
            <Link
              key={category}
              href={
                occasion
                  ? `/collections/${category}?occasion=${occasion}`
                  : `/collections/${category}`
              }
              className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md"
            >
              <div
                className="aspect-[16/9] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: `url(/images/sarees/${categoryThumbnails[category]})`,
                }}
              />
              <div className="p-5">
                <h3 className="font-heading text-xl text-primary transition-colors group-hover:text-gold">
                  {formatCategoryLabel(category)}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  View all {formatCategoryLabel(category).toLowerCase()} sarees →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const categoryThumbnails: Record<
  (typeof SAREE_CATEGORIES)[number],
  string
> = {
  silk: "placeholder-8.jpg",
  cotton: "placeholder-11.jpg",
  banarasi: "placeholder-1.jpg",
  kanjivaram: "placeholder-3.jpg",
  chiffon: "hero-blush.jpg",
  georgette: "placeholder-2.jpg",
  linen: "hero-sage.jpg",
};
