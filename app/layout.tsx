import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://geniusgo.app"),
  title: { default: "GeniusGo — Your AI Career Copilot", template: "%s | GeniusGo" },
  description:
    "Generate personalized career roadmaps, identify skill gaps, discover projects, and prepare for interviews using AI.",
  keywords: ["AI career roadmap", "career planning", "skill gap analysis", "interview preparation"],
  openGraph: { type: "website", siteName: "GeniusGo", title: "GeniusGo — Your AI Career Copilot", description: "A clear, personalized roadmap for your next career move." },
  twitter: { card: "summary_large_image", title: "GeniusGo — Your AI Career Copilot", description: "A clear, personalized roadmap for your next career move." },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
