import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectCardProps } from "../types";
import { ExternalLink, Github, Calendar, Star, GitFork } from "lucide-react";
import Image from "next/image";
import { getTechIcon, getLanguageColor } from "../utils/techIcons";

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50 hover:border-border bg-card/50 backdrop-blur-sm">
      {project.image && (
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          {project.featured && (
            <Badge variant="secondary" className="shrink-0 text-xs">
              ⭐ Featured
            </Badge>
          )}
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </CardHeader>

      <CardContent className="pt-0 pb-4">
        {/* Technologies */}
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium mb-2 text-foreground/80">Teknolojiler</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 6).map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-secondary/50 rounded-full border border-border/30"
                >
                                      <Image src={getTechIcon(tech)} alt={tech} width={16} height={16} className="shrink-0" />
                  <span className="text-xs font-medium text-secondary-foreground">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* GitHub Stats */}
          {(project.starCount !== undefined || project.forkCount !== undefined) && (
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {project.starCount !== undefined && (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  <span>{project.starCount}</span>
                </div>
              )}
              {project.forkCount !== undefined && (
                <div className="flex items-center gap-1">
                  <GitFork className="h-3 w-3" />
                  <span>{project.forkCount}</span>
                </div>
              )}
              {project.language && (
                <div className="flex items-center gap-1">
                  <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: getLanguageColor(project.language) }}
                  />
                  <span>{project.language}</span>
                </div>
              )}
            </div>
          )}

          {/* Status and Date */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(project.date).toLocaleDateString('tr-TR')}</span>
            </div>
            <Badge
              variant={project.status === 'completed' ? 'default' : 
                       project.status === 'in-progress' ? 'secondary' : 
                       project.status === 'archived' ? 'outline' : 'outline'}
              className="text-xs"
            >
              {project.status === 'completed' ? '✅ Tamamlandı' :
               project.status === 'in-progress' ? '🚧 Devam Ediyor' : 
               project.status === 'archived' ? '📦 Arşivlendi' : '📋 Planlandı'}
            </Badge>
          </div>
        </div>
      </CardContent>

      {/* Action Buttons */}
      {(project.liveUrl || project.githubUrl) && (
        <CardFooter className="pt-0 gap-2">
          {project.liveUrl && (
            <Button
              variant="default"
              size="sm"
              className="flex-1"
              asChild
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Canlı Demo
              </a>
            </Button>
          )}

          {project.githubUrl && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              asChild
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}