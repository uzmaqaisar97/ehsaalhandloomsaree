import Link from "next/link";

import { LogoMark } from "@/components/brand/logo-mark";
import { siteConfig } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
  showText?: boolean;
  href?: string;
  onClick?: () => void;
};

export function SiteLogo({
  className,
  showText = true,
  href = "/",
  onClick,
}: SiteLogoProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn("group flex items-center gap-2.5 sm:gap-3", className)}
      aria-label={siteConfig.name}
    >
      <LogoMark className="size-10 sm:size-11" />
      {showText && (
        <div className="min-w-0 leading-none">
          <span className="block font-heading text-base tracking-wide text-primary sm:text-lg lg:text-xl">
            {siteConfig.name}
          </span>
          <span className="mt-1 hidden text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground sm:block">
            {siteConfig.tagline}
          </span>
        </div>
      )}
    </Link>
  );
}
