"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { mainNavLinks, siteConfig } from "@/lib/navigation";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useGSAP(
    () => {
      if (!overlayRef.current || !panelRef.current) return;

      if (menuOpen) {
        gsap.set(overlayRef.current, { display: "block" });
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power2.out" },
        );
        gsap.fromTo(
          panelRef.current,
          { x: "100%", opacity: 0.6 },
          { x: "0%", opacity: 1, duration: 0.5, ease: "power3.out" },
        );
      } else {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            if (overlayRef.current) {
              gsap.set(overlayRef.current, { display: "none" });
            }
          },
        });
        gsap.to(panelRef.current, {
          x: "100%",
          opacity: 0.6,
          duration: 0.35,
          ease: "power2.in",
        });
      }
    },
    { scope: headerRef, dependencies: [menuOpen] },
  );

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-border/80 bg-background/95 shadow-sm backdrop-blur-md"
          : "border-transparent bg-background",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex flex-col leading-none"
          onClick={closeMenu}
        >
          <span className="font-heading text-lg tracking-wide text-primary sm:text-xl lg:text-2xl">
            {siteConfig.name}
          </span>
          <span className="mt-0.5 hidden text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            {siteConfig.tagline}
          </span>
          {/* <span className="mt-0.5 hidden text-[0.6rem] tracking-wide text-muted-foreground/80 md:block">
            {siteConfig.location}
          </span> */}
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          {mainNavLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-foreground/75 hover:text-primary",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      <div
        ref={overlayRef}
        id="mobile-nav"
        className="fixed inset-0 z-40 md:hidden"
        style={{ display: "none" }}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="absolute inset-0 bg-foreground/40"
          aria-label="Close menu"
          onClick={closeMenu}
          tabIndex={menuOpen ? 0 : -1}
        />

        <div
          ref={panelRef}
          className="absolute top-0 right-0 flex h-full w-[min(100%,20rem)] flex-col border-l border-border bg-background shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-4">
            <span className="font-heading text-lg text-primary">Menu</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <X className="size-5" />
            </Button>
          </div>

          <nav
            className="flex flex-1 flex-col gap-1 p-4"
            aria-label="Mobile navigation"
          >
            {mainNavLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={cn(
                    "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-border p-4">
            <p className="text-xs leading-relaxed text-muted-foreground">
              {siteConfig.slogan}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
