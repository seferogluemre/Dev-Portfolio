export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  image?: string | null;
  externalUrl?: string;
}

export interface BlogPageProps {
  posts: BlogPost[];
}
