import Link from "next/link";

import {
  formatCategoryLabel,
  SAREE_CATEGORIES,
  type SareeCategory,
} from "@/types/saree";

const categoryImages: Record<SareeCategory, string> = {
  silk: "/images/sarees/placeholder-8.jpg",
  cotton: "/images/sarees/placeholder-11.jpg",
  banarasi: "/images/sarees/placeholder-1.jpg",
  kanjivaram: "/images/sarees/placeholder-3.jpg",
  chiffon: "/images/sarees/hero-blush.jpg",
  georgette: "/images/sarees/placeholder-2.jpg",
  linen: "/images/sarees/hero-sage.jpg",
};

const categoryDescriptions: Record<SareeCategory, string> = {
  silk: "Lustrous weaves for every celebration",
  cotton: "Breathable handlooms for daily elegance",
  banarasi: "Opulent zari from the ghats of Varanasi",
  kanjivaram: "Temple borders and South Indian heritage",
  chiffon: "Light, fluid drapes with modern flair",
  georgette: "Effortless drape for evenings out",
  linen: "Crisp textures with understated charm",
};

export function ShopByCategory() {
  return (
    <section className="border-t border-border bg-card py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.25em] text-gold uppercase">
            Shop by Category
          </p>
          <h2 className="mt-3 font-heading text-3xl text-primary sm:text-4xl">
            Find your weave
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {SAREE_CATEGORIES.map((category) => (
            <Link
              key={category}
              href={`/collections/${category}`}
              className="group relative overflow-hidden rounded-xl border border-border"
            >
              <div
                className="aspect-[4/5] bg-cover bg-center transition-transform duration-500 group-hover:scale-105 sm:aspect-[3/4]"
                style={{
                  backgroundImage: `url(${categoryImages[category]})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent transition-colors group-hover:from-primary group-hover:via-primary/50" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-primary-foreground">
                <h3 className="font-heading text-lg sm:text-xl">
                  {formatCategoryLabel(category)}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-primary-foreground/85 sm:text-sm">
                  {categoryDescriptions[category]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
