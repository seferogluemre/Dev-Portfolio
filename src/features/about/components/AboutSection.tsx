"use client";

import { useLanguage } from "@/hooks";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AboutData } from "../types";
import { 
  Code2, 
  Database, 
  Smartphone, 
  Monitor, 
  Globe, 
  Wrench,
  BookOpen,
  Target
} from "lucide-react";

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
          <div className="space-y-8">
            {/* Main Description */}
            <div className="space-y-4 text-lg leading-relaxed">
              <p>{t.aboutDescription}</p>
              <p>{t.aboutCurrentWork}</p>
              <p>{t.aboutFreeTime}</p>
            </div>

            {/* Skills & Approach */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Yaklaşım & Beceriler</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t.aboutSkills}
              </p>
            </div>

            {/* Technical Experience */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Teknik Deneyim</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t.aboutExperience}
              </p>

              {/* Technology Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Python & Backend */}
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                      <Code2 className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-2">Python & Backend</h4>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">Python</Badge>
                        <Badge variant="secondary" className="text-xs">OOP</Badge>
                        <Badge variant="secondary" className="text-xs">Django</Badge>
                        <Badge variant="secondary" className="text-xs">PyQt5</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Nesne tabanlı programlama, web uygulamaları ve masaüstü uygulaması geliştirme
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Database */}
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-green-100 text-green-600">
                      <Database className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-2">Veritabanı</h4>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">MySQL</Badge>
                        <Badge variant="secondary" className="text-xs">SQLite</Badge>
                        <Badge variant="secondary" className="text-xs">MongoDB</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Farklı veritabanı servisleri ile çalışma deneyimi
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Mobile Development */}
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                      <Smartphone className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-2">Mobil Geliştirme</h4>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">Android</Badge>
                        <Badge variant="secondary" className="text-xs">Java</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Android uygulamaları geliştirme deneyimi
                      </p>
                    </div>
                  </div>
                </Card>

                {/* .NET & C# */}
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                      <Wrench className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-2">.NET Ecosystem</h4>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">C#</Badge>
                        <Badge variant="secondary" className="text-xs">.NET</Badge>
                        <Badge variant="secondary" className="text-xs">Entity Framework</Badge>
                        <Badge variant="secondary" className="text-xs">ADO.NET</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Microsoft teknolojileri ile geliştirme deneyimi
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Current Focus */}
              <Card className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-2">Şu Anki Odak Noktam</h4>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge className="text-xs">JavaScript</Badge>
                      <Badge className="text-xs">TypeScript</Badge>
                      <Badge className="text-xs">React</Badge>
                      <Badge className="text-xs">Next.js</Badge>
                      <Badge className="text-xs">Node.js</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      1+ yıldır JavaScript ekosisteminde fullstack projeler geliştiriyorum
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
