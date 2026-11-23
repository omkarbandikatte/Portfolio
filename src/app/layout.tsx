import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Omkar Bandikatte | AI & Full-Stack Engineer",
  description:
    "Portfolio of Omkar Bandikatte, an AI and full-stack engineer building RAG pipelines, AI agents, data platforms, and production web applications.",
  keywords: [
    "Omkar Bandikatte",
    "Software Developer",
    "Full Stack",
    "AI",
    "ML",
    "RAG",
    "AI Agents",
    "React",
    "Next.js",
    "Python",
  ],
  openGraph: {
    title: "Omkar Bandikatte | AI & Full-Stack Engineer",
    description:
      "RAG pipelines, AI agents, data platforms, and production full-stack applications by Omkar Bandikatte.",
    type: "website",
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{history.scrollRestoration='manual';var t=localStorage.getItem('portfolio-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.classList.remove('light','dark');document.documentElement.classList.add(t);document.documentElement.style.colorScheme=t;if(localStorage.getItem('portfolio-intro-seen')==='true'){document.documentElement.classList.add('intro-seen')}}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
