import { useState, useEffect } from "react";
import { ProjectCard } from "./project-card";
import { ProjectFilters } from "./ProjectFilters";
import { ProjectData } from "../types";
import { FolderOpen, AlertCircle } from "lucide-react";

interface AllProjectsSectionProps {
  otherProjects: ProjectData[];
  showAllProjects: boolean;
}

export function AllProjectsSection({ otherProjects, showAllProjects }: AllProjectsSectionProps) {
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);
  const [visibleProjects, setVisibleProjects] = useState<ProjectData[]>([]);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    setFilteredProjects(otherProjects);
  }, [otherProjects]);

  useEffect(() => {
    if (showAllProjects && filteredProjects.length > 0) {
      setVisibleProjects([]);
      setAnimationComplete(false);

      filteredProjects.forEach((project, index) => {
        setTimeout(() => {
          setVisibleProjects(prev => [...prev, project]);
          
          if (index === filteredProjects.length - 1) {
            setTimeout(() => setAnimationComplete(true), 300);
          }
        }, index * 150); 
      });
    } else if (!showAllProjects) {
      setVisibleProjects([]);
      setAnimationComplete(false);
    }
  }, [showAllProjects, filteredProjects]);

  useEffect(() => {
    if (showAllProjects && animationComplete) {
      setVisibleProjects(filteredProjects);
    }
  }, [filteredProjects, showAllProjects, animationComplete]);

  if (!showAllProjects) {
    return null;
  }

  return (
    <section className="animate-in fade-in slide-in-from-bottom-6 duration-500">
      {/* All Projects Header */}
      <div className="flex items-center justify-center gap-3 mb-8 pt-12 border-t border-border">
        <FolderOpen className="h-5 w-5 text-primary" />
        <h2 className="text-2xl md:text-3xl font-bold">
          All Projects
        </h2>
        <FolderOpen className="h-5 w-5 text-primary" />
      </div>


      {otherProjects.length > 0 && (
        <ProjectFilters 
          projects={otherProjects} 
          onFilter={setFilteredProjects} 
        />
      )}

      {/* Projects Count */}
      <div className="text-center mb-6">
        <p className="text-sm text-muted-foreground">
          {visibleProjects.length === filteredProjects.length 
            ? `${filteredProjects.length} proje gösteriliyor`
            : `${visibleProjects.length} / ${filteredProjects.length} proje yüklendi`
          }
        </p>
      </div>

      {/* Animated Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {visibleProjects.map((project) => (
            <div
              key={project.id}
              className="animate-in fade-in slide-in-from-bottom-4"
              style={{
                animationDelay: '0ms', 
                animationFillMode: 'both'
              }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        /* No Results */
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <AlertCircle className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">
              Sonuç Bulunamadı
            </h3>
            <p className="text-muted-foreground">
              Arama kriterlerinize uygun proje bulunamadı. Farklı anahtar kelimeler veya filtreler deneyin.
            </p>
          </div>
        </div>
      )}

      {/* Loading Animation Indicator */}
      {!animationComplete && visibleProjects.length < filteredProjects.length && (
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
            Projeler yükleniyor...
          </div>
        </div>
      )}
    </section>
  );
}
