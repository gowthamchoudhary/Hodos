import {
  Bookmark,
  Briefcase,
  Building2,
  Flame,
  GraduationCap,
  Home,
  Moon,
  Search,
  Settings,
  SlidersHorizontal,
  Sparkles,
  Star,
  TrendingUp,
  UserRound,
  UsersRound,
  Wrench,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import logoFire from "../../../assets/logo_fire.png";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const primaryItems = [
  { label: "Gallery", icon: Home, active: true },
  { label: "Search", icon: Search },
  { label: "Bookmarks", icon: Bookmark },
  { label: "Following", icon: UsersRound },
];

const filterItems = [
  { label: "Roles", icon: Briefcase },
  { label: "Companies", icon: Building2 },
  { label: "Skills", icon: Wrench },
  { label: "Experience", icon: GraduationCap },
  { label: "Internships", icon: Flame },
  { label: "Featured", icon: Star },
  { label: "Trending", icon: TrendingUp },
];

function SidebarContent({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="gallery-sidebar-head">
        <a className="gallery-logo" href="/" aria-label="Hodos home">
          <img alt="" src={logoFire} />
          <span>Hodos</span>
        </a>
        <button className="gallery-icon-button mobile-only" onClick={onClose} type="button" aria-label="Close menu">
          <X size={18} />
        </button>
      </div>

      <nav className="gallery-nav" aria-label="Gallery navigation">
        {primaryItems.map((item) => (
          <motion.a
            aria-current={item.active ? "page" : undefined}
            className={item.active ? "active" : ""}
            href={item.active ? "/gallery" : "#"}
            key={item.label}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.18 }}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </motion.a>
        ))}
      </nav>

      <div className="gallery-divider" />

      <div className="gallery-nav-section">
        <p>Filters</p>
        <nav className="gallery-nav" aria-label="Filter shortcuts">
          {filterItems.map((item) => (
            <motion.a href="#" key={item.label} whileHover={{ x: 3 }} transition={{ duration: 0.18 }}>
              <item.icon size={18} />
              <span>{item.label}</span>
            </motion.a>
          ))}
        </nav>
      </div>

      <div className="gallery-divider" />

      <motion.div className="sidebar-cta" whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
        <div>
          <Sparkles size={18} />
        </div>
        <h2>Share your journey</h2>
        <p>Turn your portfolio, resume and career path into a discoverable story.</p>
        <a href="/upload">Upload Portfolio</a>
      </motion.div>

      <div className="sidebar-utilities" aria-label="Utilities">
        <button type="button" aria-label="Theme">
          <Moon size={18} />
        </button>
        <button type="button" aria-label="Settings">
          <Settings size={18} />
        </button>
        <button type="button" aria-label="Profile">
          <UserRound size={18} />
        </button>
      </div>
    </>
  );
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <aside className="gallery-sidebar desktop-sidebar">
        <SidebarContent onClose={onClose} />
      </aside>

      {isOpen && <button className="gallery-scrim" onClick={onClose} type="button" aria-label="Close menu" />}

      <motion.aside
        animate={{ x: isOpen ? 0 : "-105%" }}
        className="gallery-sidebar mobile-sidebar"
        initial={false}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <SidebarContent onClose={onClose} />
      </motion.aside>
    </>
  );
}
