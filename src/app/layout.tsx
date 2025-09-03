import { LanguageProvider } from "@/contexts/LanguageContext";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yunus Emre SEFEROĞLU - Fullstack Software Developer",
  description: "Fullstack web developer sharing experiences and learnings about backend, frontend, and mobile app development.",
  icons: [
    {
      rel: 'icon',
      url: '/emre-seferoglu-light-logo.ico',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      url: '/emre-seferoglu-dark-logo.ico',
      media: '(prefers-color-scheme: dark)',
    },
    {
      rel: 'icon',
      url: '/emre-seferoglu-dark-logo.ico', // Default fallback
    },
    {
      rel: 'shortcut icon',
      url: '/emre-seferoglu-dark-logo.ico',
    },
    {
      rel: 'apple-touch-icon',
      url: '/emre-seferoglu-dark-logo.ico',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
