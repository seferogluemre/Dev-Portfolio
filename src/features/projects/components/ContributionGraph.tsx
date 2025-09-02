"use client";

import { useState, useEffect } from "react";
import { ContributionStats, ContributionDay } from "../types/github";
import { githubService } from "../services/github";
import { Card } from "@/components/ui/card";
import { RefreshCw, Calendar, TrendingUp, Award, Clock } from "lucide-react";

interface ContributionGraphProps {
  className?: string;
}

export function ContributionGraph({ className }: ContributionGraphProps) {
  const [contributionStats, setContributionStats] = useState<ContributionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContributions = async () => {
    try {
      setLoading(true);
      setError(null);
      const stats = await githubService.getContributions();
      setContributionStats(stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  if (loading) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="text-center">
          <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">GitHub aktivitesi yükleniyor...</p>
        </div>
      </Card>
    );
  }

  if (error || !contributionStats) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="text-center">
          <p className="text-destructive mb-2">GitHub aktivitesi yüklenirken hata oluştu</p>
          <button
            onClick={fetchContributions}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <RefreshCw className="h-4 w-4 inline mr-1" />
            Tekrar dene
          </button>
        </div>
      </Card>
    );
  }

  // Contribution graph'ı haftalara böl
  const weeks = [];
  const contributions = contributionStats.contributions;
  
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  // Ay isimlerini al
  const monthNames = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
  const dayNames = ['P', 'P', 'S', 'Ç', 'P', 'C', 'C']; // Pazar, Pazartesi, Salı, ...

  return (
    <Card className={`p-6 ${className}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
              GitHub Aktivitesi
              {process.env.NEXT_PUBLIC_GITHUB_TOKEN ? (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full dark:bg-green-900 dark:text-green-100">
                  Gerçek Veri
                </span>
              ) : (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-100">
                  Demo Veri
                </span>
              )}
            </h3>
            <p className="text-sm text-muted-foreground">
              Son 12 ayda {contributionStats.totalContributions} contribution
              {!process.env.NEXT_PUBLIC_GITHUB_TOKEN && (
                <span className="block text-xs text-amber-600 dark:text-amber-400 mt-1">
                  💡 Gerçek veriler için GitHub token ekleyin
                </span>
              )}
            </p>
          </div>
          <button
            onClick={fetchContributions}
            className="p-2 hover:bg-muted rounded-md transition-colors"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <Calendar className="h-5 w-5 mx-auto mb-1 text-blue-500" />
            <div className="text-lg font-semibold">{contributionStats.totalContributions}</div>
            <div className="text-xs text-muted-foreground">Toplam</div>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <TrendingUp className="h-5 w-5 mx-auto mb-1 text-green-500" />
            <div className="text-lg font-semibold">{contributionStats.currentStreak}</div>
            <div className="text-xs text-muted-foreground">Güncel Seri</div>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <Award className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
            <div className="text-lg font-semibold">{contributionStats.longestStreak}</div>
            <div className="text-xs text-muted-foreground">En Uzun Seri</div>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <Clock className="h-5 w-5 mx-auto mb-1 text-purple-500" />
            <div className="text-lg font-semibold">{contributionStats.averagePerDay}</div>
            <div className="text-xs text-muted-foreground">Günlük Ort.</div>
          </div>
        </div>

        {/* Contribution Graph */}
        <div className="space-y-2">
          {/* Ay başlıkları */}
          <div className="flex text-xs text-muted-foreground mb-1">
            <div className="w-6"></div>
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="flex-1 text-center">
                {monthNames[i]}
              </div>
            ))}
          </div>

          {/* Gün başlıkları ve graph */}
          <div className="flex">
            {/* Gün başlıkları */}
            <div className="flex flex-col space-y-1 w-6 text-xs text-muted-foreground">
              {dayNames.map((day, i) => (
                <div key={i} className="h-3 flex items-center justify-center">
                  {i % 2 === 1 ? day : ''}
                </div>
              ))}
            </div>

            {/* Contribution squares */}
            <div className="flex-1 overflow-x-auto">
              <div className="flex gap-1" style={{ width: 'max-content' }}>
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((day, dayIndex) => (
                      <ContributionSquare 
                        key={`${weekIndex}-${dayIndex}`} 
                        day={day} 
                        weekIndex={weekIndex}
                        dayIndex={dayIndex}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span>En aktif gün: {contributionStats.mostActiveDay}</span>
              <span className="text-green-600 dark:text-green-400">
                👀 Tabloda gizli bir mesaj var...
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <span>Az</span>
              <div className="flex space-x-1">
                {['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'].map((color, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span>Çok</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Contribution square bileşeni
function ContributionSquare({ 
  day, 
  weekIndex, 
  dayIndex 
}: { 
  day: ContributionDay; 
  weekIndex: number; 
  dayIndex: number; 
}) {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Easter egg: "TAŞAK" yazısının bulunduğu alanda özel tooltip
  const isInTextArea = weekIndex >= 20 && weekIndex < 39 && dayIndex < 7;
  const isTextPixel = day.contributionCount >= 8;

  const getTooltipText = () => {
    if (isInTextArea && isTextPixel) {
      return `🎉 Easter Egg! ${day.contributionCount} contributions on ${formatDate(day.date)}`;
    }
    return `${day.contributionCount} contribution${day.contributionCount !== 1 ? 's' : ''} on ${formatDate(day.date)}`;
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-3 h-3 rounded-sm border cursor-pointer transition-all hover:border-foreground ${
          isTextPixel ? 'border-green-400' : 'border-muted'
        }`}
        style={{ backgroundColor: day.color }}
      />
      
      {/* Tooltip */}
      {isHovered && (
        <div className={`absolute z-10 px-2 py-1 text-xs border rounded shadow-lg -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap ${
          isTextPixel 
            ? 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-700' 
            : 'bg-popover text-popover-foreground'
        }`}>
          {getTooltipText()}
        </div>
      )}
    </div>
  );
}
