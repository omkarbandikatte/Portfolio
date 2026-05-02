"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  Code2,
  ChevronRight,
  ArrowUpRight,
  Send,
  User,
  MessageSquare,
  CheckCircle2,
  Terminal,
  Folder,
  Trophy,
  Award,
  Users,
} from "lucide-react";
import Chatbot from "@/components/Chatbot";

/* ───────────────────────── DATA ───────────────────────── */

const INFO = {
  name: "Omkar Pramod Bandikatte",
  title: "Software Developer",
  email: "omkarbandikatte2602@gmail.com",
  github: "https://github.com/omkarbandikatte",
  linkedin: "https://linkedin.com/in/omkarbandikatte",
  avatar: "https://avatars.githubusercontent.com/omkarbandikatte",
  about:
    "Passionate software developer with hands-on experience in building AI-driven platforms, scalable microservices, and production-grade web applications. I thrive at the intersection of Artificial Intelligence and Full-Stack Development — turning complex problems into clean, user-friendly solutions. Currently pursuing B.Tech in Computer Science (Data Science) with a strong foundation in Python, modern web frameworks, and machine learning.",
};

const SKILLS = {
  Languages: ["Python", "Java"],
  "Web Development": [
    "JavaScript",
    "React.js",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "REST API",
  ],
  "Tools & Frameworks": [
    "Flask",
    "FastAPI",
    "Streamlit",
    "OpenCV",
    "Apache Kafka",
    "Redis",
    "Git",
    "Postman",
    "Power BI",
  ],
  "AI / ML": [
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "NLP",
    "Deep Learning",
    "Generative AI",
    "LLMs",
  ],
};

const PROJECTS = [
  {
    name: "FairHire — AI Interview Assistant",
    desc: "Real-time AI interview simulator with voice input via Whisper API and LLM-powered feedback using Gemini API for personalized, instant evaluation. Responsive UI built with Next.js and Tailwind CSS, fully deployed on Vercel.",
    tech: ["Next.js", "Tailwind CSS", "Vercel AI SDK", "Gemini API", "Whisper API"],
    live: "https://v0-ai-interview-assistant-theta.vercel.app",
    repo: "https://github.com/omkarbandikatte/fairhire",
  },
  {
    name: "Agriti — Agriculture Intelligence Platform",
    desc: "AI-driven advisory system that analyzes crop conditions, farmer inputs, and environmental factors to generate actionable recommendations. Features multilingual responses for rural accessibility and scalable APIs for mobile/web integration.",
    tech: ["Python", "FastAPI", "LLMs", "Computer Vision"],
    repo: "https://github.com/omkarbandikatte/Agriti",
  },
  {
    name: "DemandIQ — AI Demand Forecasting",
    desc: "Responsive AI-powered dashboard for visualizing product demand trends and sales forecasting. Integrates REST API datasets with Chart.js visualizations, deployed on Vercel.",
    tech: ["Next.js", "Tailwind CSS", "Chart.js", "REST API"],
    live: "https://demand-iq.vercel.app",
    repo: "https://github.com/omkarbandikatte/DemandIQ",
  },
  {
    name: "YouTube Video Summarizer",
    desc: "Generates concise summaries, key takeaways, and exam-style MCQs from YouTube video transcripts. Optimized latency with prompt caching and regex-based transcript parsing.",
    tech: ["Python", "Groq LLM", "YouTube Transcript API", "Streamlit"],
    repo: "https://github.com/omkarbandikatte/AIVideoSummarizer",
  },
];

const EXPERIENCE = [
  {
    role: "SDE Intern",
    company: "Periscope Technologies Inc.",
    location: "India",
    period: "Jan 2026 – May 2026",
    points: [
      "Led development of an AI-powered healthcare workflow system, reducing manual interaction time by 40% through automation of patient search and clinical navigation.",
      "Built and deployed FastAPI-based microservices using Apache Kafka for asynchronous processing of clinical data streams and Redis for distributed caching, handling 1,000+ clinical queries/day with sub-100ms latency.",
      "Collaborated with product and frontend teams to deliver voice-enabled AI interactions, improving task completion speed by 30% for healthcare professionals.",
    ],
  },
];

