import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { getWhatsAppUrl, siteConfig } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "About",
  description: `Learn the story behind ${siteConfig.name} — curated Indian textiles with timeless appeal.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-medium tracking-[0.25em] text-gold uppercase">
          Our Story
        </p>
        <h1 className="mt-3 font-heading text-3xl text-primary sm:text-4xl">
          {siteConfig.slogan}
        </h1>

        <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">{siteConfig.name}</span>{" "}
            is a trusted saree destination at {siteConfig.address}. For years,
            families across Ghosi and Mau have visited our shop at Badagaon Bazar
            for bridal silks, festive weaves, and everyday cottons — chosen with
            care for quality, drape, and lasting beauty.
          </p>
          <p>
            From Banarasi zari and Kanjivaram temple borders to breezy chiffons
            and handloom cottons, we bring together pieces that honour
            India&apos;s weaving heritage while suiting the way women dress
            today. Whether you are shopping for a wedding mandap or a quiet
            office morning, we believe the right saree should make you feel
            effortlessly elegant.
          </p>
          <p>
            Browse our catalogue online at your leisure — when a saree speaks
            to you, reach out on WhatsApp at{" "}
            <a
              href={`tel:+91${siteConfig.phone}`}
              className="font-medium text-primary hover:underline"
            >
              +91 {siteConfig.phone}
            </a>{" "}
            or visit us in person. We are here to help you find the perfect
            drape.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/collections"
            className={cn(buttonVariants({ size: "lg" }), "h-12")}
          >
            Explore Collections
          </Link>
          <a
            href={getWhatsAppUrl("Hi, I'd like to know more about your sarees.")}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 border-emerald text-emerald hover:bg-emerald/10",
            )}
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}
