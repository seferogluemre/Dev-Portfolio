# 🚀 Berat Güdelek - Developer Portfolio

<div align="center">
  <img src="public/logo-bg.svg" alt="Logo" width="120" height="120">
  
  **Modern, responsive portfolio website built with Next.js 15 and TypeScript**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
  [![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://reactjs.org)
  
  [🌍 Live Demo](https://beratgdlk.com) • [📧 Contact](mailto:beratgdlk@gmail.com)
</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Quick Start](#-quick-start)
- [📖 Detailed Setup](#-detailed-setup)
- [🎯 Usage](#-usage)
- [🌐 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📞 Contact](#-contact)

---

## ✨ Features

### 🎨 **UI/UX**
- ✅ **Modern Design** - Clean, professional interface
- ✅ **Fully Responsive** - Works on all devices and screen sizes
- ✅ **Dark/Light Theme** - Toggle between themes
- ✅ **Smooth Animations** - Framer Motion powered animations
- ✅ **Mobile-First** - Optimized for mobile experience

### 🌍 **Internationalization**
- ✅ **Multi-language Support** - Turkish and English
- ✅ **Dynamic Language Switch** - Real-time language switching
- ✅ **Localized Content** - All content available in both languages

### 📱 **Pages & Features**
- ✅ **Home Page** - Hero section with introduction
- ✅ **Blog System** - Article management with search
- ✅ **About Page** - Personal information and skills
- ✅ **Projects Portfolio** - Showcase of development projects
- ✅ **Contact Integration** - Social media and email links

### 🔧 **Technical**
- ✅ **TypeScript** - Full type safety
- ✅ **Server Components** - Next.js 15 App Router
- ✅ **SEO Optimized** - Meta tags and structured data
- ✅ **Performance** - Optimized loading and rendering
- ✅ **Accessible** - WCAG guidelines compliance

---

## 🛠️ Tech Stack

### **Frontend Framework**
- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[React 19](https://reactjs.org)** - UI library
- **[TypeScript](https://typescriptlang.org)** - Type-safe JavaScript

### **Styling & UI**
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS framework
- **[Radix UI](https://radix-ui.com)** - Headless UI components
- **[Lucide React](https://lucide.dev)** - Beautiful icons
- **[Framer Motion](https://framer.com/motion)** - Animation library

### **Development Tools**
- **[ESLint](https://eslint.org)** - Code linting
- **[PostCSS](https://postcss.org)** - CSS processing
- **[Next Themes](https://github.com/pacocoursey/next-themes)** - Theme switching

---

## 📁 Project Structure

```
dev-portfolio/
├── 📁 public/                    # Static assets
│   ├── favicon.ico
│   ├── logo-bg.svg
│   └── ...
│
├── 📁 src/                       # Source code
│   ├── 📁 app/                   # Next.js App Router
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   ├── globals.css           # Global styles
│   │   ├── 📁 blog/              # Blog routes
│   │   ├── 📁 about/             # About page
│   │   └── 📁 projects/          # Projects page
│   │
│   ├── 📁 features/              # Feature-based modules
│   │   ├── 📁 home/              # Home page feature
│   │   │   ├── 📁 components/    # Feature components
│   │   │   ├── 📁 data/          # Mock data (JSON)
│   │   │   ├── 📁 types/         # TypeScript types
│   │   │   └── index.tsx         # Main component
│   │   ├── 📁 blog/              # Blog feature
│   │   ├── 📁 about/             # About feature
│   │   └── 📁 projects/          # Projects feature
│   │
│   ├── 📁 components/            # Shared components
│   │   ├── 📁 layout/            # Layout components
│   │   │   ├── Header.tsx        # Navigation header
│   │   │   └── Footer.tsx        # Site footer
│   │   └── 📁 ui/                # Reusable UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── badge.tsx
│   │
│   ├── 📁 contexts/              # React contexts
│   │   └── LanguageContext.tsx   # i18n context
│   │
│   ├── 📁 hooks/                 # Custom React hooks
│   │   └── index.ts              # Hook exports
│   │
│   ├── 📁 constants/             # Application constants
│   │   └── index.ts              # Site config
│   │
│   └── 📁 lib/                   # Utility functions
│       └── utils.ts              # Helper functions
│
├── 📄 package.json               # Dependencies
├── 📄 tsconfig.json              # TypeScript config
├── 📄 tailwind.config.js         # Tailwind config
├── 📄 next.config.ts             # Next.js config
└── 📄 README.md                  # This file
```

### 🏗️ **Architecture Principles**

This project follows **enterprise-level architectural patterns**:

- **🎯 Feature-Based Organization** - Each feature is self-contained
- **🧩 Atomic Design** - Reusable component hierarchy
- **📱 Mobile-First** - Responsive design approach
- **🔒 Type Safety** - Full TypeScript coverage
- **🎨 Design System** - Consistent UI components
- **♻️ Clean Code** - SOLID principles and clean architecture

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ installed
- npm, yarn, or bun package manager

### **1️⃣ Clone & Install**
```bash
# Clone the repository
git clone https://github.com/beratgdlk/dev-portfolio.git

# Navigate to directory
cd dev-portfolio

# Install dependencies
npm install
# or
yarn install
# or
bun install
```

### **2️⃣ Run Development Server**
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

### **3️⃣ Open in Browser**
Navigate to [http://localhost:3000](http://localhost:3000) 🎉

---

## 📖 Detailed Setup

### **Development Environment**

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   
3. **Build for Production**
   ```bash
   npm run build
   ```
   
4. **Start Production Server**
   ```bash
   npm start
   ```

5. **Lint Code**
   ```bash
   npm run lint
   ```

### **Environment Variables**

No environment variables are required for basic setup. All configuration is handled through:
- `src/constants/index.ts` - Site configuration
- Feature-specific JSON data files

### **Customization**

1. **Personal Information**
   - Update `src/constants/index.ts`
   - Modify feature-specific JSON files in `src/features/*/data/`

2. **Styling**
   - Colors: `tailwind.config.js`
   - Components: `src/components/ui/`

3. **Content**
   - Blog posts: `src/features/blog/data/blogData.json`
   - About info: `src/features/about/data/aboutData.json`

---

## 🎯 Usage

### **Adding Blog Posts**
```json
// src/features/blog/data/blogData.json
{
  "posts": [
    {
      "slug": "new-post-slug",
      "title": "Post Title",
      "description": "Brief description",
      "content": "Full content...",
      "date": "Date",
      "readTime": "X dk okuma",
      "tags": ["tag1", "tag2"],
      "image": null
    }
  ]
}
```

### **Adding Projects**
```json
// src/features/projects/data/projectsData.json
{
  "projects": [
    {
      "id": "project-id",
      "title": "Project Title",
      "description": "Description",
      "technologies": ["React", "Node.js"],
      "liveUrl": "https://example.com",
      "githubUrl": "https://github.com/...",
      "status": "completed"
    }
  ]
}
```

---

## 🌐 Deployment

### **Vercel (Recommended)**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/beratgdlk/dev-portfolio)

```bash
npm install -g vercel
vercel --prod
```

### **Netlify**
```bash
npm run build
# Upload 'out' directory to Netlify
```

### **Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Use conventional commit messages
- Add tests for new features
- Update documentation

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

**Berat Güdelek**
- 🌐 Website: [beratgdlk.com](https://beratgdlk.com)
- 📧 Email: [beratgdlk@gmail.com](mailto:beratgdlk@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/beratgudelek](https://www.linkedin.com/in/beratgudelek/)
- 🐙 GitHub: [github.com/beratgdlk](https://github.com/beratgdlk)
- 📝 Medium: [medium.com/@beratgdlk](https://medium.com/@beratgdlk)

---

<div align="center">
  <p>Made with ❤️ by <strong>Berat Güdelek</strong></p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
