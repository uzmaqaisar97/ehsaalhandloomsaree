import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient
          id="logo-gold"
          x1="8"
          y1="6"
          x2="56"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E8C56A" />
          <stop offset="1" stopColor="#B8892E" />
        </linearGradient>
        <linearGradient
          id="logo-maroon"
          x1="12"
          y1="10"
          x2="52"
          y2="54"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8B1E3F" />
          <stop offset="1" stopColor="#5C1228" />
        </linearGradient>
        <linearGradient
          id="logo-silk"
          x1="20"
          y1="18"
          x2="44"
          y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFF5E8" stopOpacity="0.95" />
          <stop offset="1" stopColor="#F2D4A5" stopOpacity="0.75" />
        </linearGradient>
      </defs>
      <circle
        cx="32"
        cy="32"
        r="30"
        stroke="url(#logo-gold)"
        strokeWidth="2.5"
        fill="url(#logo-maroon)"
      />
      <circle
        cx="32"
        cy="32"
        r="24"
        stroke="url(#logo-gold)"
        strokeWidth="1"
        strokeOpacity="0.55"
      />
      <path
        d="M18 22C24 18 34 17 42 20C46 21.5 48 24 47 28C45.5 34 38 40 32 44C26 40 20.5 33 18 26C17 23.5 17 23.5 18 22Z"
        fill="url(#logo-silk)"
        stroke="url(#logo-gold)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M24 24C26 30 27 36 28 41"
        stroke="#B8892E"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M30 23C31 30 31.5 37 32 42"
        stroke="#B8892E"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M36 24C35 31 34.5 37 34 41"
        stroke="#B8892E"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M27 48H37M27 48C27 44.5 29 42.5 32 42.5C35 42.5 37 44.5 37 48M27 48V52.5H37"
        stroke="url(#logo-gold)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="46" cy="18" r="2.2" fill="url(#logo-gold)" />
    </svg>
  );
}
