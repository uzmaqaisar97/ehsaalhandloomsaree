"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SareeCard } from "@/components/saree/saree-card";
import type { Saree } from "@/types/saree";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type FeaturedCollectionsProps = {
  sarees: Saree[];
};

export function FeaturedCollections({ sarees }: FeaturedCollectionsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll("[data-featured-card]");

      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        y: 36,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="border-t border-border bg-background py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.25em] text-gold uppercase">
            Featured Collections
          </p>
          <h2 className="mt-3 font-heading text-3xl text-primary sm:text-4xl">
            Pieces we love right now
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            A handpicked selection across silks, Banarasi, and Kanjivaram —
            perfect for weddings and festive celebrations.
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {sarees.map((saree) => (
            <div key={saree.slug} data-featured-card>
              <SareeCard saree={saree} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
