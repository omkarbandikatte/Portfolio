"use client";

import { useState, useEffect, useCallback, useRef, type MouseEvent } from "react";
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
  ArrowUpRight,
  Send,
  User,
  MessageSquare,
  CheckCircle2,
  Trophy,
  Users,
  FileText,
  Download,
  ArrowRight,
  Sparkles,
  BrainCircuit,
  Database,
  Layers3,
  Zap,
  Menu,
  X,
  Play,
  Pause,
} from "lucide-react";
import Chatbot from "@/components/Chatbot";
import TechBalls from "@/components/TechBalls";
import ThemeToggle from "@/components/ThemeToggle";

/* ───────────────────────── DATA ───────────────────────── */

const INFO = {
  name: "Omkar Pramod Bandikatte",
  title: "AI & Full-Stack Engineer",
  email: "omkarbandikatte2602@gmail.com",
  github: "https://github.com/omkarbandikatte",
  linkedin: "https://linkedin.com/in/omkarbandikatte",
  avatar: "https://avatars.githubusercontent.com/omkarbandikatte",
  about:
    "I build production-ready AI systems, including RAG pipelines, tool-calling agents, automation workflows, and the full-stack products around them. As a Computer Science (Data Science) student at DJSCE and former SDE Intern at Periscope Technologies, I have worked on e-commerce analytics, recruiting tools, research assistants, and computer vision applications.",
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
    "Docker",
    "Azure",
  ],
  "AI / ML": [
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "NLP",
    "Deep Learning",
    "Generative AI",
    "LLMs",
    "RAG",
    "AI Agents",
    "Qdrant",
    "Elasticsearch",
  ],
};

type Project = {
  name: string;
  shortName: string;
  category: string;
  metric: string;
  metricLabel: string;
  desc: string;
  tech: string[];
  repo?: string;
  live?: string;
  image?: string;
};

const PROJECTS: Project[] = [
  {
    name: "Provenyx: Software Supply-Chain Security",
    shortName: "Provenyx",
    category: "Dependency security",
    metric: "0",
    metricLabel: "packages executed",
    desc: "Software supply-chain investigation for npm projects. Provenyx analyzes package-lock.json without installing or executing dependencies, maps direct and transitive packages, explains unusual release behavior, and compares metadata with blockchain-anchored manifest hashes.",
    tech: ["VS Code Extension", "npm", "Dependency Analysis", "Blockchain"],
    live: "https://provenyx.vercel.app/",
    image: "/provenyx.png",
  },
  {
    name: "DocuMind: Multi-Document Intelligence",
    shortName: "DocuMind",
    category: "Trust-aware RAG",
    metric: "6+",
    metricLabel: "source formats",
    desc: "Trust-aware RAG assistant across PDFs, web pages, YouTube, audio, CSVs, and images. Hybrid Qdrant and Elasticsearch retrieval uses Reciprocal Rank Fusion, citations, credibility scoring, temporal drift detection, and self-verification.",
    tech: ["FastAPI", "Qdrant", "Elasticsearch", "Gemini 2.5", "Docker"],
    repo: "https://github.com/omkarbandikatte/MDIA-Multi-Document-Intelligence-Assistant",
  },
  {
    name: "LeadIntel: B2B Lead Intelligence",
    shortName: "LeadIntel",
    category: "Predictive intelligence",
    metric: "6,711",
    metricLabel: "company records",
    desc: "End-to-end lead scoring platform built from 6,711 publicly sourced company records. Combines conversion prediction, local Hugging Face intent classification, role-based APIs, automated retraining, and ranked account analytics.",
    tech: ["FastAPI", "Next.js", "Scikit-learn", "Hugging Face", "Celery", "Redis"],
    repo: "https://github.com/omkarbandikatte/LeadIntel",
  },
  {
    name: "FairHire: AI Interview Assistant",
    shortName: "FairHire",
    category: "Real-time AI",
    metric: "<2s",
    metricLabel: "evaluation time",
    desc: "Real-time AI interview platform with Whisper voice processing, Gemini-powered evaluation in under two seconds, resume and ATS scoring, interview tracking, and sentiment and bias signals.",
    tech: ["Next.js", "Tailwind CSS", "Gemini API", "Whisper API"],
    live: "https://v0-ai-interview-assistant-theta.vercel.app",
    repo: "https://github.com/omkarbandikatte/fairhire",
  },
  {
    name: "Driver Drowsiness Detection",
    shortName: "DriveSafe",
    category: "Computer vision",
    metric: "468",
    metricLabel: "facial landmarks",
    desc: "Real-time fatigue detection across 468 facial landmarks using EAR and MAR metrics, with escalating audible, SMS, and emergency-call alerts plus a live WebSocket monitoring dashboard.",
    tech: ["Python", "OpenCV", "MediaPipe", "FastAPI", "React", "Twilio"],
    live: "https://driver-drowsiness-detection-system-sage.vercel.app",
    repo: "https://github.com/omkarbandikatte/DriverDrowsinessDetectionSystem",
  },
];

