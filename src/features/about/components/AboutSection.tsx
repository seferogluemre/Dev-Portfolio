"use client";

import { useLanguage } from "@/hooks";
import Image from "next/image";
import { AboutData } from "../types";

interface AboutSectionProps {
  data: AboutData;
}

export default function AboutSection({ data }: AboutSectionProps) {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-8 md:py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.aboutTitle}</h1>
        <div className="w-16 h-0.5 bg-primary"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-12 items-start">
        {/* Left Column - Avatar and Basic Info */}
        <div className="md:col-span-1">
          <div className="space-y-6">
            {/* Avatar */}
            <div className="relative w-48 h-48 mx-auto md:mx-0 rounded-full overflow-hidden bg-muted">
              {data.avatar ? (
                <Image
                  src={data.avatar}
                  alt={data.name}
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  👨‍💻
                </div>
              )}
            </div>

            {/* Name and Title */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
              <p className="text-muted-foreground mb-1">{data.title}</p>
              {data.website && (
                <p className="text-sm text-muted-foreground">{data.website}</p>
              )}
            </div>


          </div>
        </div>

        {/* Right Column - Description */}
        <div className="md:col-span-2">
          <div className="space-y-6 text-lg leading-relaxed">
            <p>{t.aboutDescription}</p>
            <p>{t.aboutCurrentWork}</p>
            <p>{t.aboutFreeTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
