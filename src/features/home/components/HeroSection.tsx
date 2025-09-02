"use client";

import { useLanguage } from "@/hooks";
import { Hand } from "lucide-react";
import { HeroData } from "../types";

interface HeroSectionProps {
  data: HeroData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-4xl">
        {/* Ana Başlık */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {t.heroGreeting} <Hand 
              className="inline-block h-12 w-12 md:h-16 md:w-16 text-foreground" 
              style={{
                animation: 'wave 2.5s cubic-bezier(0.4, 0.0, 0.6, 1) infinite',
                transformOrigin: '75% 80%'
              }}
            /> {t.heroName.replace('Berat', '')}<span className="text-primary">Berat</span>,
            <br />
            {t.heroPortfolio}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            {t.heroDescription}
          </p>
        </div>


      </div>
    </div>
  );
}
