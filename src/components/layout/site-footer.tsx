import Link from "next/link";

import { SiteLogo } from "@/components/brand/site-logo";
import { footerNavLinks, getWhatsAppUrl, siteConfig, socialLinks } from "@/lib/navigation";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M14 8.5V7.2c0-.7.5-1.2 1.1-1.2H17V3h-2.4C12.8 3 11 4.8 11 7.1V8.5H9v3h2V21h3v-9.5h2.6l.4-3H14z" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.719-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

const socialIconMap = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  pinterest: PinterestIcon,
} as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <SiteLogo showText={false} className="inline-flex" />
            <div>
              <p className="font-heading text-xl text-primary sm:text-2xl">
                {siteConfig.name}
              </p>
              <p className="mt-1 font-heading text-sm italic text-gold sm:text-base">
                {siteConfig.slogan}
              </p>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = socialIconMap[social.icon];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="font-heading text-sm tracking-[0.15em] text-foreground uppercase">
              Quick Links
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              {footerNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-sm tracking-[0.15em] text-foreground uppercase">
              Visit Us
            </h2>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <p>{siteConfig.hours}</p>
              <p>{siteConfig.address}</p>
              <p>
                <a
                  href={`tel:+91${siteConfig.phone}`}
                  className="transition-colors hover:text-primary"
                >
                  +91 {siteConfig.phone}
                </a>
              </p>
              <p>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-emerald transition-colors hover:text-emerald/80"
                >
                  WhatsApp us
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted-foreground">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Crafted with care · Catalogue showcase only
          </p>
        </div>
      </div>
    </footer>
  );
}
