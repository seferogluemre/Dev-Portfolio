"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { notFound } from "next/navigation";
import React from "react";
import BlogDetail from "../components/BlogDetail";
import { blogPosts } from "../data";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <BlogDetailPageInner params={params} />
      </main>
      <Footer />
    </div>
  );
}

function BlogDetailPageInner({ params }: BlogDetailPageProps) {
  const resolvedParams = React.use(params);
  const post = blogPosts.find(post => post.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // If post has external URL, redirect to it
  if (post.externalUrl) {
    React.useEffect(() => {
      window.location.href = post.externalUrl!;
    }, [post.externalUrl]);
    
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-lg mb-4">Medium'a yönlendiriliyorsunuz...</p>
          <a 
            href={post.externalUrl} 
            className="text-primary hover:underline"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Direkt olarak açmak için tıklayın
          </a>
        </div>
      </div>
    );
  }

  return <BlogDetail post={post} />;
}
