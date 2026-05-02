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
  title: "Omkar Bandikatte — Software Developer",
  description:
    "Portfolio of Omkar Pramod Bandikatte — Software Developer specializing in AI/ML, Full-Stack Web Development, and scalable systems.",
  keywords: [
    "Omkar Bandikatte",
    "Software Developer",
    "Full Stack",
    "AI",
    "ML",
    "React",
    "Next.js",
    "Python",
  ],
  openGraph: {
    title: "Omkar Bandikatte — Software Developer",
    description:
      "Portfolio of Omkar Pramod Bandikatte — Software Developer specializing in AI/ML, Full-Stack Web Development, and scalable systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
