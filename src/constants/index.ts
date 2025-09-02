// Global constants
export const SITE_CONFIG = {
  name: "Berat Güdelek",
  url: "https://beratgdlk.com",
  title: "Berat Güdelek - Fullstack Web Developer",
  description: "Fullstack web developer sharing experiences and learnings about backend, frontend, and mobile app development.",
  author: {
    name: "Berat Güdelek",
    email: "beratgdlk@gmail.com",
    github: "https://github.com/beratgdlk",
    linkedin: "https://www.linkedin.com/in/beratgudelek/",
    medium: "https://medium.com/@beratgdlk"
  }
} as const;

export const ROUTES = {
  HOME: "/",
  BLOG: "/blog",
  PROJECTS: "/projects", 
  ABOUT: "/about"
} as const;

export const API_ROUTES = {
  // Future API endpoints
} as const;
