"use client";

import { useLanguage } from "@/hooks";
import { Download, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="w-full py-8 px-6 mt-auto">
      <div className="max-w-6xl mx-auto">
        {/* Sosyal İkonlar */}
                 <div className="flex justify-center space-x-8 mb-4">
                    <a 
            href="mailto:beratgdlk@gmail.com"
            className="text-muted-foreground hover:text-foreground transition-colors p-2"
            aria-label="Email"
          >
            <Mail className="h-6 w-6" />
          </a>
          
          <a 
            href="https://github.com/beratgdlk"
            className="text-muted-foreground hover:text-foreground transition-colors p-2"
            aria-label="GitHub"
          >
            <Github className="h-6 w-6" />
          </a>
          
          <a 
            href="https://www.linkedin.com/in/beratgudelek/"
            className="text-muted-foreground hover:text-foreground transition-colors p-2"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          
          <a 
            href="https://medium.com/@beratgdlk"
            className="text-muted-foreground hover:text-foreground transition-colors p-2"
            aria-label="Medium"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
            </svg>
          </a>
          
          <a 
            href="/resume.pdf"
            className="text-muted-foreground hover:text-foreground transition-colors p-2"
            aria-label="Download CV"
          >
            <Download className="h-6 w-6" />
          </a>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-base text-muted-foreground">
          {t.copyright.replace('{year}', new Date().getFullYear().toString())}
        </div>
      </div>
    </footer>
  );
}
