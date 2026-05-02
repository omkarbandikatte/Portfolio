"use client";

import { motion } from "framer-motion";

const TECH_ITEMS = [
  { label: "React", color: "#61dafb", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { label: "Next.js", color: "#ffffff", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { label: "Python", color: "#ffd43b", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { label: "Node.js", color: "#68a063", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { label: "MongoDB", color: "#4db33d", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { label: "TypeScript", color: "#3178c6", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { label: "Tailwind", color: "#38bdf8", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { label: "FastAPI", color: "#009688", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { label: "PostgreSQL", color: "#336791", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { label: "Redis", color: "#dc382d", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { label: "Kafka", color: "#231f20", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg" },
  { label: "TensorFlow", color: "#ff6f00", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { label: "PyTorch", color: "#ee4c2c", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
  { label: "Docker", color: "#2496ed", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { label: "Git", color: "#f05032", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
];

// Cluster positions
const POSITIONS = [
  { x: 18, y: 18, size: 110 },
  { x: 35, y: 12, size: 100 },
  { x: 52, y: 16, size: 120 },
  { x: 68, y: 10, size: 105 },
  { x: 83, y: 18, size: 110 },
  { x: 12, y: 45, size: 105 },
  { x: 30, y: 43, size: 115 },
  { x: 50, y: 47, size: 130 },
  { x: 68, y: 42, size: 108 },
  { x: 85, y: 46, size: 100 },
  { x: 20, y: 73, size: 100 },
  { x: 37, y: 70, size: 112 },
  { x: 55, y: 75, size: 105 },
  { x: 72, y: 70, size: 118 },
  { x: 87, y: 75, size: 100 },
];

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "255,255,255";
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`;
}

function Ball({
  label,
  color,
  icon,
  x,
  y,
  size,
  index,
}: {
  label: string;
  color: string;
  icon: string;
  x: number;
  y: number;
  size: number;
  index: number;
}) {
  const duration = 3.5 + (index % 5) * 0.6;

  return (
    <motion.div
      className="absolute rounded-full cursor-grab active:cursor-grabbing select-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 14,
        delay: index * 0.06,
      }}
      drag
      dragConstraints={{ top: -60, bottom: 60, left: -60, right: 60 }}
      dragElastic={0.3}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
    >
      {/* Inner ball with floating animation */}
      <motion.div
        className="w-full h-full rounded-full flex flex-col items-center justify-center gap-1"
        style={{
          background: `radial-gradient(circle at 35% 30%, rgba(${hexToRgb(color)}, 0.15) 0%, #1a1a2e 40%, #0f0f1a 70%, #080810 100%)`,
          boxShadow: `
            inset -4px -4px 12px rgba(0,0,0,0.6),
            inset 2px 2px 8px rgba(${hexToRgb(color)}, 0.2),
            0 8px 32px rgba(0,0,0,0.6),
            0 0 20px rgba(${hexToRgb(color)}, 0.15),
            0 0 2px rgba(${hexToRgb(color)}, 0.3)
          `,
          border: `1px solid rgba(${hexToRgb(color)}, 0.2)`,
        }}
        animate={{
          y: [0, -12, 0, 10, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.25,
        }}
        whileHover={{
          scale: 1.15,
          boxShadow: `
            inset -4px -4px 12px rgba(0,0,0,0.6),
            inset 2px 2px 8px rgba(${hexToRgb(color)}, 0.3),
            0 8px 40px rgba(0,0,0,0.7),
            0 0 40px rgba(${hexToRgb(color)}, 0.35),
            0 0 4px rgba(${hexToRgb(color)}, 0.5)
          `,
        }}
      >
        {/* Icon */}
        <img
          src={icon}
          alt={label}
          className="w-[38%] h-[38%] object-contain pointer-events-none"
          draggable={false}
        />
        {/* Label */}
        <span
          className="font-mono text-xs sm:text-sm font-bold text-center leading-tight pointer-events-none"
          style={{ color }}
        >
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function TechBalls() {
  return (
    <div className="relative w-full h-[450px] sm:h-[520px] md:h-[580px] overflow-visible">
      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white/[0.04] uppercase whitespace-nowrap">
          MY TECH STACK
        </h2>
      </div>

      {/* Floating draggable balls */}
      <div className="relative w-full h-full max-w-5xl mx-auto">
        {TECH_ITEMS.map((item, i) => (
          <Ball
            key={item.label}
            label={item.label}
            color={item.color}
            icon={item.icon}
            x={POSITIONS[i].x}
            y={POSITIONS[i].y}
            size={POSITIONS[i].size}
            index={i}
          />
        ))}
      </div>

      {/* Ambient glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-green-500/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-purple-500/[0.04] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-cyan-500/[0.03] blur-[80px] pointer-events-none" />
    </div>
  );
}
