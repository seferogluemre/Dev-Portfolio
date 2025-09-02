export interface GitHubRepository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  };
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: string | null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
  } | null;
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export interface GitHubApiResponse {
  repositories: GitHubRepository[];
  total_count?: number;
}

export interface GitHubApiError {
  message: string;
  documentation_url?: string;
  status?: number;
}

// GitHub Contributions Types
export interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export interface GitHubContributions {
  user: {
    contributionsCollection: {
      contributionCalendar: ContributionCalendar;
    };
  };
}

export interface GitHubCombinedResponse {
  user: {
    contributionsCollection: {
      contributionCalendar: ContributionCalendar;
    };
    pinnedItems: {
      nodes: PinnedRepository[];
    };
  };
}

export interface ContributionStats {
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  averagePerDay: number;
  mostActiveDay: string;
  contributions: ContributionDay[];
}

// GitHub Pinned Repositories Types
export interface PinnedRepository {
  id: string;
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  repositoryTopics: {
    nodes: Array<{
      topic: {
        name: string;
      };
    }>;
  };
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  isPrivate: boolean;
  isFork: boolean;
  isArchived: boolean;
  licenseInfo: {
    name: string;
  } | null;
}

export interface GitHubPinnedResponse {
  user: {
    pinnedItems: {
      nodes: PinnedRepository[];
    };
  };
}

// Teknofest Project Types
export interface TeknofestProject {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  year: number;
  category: string;
  award: string | null;
  teamName: string;
  teamMembers: string[];
  myRole: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  videoUrl?: string;
  imageUrl?: string;
  status: 'completed' | 'finalist' | 'participant';
  achievements: string[];
}