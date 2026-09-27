"use client";

import { ArrowLeft, Download } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function ResumePage() {
  return (
    <div className="theme-resume flex h-screen flex-col bg-[#050508]">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#050508]/90 px-6 py-3 backdrop-blur-xl">
        <a
          href="/"
          className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </a>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-1.5 rounded border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400 transition-all hover:bg-green-500/15"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Download PDF</span>
          </a>
        </div>
      </div>

      {/* PDF Viewer */}
      <iframe
        src="/resume.pdf"
        className="flex-1 w-full"
        title="Omkar Bandikatte Resume"
      />
    </div>
  );
}
