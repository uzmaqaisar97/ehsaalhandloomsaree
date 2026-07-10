import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-xs font-medium tracking-[0.25em] text-gold uppercase">
        404
      </p>
      <h1 className="mt-3 font-heading text-3xl text-primary">Page not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-8")}>
        Back to Home
      </Link>
    </div>
  );
}