const EDUCATION = {
  degree: "Bachelor of Technology in Computer Science and Engineering (Data Science)",
  school: "SVKM's Dwarkadas J. Sanghvi College of Engineering",
  location: "Mumbai, India",
  period: "Aug 2023 – June 2027",
  cgpa: "8.68 CGPA",
};

const ACHIEVEMENTS = [
  {
    title: "1st Runner Up — Digital Healthcare Periscope Hackathon",
    link: "https://drive.google.com/file/d/1XMX5rCUTAbI_DtDlWq2lYpMtCCmMs_lF/view?usp=sharing",
    image: "/pscopewinner.png",
  },
  {
    title: "2nd Runner Up — Xtract 3.0 Data Science Competition",
    link: "https://drive.google.com/file/d/1S1MTCAAcgdpt5RjhDA3MKK7BoMniwAfV",
    image: "/xtract.png",
  },
  {
    title: "Top 10 in HackWithMumbai Hackathon",
    link: "https://drive.google.com/file/d/1cTPn5NfzCAT5HNdRaEeCxOs0aQ1ldcgC/view?usp=sharing",
  },
  {
    title: "AI Smart City Hackathon (ByteCamp25): Integrated waste, flood, and solar systems in 24 hours",
    link: "https://github.com/omkarbandikatte/CODE_BUSTERS_ByteCamp2025",
  },
  {
    title: "Scroll Hack: Built Dout-SirJi AI chatbot with blockchain-based login",
    link: "https://drive.google.com/file/d/1r5HcwfXJerTKE41YByR09higznbpn_MR/view?usp=drive_link",
  },
  {
    title: "Qualified Technograd Round 2 — Data Science and Machine Learning Challenge",
  },
];

const CO_CURRICULAR = {
  role: "Events Head",
  organization: "DJS Codestars",
  website: "https://www.djscodestars.in/team",
  image: "/codestars.png",
  description:
    "Led event planning and execution for DJS Codestars, the coding club of DJ Sanghvi College of Engineering. Organized hackathons, workshops, and competitive programming contests.",
};

/* ───────────────────────── ANIMATIONS ───────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeUpDelay = (delay: number) => ({
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

const stagger = {
  show: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

/* ───────────────────────── REUSABLE COMPONENTS ───────────────────────── */

function TerminalWindow({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`group rounded-lg border border-white/[0.06] bg-[#0d1117]/80 overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-green-500/20 hover:shadow-lg hover:shadow-green-500/5 ${className}`}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80 group-hover:bg-[#ff5f57] transition-colors" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80 group-hover:bg-[#febc2e] transition-colors" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80 group-hover:bg-[#28c840] transition-colors" />
        </div>
        <span className="ml-2 text-[11px] font-mono text-gray-600 group-hover:text-gray-400 transition-colors">
          {title}
        </span>
      </div>
      <div className="p-5">{children}</div>
    </motion.div>
  );
}

function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-purple-600/[0.06] blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-green-500/[0.04] blur-[120px]" />
      <div className="absolute top-1/2 right-1/3 h-[300px] w-[300px] rounded-full bg-cyan-500/[0.04] blur-[100px]" />
    </div>
  );
}

function Section({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={stagger}
      className="relative py-24"
    >
      <motion.div variants={fadeUp} className="mb-16 text-center space-y-3">
        <div className="inline-flex items-center gap-3">
          <span className="h-px w-8 bg-green-500/30" />
          <span className="font-mono text-xs tracking-[0.25em] text-green-500/70">
            {label}
          </span>
          <span className="h-px w-8 bg-green-500/30" />
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {title}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="text-green-400"
          >
            _
          </motion.span>
        </h2>
      </motion.div>
      {children}
    </motion.section>
  );
}

