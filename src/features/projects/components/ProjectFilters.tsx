import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, X, Filter, ChevronDown } from "lucide-react";
import { ProjectData } from "../types";
import { getFilteredTechnologies } from "../utils/techCategories";

interface ProjectFiltersProps {
  projects: ProjectData[];
  onFilter: (filteredProjects: ProjectData[]) => void;
}

export function ProjectFilters({ projects, onFilter }: ProjectFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState<string>('');

  // Tüm projelerden sadece araçlar ve yazılım dillerini çıkar
  const allTechnologies = getFilteredTechnologies(
    projects.flatMap(project => 
      [...(project.technologies || []), ...(project.topics || [])]
    )
  );

  const applyFilters = (search: string, tech: string) => {
    let filtered = projects;

    // Arama filtresi
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.technologies.some(t => t.toLowerCase().includes(searchLower)) ||
        (project.topics || []).some(t => t.toLowerCase().includes(searchLower))
      );
    }

    // Teknoloji filtresi
    if (tech) {
      filtered = filtered.filter(project =>
        project.technologies.includes(tech) ||
        (project.topics || []).includes(tech)
      );
    }

    onFilter(filtered);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    applyFilters(value, selectedTech);
  };

  const handleTechSelect = (tech: string) => {
    const newTech = selectedTech === tech ? '' : tech;
    setSelectedTech(newTech);
    applyFilters(searchTerm, newTech);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTech('');
    onFilter(projects);
  };

  const hasActiveFilters = searchTerm.trim() || selectedTech;

  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Proje ara... (başlık, açıklama, teknoloji)"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSearchChange('')}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Technology Filter */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">
            Teknolojiye Göre Filtrele (Araçlar & Diller)
          </span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          {/* İlk 12 teknoloji */}
          {allTechnologies.slice(0, 12).map((tech) => (
            <Badge
              key={tech}
              variant={selectedTech === tech ? "default" : "outline"}
              className={`cursor-pointer transition-all hover:scale-105 ${
                selectedTech === tech 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-secondary'
              }`}
              onClick={() => handleTechSelect(tech)}
            >
              {tech}
            </Badge>
          ))}
          
          {/* Daha fazla teknoloji butonu */}
          {allTechnologies.length > 12 && (
            <Popover>
              <PopoverTrigger asChild>
                <Badge 
                  variant="outline" 
                  className="cursor-pointer hover:bg-secondary transition-all hover:scale-105 gap-1"
                >
                  +{allTechnologies.length - 12} daha
                  <ChevronDown className="h-3 w-3" />
                </Badge>
              </PopoverTrigger>
              <PopoverContent className="w-80 max-h-96 overflow-y-auto" align="center">
                <div className="space-y-3">
                  <div className="text-sm font-medium text-center border-b pb-2">
                    Tüm Teknolojiler ({allTechnologies.length})
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {allTechnologies.slice(12).map((tech) => (
                      <Badge
                        key={tech}
                        variant={selectedTech === tech ? "default" : "outline"}
                        className={`cursor-pointer transition-all hover:scale-105 justify-center text-xs ${
                          selectedTech === tech 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-secondary'
                        }`}
                        onClick={() => {
                          handleTechSelect(tech);
                          // Popover'ı kapatmak için context'e erişim gerekiyor, 
                          // şimdilik tıklamada açık bırakıyoruz
                        }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  {selectedTech && (
                    <div className="pt-2 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearFilters}
                        className="w-full gap-1 text-xs"
                      >
                        <X className="h-3 w-3" />
                        Filtreyi Temizle
                      </Button>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="text-center">
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="gap-1"
          >
            <X className="h-3 w-3" />
            Filtreleri Temizle
          </Button>
        </div>
      )}

      {/* Filter Summary */}
      {hasActiveFilters && (
        <div className="text-center text-sm text-muted-foreground">
          {searchTerm && (
            <span>"{searchTerm}" için arama</span>
          )}
          {searchTerm && selectedTech && <span> • </span>}
          {selectedTech && (
            <span>"{selectedTech}" teknolojisi</span>
          )}
        </div>
      )}
    </div>
  );
}