const IMPACT = [
  { value: "1K+", label: "records processed daily" },
  { value: "35%", label: "pipeline reliability gain" },
  { value: "<100ms", label: "reporting queries" },
  { value: "5", label: "featured products" },
];

const EXPERIENCE = [
  {
    role: "SDE Intern",
    company: "Periscope Technologies Inc.",
    location: "India",
    period: "Jan 2026 to May 2026",
    points: [
      "Led development of Stryder, a multi-client e-commerce analytics platform, building Playwright automation across Blinkit, Zepto, Instamart, BigBasket, Amazon, and Flipkart Minutes.",
      "Built FastAPI data pipelines processing 1,000+ records per day, with consolidated reporting in Azure Blob Storage and PostgreSQL and sub-100ms reporting queries.",
      "Designed an LLM-assisted self-healing recovery module with cached regex rules and keyword fallbacks, improving pipeline reliability by 35%.",
      "Implemented secure multi-client authentication, TOTP/2FA automation, encrypted credential handling, and fixes for concurrent shared-inbox OTP races.",
    ],
  },
];

const EDUCATION = {
  degree: "Bachelor of Technology in Computer Science and Engineering (Data Science)",
  school: "SVKM's Dwarkadas J. Sanghvi College of Engineering",
  location: "Mumbai, India",
  period: "Aug 2023 to June 2027",
  cgpa: "8.63 CGPA",
};

const ACHIEVEMENTS = [
  {
    title: "1st Runner-Up: Periscope Digital Healthcare Hackathon",
    link: "https://drive.google.com/file/d/1XMX5rCUTAbI_DtDlWq2lYpMtCCmMs_lF/view?usp=sharing",
    image: "/pscopewinner.png",
  },
  {
    title: "2nd Runner-Up: Xtract 3.0 Data Science Competition",
    link: "https://drive.google.com/file/d/1S1MTCAAcgdpt5RjhDA3MKK7BoMniwAfV",
    image: "/xtract.png",
  },
  {
    title: "Top 10 in HackWithMumbai Hackathon",
    link: "https://drive.google.com/file/d/1cTPn5NfzCAT5HNdRaEeCxOs0aQ1ldcgC/view?usp=sharing",
  },
  {
    title: "ByteCamp25: Built an integrated waste, flood, and solar management system in 24 hours",
    link: "https://github.com/omkarbandikatte/CODE_BUSTERS_ByteCamp2025",
  },
  {
    title: "Scroll Hack: Built Dout-SirJi, an AI chatbot with blockchain-based authentication",
    link: "https://drive.google.com/file/d/1r5HcwfXJerTKE41YByR09higznbpn_MR/view?usp=drive_link",
  },
  {
    title: "Advanced to Round 2 of the Technograd Data Science and Machine Learning Challenge",
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

const INTRO_STORAGE_KEY = "portfolio-intro-seen";

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
      className={`theme-panel group rounded-lg border border-white/[0.06] bg-[#0d1117]/80 overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-green-500/20 hover:shadow-lg hover:shadow-green-500/5 ${className}`}
      whileHover={{ y: -4 }}
    >
      <div className="theme-panel-header flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
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
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="noise-overlay absolute inset-0 opacity-[0.035]" />
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-green-400/[0.04] to-transparent" />
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
      className="relative overflow-x-clip py-24 sm:py-32"
    >
      <motion.div variants={fadeUp} className="mb-14 flex flex-col gap-5 sm:mb-20 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-green-500/40" />
            <span className="font-mono text-[11px] tracking-[0.28em] text-green-400/80">
              {label}
            </span>
          </div>
          <h2 className="text-4xl font-black tracking-[-0.05em] text-white sm:text-6xl">
            {title}
            <span className="text-green-400">.</span>
          </h2>
        </div>
        <span className="hidden font-mono text-[10px] tracking-[0.2em] text-gray-700 sm:block">
          SCROLL TO EXPLORE / {id.toUpperCase()}
        </span>
      </motion.div>
      {children}
    </motion.section>
  );
}

/* ───────────────────────── CINEMATIC INTRO ───────────────────────── */

