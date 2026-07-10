import { cn } from "@/lib/utils";

type SareeImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function SareeImage({
  src,
  alt,
  className,
  priority = false,
}: SareeImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[linear-gradient(135deg,oklch(0.92_0.03_15),oklch(0.88_0.05_82))]",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />
    </div>
  );
}
