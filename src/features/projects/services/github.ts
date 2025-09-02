import { GitHubRepository, GitHubApiError } from '../types/github';
import { ProjectData } from '../types';

const GITHUB_API_BASE = "https://api.github.com";
const USERNAME = 'seferogluemre';

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

  mapRepositoryToProject(repo: GitHubRepository): ProjectData {
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

    const featured = repo.stargazers_count >= 5;

    return {
      id: repo.id.toString(),
      title: this.formatRepoName(repo.name),
      description: repo.description || 'GitHub repository açıklaması mevcut değil.',
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
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );

      return filteredRepos.map(repo => this.mapRepositoryToProject(repo));

    } catch (error) {
      console.error('GitHub projeleri alınırken hata:', error);
      throw new Error('GitHub projelerini alırken bir hata oluştu.');
    }
  }

  async getFeaturedAndOtherProjects(): Promise<{ featured: ProjectData[]; others: ProjectData[] }> {
    const allProjects = await this.getAllProjects();
    
    const featured = allProjects.filter(project => project.featured);
    const others = allProjects.filter(project => !project.featured);

    return { featured, others };
  }
}

export const githubService = GitHubService.getInstance();