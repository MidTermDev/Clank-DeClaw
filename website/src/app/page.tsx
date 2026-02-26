import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import SwapSection from "@/components/SwapSection";
import ChangelogSection from "@/components/ChangelogSection";
import Footer from "@/components/Footer";
import StatsBanner from "@/components/StatsBanner";
import TipOfTheDay from "@/components/TipOfTheDay";
import SocialProof from "@/components/SocialProof";
import ActivitySection from "@/components/ActivitySection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <StatsBanner />
      <HeroSection />
      <SwapSection />
      <AboutSection />
      <SocialProof />
      <GallerySection />
      <ActivitySection />
      <ChangelogSection />
      <Footer />
      <TipOfTheDay />
    </main>
  );
}
