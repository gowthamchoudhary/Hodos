import { ArrowUpRight, BriefcaseBusiness, FileText, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import type { PortfolioProfile } from "../../lib/api";
import type { GalleryView } from "./GridToggle";

type PortfolioCardProps = {
  profile: PortfolioProfile;
  view: GalleryView;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function PortfolioCard({ profile, view }: PortfolioCardProps) {
  const isInternship = profile.experience_type.toLowerCase().includes("intern");
  const visibleSkills = profile.skills.slice(0, 4);

  return (
    <motion.article
      className={`portfolio-card ${view === "list" ? "list-card" : ""}`}
      layout
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -7, scale: 1.01 }}
    >
      <div className="portfolio-card-top">
        <div className="profile-avatar" aria-hidden="true">
          {getInitials(profile.name)}
        </div>
        {isInternship && <span className="internship-badge">Internship</span>}
      </div>

      <div className="portfolio-card-body">
        <h2>{profile.name}</h2>
        <p>
          <BriefcaseBusiness size={15} />
          <span>{profile.role}</span>
        </p>
        {profile.company && <p className="portfolio-company">{profile.company}</p>}
      </div>

      <div className="portfolio-skills" aria-label="Skills">
        {visibleSkills.map((skill) => (
          <span key={skill.id}>{skill.name}</span>
        ))}
      </div>

      <div className="portfolio-card-actions">
        {profile.portfolio_url && (
          <a href={profile.portfolio_url} rel="noreferrer" target="_blank">
            Portfolio
            <ArrowUpRight size={16} />
          </a>
        )}
        {profile.resume_url && (
          <a href={profile.resume_url} rel="noreferrer" target="_blank" aria-label={`${profile.name} resume`}>
            <FileText size={17} />
          </a>
        )}
        {profile.github_url && (
          <a href={profile.github_url} rel="noreferrer" target="_blank" aria-label={`${profile.name} GitHub`}>
            <Github size={17} />
          </a>
        )}
        {profile.linkedin_url && (
          <a href={profile.linkedin_url} rel="noreferrer" target="_blank" aria-label={`${profile.name} LinkedIn`}>
            <Linkedin size={17} />
          </a>
        )}
      </div>
    </motion.article>
  );
}
