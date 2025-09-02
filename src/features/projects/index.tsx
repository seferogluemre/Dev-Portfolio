"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { useLanguage } from "@/hooks";
import { ProjectCard } from "./components/project-card";
import { useGitHubProjects } from "./hooks/useGitHubProjects";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle } from "lucide-react";

export default function ProjectsPage() {
  const { t } = useLanguage();
  const { projects, loading, error, refetch } = useGitHubProjects();

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
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              GitHub hesabımdan otomatik olarak çekilen projelerim. Gerçek zamanlı veriler ile güncel tutulmaktadır.
            </p>
            
            {/* Refresh Button */}
            <Button
              onClick={refetch}
              disabled={loading}
              variant="outline"
              size="sm"
              className="mb-8"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Yükleniyor...' : 'Yenile'}
            </Button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">
                  Projeler Yükleniyor...
                </h3>
                <p className="text-muted-foreground">
                  GitHub API'den projeler çekiliyor. Lütfen bekleyiniz.
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <AlertCircle className="h-8 w-8 mx-auto mb-4 text-destructive" />
                <h3 className="text-xl font-semibold mb-2 text-destructive">
                  Hata Oluştu
                </h3>
                <p className="text-muted-foreground mb-4">
                  {error}
                </p>
                <Button onClick={refetch} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Tekrar Dene
                </Button>
              </div>
            </div>
          )}

          {!loading && !error && projects.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
              
              {/* Projects Summary */}
              <div className="text-center mt-12 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Toplam {projects.length} 
                </p>
              </div>
            </>
          )}

          {!loading && !error && projects.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-semibold mb-2">
                  Henüz Proje Yok
                </h3>
                <p className="text-muted-foreground mb-4">
                  GitHub hesabında henüz public proje bulunmuyor.
                </p>
                <Button onClick={refetch} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Tekrar Kontrol Et
                </Button>
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
