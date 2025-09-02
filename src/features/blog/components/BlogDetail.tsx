"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "../types";

interface BlogDetailProps {
  post: BlogPost;
}

export default function BlogDetail({ post }: BlogDetailProps) {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-8 md:py-12">
      {/* Back Button */}
      <div className="mb-8">
        <Button variant="ghost" className="group p-0 h-auto font-medium text-sm" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            {t.backToBlog}
          </Link>
        </Button>
      </div>

      {/* Hero Image */}
      {post.image && (
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>
      )}

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Description */}
        <p className="text-lg text-muted-foreground leading-relaxed">
          {post.description}
        </p>
      </header>

      {/* Article Content */}
      <article className="prose prose-lg max-w-none">
        <div className="whitespace-pre-line leading-relaxed">
          {post.content}
        </div>
      </article>

      {/* Back to Blog */}
      <div className="mt-12 pt-8 border-t">
        <Button variant="outline" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.allPosts}
          </Link>
        </Button>
      </div>
    </div>
  );
}
