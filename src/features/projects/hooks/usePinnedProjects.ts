import { useState, useEffect, useCallback } from 'react';
import { githubService } from '../services/github';
import { ProjectData } from '../types';

export interface UsePinnedProjectsReturn {
  pinnedProjects: ProjectData[];
  otherProjects: ProjectData[];
  allProjects: ProjectData[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  showAllProjects: boolean;
  toggleShowAll: () => void;
  loadingOthers: boolean;
}

export const usePinnedProjects = (): UsePinnedProjectsReturn => {
  const [pinnedProjects, setPinnedProjects] = useState<ProjectData[]>([]);
  const [otherProjects, setOtherProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingOthers, setLoadingOthers] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Pinned ve diğer projeleri ayır
      const { pinned, others } = await githubService.getPinnedAndOtherProjects();
      
      setPinnedProjects(pinned);
      setOtherProjects(others);
    } catch (err) {
      console.error('GitHub projeleri yüklenirken hata:', err);
      setError(err instanceof Error ? err.message : 'GitHub projelerini yüklerken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  }, []);

  // "Tüm projeleri göster" toggle
  const toggleShowAll = useCallback(async () => {
    if (!showAllProjects) {
      // İlk kez açılıyorsa loading göster
      setLoadingOthers(true);
      
      // Animasyon için kısa bir delay
      setTimeout(() => {
        setShowAllProjects(true);
        setLoadingOthers(false);
      }, 500);
    } else {
      setShowAllProjects(false);
    }
  }, [showAllProjects]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Tüm projeler (pinned + others)
  const allProjects = [...pinnedProjects, ...otherProjects];

  return {
    pinnedProjects,
    otherProjects,
    allProjects,
    loading,
    error,
    refetch: fetchProjects,
    showAllProjects,
    toggleShowAll,
    loadingOthers,
  };
};
