"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import HeroSection from "./components/HeroSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}

export type { HeroData } from "./types";
export { HeroSection };