/* ───────────────────────── WELCOME TERMINAL ───────────────────────── */

function WelcomeTerminal({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);

  const bootSequence = [
    { text: "$ sudo ./initialize --portfolio", color: "text-green-400" },
    { text: "  → Loading core modules...", color: "text-gray-500" },
    { text: "  → Compiling TypeScript... done", color: "text-gray-500" },
    { text: "  → Connecting to server... established", color: "text-gray-500" },
    { text: "  → Building Next.js app... ready", color: "text-gray-500" },
    { text: "  → Deploying components... ████████████████ 100%", color: "text-cyan-400" },
    { text: "", color: "" },
    { text: "  ✦ Welcome to Omkar's World ✦", color: "text-green-300 text-lg font-bold" },
    { text: "  ✓ System ready. Portfolio loaded.", color: "text-green-400" },
  ];

  useEffect(() => {
    const delays = [300, 700, 1100, 1500, 1900, 2300, 2700, 2900, 3500];
    delays.forEach((delay, i) => {
      setTimeout(() => setVisibleLines(i + 1), delay);
    });
    setTimeout(onComplete, 5000);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030306]"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-2xl mx-6 rounded-lg border border-green-500/20 bg-[#0a0a0f]/95 overflow-hidden shadow-2xl shadow-green-500/10"
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-green-500/10 bg-green-500/[0.03]">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <div className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-xs font-mono text-green-500/50">
            omkar@dev:~/portfolio
          </span>
        </div>
        <div className="p-6 font-mono text-sm leading-8 min-h-[280px]">
          {bootSequence.slice(0, visibleLines).map((line, i) =>
            line.text === "" ? (
              <div key={i} className="h-4" />
            ) : (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={line.color}
              >
                {line.text}
              </motion.div>
            )
          )}
          {visibleLines < bootSequence.length && (
            <span className="text-green-400 cursor-blink">▋</span>
          )}
          {visibleLines >= bootSequence.length && (
            <div className="mt-1 text-green-500/40 text-xs">$ <span className="cursor-blink">▋</span></div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ───────────────────────── NAVBAR ───────────────────────── */

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Achievements", "Activities", "Education", "Contact"];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "border-white/[0.06] bg-[#050508]/90 backdrop-blur-xl shadow-lg shadow-green-500/[0.03]"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <motion.a
          href="#"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="font-mono text-sm font-bold text-green-400 cursor-pointer flex items-center gap-1.5"
        >
          <Terminal className="h-4 w-4" />
          <span className="text-gray-500">~/</span>omkar
        </motion.a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <motion.a
                href={`#${l.toLowerCase()}`}
                whileHover={{ scale: 1.05 }}
                className="font-mono text-xs text-gray-500 transition-colors hover:text-green-400 tracking-wider"
              >
                {l.toLowerCase()}
                <motion.div
                  className="h-px bg-green-500/50 mt-0.5"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </motion.a>
            </li>
          ))}
        </ul>

        <motion.a
          href="/resume"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 197, 94, 0.2)" }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 rounded border border-green-500/30 bg-green-500/[0.06] px-4 py-2 text-xs font-mono text-green-400 hover:bg-green-500/10 hover:border-green-500/50 transition-all"
        >
          <ExternalLink className="h-3 w-3" />
          resume.pdf
        </motion.a>
      </div>
    </motion.nav>
  );
}

