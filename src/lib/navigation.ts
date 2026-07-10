export const mainNavLinks = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "Search", href: "/search" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNavLinks = [
  { label: "Silk Sarees", href: "/collections/silk" },
  { label: "Banarasi", href: "/collections/banarasi" },
  { label: "Kanjivaram", href: "/collections/kanjivaram" },
  { label: "Cotton", href: "/collections/cotton" },
  { label: "Search", href: "/search" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: "instagram" as const,
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: "facebook" as const,
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com",
    icon: "pinterest" as const,
  },
] as const;

export const siteConfig = {
  name: "Eshaal Saree & Adan Saree",
  slogan: "Every Thread, A Tradition. Every Drape, Your Story.",
  tagline: "Every Thread, A Tradition.",
  location: "Badagaon Bazar, Ghosi Mau",
  description:
    "Premium silks, Banarasi weaves, and Kanjivaram classics — handpicked at Badagaon Bazar, Ghosi Mau.",
  address: "Badagaon Bazar, Ghosi, Mau, Uttar Pradesh",
  phone: "9415361831",
  /** WhatsApp wa.me format — India country code + number, no spaces */
  whatsappPhone: "919415361831",
  hours: "Mon – Sat, 10:00 AM – 7:00 PM",
} as const;

export function getWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappPhone}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
