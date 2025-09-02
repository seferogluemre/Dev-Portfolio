"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import AboutSection from "./components/AboutSection";
import { aboutData } from "./data";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <AboutSection data={aboutData} />
      </main>
      <Footer />
    </div>
  );
}

export type { AboutData } from "./types";
export { AboutSection };

