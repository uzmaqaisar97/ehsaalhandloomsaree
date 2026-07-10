import sareesData from "@/data/sarees.json";
import {
  isSareeCategory,
  type Saree,
  type SareeCategory,
  type SareeFilters,
  type SareeSortOption,
} from "@/types/saree";

/**
 * Abstraction for the saree catalogue data source.
 * Swap `localJsonDataSource` for a CMS-backed implementation later
 * without changing page/component call sites.
 */
export interface SareeDataSource {
  getAll(): Promise<Saree[]>;
  getBySlug(slug: string): Promise<Saree | undefined>;
  getByCategory(category: SareeCategory): Promise<Saree[]>;
  getFeatured(limit?: number): Promise<Saree[]>;
  getHomeFeatured(limit?: number): Promise<Saree[]>;
  getFilterOptions(category?: SareeCategory): Promise<{
    fabrics: string[];
    colors: string[];
    occasions: string[];
    priceRange: { min: number; max: number };
  }>;
}

function assertSarees(data: unknown): Saree[] {
  if (!Array.isArray(data)) {
    throw new Error("Saree catalogue must be an array.");
  }
  return data as Saree[];
}

function sortSarees(sarees: Saree[], sort: SareeSortOption): Saree[] {
  const sorted = [...sarees];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "title-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case "title-asc":
    default:
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
  }
}

function applyFilters(sarees: Saree[], filters: SareeFilters): Saree[] {
  return sarees.filter((saree) => {
    if (filters.inStockOnly && !saree.inStock) {
      return false;
    }

    if (filters.fabrics?.length && !filters.fabrics.includes(saree.fabric)) {
      return false;
    }

    if (
      filters.colors?.length &&
      !filters.colors.some((color) => saree.color.includes(color))
    ) {
      return false;
    }

    if (filters.minPrice !== undefined && saree.price < filters.minPrice) {
      return false;
    }

    if (filters.maxPrice !== undefined && saree.price > filters.maxPrice) {
      return false;
    }

    if (
      filters.occasions?.length &&
      !filters.occasions.some((occasion) => saree.occasion?.includes(occasion))
    ) {
      return false;
    }

    return true;
  });
}

const localJsonDataSource: SareeDataSource = {
  async getAll() {
    return assertSarees(sareesData);
  },

  async getBySlug(slug) {
    const sarees = await this.getAll();
    return sarees.find((saree) => saree.slug === slug);
  },

  async getByCategory(category) {
    const sarees = await this.getAll();
    return sarees.filter((saree) => saree.category === category);
  },

  async getFeatured(limit = 4) {
    const sarees = await this.getAll();
    return sarees.filter((saree) => saree.inStock).slice(0, limit);
  },

  async getHomeFeatured(limit = 6) {
    const sarees = await this.getAll();
    const inStock = sarees.filter((saree) => saree.inStock);
    const preferred = inStock.filter((saree) =>
      saree.occasion?.some(
        (occasion) => occasion === "wedding" || occasion === "festive",
      ),
    );

    const selected: Saree[] = [];
    const usedCategories = new Set<SareeCategory>();
    const usedSlugs = new Set<string>();

    const addSaree = (saree: Saree) => {
      if (selected.length >= limit || usedSlugs.has(saree.slug)) return;
      selected.push(saree);
      usedCategories.add(saree.category);
      usedSlugs.add(saree.slug);
    };

    for (const saree of preferred) {
      if (selected.length >= limit) break;
      if (!usedCategories.has(saree.category)) {
        addSaree(saree);
      }
    }

    for (const saree of preferred) {
      if (selected.length >= limit) break;
      addSaree(saree);
    }

    for (const saree of inStock) {
      if (selected.length >= limit) break;
      addSaree(saree);
    }

    return selected;
  },

  async getFilterOptions(category) {
    const sarees = category
      ? await this.getByCategory(category)
      : await this.getAll();

    const fabrics = [...new Set(sarees.map((saree) => saree.fabric))].sort();
    const colors = [
      ...new Set(sarees.flatMap((saree) => saree.color)),
    ].sort();
    const occasions = [
      ...new Set(sarees.flatMap((saree) => saree.occasion ?? [])),
    ].sort();
    const prices = sarees.map((saree) => saree.price);

    return {
      fabrics,
      colors,
      occasions,
      priceRange: {
        min: prices.length ? Math.min(...prices) : 0,
        max: prices.length ? Math.max(...prices) : 0,
      },
    };
  },
};

/** Active data source — replace with a CMS client when ready. */
export const sareeDataSource: SareeDataSource = localJsonDataSource;

export async function getAllSarees(): Promise<Saree[]> {
  return sareeDataSource.getAll();
}

export async function getSareeBySlug(slug: string): Promise<Saree | undefined> {
  return sareeDataSource.getBySlug(slug);
}

export async function getSareesByCategory(
  category: SareeCategory,
): Promise<Saree[]> {
  return sareeDataSource.getByCategory(category);
}

export async function getFeaturedSarees(limit?: number): Promise<Saree[]> {
  return sareeDataSource.getFeatured(limit);
}

export async function getHomeFeaturedSarees(limit = 6): Promise<Saree[]> {
  return sareeDataSource.getHomeFeatured(limit);
}

export async function getFilteredSarees(
  category: SareeCategory,
  filters: SareeFilters = {},
  sort: SareeSortOption = "title-asc",
): Promise<Saree[]> {
  const categorySarees = await getSareesByCategory(category);
  return sortSarees(applyFilters(categorySarees, filters), sort);
}

export async function getFilteredAllSarees(
  filters: SareeFilters = {},
  sort: SareeSortOption = "title-asc",
): Promise<Saree[]> {
  const sarees = await getAllSarees();
  return sortSarees(applyFilters(sarees, filters), sort);
}

export async function getCategoryFilterOptions(category: SareeCategory) {
  return sareeDataSource.getFilterOptions(category);
}

export async function getAllSlugs(): Promise<string[]> {
  const sarees = await getAllSarees();
  return sarees.map((saree) => saree.slug);
}

export async function getAllCategories(): Promise<SareeCategory[]> {
  const sarees = await getAllSarees();
  return [...new Set(sarees.map((saree) => saree.category))];
}

export { isSareeCategory };
