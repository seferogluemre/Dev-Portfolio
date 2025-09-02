import { useState, useEffect, useCallback } from 'react';
import { githubService } from '../services/github';
import { ProjectData } from '../types';

export interface UseGitHubProjectsReturn {
  projects: ProjectData[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  featuredProjects: ProjectData[];
  otherProjects: ProjectData[];
}

export const useGitHubProjects = (): UseGitHubProjectsReturn => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const githubProjects = await githubService.getAllProjects();
      setProjects(githubProjects);
    } catch (err) {
      console.error('GitHub projeleri yüklenirken hata:', err);
      setError(err instanceof Error ? err.message : 'GitHub projelerini yüklerken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
    featuredProjects,
    otherProjects,
  };
};
