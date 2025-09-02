"use client";

import { useState } from "react";
import { TeknofestProject } from "../types/github";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Calendar, 
  Users, 
  Github, 
  ExternalLink, 
  Play, 
  Award,
  Lightbulb,
  Target,
  ChevronRight,
  Star
} from "lucide-react";
import Image from "next/image";

interface TeknofestSectionProps {
  projects: TeknofestProject[];
}

export function TeknofestSection({ projects }: TeknofestSectionProps) {
  const [selectedProject, setSelectedProject] = useState<TeknofestProject | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'finalist':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'finalist':
        return <Trophy className="h-4 w-4" />;
      case 'completed':
        return <Award className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'finalist':
        return 'Finalist';
      case 'completed':
        return 'Tamamlandı';
      default:
        return 'Katılımcı';
    }
  };

  return (
    <section className="py-12 md:py-16">
      <div className="mb-8 md:mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-500">
            <Trophy className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            TEKNOFEST Projeleri
          </h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Türkiye'nin en büyük teknoloji festivali TEKNOFEST'te takım arkadaşlarımla birlikte geliştirdiğimiz 
          inovatif projeler. Yapay zeka, IoT ve havacılık alanlarında yarışma deneyimlerim.
        </p>
      </div>

      <div className="grid gap-6 md:gap-8">
        {projects.map((project, index) => (
          <Card 
            key={project.id} 
            className={`group relative overflow-hidden transition-all duration-500 hover:shadow-2xl border-2 ${
              selectedProject?.id === project.id 
                ? 'border-primary shadow-xl' 
                : 'border-border hover:border-primary/50'
            }`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-transparent to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative p-6 md:p-8">
              <div className="grid md:grid-cols-12 gap-6 items-start">
                {/* Project Image */}
                <div className="md:col-span-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Lightbulb className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    
                    {/* Year Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-red-600 hover:bg-red-700 text-white font-semibold">
                        <Calendar className="h-3 w-3 mr-1" />
                        {project.year}
                      </Badge>
                    </div>

                    {/* Award Badge */}
                    {project.award && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold">
                          <Trophy className="h-3 w-3 mr-1" />
                          {project.award}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="md:col-span-8 space-y-4">
                  {/* Header */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl md:text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(project.status)} shrink-0`}
                      >
                        {getStatusIcon(project.status)}
                        <span className="ml-1">{getStatusText(project.status)}</span>
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        <span>{project.category}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{project.teamName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  {/* Role */}
                  <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-primary">
                    <p className="text-sm font-medium text-foreground">
                      <span className="text-primary">Rolüm:</span> {project.myRole}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">Teknolojiler</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 6).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 6 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Button
                      onClick={() => setSelectedProject(selectedProject?.id === project.id ? null : project)}
                      variant="default"
                      size="sm"
                      className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                    >
                      <Star className="h-4 w-4 mr-2" />
                      {selectedProject?.id === project.id ? 'Detayları Gizle' : 'Detayları Gör'}
                      <ChevronRight className={`h-4 w-4 ml-1 transition-transform ${
                        selectedProject?.id === project.id ? 'rotate-90' : ''
                      }`} />
                    </Button>

                    {project.githubUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}

                    {project.liveUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    )}

                    {project.videoUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.videoUrl} target="_blank" rel="noopener noreferrer">
                          <Play className="h-4 w-4 mr-2" />
                          Video
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedProject?.id === project.id && (
                <div className="mt-8 pt-6 border-t border-border space-y-6 animate-in slide-in-from-top duration-300">
                  {/* Long Description */}
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-foreground">Proje Detayları</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.longDescription}
                    </p>
                  </div>

                  {/* Team Members */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-foreground">Takım Üyeleri</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {project.teamMembers.map((member, idx) => (
                        <div 
                          key={idx}
                          className={`p-3 rounded-lg border text-center transition-colors ${
                            member === 'Yunus Emre Seferoğlu' 
                              ? 'bg-primary/10 border-primary text-primary font-medium' 
                              : 'bg-muted/50 border-border text-muted-foreground'
                          }`}
                        >
                          <div className="text-sm">
                            {member}
                            {member === 'Yunus Emre Seferoğlu' && (
                              <div className="text-xs mt-1 opacity-75">(Ben)</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  {project.achievements.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-foreground">Başarılar & Kazanımlar</h4>
                      <div className="grid gap-2">
                        {project.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                            <Award className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                            <span className="text-green-800 text-sm">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* All Technologies */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-foreground">Kullanılan Tüm Teknolojiler</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
