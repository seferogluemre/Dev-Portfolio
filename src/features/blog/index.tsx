"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { useLanguage } from "@/hooks";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <BlogPageInner />
      </main>
      <Footer />
    </div>
  );
}

function BlogPageInner() {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8 md:py-12">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
          {t.blogTitle}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {t.blogDescription}
        </p>
      </div>

      {/* Search Bar - Hidden for now
      <div className="mb-8 md:mb-10">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t.searchPlaceholder}
        />
      </div>

      Results Info 
      {searchQuery && (
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">
            &quot;{searchQuery}&quot; için {filteredPosts.length} yazı bulundu
          </p>
        </div>
      )}
      */}

      {/* Coming Soon Message */}
      <div className="text-center py-20">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Icon */}
          <div className="relative">
            <div className="text-8xl mb-6">✍️</div>
            <div className="absolute -top-2 -right-8 text-4xl animate-bounce">✨</div>
          </div>
          
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Blog Yazıları Yakında!
          </h2>
          
          {/* Description */}
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              Şu anda yazılım geliştirme serüvenimde öğrendiğim deneyimleri, 
              karşılaştığım zorlukları ve çözümleri sizlerle paylaşacağım 
              blog yazıları üzerinde çalışıyorum.
            </p>
            <p>
              JavaScript ekosistemi, React, Node.js, Python ve daha birçok 
              konuda detaylı yazılar hazırlıyorum. İlk yazılarım çok yakında burada olacak!
            </p>
          </div>

          {/* Coming Topics */}
          <div className="mt-8 p-6 bg-muted/30 rounded-lg border">
            <h3 className="text-xl font-semibold mb-4">Yakında Gelecek Konular:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-primary">📘</span>
                <span>JavaScript Ekosisteminde 1 Yıl</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">⚛️</span>
                <span>React Best Practices</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">🐍</span>
                <span>Python&apos;dan JavaScript&apos;e Geçiş</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">🚀</span>
                <span>Next.js ile Full-Stack Geliştirme</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">🎨</span>
                <span>Modern UI/UX Tasarım Prensipleri</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">🔧</span>
                <span>Developer Productivity Hacks</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              Bu arada Medium hesabımdan yazılarımı takip edebilirsiniz:
            </p>
            <a 
              href="https://medium.com/@seferogluemre" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <span>📖</span>
              Medium&apos;da Takip Et
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export { default as BlogDetail } from "./components/BlogDetail";
export type { BlogPost } from "./types";
export { default as BlogCard } from "./components/BlogCard";

