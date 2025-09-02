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
  status: "completed" | "in-progress" | "planned";
  date: string;
}

export interface ProjectsPageProps {
  projects: ProjectData[];
}
