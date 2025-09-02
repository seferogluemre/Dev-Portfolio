"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { useLanguage } from "@/hooks";
import { PinnedSection } from "./components/PinnedSection";
import { AllProjectsSection } from "./components/AllProjectsSection";
import { ContributionGraph } from "./components/ContributionGraph";
import { TeknofestSection } from "./components/TeknofestSection";
import { usePinnedProjects } from "./hooks/usePinnedProjects";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle } from "lucide-react";

export default function ProjectsPage() {
  const { t } = useLanguage();
  const { 
    pinnedProjects, 
    otherProjects, 
    teknofestProjects,
    loading, 
    error, 
    refetch,
    showAllProjects,
    toggleShowAll,
    loadingOthers
  } = usePinnedProjects();

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
              GitHub hesabımdan otomatik olarak çekilen projelerim. Pinned projeler ve tüm repository'lerim.
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
                  GitHub API'den pinned ve tüm projeler çekiliyor. Lütfen bekleyiniz.
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

          {/* GitHub Contribution Graph */}
          {!loading && !error && (
            <div className="mb-8 md:mb-12">
              <ContributionGraph />
            </div>
          )}

          {/* Pinned Projects Section */}
          {!loading && !error && (
            <PinnedSection
              pinnedProjects={pinnedProjects}
              onShowAllProjects={toggleShowAll}
              showAllProjects={showAllProjects}
              loadingOthers={loadingOthers}
            />
          )}

       
          {/* All Projects Section */}
          {!loading && !error && (
            <AllProjectsSection
              otherProjects={otherProjects}
              showAllProjects={showAllProjects}
            />
          )}

          {/* Empty State */}
          {!loading && !error && pinnedProjects.length === 0 && otherProjects.length === 0 && (
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