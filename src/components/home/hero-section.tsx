"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/navigation";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

const heroImages = [
  "/images/sarees/placeholder-1.jpg",
  "/images/sarees/placeholder-3.jpg",
  "/images/sarees/placeholder-5.jpg",
  "/images/sarees/hero-blush.jpg",
];

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!contentRef.current) return;

      const items = contentRef.current.querySelectorAll("[data-hero-item]");
      gsap.from(items, {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.14,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100svh] items-end overflow-hidden"
    >
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
        {heroImages.map((src, index) => (
          <div key={src} className="relative">
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="50vw"
              priority={index === 0}
              aria-hidden
            />
            <div
              className={cn(
                "absolute inset-0",
                index % 2 === 0 ? "bg-primary/25" : "bg-foreground/15",
              )}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/20" />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-32 sm:px-6 sm:pb-20 lg:px-8"
      >
        <p
          data-hero-item
          className="text-xs font-medium tracking-[0.3em] text-gold uppercase sm:text-sm"
        >
          {siteConfig.tagline}
        </p>
        <h1
          data-hero-item
          className="mt-4 max-w-3xl font-heading text-4xl leading-tight text-primary sm:text-5xl lg:text-6xl"
        >
          Every Drape, Your Story
        </h1>
        <p
          data-hero-item
          className="mt-4 max-w-xl text-base leading-relaxed text-foreground/85 sm:text-lg"
        >
          {siteConfig.slogan} Visit {siteConfig.name} at {siteConfig.location}{" "}
          — handpicked silks, Banarasi weaves, and Kanjivaram classics for
          weddings, festivities, and everyday grace.
        </p>
        <div data-hero-item className="mt-8">
          <Link
            href="/collections"
            className={cn(buttonVariants({ size: "lg" }), "h-11 px-6 text-sm")}
          >
            Explore Collections
          </Link>
        </div>
      </div>
    </section>
  );
}
