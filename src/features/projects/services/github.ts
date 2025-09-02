import { GitHubRepository, GitHubApiError, GitHubContributions, ContributionStats, ContributionDay } from '../types/github';
import { ProjectData } from '../types';
import { PINNED_REPO_IDS, PINNED_REPO_ORDER, PINNED_REPO_DESCRIPTIONS, PINNED_REPO_TAGS } from '../config/pinnedRepos';

const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";
const USERNAME = 'seferogluemre';

const CONTRIBUTIONS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

export class GitHubService {
  private static instance: GitHubService;
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; 

  static getInstance(): GitHubService {
    if (!GitHubService.instance) {
      GitHubService.instance = new GitHubService();
    }
    return GitHubService.instance;
  }

  private async fetchWithCache<T>(url: string): Promise<T> {
    const cached = this.cache.get(url);
    const now = Date.now();

    if (cached && (now - cached.timestamp) < this.CACHE_DURATION) {
      return cached.data;
    }

    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'seferogluemre-portfolio'
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      this.cache.set(url, { data, timestamp: now });
      return data;

    } catch (error) {
      console.error('GitHub API fetch error:', error);
      throw error;
    }
  }

  async getUserRepositories(): Promise<GitHubRepository[]> {
    const url = `${GITHUB_API_BASE}/users/${USERNAME}/repos?sort=updated&per_page=100`;
    return this.fetchWithCache<GitHubRepository[]>(url);
  }

  async getRepository(repoName: string): Promise<GitHubRepository> {
    const url = `${GITHUB_API_BASE}/repos/${USERNAME}/${repoName}`;
    return this.fetchWithCache<GitHubRepository>(url);
  }

  async getRepositoryLanguages(repoName: string): Promise<Record<string, number>> {
    const url = `${GITHUB_API_BASE}/repos/${USERNAME}/${repoName}/languages`;
    return this.fetchWithCache<Record<string, number>>(url);
  }

  private isPinnedRepository(repo: GitHubRepository): boolean {
    return PINNED_REPO_IDS.includes(repo.id);
  }

  private getPinnedDescription(repo: GitHubRepository): string {
    return (PINNED_REPO_DESCRIPTIONS as any)[repo.name] || repo.description || `${this.formatRepoName(repo.name)} projesi hakkında detaylı açıklama yakında eklenecek.`;
  }

  private getPinnedTags(repo: GitHubRepository): string[] {
    return (PINNED_REPO_TAGS as any)[repo.name] || [];
  }

  mapRepositoryToProject(repo: GitHubRepository, isPinned: boolean = false): ProjectData {
    const technologies: string[] = [];
    
    if (repo.language) {
      technologies.push(repo.language);
    }
    
    if (repo.topics && repo.topics.length > 0) {
      const techTopics = repo.topics.filter(topic => 
        !['project', 'app', 'website', 'portfolio', 'demo'].includes(topic.toLowerCase())
      );
      technologies.push(...techTopics);
    }

    let status: ProjectData['status'] = 'completed';
    if (repo.archived) {
      status = 'archived';
    } else {
      const lastUpdate = new Date(repo.updated_at);
      const monthsAgo = (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24 * 30);
      
      if (monthsAgo > 6) {
        status = 'completed';
      } else if (monthsAgo > 1) {
        status = 'completed';
      } else {
        status = 'in-progress';
      }
    }

    const featured = isPinned || repo.stargazers_count >= 5;

    const description = isPinned 
      ? this.getPinnedDescription(repo)
      : (repo.description || `${this.formatRepoName(repo.name)} projesi hakkında detaylı açıklama yakında eklenecek.`);

    if (isPinned) {
      const pinnedTags = this.getPinnedTags(repo);
      technologies.push(...pinnedTags);
    }

    return {
      id: repo.id.toString(),
      title: this.formatRepoName(repo.name),
      description,
      technologies: [...new Set(technologies)], 
      githubUrl: repo.html_url,
      liveUrl: repo.homepage || undefined,
      status,
      date: repo.created_at,
      featured,
      starCount: repo.stargazers_count,
      forkCount: repo.forks_count,
      language: repo.language,
      topics: repo.topics,
      lastUpdated: repo.updated_at,
      isPrivate: repo.private,
      license: repo.license?.name || null
    };
  }

  private formatRepoName(name: string): string {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  async getAllProjects(): Promise<ProjectData[]> {
    try {
      const repositories = await this.getUserRepositories();
      
      const filteredRepos = repositories.filter(repo => 
        !repo.fork && 
        !repo.private &&
        !repo.archived
      );

      filteredRepos.sort((a, b) => 
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
      );

      return filteredRepos.map(repo => this.mapRepositoryToProject(repo, this.isPinnedRepository(repo)));

    } catch (error) {
      console.error('GitHub projeleri alınırken hata:', error);
      throw new Error('GitHub projelerini alırken bir hata oluştu.');
    }
  }

  async getPinnedAndOtherProjects(): Promise<{ pinned: ProjectData[]; others: ProjectData[] }> {
    const allProjects = await this.getAllProjects();
    
    const pinned = allProjects
      .filter(project => PINNED_REPO_IDS.includes(Number(project.id)))
      .sort((a, b) => {
        const aIndex = PINNED_REPO_ORDER.indexOf(a.title.replace(/\s+/g, '-'));
        const bIndex = PINNED_REPO_ORDER.indexOf(b.title.replace(/\s+/g, '-'));
        return aIndex - bIndex;
      });
    
    const others = allProjects
      .filter(project => !PINNED_REPO_IDS.includes(Number(project.id)));

    return { pinned, others };
  }

  async getPinnedProjects(): Promise<ProjectData[]> {
    const { pinned } = await this.getPinnedAndOtherProjects();
    return pinned;
  }

  async getNonPinnedProjects(): Promise<ProjectData[]> {
    const { others } = await this.getPinnedAndOtherProjects();
    return others;
  }

  async getFeaturedAndOtherProjects(): Promise<{ featured: ProjectData[]; others: ProjectData[] }> {
    const allProjects = await this.getAllProjects();
    
    const featured = allProjects.filter(project => project.featured);
    const others = allProjects.filter(project => !project.featured);

    return { featured, others };
  }

  async getContributions(): Promise<ContributionStats> {
    try {
      const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
      
      if (token && token.trim() !== '') {
        console.log('GitHub token bulundu, gerçek veriler çekiliyor...');
        return await this.getContributionsWithToken(token);
      } else {
        console.log('GitHub token bulunamadı, mock data kullanılıyor...');
        return this.getMockContributions();
      }
    } catch (error) {
      console.error('GitHub contributions alınırken hata:', error);
      console.log('Hata nedeniyle mock data\'ya geçiliyor...');
      return this.getMockContributions();
    }
  }

  async getContributionsWithToken(token: string): Promise<ContributionStats> {
    try {
      const response = await fetch(GITHUB_GRAPHQL_API, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: CONTRIBUTIONS_QUERY,
          variables: { username: USERNAME }
        })
      });

      if (!response.ok) {
        throw new Error(`GitHub GraphQL API Error: ${response.status}`);
      }

      const data: { data: GitHubContributions } = await response.json();
      return this.processContributionData(data.data);
    } catch (error) {
      console.error('GitHub GraphQL API error:', error);
      throw error;
    }
  }

  private processContributionData(data: GitHubContributions): ContributionStats {
    const calendar = data.user.contributionsCollection.contributionCalendar;
    const contributions: ContributionDay[] = [];

    calendar.weeks.forEach(week => {
      week.contributionDays.forEach(day => {
        contributions.push(day);
      });
    });

    const totalContributions = calendar.totalContributions;
    const currentStreak = this.calculateCurrentStreak(contributions);
    const longestStreak = this.calculateLongestStreak(contributions);
    const averagePerDay = totalContributions / 365;
    const mostActiveDay = this.findMostActiveDay(contributions);

    return {
      totalContributions,
      currentStreak,
      longestStreak,
      averagePerDay: Math.round(averagePerDay * 100) / 100,
      mostActiveDay,
      contributions
    };
  }

  private calculateCurrentStreak(contributions: ContributionDay[]): number {
    const sortedContributions = contributions.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    let streak = 0;
    for (const contribution of sortedContributions) {
      if (contribution.contributionCount > 0) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }

  private calculateLongestStreak(contributions: ContributionDay[]): number {
    let maxStreak = 0;
    let currentStreak = 0;

    const sortedContributions = contributions.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    for (const contribution of sortedContributions) {
      if (contribution.contributionCount > 0) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }
    return maxStreak;
  }

  private findMostActiveDay(contributions: ContributionDay[]): string {
    const dayContributions: { [key: string]: number } = {
      'Pazartesi': 0, 'Salı': 0, 'Çarşamba': 0, 'Perşembe': 0,
      'Cuma': 0, 'Cumartesi': 0, 'Pazar': 0
    };

    const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

    contributions.forEach(contribution => {
      const date = new Date(contribution.date);
      const dayName = dayNames[date.getDay()];
      dayContributions[dayName] += contribution.contributionCount;
    });

    return Object.entries(dayContributions)
      .sort(([,a], [,b]) => b - a)[0][0];
  }

  private getTextPattern(): number[][] {
    return [
      [1,1,1, 0, 1,1,1, 0, 1,1,1, 0, 1,1,1, 0, 1,0,1], // Satır 1
      [0,1,0, 0, 1,0,1, 0, 1,0,0, 0, 1,0,1, 0, 1,1,0], // Satır 2  
      [0,1,0, 0, 1,1,1, 0, 1,1,0, 0, 1,1,1, 0, 1,0,1], // Satır 3
      [0,1,0, 0, 1,0,1, 0, 0,0,1, 0, 1,0,1, 0, 1,0,1], // Satır 4
      [0,1,0, 0, 1,0,1, 0, 1,1,1, 0, 1,0,1, 0, 1,0,1], // Satır 5
      [0,1,0, 0, 1,0,1, 0, 0,1,0, 0, 1,0,1, 0, 1,0,1], // Satır 6
      [0,1,0, 0, 1,0,1, 0, 1,1,1, 0, 1,0,1, 0, 1,0,1], // Satır 7
    ];  
  }

  private getMockContributions(): ContributionStats {
    const contributions: ContributionDay[] = [];
    const today = new Date();
    const colors = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
    const textPattern = this.getTextPattern();
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      let contributionCount = 0;
      
      const daysSinceStart = 364 - i;
      const weekIndex = Math.floor(daysSinceStart / 7);
      const dayIndex = daysSinceStart % 7;
      
      if (weekIndex >= 20 && weekIndex < 39 && dayIndex < 7) {
        const patternCol = weekIndex - 20;
        const patternRow = dayIndex;
        
        if (patternCol < textPattern[0].length && patternRow < textPattern.length) {
          if (textPattern[patternRow][patternCol] === 1) {
            contributionCount = 8;
          } else {
                contributionCount = 0;
          }
        } else {
          contributionCount = Math.random() > 0.7 ? Math.floor(Math.random() * 4) : 0;
        }
      } else {    
        contributionCount = Math.random() > 0.6 ? Math.floor(Math.random() * 6) : 0;
      }
      
      const colorIndex = contributionCount === 0 ? 0 : Math.min(Math.floor(contributionCount / 2) + 1, 4);
      
      contributions.push({
        date: date.toISOString().split('T')[0],
        contributionCount,
        color: colors[colorIndex]
      });
    }

    return {
      totalContributions: contributions.reduce((sum, day) => sum + day.contributionCount, 0),
      currentStreak: this.calculateCurrentStreak(contributions),
      longestStreak: this.calculateLongestStreak(contributions),
      averagePerDay: 2.8,
      mostActiveDay: 'Çarşamba',
      contributions
    };
  }
}

export const githubService = GitHubService.getInstance();