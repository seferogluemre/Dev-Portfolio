export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  image?: string | null;
}

export interface BlogPageProps {
  posts: BlogPost[];
}