function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      const timeout = window.setTimeout(onComplete, 400);
      return () => window.clearTimeout(timeout);
    }

    const timers = [
      window.setTimeout(() => setPhase(1), 180),
      window.setTimeout(() => setPhase(2), 1350),
      window.setTimeout(() => setPhase(3), 3000),
      window.setTimeout(onComplete, 4200),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [onComplete]);

  const particles = Array.from({ length: 28 }, (_, index) => ({
    left: `${(index * 37) % 100}%`,
    top: `${(index * 61) % 100}%`,
    delay: `${(index % 9) * -0.34}s`,
    duration: `${3.8 + (index % 6) * 0.42}s`,
  }));

  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeOut" } }}
      className={`film-intro film-phase-${phase} fixed inset-0 z-[100] overflow-hidden bg-[#020403]`}
      aria-hidden="true"
    >
      <div className="film-space pointer-events-none absolute inset-0">
        {particles.map((particle, index) => (
          <span
            key={index}
            className="film-particle"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>
      <div className="film-grid pointer-events-none absolute inset-0" />
      <div className="film-aurora pointer-events-none absolute inset-0" />
      <div className="film-noise pointer-events-none absolute inset-0" />
      <div className="film-vignette pointer-events-none absolute inset-0" />

      <header className="film-header absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-7 sm:px-10 sm:py-9">
        <div className="flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.3em] text-green-200/80 sm:text-[10px]">
          <img src="/logo.svg" alt="" className="h-7 w-7 rounded-lg" />
          Omkar Bandikatte / Portfolio
        </div>
        <div className="font-mono text-[8px] uppercase tracking-[0.28em] text-gray-600 sm:text-[10px]">
          AI &amp; Full-Stack Engineer
        </div>
      </header>

      <div className="film-scene relative z-10 mx-auto grid h-full max-w-[90rem] items-center px-6 sm:px-10 lg:grid-cols-[1fr_0.72fr] lg:px-16">
        <div className="film-copy relative z-20 pt-[42vh] lg:pt-0">
          <div className="film-eyebrow font-mono text-[9px] uppercase tracking-[0.52em] text-green-300 sm:text-[11px]">
            AI &amp; full-stack engineer
          </div>
          <h1 className="film-name mt-4 text-[clamp(3.8rem,9.5vw,9.5rem)] font-black leading-[0.76] tracking-[-0.09em] text-white">
            <span className="block">OMKAR</span>
            <span className="film-name-outline block">BANDIKATTE</span>
          </h1>
          <div className="film-copy-footer mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <div className="h-px w-20 bg-green-300/60" />
            <p className="max-w-md text-sm leading-6 text-gray-400 sm:text-base">
              I build AI systems, automation pipelines, and full-stack products designed for real users.
            </p>
          </div>
        </div>

        <div className="film-visual absolute inset-0 flex items-center justify-center lg:relative lg:h-[78vh]">
          <div className="film-halo film-halo-outer" />
          <div className="film-halo film-halo-inner" />
          <div className="film-orbit film-orbit-one"><span /></div>
          <div className="film-orbit film-orbit-two"><span /></div>

          <div className="film-portrait">
            <img src={INFO.avatar} alt="" className="h-full w-full object-cover" />
            <div className="film-portrait-grade" />
            <div className="film-scanline" />
            <span className="film-corner film-corner-one" />
            <span className="film-corner film-corner-two" />
            <span className="film-corner film-corner-three" />
            <span className="film-corner film-corner-four" />
          </div>

          <div className="film-visual-label film-label-left">
            <span>AI systems</span>
            <strong>READY</strong>
          </div>
          <div className="film-visual-label film-label-right">
            <span>Product focus</span>
            <strong>PRODUCTION</strong>
          </div>
        </div>
      </div>

      <div className="film-opening-copy absolute inset-0 z-40 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="mx-auto h-5 w-5 text-green-300" />
          <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.55em] text-green-200">
            Preparing portfolio
          </p>
        </div>
      </div>

      <div className="film-shutter film-shutter-top" />
      <div className="film-shutter film-shutter-bottom" />
      <div className="film-flash pointer-events-none absolute inset-0 z-50" />

      <div className="film-progress absolute bottom-0 left-0 z-50 h-[2px] bg-gradient-to-r from-green-400 via-white to-cyan-300" />

      <button
        type="button"
        onClick={onComplete}
        className="absolute bottom-7 right-7 z-[60] font-mono text-[9px] uppercase tracking-[0.28em] text-gray-500 transition-colors hover:text-green-300 sm:bottom-9 sm:right-10"
      >
        Skip intro ↗
      </button>
    </motion.div>
  );
}

