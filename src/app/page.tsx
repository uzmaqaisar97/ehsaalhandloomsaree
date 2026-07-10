import { FeaturedCollections } from "@/components/home/featured-collections";
import { FooterCtaBanner } from "@/components/home/footer-cta-banner";
import { HeroSection } from "@/components/home/hero-section";
import { ShopByCategory } from "@/components/home/shop-by-category";
import { ShopByOccasion } from "@/components/home/shop-by-occasion";
import { getHomeFeaturedSarees } from "@/lib/sarees";

export default async function Home() {
  const featuredSarees = await getHomeFeaturedSarees(6);

  return (
    <>
      <HeroSection />
      <FeaturedCollections sarees={featuredSarees} />
      <ShopByCategory />
      <ShopByOccasion />
      <FooterCtaBanner />
    </>
  );
}
