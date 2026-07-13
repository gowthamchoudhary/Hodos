import { motion } from "framer-motion";
import { ArrowRight, Building2, GraduationCap, MapPin } from "lucide-react";
import { useMemo } from "react";
import type { PortfolioProfile } from "../../lib/api";
import type { GalleryView } from "./GridToggle";

type PortfolioCardProps = {
  profile: PortfolioProfile;
  view: GalleryView;
};

type MetadataItem = {
  icon: typeof MapPin;
  label: string;
  type: "company" | "experience" | "location";
};

type StatItem = {
  label: string;
  value: string;
};

function cleanText(value: string | null | undefined) {
  const text = value?.trim();
  return text || null;
}

function uniqueValues(values: Array<string | null | undefined>) {
  return Array.from(new Set(values.map(cleanText).filter((value): value is string => Boolean(value))));
}

function numberValue(value: number | null | undefined) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : null;
}

function formatExperience(value: number | string | null | undefined) {
  if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
    return `${value} ${value === 1 ? "yr" : "yrs"}`;
  }

  return cleanText(value);
}

export function PortfolioCard({ profile, view }: PortfolioCardProps) {
  const visibleSkills = profile.skills.slice(0, 5);
  const hiddenSkillCount = Math.max(profile.skills.length - visibleSkills.length, 0);
  const statusBadges = uniqueValues([...(profile.badges ?? []), ...(profile.status_badges ?? []), profile.experience_type]);
  const visibleBadges = statusBadges.slice(0, 2);
  const hiddenBadgeCount = Math.max(statusBadges.length - visibleBadges.length, 0);

  const metadata = useMemo(() => {
    const items: MetadataItem[] = [];
    const location = cleanText(profile.location);
    const company = cleanText(profile.current_company) ?? cleanText(profile.company);
    const experience = cleanText(profile.experience_level) ?? cleanText(profile.experience_type);

    if (location) {
      items.push({ icon: MapPin, label: location, type: "location" });
    }

    if (company) {
      items.push({ icon: Building2, label: company, type: "company" });
    }

    if (experience) {
      items.push({ icon: GraduationCap, label: experience, type: "experience" });
    }

    return items;
  }, [profile.company, profile.current_company, profile.experience_level, profile.experience_type, profile.location]);

  const stats = useMemo(() => {
    const items: StatItem[] = [];
    const projects = numberValue(profile.project_count) ?? numberValue(profile.projects_count);
    const skills = numberValue(profile.skills_count) ?? profile.skills.length;
    const experience = formatExperience(profile.experience_years) ?? formatExperience(profile.years_of_experience);

    if (projects !== null) {
      items.push({ label: "Projects", value: String(projects) });
    }

    items.push({ label: "Skills", value: String(skills) });

    if (experience) {
      items.push({ label: "Experience", value: experience });
    }

    return items;
  }, [
    profile.experience_years,
    profile.project_count,
    profile.projects_count,
    profile.skills.length,
    profile.skills_count,
    profile.years_of_experience,
  ]);

  const headline = cleanText(profile.headline);
  const portfolioUrl = cleanText(profile.portfolio_url);
  const resumeUrl = cleanText(profile.resume_url);
  const journeyUrl = portfolioUrl ?? resumeUrl ?? "/upload";
  const opensExternalJourney = Boolean(portfolioUrl ?? resumeUrl);
  const journeyLabel = portfolioUrl
    ? `Open ${profile.name}'s portfolio`
    : resumeUrl
      ? `Open ${profile.name}'s resume`
      : "Upload a portfolio";

  return (
    <motion.article
      className={`portfolio-discovery-card ${view === "list" ? "portfolio-discovery-card--list" : ""}`}
      layout
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.015, y: -4 }}
    >
      <div className="portfolio-card-content">
        <div className="portfolio-card-heading">
          <div className="portfolio-card-identity">
            <h2>{profile.name}</h2>
            <p className="portfolio-card-role">{profile.role}</p>
          </div>

          {visibleBadges.length > 0 && (
            <div className="portfolio-status-badges" aria-label="Portfolio status">
              {visibleBadges.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
              {hiddenBadgeCount > 0 && <span aria-label={`${hiddenBadgeCount} more statuses`}>+{hiddenBadgeCount}</span>}
            </div>
          )}
        </div>

        {headline && <p className="portfolio-card-headline">{headline}</p>}

        {visibleSkills.length > 0 && (
          <div className="portfolio-card-skills" aria-label="Skills">
            {visibleSkills.map((skill) => (
              <span key={skill.id}>{skill.name}</span>
            ))}
            {hiddenSkillCount > 0 && <span aria-label={`${hiddenSkillCount} more skills`}>+{hiddenSkillCount}</span>}
          </div>
        )}

        {metadata.length > 0 && (
          <div className="portfolio-card-metadata" aria-label="Portfolio details">
            {metadata.map(({ icon: Icon, label, type }) => (
              <span key={type} title={label}>
                <Icon aria-hidden="true" size={13} strokeWidth={2} />
                <span>{label}</span>
              </span>
            ))}
          </div>
        )}

        <div className="portfolio-card-stats" aria-label="Portfolio statistics">
          {stats.map((stat) => (
            <span key={stat.label}>
              <small>{stat.label}</small>
              <strong>{stat.value}</strong>
            </span>
          ))}
        </div>

        <a
          aria-label={journeyLabel}
          className="portfolio-journey-button"
          href={journeyUrl}
          rel={opensExternalJourney ? "noreferrer" : undefined}
          target={opensExternalJourney ? "_blank" : undefined}
        >
          View Journey
          <ArrowRight aria-hidden="true" size={16} strokeWidth={2.3} />
        </a>
      </div>
    </motion.article>
  );
}