/* ───────────────────────── NAVBAR ───────────────────────── */

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Achievements", "Education", "Resume", "Contact"];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMobileNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    event.preventDefault();
    setIsMenuOpen(false);
    window.history.pushState(null, "", `#${targetId}`);

    window.requestAnimationFrame(() => {
      const target = document.getElementById(targetId);
      if (!target) return;

      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: Math.max(0, top),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    });
  };

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
      className={`theme-navbar fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "border-white/[0.06] bg-[#050508]/90 backdrop-blur-xl shadow-lg shadow-green-500/[0.03]"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <motion.a
          href="#"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="font-mono text-sm font-bold text-green-400 cursor-pointer flex items-center gap-2"
        >
          <img src="/logo.svg" alt="Omkar Bandikatte logo" className="brand-navbar-logo" />
          <span className="hidden sm:inline"><span className="text-gray-500">~/</span>omkar</span>
        </motion.a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.filter((link) => !["Achievements", "Education"].includes(link)).map((l) => (
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

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <motion.a
            href="/resume"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 197, 94, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 rounded border border-green-500/30 bg-green-500/[0.06] px-3 py-2 text-xs font-mono text-green-400 hover:bg-green-500/10 hover:border-green-500/50 transition-all sm:px-4"
          >
            <ExternalLink className="h-3 w-3" />
            <span className="hidden sm:inline">resume.pdf</span>
          </motion.a>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="theme-toggle flex h-9 w-9 items-center justify-center rounded border border-white/[0.1] bg-white/[0.03] text-gray-400 transition-colors hover:border-green-500/40 hover:text-green-400 lg:hidden"
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/[0.06] bg-[#050508]/95 backdrop-blur-xl lg:hidden"
          >
            <div className="grid grid-cols-2 gap-px px-5 py-4">
              {NAV_LINKS.map((link, index) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={(event) =>
                    handleMobileNavigation(event, link.toLowerCase())
                  }
                  className="flex items-center gap-2 border-b border-white/[0.05] py-3 font-mono text-xs text-gray-400 transition-colors hover:text-green-400"
                >
                  <span className="text-green-500/50">0{index + 1}</span>
                  {link.toLowerCase()}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ───────────────────────── HERO ───────────────────────── */

function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center pt-28 gpu-accelerated sm:pt-32">
      <div className="hero-beam pointer-events-none absolute left-1/2 top-20 h-[70vh] w-px -translate-x-1/2" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto w-full max-w-7xl"
      >
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_380px]">
          <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-green-400/20 bg-green-400/[0.07] px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-green-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            OPEN TO INTERNSHIPS &amp; COLLABORATIONS
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(3.5rem,9vw,8.4rem)] font-black leading-[0.82] tracking-[-0.075em] text-white"
          >
            I BUILD
            <span className="hero-outline block">INTELLIGENT</span>
            <span className="block bg-gradient-to-r from-green-300 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">PRODUCTS.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-9 flex flex-col items-center gap-7 sm:flex-row lg:items-start"
          >
            <p className="max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
              AI systems, autonomous agents, and full-stack experiences engineered to turn messy workflows into reliable software.
            </p>
            <div className="flex shrink-0 gap-3">
              <a href="#projects" className="hero-primary-button group">
                Explore work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="/resume" target="_blank" rel="noopener noreferrer" className="hero-icon-button" aria-label="Open resume">
                <ArrowUpRight className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="hero-profile-card mx-auto w-full max-w-sm lg:mx-0"
          >
            <div className="relative overflow-hidden rounded-[1.5rem]">
              <img src={INFO.avatar} alt={INFO.name} className="aspect-[4/5] w-full object-cover grayscale transition-all duration-700 hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-mono text-[10px] tracking-[0.2em] text-green-300">AI + FULL-STACK ENGINEER</p>
                <p className="mt-2 text-2xl font-bold text-white">Omkar Bandikatte</p>
                <p className="mt-1 text-sm text-gray-400">Mumbai, India · AI &amp; Full-Stack Engineer</p>
              </div>
            </div>
            <div className="flex items-center justify-between px-2 pt-5">
              <span className="font-mono text-[10px] text-gray-600">FIND ME ONLINE</span>
              <div className="flex gap-2">
                {[
                  { icon: Github, href: INFO.github, label: "GitHub" },
                  { icon: Linkedin, href: INFO.linkedin, label: "LinkedIn" },
                  { icon: Mail, href: `mailto:${INFO.email}`, label: "Email" },
                ].map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label} className="rounded-full border border-white/10 p-2 text-gray-500 transition-all hover:border-green-400/40 hover:text-green-300">
                    <link.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }} className="mt-16 grid grid-cols-2 border-y border-white/[0.07] sm:grid-cols-4">
          {IMPACT.map((item, index) => (
            <div key={item.label} className={`px-4 py-6 sm:px-6 ${index > 0 ? "border-l border-white/[0.07]" : ""}`}>
              <div className="text-2xl font-black tracking-tight text-white sm:text-3xl">{item.value}</div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-gray-600">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ───────────────────────── BRAND FILM ───────────────────────── */

function BrandFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Delay the video until after hydration so playback extensions cannot mutate the SSR tree.
    setShouldAutoPlay(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setIsMounted(true);
  }, []);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch (error) {
        console.error("Unable to play the portfolio reel.", error);
      }
    } else {
      video.pause();
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="brand-film-section"
      aria-labelledby="brand-film-title"
    >
      <div className="brand-film-heading">
        <div>
          <span className="brand-film-kicker">
            <i />
            00 / HOW I BUILD
          </span>
          <h2 id="brand-film-title">From raw data to useful decisions.</h2>
        </div>
        <p>
          A short look at the AI products I build, including systems that analyze visual,
          voice, and business data to solve practical problems.
        </p>
      </div>

      <div className="brand-film-frame">
        {isMounted ? (
          <video
            ref={videoRef}
            className="brand-film-video"
            src="/intro-reel.mp4"
            poster="/intro-reel-poster.jpg"
            autoPlay={shouldAutoPlay}
            muted
            loop
            playsInline
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            aria-label="Omkar Bandikatte AI engineering brand reel"
          >
            Your browser does not support embedded video.
          </video>
        ) : (
          <img
            src="/intro-reel-poster.jpg"
            alt=""
            className="brand-film-video"
          />
        )}
        <div className="brand-film-overlay" aria-hidden="true" />
        <div className="brand-film-meta" aria-hidden="true">
          <span>OMKAR / AI PRODUCT REEL</span>
          <span>1920 × 1080</span>
        </div>
        <button
          type="button"
          className="brand-film-control"
          onClick={togglePlayback}
          aria-label={isPlaying ? "Pause brand reel" : "Play brand reel"}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
          <span>{isPlaying ? "Pause film" : "Play film"}</span>
        </button>
      </div>
    </motion.section>
  );
}

/* ───────────────────────── ABOUT ───────────────────────── */

function About() {
  return (
    <Section id="about" label="// ABOUT" title="How I build">
      <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
        <motion.div variants={slideInLeft} className="bento-panel p-7 sm:p-10">
          <div className="mb-12 flex items-center justify-between">
            <BrainCircuit className="h-8 w-8 text-green-400" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-gray-600">ENGINEER PROFILE / 01</span>
          </div>
          <p className="max-w-3xl text-2xl font-semibold leading-[1.35] tracking-[-0.025em] text-gray-200 sm:text-4xl">
            I build <span className="text-green-300">complete AI products</span>, not isolated demos. I take them from data and models to APIs and interfaces.
          </p>
          <p className="mt-8 max-w-2xl text-base leading-7 text-gray-500">{INFO.about}</p>
        </motion.div>
        <motion.div variants={slideInRight} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {[
            { icon: Sparkles, title: "AI systems", text: "RAG, agents, evaluation, and trust-aware workflows." },
            { icon: Layers3, title: "Product engineering", text: "Frontends, APIs, databases, cloud services, and deployment." },
            { icon: Zap, title: "Production engineering", text: "Performance, reliability, monitoring, security, and maintainable delivery." },
          ].map((item, index) => (
            <div key={item.title} className="bento-panel group p-6">
              <div className="flex items-start justify-between">
                <item.icon className="h-5 w-5 text-cyan-400" />
                <span className="font-mono text-[10px] text-gray-700">0{index + 1}</span>
              </div>
              <h3 className="mt-7 text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">{item.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ───────────────────────── SKILLS ───────────────────────── */

function Skills() {
  return (
    <Section id="skills" label="// TECH_STACK" title="Skills">
      {/* 3D Tech Balls */}
      <TechBalls />

      <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-16">
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
    <Section id="projects" label="// SELECTED_WORK" title="Selected projects">
      <div className="space-y-5">
        {PROJECTS.map((p, idx) => (
          <motion.article key={p.name} variants={fadeUpDelay(idx * 0.08)} className="project-showcase group">
            <div className="project-visual">
              {p.image ? (
                <>
                  <img
                    src={p.image}
                    alt={`${p.shortName} landing page`}
                    className="project-visual-image"
                  />
                  <div className="project-visual-image-shade" />
                </>
              ) : (
                <div className="project-orbit">
                  <div className="project-orbit-ring" />
                  <div className="project-orbit-core">
                    {idx === 1 && <BrainCircuit className="h-9 w-9" />}
                    {idx === 2 && <Database className="h-9 w-9" />}
                    {idx === 3 && <Sparkles className="h-9 w-9" />}
                    {idx === 4 && <Zap className="h-9 w-9" />}
                  </div>
                </div>
              )}
              <div className="absolute left-5 top-5 z-10 flex items-center gap-2 font-mono text-[9px] tracking-[0.18em] text-green-300/70">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                PROJECT / 0{idx + 1}
              </div>
              <div className="absolute bottom-5 left-5 z-10">
                <div className="text-4xl font-black tracking-[-0.05em] text-white">{p.metric}</div>
                <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-gray-500">{p.metricLabel}</div>
              </div>
              <div className="absolute bottom-5 right-5 z-10 font-mono text-[9px] text-gray-600">STATUS: BUILT</div>
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400">{p.category}</div>
              <h3 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">{p.shortName}</h3>
              <p className="mt-5 text-sm leading-7 text-gray-400">{p.desc}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tech.map((tech) => (
                  <span key={tech} className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 font-mono text-[10px] text-gray-500">{tech}</span>
                ))}
              </div>
              <div className="mt-8 flex gap-3">
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noopener noreferrer" className="project-link">
                    <Github className="h-4 w-4" /> Source
                  </a>
                )}
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="project-link project-link-primary">
                    <ArrowUpRight className="h-4 w-4" /> Launch
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

/* ───────────────────────── EXPERIENCE ───────────────────────── */

function Experience() {
  return (
    <Section id="experience" label="// PRODUCTION_IMPACT" title="Proof in production">
      <div className="space-y-8">
        {EXPERIENCE.map((exp, idx) => (
          <motion.article key={exp.company} variants={fadeUpDelay(idx * 0.15)} className="experience-case">
            <div className="experience-case-header">
              <div className="flex items-center gap-3">
                <span className="experience-index">0{idx + 1}</span>
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-green-300">Professional experience</div>
                  <div className="mt-1 text-sm font-semibold text-white">{exp.company}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-[0.12em] text-gray-600">
                <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{exp.location}</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" />{exp.period}</span>
              </div>
            </div>

            <div className="experience-case-grid">
              <div className="experience-photo">
                <img src="/periscope.png" alt="Team at Periscope Technologies" />
                <div className="experience-photo-overlay" />
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-green-200">Team and work</span>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-gray-300">
                    Engineering automation and analytics across India&apos;s fastest-moving commerce platforms.
                  </p>
                </div>
              </div>

              <div className="experience-story">
                <div>
                  <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-cyan-300">
                    <Briefcase className="h-3.5 w-3.5" /> Role
                  </div>
                  <h3 className="mt-4 text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">{exp.role}</h3>
                  <p className="mt-3 text-sm text-gray-500">at <span className="text-gray-300">{exp.company}</span></p>
                </div>
                <div className="mt-9 space-y-0">
                  {exp.points.map((pt, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="experience-outcome"
                    >
                      <span>0{i + 1}</span>
                      <p>{pt}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="experience-metrics">
              {[
                { value: "1K+", label: "records / day", icon: Database },
                { value: "35%", label: "reliability gain", icon: Zap },
                { value: "<100ms", label: "reporting queries", icon: Layers3 },
                { value: "6", label: "commerce platforms", icon: Briefcase },
              ].map((metric) => (
                <div key={metric.label} className="experience-metric">
                  <metric.icon className="h-4 w-4 text-green-400" />
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

/* ───────────────────────── ACHIEVEMENTS ───────────────────────── */

function Achievements() {
  return (
    <Section id="achievements" label="// RECOGNITION" title="Awards and milestones">
      <div className="achievement-grid">
        {ACHIEVEMENTS.map((achievement, idx) => (
          <motion.article
            key={achievement.title}
            variants={fadeUpDelay(idx * 0.08)}
            className={`achievement-card ${achievement.image ? "achievement-card-featured" : ""}`}
          >
            {achievement.image && (
              <div className="achievement-image">
                <img src={achievement.image} alt={achievement.title} />
                <div className="achievement-image-shade" />
              </div>
            )}
            <div className="achievement-content">
              <div className="flex items-center justify-between">
                <span className="achievement-number">{String(idx + 1).padStart(2, "0")}</span>
                <Trophy className={`h-5 w-5 ${idx < 2 ? "text-yellow-300" : "text-green-400/70"}`} />
              </div>
              <h3>{achievement.title}</h3>
              <div className="mt-auto pt-6">
                {achievement.link ? (
                  <a href={achievement.link} target="_blank" rel="noopener noreferrer" className="achievement-link">
                    View proof <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gray-700">Competition milestone</span>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

/* ───────────────────────── CO-CURRICULAR ───────────────────────── */

function CoCurricular() {
  return (
    <Section id="activities" label="// LEADERSHIP" title="Leading beyond code">
      <motion.div variants={scaleIn} className="leadership-card">
        <div className="leadership-visual">
          <img src={CO_CURRICULAR.image} alt={`${CO_CURRICULAR.role} at ${CO_CURRICULAR.organization}`} />
          <div className="leadership-visual-overlay" />
          <span className="leadership-stamp"><Users className="h-5 w-5" /> Community</span>
        </div>
        <div className="leadership-copy">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-purple-300">Student leadership</span>
          <h3 className="mt-5 text-4xl font-black tracking-[-0.05em] text-white sm:text-6xl">{CO_CURRICULAR.role}</h3>
          <a href={CO_CURRICULAR.website} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-cyan-300">
            {CO_CURRICULAR.organization} <ArrowUpRight className="h-4 w-4" />
          </a>
          <p className="mt-7 max-w-xl text-base leading-8 text-gray-400">{CO_CURRICULAR.description}</p>
          <div className="mt-9 grid grid-cols-3 border-y border-white/[0.07]">
            {["Hackathons", "Workshops", "Contests"].map((item, index) => (
              <div key={item} className={`py-5 text-center ${index > 0 ? "border-l border-white/[0.07]" : ""}`}>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-gray-500">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

/* ───────────────────────── EDUCATION ───────────────────────── */

function EducationSection() {
  return (
    <Section id="education" label="// FOUNDATION" title="Still learning. Always building">
      <motion.div variants={scaleIn} className="education-card">
        <div className="education-score">
          <div className="education-score-ring">
            <GraduationCap className="h-7 w-7 text-cyan-300" />
            <strong>{EDUCATION.cgpa.split(" ")[0]}</strong>
            <span>CGPA</span>
          </div>
        </div>
        <div className="education-content">
          <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-green-300">Current degree</div>
          <h3 className="mt-5 text-2xl font-bold leading-tight text-white sm:text-4xl">{EDUCATION.degree}</h3>
          <p className="mt-4 text-base text-gray-400">{EDUCATION.school}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="education-chip"><MapPin className="h-3.5 w-3.5" />{EDUCATION.location}</span>
            <span className="education-chip"><Calendar className="h-3.5 w-3.5" />{EDUCATION.period}</span>
          </div>
          <div className="education-timeline mt-9">
            <span />
            <div><strong>2023</strong><small>Started</small></div>
            <div className="text-right"><strong>2027</strong><small>Graduating</small></div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

/* ───────────────────────── RESUME ───────────────────────── */

function ResumePreview() {
  return (
    <Section id="resume" label="// RESUME" title="Experience at a glance">
      <motion.div variants={fadeUp} className="resume-dossier">
        <div className="resume-copy">
          <div className="resume-file-icon"><FileText className="h-8 w-8" /></div>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-green-300">Resume / Latest version</span>
          <h3 className="mt-5 text-4xl font-black tracking-[-0.055em] text-white sm:text-6xl">
            Review my experience<br /><span className="text-green-300">in one place.</span>
          </h3>
          <p className="mt-6 max-w-xl text-base leading-8 text-gray-400">
            A concise view of my experience, technical depth, projects, education, and the outcomes behind the work.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="/resume" target="_blank" rel="noopener noreferrer" className="resume-action resume-action-primary">
              Open resume <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="/resume.pdf" download className="resume-action">
              Download PDF <Download className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="resume-preview">
          <div className="resume-preview-toolbar">
            <span className="flex gap-1.5"><i /><i /><i /></span>
            <span>omkar-bandikatte.pdf</span>
            <span>01 / 01</span>
          </div>
          <div className="resume-paper">
            <iframe src="/resume.pdf#view=FitH&toolbar=0&navpanes=0" title="Preview of Omkar Bandikatte's resume" />
            <div className="resume-paper-shine" />
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

/* ───────────────────────── CONTACT ───────────────────────── */

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as {
        error?: string;
        message?: string;
      };

      if (!response.ok) {
        setStatus("error");
        setStatusMessage(result.error ?? "Unable to send your message.");
        return;
      }

      setStatus("sent");
      setStatusMessage(result.message ?? "Message sent successfully.");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => {
        setStatus("idle");
        setStatusMessage("");
      }, 5000);
    } catch (error) {
      console.error("Contact form submission error:", error);
      setStatus("error");
      setStatusMessage("Unable to reach the email service. Please try again.");
    }
  };

  return (
    <Section id="contact" label="// CONTACT" title="Let's build something useful">
      <motion.div variants={slideInRight} className="contact-stage">
        <div className="contact-intro">
          <div className="contact-signal"><span /> Available for the right opportunity</div>
          <h3>Have a project in mind?</h3>
          <p>
            Tell me about the problem you want to solve. I can help with product planning, AI engineering, and full-stack development.
          </p>
          <div className="mt-10 space-y-4">
            <a href={`mailto:${INFO.email}`} className="contact-direct">
              <Mail className="h-4 w-4" />
              <span><small>Email directly</small>{INFO.email}</span>
              <ArrowUpRight className="ml-auto h-4 w-4" />
            </a>
            <div className="flex gap-3">
              <a href={INFO.github} target="_blank" rel="noopener noreferrer" className="contact-social" aria-label="GitHub"><Github className="h-4 w-4" /></a>
              <a href={INFO.linkedin} target="_blank" rel="noopener noreferrer" className="contact-social" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-green-300">Project inquiry</span>
              <h4 className="mt-2 text-2xl font-bold text-white">Start a conversation</h4>
            </div>
            <Send className="h-5 w-5 text-green-400" />
          </div>
              <div className="grid gap-5 sm:grid-cols-2">
            <div className="contact-field">
                  <label><User className="h-3.5 w-3.5" /> Your name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                  />
            </div>

            <div className="contact-field">
                  <label><Mail className="h-3.5 w-3.5" /> Email address</label>
                  <input
                    type="email"
                    required
                    suppressHydrationWarning
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                  />
            </div>
              </div>

          <div className="contact-field mt-5">
            <label><MessageSquare className="h-3.5 w-3.5" /> Project brief</label>
                <textarea
                  required
              rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell me about the problem, goals, and timeline."
                />
          </div>

          <div className="mt-6 flex flex-col items-start gap-4">
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
              whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
              className="contact-submit"
                >
              {status === "sending" ? "Sending..." : "Send message"}
              <ArrowRight className="h-4 w-4" />
                </motion.button>

                <AnimatePresence mode="wait">
                  {(status === "sent" || status === "error") && (
                    <motion.p
                      key={status}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      role="status"
                      aria-live="polite"
                  className={`flex items-center gap-2 text-xs font-mono ${
                        status === "sent" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {status === "sent" && (
                        <CheckCircle2 className="h-4 w-4" />
                      )}
                      {statusMessage}
                    </motion.p>
                  )}
                </AnimatePresence>
          </div>
        </form>
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
    window.history.scrollRestoration = "manual";
    let introSeen = false;

    try {
      introSeen = localStorage.getItem(INTRO_STORAGE_KEY) === "true";
      if (introSeen) {
        setShowWelcome(false);
        if (window.location.hash) {
          window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
        }
      } else {
        localStorage.setItem(INTRO_STORAGE_KEY, "true");
      }
    } catch (error) {
      console.warn("Unable to persist the cinematic intro preference.", error);
    }

    const scrollToHero = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };

    scrollToHero();
    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(scrollToHero);
    });
    const timeout = window.setTimeout(scrollToHero, introSeen ? 250 : 0);
    window.addEventListener("pageshow", scrollToHero, { once: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      window.removeEventListener("pageshow", scrollToHero);
    };
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
        {showWelcome && <CinematicIntro onComplete={handleWelcomeComplete} />}
      </AnimatePresence>

      <GridBackground />
      <Navbar />
      <main className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <Hero />
        <BrandFilm />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <CoCurricular />
        <EducationSection />
        <ResumePreview />
        <Contact />
      </main>

      <footer className="site-footer relative z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="site-footer-top">
            <a href="#" aria-label="Back to top">
              <img src="/logo.svg" alt="" className="site-footer-logo" />
            </a>
            <div className="site-footer-nav">
              <a href="#projects">Work</a>
              <a href="#experience">Experience</a>
              <a href="#contact">Contact</a>
              <a href="/resume">Resume</a>
            </div>
          </div>
          <div className="site-footer-bottom">
            <span className="flex items-center gap-2"><i /> Built to learn. Built to ship.</span>
            <span>&copy; {new Date().getFullYear()} Omkar Bandikatte</span>
            <span>Mumbai, India</span>
          </div>
        </div>
      </footer>

      <Chatbot />
    </>
  );
}
