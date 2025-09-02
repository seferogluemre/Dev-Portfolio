import { ProjectCard } from "./project-card";
import { ProjectData } from "../types";
import { Pin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PinnedSectionProps {
  pinnedProjects: ProjectData[];
  onShowAllProjects: () => void;
  showAllProjects: boolean;
  loadingOthers: boolean;
}

export function PinnedSection({ 
  pinnedProjects, 
  onShowAllProjects, 
  showAllProjects,
  loadingOthers 
}: PinnedSectionProps) {
  if (pinnedProjects.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      {/* Pinned Section Header */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <Pin className="h-5 w-5 text-primary" />
        <h2 className="text-2xl md:text-3xl font-bold">
          Pinned Projects
        </h2>
        <Pin className="h-5 w-5 text-primary" />
      </div>

      <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
        GitHub profilimde sabitlenmiş öne çıkan projelerim. En çok gurur duyduğum ve üzerinde çalıştığım projeler.
      </p>

      {/* Pinned Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
        {pinnedProjects.map((project, index) => (
          <div
            key={project.id}
            className="animate-in fade-in slide-in-from-bottom-4"
            style={{
              animationDelay: `${index * 150}ms`,
              animationFillMode: 'both'
            }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* Show All Projects Button */}
      <div className="text-center">
        <Button
          onClick={onShowAllProjects}
          variant="outline"
          size="lg"
          className="group transition-all hover:scale-105"
          disabled={loadingOthers}
        >
          {loadingOthers ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
              Yükleniyor...
            </>
          ) : showAllProjects ? (
            <>
              <ChevronDown className="h-4 w-4 mr-2 rotate-180 transition-transform" />
              Tüm Projeleri Gizle
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-2 group-hover:translate-y-1 transition-transform" />
              Tüm Projeleri Göster
            </>
          )}
        </Button>
      </div>
    </section>
  );
}
