"use client";

import { useState, useEffect, useCallback } from "react";
import { ContributionStats } from "../types/github";
import { githubService } from "../services/github";

interface UseContributionsReturn {
  contributionStats: ContributionStats | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useContributions(): UseContributionsReturn {
  const [contributionStats, setContributionStats] = useState<ContributionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContributions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const stats = await githubService.getContributions();
      setContributionStats(stats);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'GitHub contribution verileri alınırken bilinmeyen bir hata oluştu.';
      setError(errorMessage);
      console.error('GitHub contributions fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContributions();
  }, [fetchContributions]);

  const refetch = useCallback(async () => {
    await fetchContributions();
  }, [fetchContributions]);

  return {
    contributionStats,
    loading,
    error,
    refetch
  };
}
