import { getAllSarees } from "@/lib/sarees";
import { SearchPageClient } from "@/components/search/search-page-client";

export const metadata = {
  title: "Search",
  description: "Search our saree catalogue by name, fabric, colour, or tags.",
};

export default async function SearchPage() {
  const sarees = await getAllSarees();
  return <SearchPageClient sarees={sarees} />;
}
