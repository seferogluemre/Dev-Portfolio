import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectCardProps } from "../types";
import { ExternalLink, Github, Calendar, Star, GitFork, Eye } from "lucide-react";
import Image from "next/image";

// Technology icon mapping
const getTechIcon = (tech: string) => {
  const techLower = tech.toLowerCase();

  const iconMap: { [key: string]: string } = {
    'react': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg?utm_source=chatgpt.com',
    'next.js': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg?utm_source=chatgpt.com',
    'vue': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg?utm_source=chatgpt.com',
    'angular': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg?utm_source=chatgpt.com',
    'typescript': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg?utm_source=chatgpt.com',
    'javascript': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg?utm_source=chatgpt.com',
    'node.js': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg?utm_source=chatgpt.com',
    'nodejs': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg?utm_source=chatgpt.com',
    'python': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg?utm_source=chatgpt.com',
    'django': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-original.svg?utm_source=chatgpt.com',
    'flask': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/flask/flask-original.svg?utm_source=chatgpt.com',
    'express': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg?utm_source=chatgpt.com',
    'mongodb': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg?utm_source=chatgpt.com',
    'postgresql': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg?utm_source=chatgpt.com',
    'mysql': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg?utm_source=chatgpt.com',
    'redis': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg?utm_source=chatgpt.com',
    'docker': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg?utm_source=chatgpt.com',
    'kubernetes': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/kubernetes/kubernetes-original.svg?utm_source=chatgpt.com',
    'aws': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original.svg?utm_source=chatgpt.com',
    'firebase': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-original.svg?utm_source=chatgpt.com',
    'tailwind': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg?utm_source=chatgpt.com',
    'css': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg?utm_source=chatgpt.com',
    'html': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg?utm_source=chatgpt.com',
    'git': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg?utm_source=chatgpt.com',
    'figma': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg?utm_source=chatgpt.com',
    'photoshop': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/photoshop/photoshop-original.svg?utm_source=chatgpt.com'
  };

  return iconMap[techLower] || 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg?utm_source=chatgpt.com';
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50 hover:border-border bg-card/50 backdrop-blur-sm">
      {/* Project Image */}
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
              {project.technologies.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-secondary/50 rounded-full border border-border/30"
                >
                  <span className="text-sm"><Image src={getTechIcon(tech)} alt={tech} width={16} height={16} /></span>
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
                  <div className="w-2 h-2 rounded-full bg-primary" />
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