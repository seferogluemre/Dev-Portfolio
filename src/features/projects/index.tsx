"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { useLanguage } from "@/hooks";
import { projects } from "./data";
import { Card } from "@/components/ui/card";
import { ProjectCard } from "./components/project-card";

export default function ProjectsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="w-full max-w-6xl mx-auto px-6 py-8 md:py-12">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
              {t.projects}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Çalıştığım projeler ve geliştirdiğim uygulamalar. Yakında güncellenecek...
            </p>
          </div>

          {/* Projects Grid */}
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            /* Coming Soon */
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-semibold mb-2">
                  Yakında...
                </h3>
                <p className="text-muted-foreground mb-4">
                  Projeler sayfası şu anda geliştiriliyor. Yakında tüm projelerimi burada görebileceksiniz.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export type { ProjectData } from "./types";
