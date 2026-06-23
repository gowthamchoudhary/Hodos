import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import largeClouds from "../../assets/large_clouds.png";
import mediumClouds from "../../assets/medium_clouds.png";
import profileBoy from "../../assets/profile_boy.png";

const cardEase = [0.22, 1, 0.36, 1] as const;

const skills = [
  { label: "Python", value: 95, color: "from-blue-400 to-sky-300" },
  { label: "FastAPI", value: 90, color: "from-cyan-300 to-teal-300" },
  { label: "PostgreSQL", value: 85, color: "from-emerald-300 to-cyan-300" },
  { label: "Docker", value: 75, color: "from-violet-400 to-blue-300" },
  { label: "Git", value: 90, color: "from-sky-400 to-blue-500" },
];

type SceneCardProps = {
  children: ReactNode;
  className?: string;
  delay: number;
  duration: number;
  reflection?: "normal" | "strong";
  style: CSSProperties;
};

function SceneCard({
  children,
  className = "",
  delay,
  duration,
  reflection = "normal",
  style,
}: SceneCardProps) {
  return (
    <div
      className="hero-card-object"
      style={
        {
          ...style,
          "--float-duration": `${duration}s`,
        } as CSSProperties
      }
    >
      <motion.div
        className="hero-card-entrance"
      initial={{ opacity: 0, y: 44, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.7, ease: cardEase }}
    >
      <motion.div
        className="hero-card-float"
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration, ease: "easeInOut", repeat: Infinity }}
      >
        <motion.article
          className={`hero-card-material ${className}`}
          whileHover={{ y: -20, scale: 1.08, zIndex: 60 }}
          transition={{ duration: 0.22 }}
        >
          {children}
        </motion.article>
        <div
          aria-hidden="true"
          className={`hero-card-reflection ${reflection === "strong" ? "hero-card-reflection-strong" : ""} ${className}`}
        >
          {children}
        </div>
      </motion.div>
      </motion.div>
    </div>
  );
}

function PortfolioCard() {
  return (
    <SceneCard
      delay={0.08}
      duration={6}
      style={
        {
          "--x": "-500px",
          "--y": "86px",
          "--z": "82px",
          "--rz": "-8deg",
          "--ry": "18deg",
          "--card-scale": 0.85,
          "--card-z": 3,
        } as CSSProperties
      }
      className="h-[245px] w-[185px] rounded-[26px] p-5"
    >
      <p className="inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-bold text-blue-700">
        Frontend Developer
      </p>
      <h3 className="mt-7 text-2xl font-extrabold leading-tight text-black">Modern Portfolio</h3>
      <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3">
        {["React", "Next", "TW"].map((icon) => (
          <div
            className="grid h-9 w-9 place-items-center rounded-xl bg-white text-[11px] font-bold text-slate-900 shadow-[0_10px_22px_rgba(0,83,180,0.13)]"
            key={icon}
          >
            {icon}
          </div>
        ))}
      </div>
    </SceneCard>
  );
}

function ResumeCard() {
  return (
    <SceneCard
      delay={0.14}
      duration={7}
      style={
        {
          "--x": "-315px",
          "--y": "42px",
          "--z": "88px",
          "--rz": "-3deg",
          "--ry": "8deg",
          "--card-scale": 0.95,
          "--card-z": 6,
        } as CSSProperties
      }
      className="h-[245px] w-[185px] rounded-[26px] p-5"
    >
      <p className="text-xs font-medium text-slate-500">Resume</p>
      <h3 className="mt-5 text-lg font-extrabold text-black">Aarav Mehta</h3>
      <p className="mt-1 text-xs font-medium text-slate-600">SWE Intern @ Microsoft</p>
      <div className="mt-5 space-y-3">
        {["Education", "Experience", "Skills"].map((item) => (
          <div className="rounded-xl bg-slate-100/90 px-3 py-2" key={item}>
            <p className="text-xs font-bold text-slate-900">{item}</p>
            <p className="mt-0.5 text-[10px] text-slate-500">
              {item === "Education" ? "IIT Delhi" : item === "Experience" ? "2 Internships" : "React, Node"}
            </p>
          </div>
        ))}
      </div>
    </SceneCard>
  );
}

function ProfileCard() {
  return (
    <SceneCard
      delay={0.2}
      duration={5}
      reflection="strong"
      style={
        {
          "--x": "0px",
          "--y": "-4px",
          "--z": "120px",
          "--rz": "0deg",
          "--ry": "0deg",
          "--card-scale": 1.15,
          "--card-z": 20,
        } as CSSProperties
      }
      className="h-[260px] w-[196px] rounded-[28px]"
    >
      <div className="h-[60%] overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100">
        <img className="h-full w-full object-cover object-top" src={profileBoy} alt="Rohit Sharma" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-extrabold text-black">Rohit Sharma</h3>
        <p className="mt-1.5 text-sm font-medium text-slate-600">Software Engineer @ Google</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            ["Projects", "12"],
            ["Skills", "18"],
            ["Internships", "2"],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-[10px] font-medium text-slate-500">{label}</p>
              <p className="mt-1 text-base font-extrabold text-black">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </SceneCard>
  );
}

