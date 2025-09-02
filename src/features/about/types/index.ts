export interface AboutData {
  name: string;
  title: string;
  description: string;
  currentWork: string;
  freeTime: string;
  avatar?: string;
  website?: string;
  socialLinks: {
    email?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
}
