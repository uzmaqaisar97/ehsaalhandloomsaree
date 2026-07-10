import Link from "next/link";

import { SareeImage } from "@/components/saree/saree-image";
import {
  formatCategoryLabel,
  formatPrice,
  type Saree,
} from "@/types/saree";
import { cn } from "@/lib/utils";

type SareeCardProps = {
  saree: Saree;
  className?: string;
};

export function SareeCard({ saree, className }: SareeCardProps) {
  return (
    <Link
      href={`/product/${saree.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md",
        className,
      )}
    >
      <SareeImage
        src={saree.images[0]}
        alt={saree.title}
        className="aspect-[3/4] w-full"
      />

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium tracking-wide text-gold uppercase">
          {formatCategoryLabel(saree.category)}
        </p>
        <h3 className="font-heading text-base leading-snug text-foreground transition-colors group-hover:text-primary sm:text-lg">
          {saree.title}
        </h3>
        <div className="mt-auto flex flex-wrap items-baseline gap-2">
          <span className="text-sm font-semibold text-primary sm:text-base">
            {formatPrice(saree.price)}
          </span>
          {saree.originalPrice !== undefined &&
            saree.originalPrice > saree.price && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(saree.originalPrice)}
              </span>
            )}
        </div>
      </div>
    </Link>
  );
}
