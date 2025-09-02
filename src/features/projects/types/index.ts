// Temel proje veri yapısı
export interface ProjectData {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  image?: string | null;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  status: "completed" | "in-progress" | "planned" | "archived";
  date: string;
  // GitHub'dan gelen ek bilgiler
  starCount?: number;
  forkCount?: number;
  language?: string | null;
  topics?: string[];
  lastUpdated?: string;
  isPrivate?: boolean;
  license?: string | null;
}

// GitHub'dan gelen ham veriyi işlemek için
export interface GitHubProjectData extends ProjectData {
  githubId: number;
  fullName: string;
  owner: string;
  defaultBranch: string;
  size: number;
  openIssues: number;
  hasPages: boolean;
}

export interface ProjectsPageProps {
  projects: ProjectData[];
}

export interface ProjectCardProps {
  project: ProjectData;
}

// GitHub API ile ilgili tipler
export * from './github';