/* ───────────────────────── HERO ───────────────────────── */

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center px-6 pt-16 gpu-accelerated">
      {/* Floating code snippets - decorative */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
        <motion.div
          animate={{ opacity: [0.04, 0.08, 0.04], y: [-10, 10, -10] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute left-[5%] top-[20%] hidden lg:block font-mono text-[11px] text-green-500 whitespace-pre leading-5 gpu-accelerated"
        >
{`const developer = {
  name: "Omkar",
  skills: ["AI", "Web"],
  passion: true,
  coffee: Infinity,
};`}
        </motion.div>

        <motion.div
          animate={{ opacity: [0.04, 0.08, 0.04], y: [10, -10, 10] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute right-[5%] top-[15%] hidden lg:block font-mono text-[11px] text-purple-500 whitespace-pre leading-5 gpu-accelerated"
        >
{`import { brain } from './ai';

export async function solve(
  problem: string
): Promise<Solution> {
  return brain.think(problem);
}`}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-12 lg:flex-row lg:items-center lg:justify-between"
      >
        {/* Left side - Name & one-liner */}
        <div className="flex flex-col items-center lg:items-start gap-6 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
          >
            <span className="font-mono text-[11px] text-green-400/80 tracking-wider">
              AVAILABLE FOR OPPORTUNITIES
            </span>
          </motion.div>

          <div className="space-y-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white"
            >
              Omkar
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent bg-size-200 animate-gradient"
            >
              Bandikatte
            </motion.h1>
          </div>

          {/* One-liner */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            className="max-w-lg text-base text-gray-400 leading-relaxed"
          >
            Building AI-driven platforms &amp; scalable web applications — turning complex problems into clean, user-friendly solutions.
          </motion.p>

          {/* Role - code syntax style */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
            className="font-mono text-sm flex items-center gap-1 flex-wrap"
          >
            <span className="text-purple-400">const</span>
            <span className="text-white">role</span>
            <span className="text-purple-400">=</span>
            <span className="text-green-400">&quot;{INFO.title}&quot;</span>
            <span className="text-green-400 cursor-blink">▋</span>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 pt-2"
          >
            {[
              { icon: Github, href: INFO.github, label: "GitHub" },
              { icon: Linkedin, href: INFO.linkedin, label: "LinkedIn" },
              { icon: Mail, href: `mailto:${INFO.email}`, label: "Email" },
            ].map((link, idx) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.15,
                  boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + idx * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-3 text-gray-500 hover:text-green-400 transition-all duration-200 hover:border-green-500/30 hover:bg-green-500/[0.05]"
              >
                <link.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Right side - Avatar */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 14, delay: 0.3 }}
          className="flex justify-center shrink-0"
        >
          <div className="relative">
            <img
              src={INFO.avatar}
              alt={INFO.name}
              className="h-52 w-52 sm:h-64 sm:w-64 lg:h-72 lg:w-72 rounded-full border-2 border-green-500/30 object-cover shadow-2xl shadow-green-500/15"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-3 rounded-full border border-dashed border-green-500/20 gpu-accelerated"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-6 rounded-full border border-dotted border-cyan-500/10 gpu-accelerated"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 1.5 }, y: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 gpu-accelerated"
      >
        <span className="font-mono text-[10px] text-gray-700 tracking-wider">scroll</span>
        <ChevronRight className="h-4 w-4 rotate-90 text-gray-700" />
      </motion.div>
    </section>
  );
}

/* ───────────────────────── ABOUT ───────────────────────── */

function About() {
  return (
    <Section id="about" label="// ABOUT" title="About Me">
      <motion.div variants={slideInLeft} className="mx-auto max-w-3xl">
        <TerminalWindow title="about.md — ~/portfolio">
          <div className="font-mono text-sm">
            <div className="text-green-500/60 mb-4">$ cat about.md</div>
            <p className="text-gray-300 leading-7 font-sans text-base">{INFO.about}</p>
            <div className="mt-5 flex items-center gap-4 text-xs text-gray-600 font-mono">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-green-500/50" /> Mumbai, India
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="h-3 w-3 text-green-500/50" /> {INFO.email}
              </span>
            </div>
            <div className="mt-4 text-green-500/40 text-xs">$ <span className="cursor-blink">▋</span></div>
          </div>
        </TerminalWindow>
      </motion.div>
    </Section>
  );
}

/* ───────────────────────── SKILLS ───────────────────────── */

function Skills() {
  return (
    <Section id="skills" label="// TECH_STACK" title="Skills">
      <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(SKILLS).map(([category, items], idx) => (
          <motion.div key={category} variants={fadeUpDelay(idx * 0.1)}>
            <TerminalWindow
              title={`${category.toLowerCase().replace(/[/ ]/g, "-")}.config`}
            >
              <div>
                <h3 className="font-mono text-xs text-green-400/80 tracking-wider mb-4 flex items-center gap-2">
                  <Code2 className="h-3.5 w-3.5" />
                  {`// ${category}`}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((s, i) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04 }}
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(34, 197, 94, 0.12)" }}
                      className="rounded border border-green-500/20 bg-green-500/[0.05] px-2.5 py-1 text-xs font-mono text-green-300/80 hover:border-green-500/40 transition-all cursor-default"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </div>
            </TerminalWindow>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ───────────────────────── PROJECTS ───────────────────────── */

function Projects() {
  return (
    <Section id="projects" label="// REPOSITORIES" title="Projects">
      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
        {PROJECTS.map((p, idx) => (
          <motion.div key={p.name} variants={fadeUpDelay(idx * 0.1)}>
            <TerminalWindow
              title={p.name
                .split("—")[0]
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "-")}
            >
              <div>
                <div className="flex items-start gap-2 mb-3">
                  <Folder className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <h3 className="text-base font-bold text-white group-hover:text-green-300 transition-colors leading-tight">
                    {p.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-400 mb-5 leading-relaxed">
                  {p.desc}
                </p>

                {/* Tech stack - language dots */}
                <div className="flex flex-wrap gap-x-3 gap-y-1.5 mb-5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="flex items-center gap-1.5 text-[11px] font-mono text-gray-500"
                    >
                      <span className="h-2 w-2 rounded-full bg-green-400/80" />
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-3 border-t border-white/[0.06]">
                  <motion.a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 2 }}
                    className="flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-green-400 transition-colors"
                  >
                    <Github className="h-3.5 w-3.5" />
                    source
                  </motion.a>
                  {p.live && (
                    <motion.a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 2 }}
                      className="flex items-center gap-1.5 text-xs font-mono text-cyan-500 hover:text-cyan-400 transition-colors"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      live
                    </motion.a>
                  )}
                </div>
              </div>
            </TerminalWindow>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ───────────────────────── EXPERIENCE ───────────────────────── */

function Experience() {
  return (
    <Section id="experience" label="// WORK_HISTORY" title="Experience">
      <div className="mx-auto max-w-3xl space-y-4">
        {EXPERIENCE.map((exp, idx) => (
          <motion.div key={exp.company} variants={fadeUpDelay(idx * 0.15)}>
            <TerminalWindow title={`${exp.company.toLowerCase().replace(/[\s.]+/g, "-")}.log`}>
              <div>
                {/* Header with role info */}
                <div className="font-mono text-xs text-green-500/50 mb-4">
                  $ git log --oneline --author=&quot;omkar&quot;
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <Briefcase className="h-4 w-4 text-green-400" />
                  <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                </div>
                <div className="flex flex-wrap items-center gap-1 mb-5 text-sm">
                  <span className="text-cyan-400 font-mono">@</span>
                  <span className="text-cyan-400">{exp.company}</span>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-5 font-mono">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-green-500/50" /> {exp.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3 text-green-500/50" /> {exp.period}
                  </span>
                </div>

                {/* Team photo - full width banner */}
                <div className="mb-6 -mx-5 px-5">
                  <img
                    src="/periscope.png"
                    alt="Team at Periscope Technologies"
                    className="w-full h-52 sm:h-64 rounded-lg border border-white/[0.08] object-cover"
                  />
                </div>

                {/* Bullet points */}
                <ul className="space-y-3">
                  {exp.points.map((pt, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-3 text-sm leading-relaxed text-gray-400"
                    >
                      <span className="text-green-500 shrink-0 font-mono mt-0.5">→</span>
                      {pt}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </TerminalWindow>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ───────────────────────── ACHIEVEMENTS ───────────────────────── */

function Achievements() {
  return (
    <Section id="achievements" label="// ACHIEVEMENTS" title="Achievements">
      <div className="mx-auto max-w-4xl space-y-4">
        {ACHIEVEMENTS.map((achievement, idx) => (
          <motion.div key={idx} variants={fadeUpDelay(idx * 0.1)}>
            <TerminalWindow title={`achievement-${idx + 1}.log`}>
              <div className="flex flex-col md:flex-row gap-5">
                {achievement.image && (
                  <div className="shrink-0">
                    <img
                      src={achievement.image}
                      alt={achievement.title}
                      className="w-full md:w-48 h-36 object-cover rounded border border-white/[0.08]"
                    />
                  </div>
                )}
                <div className="flex flex-col justify-center">
                  <div className="flex items-start gap-3 mb-2">
                    <Trophy className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
                    <h3 className="text-base font-bold text-white leading-tight">
                      {achievement.title}
                    </h3>
                  </div>
                  {achievement.link && (
                    <motion.a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 2 }}
                      className="ml-8 mt-2 inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      View Certificate / Proof
                    </motion.a>
                  )}
                </div>
              </div>
            </TerminalWindow>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ───────────────────────── CO-CURRICULAR ───────────────────────── */

function CoCurricular() {
  return (
    <Section id="activities" label="// ACTIVITIES" title="Co-Curricular">
      <motion.div variants={scaleIn} className="mx-auto max-w-3xl">
        <TerminalWindow title="extracurriculars.md — ~/portfolio">
          <div className="flex flex-col md:flex-row gap-6">
            {CO_CURRICULAR.image && (
              <div className="shrink-0 flex justify-center">
                <img
                  src={CO_CURRICULAR.image}
                  alt={`${CO_CURRICULAR.role} at ${CO_CURRICULAR.organization}`}
                  className="w-48 h-48 object-cover rounded-lg border border-white/[0.08]"
                />
              </div>
            )}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <Users className="h-5 w-5 text-purple-400" />
                <h3 className="text-lg font-bold text-white">{CO_CURRICULAR.role}</h3>
              </div>
              <div className="flex items-center gap-1 mb-4 text-sm">
                <span className="text-cyan-400 font-mono">@</span>
                <a
                  href={CO_CURRICULAR.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-2"
                >
                  {CO_CURRICULAR.organization}
                </a>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                {CO_CURRICULAR.description}
              </p>
            </div>
          </div>
        </TerminalWindow>
      </motion.div>
    </Section>
  );
}

/* ───────────────────────── EDUCATION ───────────────────────── */

function EducationSection() {
  return (
    <Section id="education" label="// EDUCATION" title="Education">
      <motion.div variants={scaleIn} className="mx-auto max-w-3xl">
        <TerminalWindow title="education.md — ~/credentials">
          <div>
            <div className="font-mono text-xs text-green-500/50 mb-4">
              $ cat education.md
            </div>
            <div className="flex items-start gap-3 mb-4">
              <GraduationCap className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-white leading-tight">
                  {EDUCATION.degree}
                </h3>
                <p className="mt-1 text-sm text-gray-300">
                  {EDUCATION.school}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-mono">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-cyan-500/50" /> {EDUCATION.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3 text-cyan-500/50" /> {EDUCATION.period}
              </span>
              <motion.span
                animate={{ boxShadow: ["0 0 0px rgba(34,197,94,0)", "0 0 12px rgba(34,197,94,0.3)", "0 0 0px rgba(34,197,94,0)"] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="rounded border border-green-500/30 bg-green-500/[0.08] px-3 py-1 text-xs font-bold text-green-400"
              >
                {EDUCATION.cgpa}
              </motion.span>
            </div>
          </div>
        </TerminalWindow>
      </motion.div>
    </Section>
  );
}

/* ───────────────────────── CONTACT ───────────────────────── */

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.open(`mailto:${INFO.email}?subject=${subject}&body=${body}`, "_self");
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <Section id="contact" label="// CONNECT" title="Get In Touch">
      <motion.div variants={slideInRight} className="mx-auto max-w-2xl">
        <TerminalWindow title="send-message.sh — ~/portfolio">
          <div>
            <div className="font-mono text-xs text-green-500/50 mb-6">
              $ ./send-message.sh
            </div>
            <p className="mb-8 text-center text-gray-400 text-sm">
              Interested in working together? Drop me a message.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="mb-2 flex items-center gap-2 text-xs font-mono text-gray-400">
                    <User className="h-3.5 w-3.5 text-green-500/50" />
                    name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="> John Doe"
                    className="w-full rounded border border-white/[0.08] bg-[#0a0a0f] px-4 py-3 text-sm font-mono text-white placeholder-gray-700 outline-none transition-all focus:border-green-500/40 focus:ring-1 focus:ring-green-500/20 hover:border-white/[0.12]"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="mb-2 flex items-center gap-2 text-xs font-mono text-gray-400">
                    <Mail className="h-3.5 w-3.5 text-green-500/50" />
                    email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="> you@example.com"
                    className="w-full rounded border border-white/[0.08] bg-[#0a0a0f] px-4 py-3 text-sm font-mono text-white placeholder-gray-700 outline-none transition-all focus:border-green-500/40 focus:ring-1 focus:ring-green-500/20 hover:border-white/[0.12]"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="mb-2 flex items-center gap-2 text-xs font-mono text-gray-400">
                  <MessageSquare className="h-3.5 w-3.5 text-green-500/50" />
                  message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="> Tell me about your project..."
                  className="w-full resize-none rounded border border-white/[0.08] bg-[#0a0a0f] px-4 py-3 text-sm font-mono text-white placeholder-gray-700 outline-none transition-all focus:border-green-500/40 focus:ring-1 focus:ring-green-500/20 hover:border-white/[0.12]"
                />
              </motion.div>

              <div className="flex flex-col items-center gap-4 pt-2">
                <motion.button
                  type="submit"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 30px rgba(34, 197, 94, 0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded border border-green-500/30 bg-green-500/10 px-8 py-3 font-mono text-sm font-bold text-green-400 transition-all hover:bg-green-500/15 hover:border-green-500/50"
                >
                  <Send className="h-4 w-4" />
                  send_message()
                </motion.button>

                <AnimatePresence>
                  {status === "sent" && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-xs font-mono text-green-400"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      ✓ Opening email client...
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </TerminalWindow>
      </motion.div>
    </Section>
  );
}

/* ───────────────────────── PAGE ───────────────────────── */

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleWelcomeComplete = useCallback(() => {
    setShowWelcome(false);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (showWelcome) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showWelcome]);

  return (
    <>
      <AnimatePresence>
        {showWelcome && <WelcomeTerminal onComplete={handleWelcomeComplete} />}
      </AnimatePresence>

      <GridBackground />
      <Navbar />
      <main className="relative z-10 mx-auto max-w-6xl px-6">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <CoCurricular />
        <EducationSection />
        <Contact />
      </main>

      <footer className="relative z-10 border-t border-white/[0.06] py-10 text-center">
        <p className="font-mono text-xs text-gray-600">
          <span className="text-green-500/40">$</span> echo &quot;Built with
          Next.js &amp; Tailwind CSS&quot;{" "}
          <span className="text-gray-700">|</span>{" "}
          <span className="text-green-500/40">grep</span> &quot;Made with ❤️ by
          Omkar&quot;
        </p>
        <p className="mt-2 font-mono text-[10px] text-gray-700">
          &copy; {new Date().getFullYear()} &middot; All rights reserved
        </p>
      </footer>

      <Chatbot />
    </>
  );
}
