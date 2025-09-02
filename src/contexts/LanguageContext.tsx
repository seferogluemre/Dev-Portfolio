"use client";

import { createContext, ReactNode, useContext, useState } from 'react';

type Language = 'tr' | 'en';

interface Translations {
  // Navigation
  blog: string;
  projects: string;
  about: string;
  
  // Hero Section
  heroGreeting: string;
  heroName: string;
  heroPortfolio: string;
  heroDescription: string;
  
  // Blog Page
  blogTitle: string;
  blogDescription: string;
  searchPlaceholder: string;
  readMore: string;
  noResults: string;
  allPosts: string;
  
      // About Page
    aboutTitle: string;
    aboutDescription: string;
    aboutCurrentWork: string;
    aboutFreeTime: string;
    aboutSkills: string;
    aboutExperience: string;
  backToBlog: string;
  
  // Footer
  copyright: string;
}

const translations: Record<Language, Translations> = {
  tr: {
    // Navigation
    blog: 'Blog',
    projects: 'Projeler',
    about: 'Hakkımda',
    
    // Hero Section
    heroGreeting: 'Merhaba',
    heroName: 'Ben  Emre SEFEROGLU,',
    heroPortfolio: 've burası benim portfolyom.',
    heroDescription: 'Burada, yazılarım aracılığıyla bir fullstack web developer olarak deneyimlerimi ve daha fazlasını paylaşıyorum. Şu sıralar mobil app development öğreniyorum ve bunları da yazıyor olacağım.',
    
    // Blog Page
    blogTitle: 'Blog Yazıları',
    blogDescription: 'Teknoloji, geliştirme süreçleri ve öğrendiklerim hakkında yazdığım makaleler.',
    searchPlaceholder: 'Blog yazılarında ara...',
    readMore: 'Devamını Oku',
    noResults: 'Aradığınız kriterlere uygun yazı bulunamadı.',
    allPosts: 'Tüm Yazılar',
    
    // About Page
    aboutTitle: 'Hakkımda',
    aboutDescription: 'Emre SEFEROGLU, kendi kendini yetiştirmiş bir fullstack yazılım geliştiricisidir. 2021\'den beri yazılım geliştirme alanında aktif olarak çalışmakta ve modern teknolojilerle projeler geliştirmektedir.',
    aboutCurrentWork: 'Şu anda OnlyJS Technology\'de çalışıyor ve 1 yılı aşkın süredir JavaScript ekosistemine odaklanarak projeler geliştiriyor.',
    aboutFreeTime: 'Boş zamanlarında yeni teknolojileri öğreniyor, blog yazıları yazıyor ve açık kaynak projelere katkıda bulunuyor.',
    aboutSkills: 'Yazılıma farklı bakış açıları kazanmış, uçtan uca yazılım dünyasını algılayabilen ve yazılım proje yönetim tekniklerini uygulayabilen bir geliştirici.',
    aboutExperience: 'Orta seviye Python ile script ve yazılım geliştirme deneyimi. Çoklu veritabanı desteği (PostgreSQL, MySQL, MSSQL, SQLite, Redis) ile projeler geliştirmiş. JavaScript, TypeScript, C# ve Java dillerinde deneyim sahibi. PyQt5 ile masaüstü uygulamaları ve Django ile web uygulamaları geliştirmiş. Docker containerization ve AWS cloud servisleri ile çalışma deneyimi. C++ ve Arduino ile embedded sistemler geliştirmiş.',
    backToBlog: 'Blog\'a Dön',
    
    // Footer
    copyright: 'Yunus Emre SEFEROGLU • © {year} • seferogluemre.com'
  },
  en: {
    // Navigation
    blog: 'Blog',
    projects: 'Projects',
    about: 'About',
    
    // Hero Section
    heroGreeting: 'Hi',
    heroName: "I'm Emre SEFEROGLU,",
    heroPortfolio: 'and this is my portfolio.',
    heroDescription: 'Here, I share through my writing my experience as a fullstack web developer and more. Currently learning mobile app development and will be writing about it.',
    
    // Blog Page
    blogTitle: 'Blog Posts',
    blogDescription: 'Articles about technology, development processes, and everything I\'m learning.',
    searchPlaceholder: 'Search blog posts...',
    readMore: 'Read More',
    noResults: 'No posts found matching your criteria.',
    allPosts: 'All Posts',
    
    // About Page
    aboutTitle: 'About',
    aboutDescription: 'Emre SEFEROGLU is a self-taught fullstack software developer. He has been actively working in software development since 2021 and developing projects with modern technologies.',
    aboutCurrentWork: 'Currently working at OnlyJS Technology and has been developing projects focused on JavaScript ecosystem for over a year.',
    aboutFreeTime: 'In his free time, he learns new technologies, writes blog posts and contributes to open source projects.',
    aboutSkills: 'A developer who has gained different perspectives on software, can perceive the end-to-end software world, and can apply software project management techniques.',
    aboutExperience: 'Has intermediate level Python experience in script and software development. Developed projects with multi-database support (PostgreSQL, MySQL, MSSQL, SQLite, MongoDB, Redis). Has experience in JavaScript, TypeScript, C# and Java languages. Developed desktop applications with PyQt5 and web applications with Django. Has experience with Docker containerization and AWS cloud services. Developed embedded systems with C++ and Arduino.',
    backToBlog: 'Back to Blog',
    
    // Footer
    copyright: 'Yunus Emre SEFEROGLU • © {year} • seferogluemre.com'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'tr' : 'en');
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    toggleLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
