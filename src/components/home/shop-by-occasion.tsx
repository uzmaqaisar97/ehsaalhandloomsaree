import Link from "next/link";

import { formatOccasionLabel } from "@/types/saree";
import { cn } from "@/lib/utils";

const homeOccasions = [
  {
    slug: "wedding",
    description: "Bridal silks and heirloom weaves",
    image: "/images/sarees/placeholder-1.jpg",
    accent: "from-primary/90 via-primary/50",
  },
  {
    slug: "festive",
    description: "Rich colours for celebrations",
    image: "/images/sarees/placeholder-5.jpg",
    accent: "from-[oklch(0.45_0.12_15)] via-[oklch(0.55_0.1_82)]",
  },
  {
    slug: "casual",
    description: "Easy drapes for everyday grace",
    image: "/images/sarees/placeholder-11.jpg",
    accent: "from-foreground/80 via-foreground/40",
  },
  {
    slug: "office",
    description: "Refined minimalism for work",
    image: "/images/sarees/hero-sage.jpg",
    accent: "from-emerald/90 via-emerald/50",
  },
] as const;

export function ShopByOccasion() {
  return (
    <section className="border-t border-border bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.25em] text-gold uppercase">
            Shop by Occasion
          </p>
          <h2 className="mt-3 font-heading text-3xl text-primary sm:text-4xl">
            Dressed for the moment
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Whether it is a wedding mandap or a Monday morning, find sarees
            curated for how you live and celebrate.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {homeOccasions.map((occasion) => (
            <Link
              key={occasion.slug}
              href={`/collections?occasion=${occasion.slug}`}
              className="group relative overflow-hidden rounded-xl border border-border"
            >
              <div
                className="aspect-[5/4] bg-cover bg-center transition-transform duration-500 group-hover:scale-105 sm:aspect-[4/5]"
                style={{ backgroundImage: `url(${occasion.image})` }}
              />
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t to-transparent transition-opacity group-hover:opacity-95",
                  occasion.accent,
                )}
              />
              <div className="absolute inset-x-0 bottom-0 p-4 text-primary-foreground">
                <h3 className="font-heading text-xl">
                  {formatOccasionLabel(occasion.slug)}
                </h3>
                <p className="mt-1 text-sm text-primary-foreground/85">
                  {occasion.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
