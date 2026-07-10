import { getWhatsAppUrl, siteConfig } from "@/lib/navigation";

export const metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} — we'd love to hear from you.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-xl">
        <p className="text-xs font-medium tracking-[0.25em] text-gold uppercase">
          Contact
        </p>
        <h1 className="mt-3 font-heading text-3xl text-primary sm:text-4xl">
          We&apos;d love to hear from you
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Questions about a saree, custom draping advice, or visiting our shop
          at Badagaon Bazar — send us a message or reach out on WhatsApp.
        </p>

        <form
          action="https://formspree.io/f/placeholder"
          method="POST"
          className="mt-10 space-y-5"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1.5 h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="mt-1.5 h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="mt-1.5 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <button
            type="submit"
            className="h-11 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto sm:px-8"
          >
            Send Message
          </button>
        </form>

        <div className="mt-10 rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Visit us</p>
          <p className="mt-2">{siteConfig.name}</p>
          <p className="mt-1">{siteConfig.address}</p>
          <p className="mt-1">{siteConfig.hours}</p>
          <p className="mt-3">
            <a
              href={`tel:+91${siteConfig.phone}`}
              className="font-medium text-primary hover:underline"
            >
              +91 {siteConfig.phone}
            </a>
          </p>
          <p className="mt-2">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald hover:underline"
            >
              Chat on WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
