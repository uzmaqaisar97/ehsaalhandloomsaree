import Link from "next/link";
import { notFound } from "next/navigation";

import { SareeImage } from "@/components/saree/saree-image";
import { buttonVariants } from "@/components/ui/button";
import { getAllSlugs, getSareeBySlug } from "@/lib/sarees";
import { getWhatsAppUrl } from "@/lib/navigation";
import {
  formatCategoryLabel,
  formatOccasionLabel,
  formatPrice,
  getDiscountPercent,
} from "@/types/saree";
import { cn } from "@/lib/utils";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const saree = await getSareeBySlug(slug);
  if (!saree) return { title: "Saree Not Found" };
  return {
    title: saree.title,
    description: saree.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const saree = await getSareeBySlug(slug);

  if (!saree) {
    notFound();
  }

  const whatsappUrl = getWhatsAppUrl(
    `Hi, I'm interested in the ${saree.title}. Could you share more details?`,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="space-y-3">
          <SareeImage
            src={saree.images[0]}
            alt={saree.title}
            className="aspect-[3/4] w-full rounded-xl"
          />
          {saree.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {saree.images.slice(1).map((image) => (
                <SareeImage
                  key={image}
                  src={image}
                  alt={`${saree.title} detail`}
                  className="aspect-square rounded-lg"
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-xs font-medium tracking-wide text-gold uppercase">
            {formatCategoryLabel(saree.category)}
          </p>
          <h1 className="mt-2 font-heading text-3xl text-primary sm:text-4xl">
            {saree.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            <span className="text-2xl font-semibold text-primary">
              {formatPrice(saree.price)}
            </span>
            {saree.originalPrice !== undefined &&
              saree.originalPrice > saree.price && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(saree.originalPrice)}
                  </span>
                  <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-medium text-gold">
                    {getDiscountPercent(saree.price, saree.originalPrice)}% off
                  </span>
                </>
              )}
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            {saree.inStock ? (
              <span className="text-emerald">In stock</span>
            ) : (
              <span className="text-destructive">Currently unavailable</span>
            )}
          </p>

          <dl className="mt-8 space-y-4 border-y border-border py-6 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Fabric</dt>
              <dd className="text-right font-medium">{saree.fabric}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Colours</dt>
              <dd className="text-right font-medium capitalize">
                {saree.color.join(", ")}
              </dd>
            </div>
            {saree.blousePiece !== undefined && (
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Blouse piece</dt>
                <dd className="text-right font-medium">
                  {saree.blousePiece ? "Included (unstitched)" : "Not included"}
                </dd>
              </div>
            )}
            {saree.occasion && saree.occasion.length > 0 && (
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Occasion</dt>
                <dd className="text-right font-medium">
                  {saree.occasion.map(formatOccasionLabel).join(", ")}
                </dd>
              </div>
            )}
          </dl>

          <p className="mt-6 leading-relaxed text-muted-foreground">
            {saree.description}
          </p>

          {saree.tags && saree.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {saree.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-muted px-3 py-1 text-xs capitalize text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 bg-emerald text-white hover:bg-emerald/90",
              )}
            >
              Enquire on WhatsApp
            </a>
            <Link
              href={`/collections/${saree.category}`}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12")}
            >
              More {formatCategoryLabel(saree.category)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