function ProjectCard() {
  return (
    <SceneCard
      delay={0.26}
      duration={8}
      style={
        {
          "--x": "245px",
          "--y": "52px",
          "--z": "90px",
          "--rz": "3deg",
          "--ry": "0deg",
          "--card-scale": 0.95,
          "--card-z": 14,
        } as CSSProperties
      }
      className="h-[245px] w-[185px] rounded-[26px] p-5"
    >
      <p className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-slate-600">
        Featured Project
      </p>
      <h3 className="mt-5 text-2xl font-extrabold leading-tight text-black">E-Commerce API</h3>
      <p className="mt-4 text-xs font-medium leading-5 text-slate-600">Built with FastAPI and PostgreSQL</p>
      <div className="absolute bottom-5 left-5 flex gap-3">
        {["API", "Py", "SQL"].map((item) => (
          <div
            className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-xs font-extrabold text-slate-900 shadow-[0_12px_28px_rgba(0,83,180,0.15)]"
            key={item}
          >
            {item}
          </div>
        ))}
      </div>
    </SceneCard>
  );
}

function SkillsCard() {
  return (
    <SceneCard
      delay={0.32}
      duration={6.5}
      style={
        {
          "--x": "405px",
          "--y": "92px",
          "--z": "86px",
          "--rz": "4deg",
          "--ry": "-8deg",
          "--card-scale": 0.9,
          "--card-z": 10,
        } as CSSProperties
      }
      className="hero-card-dark h-[245px] w-[185px] rounded-[26px] border-white/10 p-5 text-white"
    >
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/30 blur-3xl" />
      <p className="text-xs font-medium text-white/70">Top Skills</p>
      <div className="mt-4 space-y-3">
        {skills.map((skill, index) => (
          <div key={skill.label}>
            <div className="mb-1.5 flex justify-between text-[11px] font-semibold text-white">
              <span>{skill.label}</span>
              <span>{skill.value}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/15">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${skill.value}%` }}
                transition={{ delay: 0.55 + index * 0.08, duration: 0.8, ease: cardEase }}
              />
            </div>
          </div>
        ))}
      </div>
    </SceneCard>
  );
}

function InternshipCard() {
  return (
    <SceneCard
      delay={0.38}
      duration={7.5}
      style={
        {
          "--x": "515px",
          "--y": "150px",
          "--z": "80px",
          "--rz": "6deg",
          "--ry": "-15deg",
          "--card-scale": 0.85,
          "--card-z": 5,
        } as CSSProperties
      }
      className="h-[245px] w-[185px] rounded-[26px] p-5"
    >
      <p className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-slate-500">
        Internship
      </p>
      <h3 className="mt-5 text-xl font-extrabold text-black">SDE Intern</h3>
      <div className="mt-5 flex items-center gap-2">
        <div className="grid h-8 w-8 grid-cols-2 overflow-hidden rounded-sm">
          <span className="bg-[#f25022]" />
          <span className="bg-[#7fba00]" />
          <span className="bg-[#00a4ef]" />
          <span className="bg-[#ffb900]" />
        </div>
        <span className="text-sm font-extrabold text-black">Microsoft</span>
      </div>
      <p className="mt-7 text-xs font-medium text-slate-500">May 2024 - Aug 2024</p>
    </SceneCard>
  );
}

function AnalyticsCard() {
  return (
    <SceneCard
      delay={0.44}
      duration={9}
      style={
        {
          "--x": "525px",
          "--y": "74px",
          "--z": "78px",
          "--rz": "9deg",
          "--ry": "-20deg",
          "--card-scale": 0.9,
          "--card-z": 4,
        } as CSSProperties
      }
      className="h-[245px] w-[185px] rounded-[26px] p-5"
    >
      <p className="text-xs font-medium text-slate-500">Profile Views</p>
      <div className="mt-5 flex items-end gap-2">
        <h3 className="text-3xl font-extrabold text-black">4.2K</h3>
        <span className="pb-1 text-xs font-extrabold text-emerald-500">+24%</span>
      </div>
      <svg className="mt-8 h-24 w-full" viewBox="0 0 130 90" role="img" aria-label="Profile views trend">
        <path
          d="M6 80 L22 58 L34 68 L48 42 L60 54 L76 28 L92 42 L108 18 L124 8"
          fill="none"
          stroke="#1769ff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5"
        />
        <path
          d="M6 80 L22 58 L34 68 L48 42 L60 54 L76 28 L92 42 L108 18 L124 8 L124 90 L6 90 Z"
          fill="url(#viewsGradient)"
          opacity="0.28"
        />
        <defs>
          <linearGradient id="viewsGradient" x1="0" x2="0" y1="0" y2="1">
            <stop stopColor="#1769ff" />
            <stop offset="1" stopColor="#1769ff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </SceneCard>
  );
}

export function HeroCards() {
  return (
    <motion.div
      className="hero-card-showcase"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.42, duration: 0.4 }}
    >
      <div className="hero-card-scene">
        <PortfolioCard />
        <ResumeCard />
        <ProfileCard />
        <ProjectCard />
        <SkillsCard />
        <InternshipCard />
        <AnalyticsCard />
      </div>

      <div className="hero-card-cloud-veil" aria-hidden="true">
        <img className="hero-card-cloud hero-card-cloud-left" src={largeClouds} alt="" />
        <img className="hero-card-cloud hero-card-cloud-center" src={mediumClouds} alt="" />
        <img className="hero-card-cloud hero-card-cloud-right" src={largeClouds} alt="" />
      </div>
    </motion.div>
  );
}
