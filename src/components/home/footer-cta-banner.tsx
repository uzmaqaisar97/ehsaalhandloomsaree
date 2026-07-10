import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function FooterCtaBanner() {
  return (
    <section className="border-t border-border bg-primary py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-medium tracking-[0.25em] text-gold uppercase">
          {siteConfig.tagline}
        </p>
        <h2 className="mt-3 font-heading text-2xl text-primary-foreground sm:text-3xl">
          Every Drape, Your Story
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
          From bridal Banarasi silks to everyday cottons — browse every weave at{" "}
          {siteConfig.location}.
        </p>
        <Link
          href="/collections"
          className={cn(
            buttonVariants({ variant: "secondary", size: "lg" }),
            "mt-8 h-11 border-0 bg-primary-foreground px-6 text-primary hover:bg-primary-foreground/90",
          )}
        >
          View All Collections
        </Link>
      </div>
    </section>
  );
}
