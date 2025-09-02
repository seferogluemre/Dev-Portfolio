"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { useLanguage } from "@/hooks";
import { useState } from "react";
import BlogCard from "./components/BlogCard";
import SearchBar from "./components/SearchBar";
import { blogPosts } from "./data";

export default function BlogPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  // Arama fonksiyonu
  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <BlogPageInner searchQuery={searchQuery} setSearchQuery={setSearchQuery} filteredPosts={filteredPosts} />
      </main>
      <Footer />
    </div>
  );
}

function BlogPageInner({ searchQuery, setSearchQuery, filteredPosts }: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredPosts: any[];
}) {
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

      {/* Search Bar */}
      <div className="mb-8 md:mb-10">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t.searchPlaceholder}
        />
      </div>

      {/* Results Info */}
      {searchQuery && (
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">
            "{searchQuery}" için {filteredPosts.length} yazı bulundu
          </p>
        </div>
      )}

      {/* Blog Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-2">
                Hiç yazı bulunamadı
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery 
                  ? `"${searchQuery}" aramanızla eşleşen yazı bulunamadı.`
                  : "Henüz blog yazısı bulunmuyor."
                }
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Tüm yazıları görüntüle
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { default as BlogDetail } from "./components/BlogDetail";
export type { BlogPost } from "./types";
export { BlogCard };

