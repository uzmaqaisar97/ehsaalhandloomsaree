import Image from "next/image";

import { cn } from "@/lib/utils";

type SareeImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function SareeImage({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 33vw",
}: SareeImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[linear-gradient(135deg,oklch(0.92_0.03_15),oklch(0.88_0.05_82))]",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
