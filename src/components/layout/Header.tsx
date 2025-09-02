"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks";
import { FileText, FolderOpen, Globe, Menu, Moon, Sun, User, X } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { language, t, toggleLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }



  return (
    <>
      <header className="w-full py-6 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src={theme === "light" ? "/logo-bg-black.svg" : "/logo-bg.svg"}
              alt="Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-xl font-bold">beratgdlk</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/blog" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.blog}
            </Link>
            <Link 
              href="/projects" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.projects}
            </Link>
            <Link 
              href="/about" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.about}
            </Link>
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-sm"
            >
              <Globe className="h-4 w-4 mr-1" />
              {language.toUpperCase()}
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div 
            className={`fixed top-0 right-0 h-full w-80 max-w-[80vw] bg-background border-l border-border shadow-xl transform transition-transform duration-300 ease-in-out ${
              mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-semibold">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Navigation Links */}
            <nav className="p-6 space-y-6">
              <Link 
                href="/blog" 
                className="flex items-center space-x-3 text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-3 px-3 rounded-lg hover:bg-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FileText className="h-5 w-5" />
                <span>{t.blog}</span>
              </Link>
              <Link 
                href="/projects" 
                className="flex items-center space-x-3 text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-3 px-3 rounded-lg hover:bg-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FolderOpen className="h-5 w-5" />
                <span>{t.projects}</span>
              </Link>
              <Link 
                href="/about" 
                className="flex items-center space-x-3 text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-3 px-3 rounded-lg hover:bg-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>{t.about}</span>
              </Link>
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                beratgdlk.com
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
