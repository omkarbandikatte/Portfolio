"use client";

import { ArrowLeft, Download } from "lucide-react";

export default function ResumePage() {
  return (
    <div className="flex h-screen flex-col bg-[#050508]">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#050508]/90 px-6 py-3 backdrop-blur-xl">
        <a
          href="/"
          className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </a>
        <a
          href="/resume.pdf"
          download
          className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-purple-500"
        >
          <Download className="h-3.5 w-3.5" />
          Download PDF
        </a>
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
