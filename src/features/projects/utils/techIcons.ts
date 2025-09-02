// Teknoloji ikonları - raw.githubusercontent.com'dan
export const getTechIcon = (tech: string): string => {
  const techLower = tech.toLowerCase();
  
  const iconMap: { [key: string]: string } = {
    // Frontend Frameworks
    'react': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
    'nextjs': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg',
    'next.js': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg',
    'vue': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg',
    'vuejs': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg',
    'angular': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg',
    'svelte': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/svelte/svelte-original.svg',
    
    // Programming Languages
    'typescript': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
    'javascript': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
    'python': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
    'java': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg',
    'c#': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg',
    'csharp': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg',
    'c++': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg',
    'cplusplus': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg',
    'c': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg',
    'go': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg',
    'rust': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/rust/rust-original.svg',
    'php': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg',
    'kotlin': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/kotlin/kotlin-original.svg',
    'swift': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/swift/swift-original.svg',
    
    // Backend & Runtime
    'nodejs': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
    'node.js': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
    'express': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg',
    'expressjs': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg',
    'django': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg',
    'flask': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/flask/flask-original.svg',
    'spring': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/spring/spring-original.svg',
    'dotnet': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/dot-net/dot-net-original.svg',
    '.net': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/dot-net/dot-net-original.svg',
    
    // Databases
    'mongodb': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg',
    'postgresql': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg',
    'mysql': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg',
    'sqlite': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/sqlite/sqlite-original.svg',
    'redis': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg',
    'mssql': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
    'mssql-database': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
    'prisma': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/prisma/prisma-original.svg',
    
    // Cloud & DevOps
    'docker': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg',
    'kubernetes': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/kubernetes/kubernetes-plain.svg',
    'aws': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original.svg',
    'azure': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/azure/azure-original.svg',
    'gcp': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/googlecloud/googlecloud-original.svg',
    'firebase': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg',
    
    // CSS & Styling
    'tailwind': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg',
    'tailwindcss': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg',
    'css': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg',
    'css3': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg',
    'html': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg',
    'html5': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg',
    'sass': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg',
    'scss': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg',
    'bootstrap': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg',
    
    // UI Libraries
    'shadcn-ui': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg', // Shadcn uses React
    'shadcn': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
    'mui': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg',
    'material-ui': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg',
    'antd': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/antdesign/antdesign-original.svg',
    
    // Tools & Others
    'git': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg',
    'github': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg',
    'vscode': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg',
    'figma': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg',
    'photoshop': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/photoshop/photoshop-original.svg',
    'webpack': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/webpack/webpack-original.svg',
    'vite': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vitejs/vitejs-original.svg',
    'npm': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/npm/npm-original-wordmark.svg',
    'yarn': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/yarn/yarn-original.svg',
    
    // Mobile
    'android': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/android/android-original.svg',
    'ios': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/apple/apple-original.svg',
    'flutter': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg',
    'react-native': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
    
    // Testing
    'jest': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/jest/jest-plain.svg',
    'cypress': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cypress/cypress-original.svg',
    
    // API & Communication
    'graphql': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/graphql/graphql-plain.svg',
    'rest': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg',
    'api': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg',
    'socket.io': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/socketio/socketio-original.svg',
    'socketio': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/socketio/socketio-original.svg'
  };
  
  return iconMap[techLower] || 'https://raw.githubusercontent.com/devicons/devicon/master/icons/devicon/devicon-original.svg';
};

// Programlama dili renk kodları (GitHub standartları)
export const getLanguageColor = (language: string): string => {
  const colors: { [key: string]: string } = {
    'TypeScript': '#3178c6',
    'JavaScript': '#f1e05a',
    'Python': '#3572A5',
    'Java': '#b07219',
    'C#': '#239120',
    'C++': '#f34b7d',
    'C': '#555555',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'PHP': '#4F5D95',
    'Ruby': '#701516',
    'Swift': '#ffac45',
    'Kotlin': '#A97BFF',
    'Dart': '#00B4AB',
    'HTML': '#e34c26',
    'CSS': '#1572B6',
    'Vue': '#4FC08D',
    'Shell': '#89e051',
    'PowerShell': '#012456',
    'Dockerfile': '#384d54',
    'YAML': '#cb171e',
    'JSON': '#292929',
    'Markdown': '#083fa1',
    'SQL': '#e38c00'
  };
  
  return colors[language] || '#6366f1'; // Default indigo color
};
