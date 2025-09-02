// Teknoloji kategorilendirme - sadece araçlar ve yazılım dilleri
export const PROGRAMMING_LANGUAGES = [
  'TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'C++', 'C', 'Go', 'Rust', 
  'PHP', 'Ruby', 'Swift', 'Kotlin', 'Dart', 'Scala', 'R', 'MATLAB', 'Perl',
  'Lua', 'Haskell', 'Clojure', 'F#', 'VB.NET', 'Objective-C', 'Shell', 'PowerShell'
];

export const FRAMEWORKS_AND_TOOLS = [
  'React', 'Next.js', 'Vue', 'Angular', 'Svelte', 'Nuxt.js', 'Gatsby', 'Ember.js',
  
  // Backend Frameworks
  'Node.js', 'Express', 'Django', 'Flask', 'Spring', 'ASP.NET', '.NET', 'Laravel',
  'Rails', 'FastAPI', 'NestJS', 'Koa', 'Hapi', 'Fastify',
  
  // Databases
  'MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'Elasticsearch', 'Cassandra',
  'DynamoDB', 'Firebase', 'Supabase', 'PlanetScale', 'Prisma', 'TypeORM', 'Sequelize',
  
  // Cloud & DevOps
  'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Vercel', 'Netlify', 'Heroku',
  'DigitalOcean', 'Cloudflare', 'Jenkins', 'GitHub Actions', 'GitLab CI',
  
  // CSS & Styling
  'Tailwind', 'Bootstrap', 'Sass', 'Less', 'Styled Components', 'Emotion',
  'Chakra UI', 'Material-UI', 'Ant Design', 'Shadcn-ui',
  
  // Build Tools & Package Managers
  'Webpack', 'Vite', 'Rollup', 'Parcel', 'npm', 'Yarn', 'pnpm', 'Bun',
  
  // Testing
  'Jest', 'Cypress', 'Playwright', 'Testing Library', 'Mocha', 'Jasmine',
  
  // Mobile
  'React Native', 'Flutter', 'Expo', 'Ionic', 'Xamarin',
  
  // API & Communication
  'GraphQL', 'REST', 'Socket.io', 'WebRTC', 'gRPC', 'Axios', 'Fetch',
  
  // State Management
  'Redux', 'Zustand', 'Recoil', 'MobX', 'Context API',
  
  // Development Tools
  'Git', 'GitHub', 'GitLab', 'Bitbucket', 'VSCode', 'WebStorm', 'Figma', 'Adobe XD'
];

// Teknoloji kategorisini belirle
export const getTechCategory = (tech: string): 'language' | 'tool' | 'other' => {
  const techLower = tech.toLowerCase();
  
  // Programlama dilleri kontrolü
  if (PROGRAMMING_LANGUAGES.some(lang => 
    lang.toLowerCase() === techLower || 
    lang.toLowerCase().includes(techLower) ||
    techLower.includes(lang.toLowerCase())
  )) {
    return 'language';
  }
  
  // Framework ve araçlar kontrolü
  if (FRAMEWORKS_AND_TOOLS.some(tool => 
    tool.toLowerCase() === techLower ||
    tool.toLowerCase().includes(techLower) ||
    techLower.includes(tool.toLowerCase())
  )) {
    return 'tool';
  }
  
  return 'other';
};

// Teknolojileri kategorize et ve filtrele
export const categorizeAndFilterTechnologies = (technologies: string[]) => {
  const categorized = technologies.reduce((acc, tech) => {
    const category = getTechCategory(tech);
    if (category !== 'other') {
      acc[category] = acc[category] || [];
      acc[category].push(tech);
    }
    return acc;
  }, {} as { language?: string[]; tool?: string[] });

  // Her kategoriyi alfabetik olarak sırala
  if (categorized.language) {
    categorized.language.sort();
  }
  if (categorized.tool) {
    categorized.tool.sort();
  }

  return categorized;
};

// Filtreli teknoloji listesi oluştur (sadece dil ve araçlar)
export const getFilteredTechnologies = (allTechnologies: string[]): string[] => {
  const unique = Array.from(new Set(allTechnologies));
  const filtered = unique.filter(tech => getTechCategory(tech) !== 'other');
  return filtered.sort();
};
