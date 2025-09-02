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
    heroName: 'Ben Berat,',
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
    aboutDescription: 'Berat, kendi kendini yetiştirmiş bir fullstack web developer\'dır. 2020\'den beri web geliştirme alanında aktif olarak çalışmakta ve modern teknolojilerle projeler geliştirmektedir.',
    aboutCurrentWork: 'Şu anda kişisel projeler üzerinde çalışıyor ve mobil uygulama geliştirme konusunda kendini geliştiriyor.',
    aboutFreeTime: 'Boş zamanlarında yeni teknolojileri öğreniyor, blog yazıları yazıyor ve açık kaynak projelere katkıda bulunuyor.',
    backToBlog: 'Blog\'a Dön',
    
    // Footer
    copyright: 'Berat Güdelek • © {year} • beratgdlk.com'
  },
  en: {
    // Navigation
    blog: 'Blog',
    projects: 'Projects',
    about: 'About',
    
    // Hero Section
    heroGreeting: 'Hi',
    heroName: "I'm Berat,",
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
    aboutDescription: 'Berat is a self-taught fullstack web developer. He has been actively working in web development since 2020 and developing projects with modern technologies.',
    aboutCurrentWork: 'Currently working on personal projects and improving himself in mobile application development.',
    aboutFreeTime: 'In his free time, he learns new technologies, writes blog posts and contributes to open source projects.',
    backToBlog: 'Back to Blog',
    
    // Footer
    copyright: 'Berat Güdelek • © {year} • beratgdlk.com'
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
