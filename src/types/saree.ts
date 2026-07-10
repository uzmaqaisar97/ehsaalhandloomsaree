export const SAREE_CATEGORIES = [
  "silk",
  "cotton",
  "banarasi",
  "kanjivaram",
  "chiffon",
  "georgette",
  "linen",
] as const;

export type SareeCategory = (typeof SAREE_CATEGORIES)[number];

export const SAREE_OCCASIONS = [
  "wedding",
  "festive",
  "casual",
  "office",
  "party",
  "reception",
] as const;

export type SareeOccasion = (typeof SAREE_OCCASIONS)[number];

export type Saree = {
  slug: string;
  title: string;
  category: SareeCategory;
  fabric: string;
  color: string[];
  price: number;
  originalPrice?: number;
  blousePiece?: boolean;
  occasion?: string[];
  images: string[];
  description: string;
  inStock: boolean;
  tags?: string[];
};

export type SareeSortOption =
  | "price-asc"
  | "price-desc"
  | "title-asc"
  | "title-desc";

export type SareeFilters = {
  fabrics?: string[];
  colors?: string[];
  occasions?: string[];
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
};

export function isSareeCategory(value: string): value is SareeCategory {
  return (SAREE_CATEGORIES as readonly string[]).includes(value);
}

export function formatCategoryLabel(category: SareeCategory): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export function formatOccasionLabel(occasion: string): string {
  return occasion.charAt(0).toUpperCase() + occasion.slice(1);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function getDiscountPercent(price: number, originalPrice: number): number {
  if (originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
