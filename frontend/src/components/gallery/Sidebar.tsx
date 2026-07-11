import {
  Bookmark,
  Briefcase,
  Building2,
  ChevronDown,
  Flame,
  GraduationCap,
  Home,
  Moon,
  Search,
  Settings,
  Sparkles,
  Star,
  TrendingUp,
  Upload,
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
  { label: "Gallery", icon: Home, count: "152", active: true },
  { label: "Search", icon: Search, count: "91" },
  { label: "Bookmarks", icon: Bookmark, count: "24" },
  { label: "Following", icon: UsersRound, count: "38" },
];

const filterItems = [
  { label: "Roles", icon: Briefcase, count: "18" },
  { label: "Companies", icon: Building2, count: "43" },
  { label: "Skills", icon: Wrench, count: "76" },
  { label: "Experience", icon: GraduationCap, count: "12" },
  { label: "Internships", icon: Flame, count: "29" },
  { label: "Featured", icon: Star, count: "8" },
  { label: "Trending", icon: TrendingUp, count: "16" },
];

const token = {
  appBg:
    "var(--color-background-primary-default, var(--color-neutral-100, #F8FAFC))",
  sidebar: "#f5f5f5",
  surface: "var(--color-background-surface-default, #FFFFFF)",
  surfaceHover: "var(--color-background-secondary-default, #F8FAFC)",
  border: "var(--color-border-primary-default, #E5E7EB)",
  text: "var(--color-foreground-primary-default, #111827)",
  textMuted: "var(--color-foreground-secondary-default, #6B7280)",
  textSubtle: "var(--color-foreground-tertiary-default, #9CA3AF)",
  icon: "var(--color-foreground-icon-primary, #475467)",
  active:
    "var(--gradient-button-primary-default, linear-gradient(180deg, #3B82F6 0%, #2563EB 52%, #1D4ED8 100%))",
};

function NavItem({
  item,
}: {
  item: {
    label: string;
    icon: typeof Home;
    count: string;
    active?: boolean;
  };
}) {
  const Icon = item.icon;

  return (
    <motion.a
      aria-current={item.active ? "page" : undefined}
      className="group flex min-h-11 items-center gap-3 rounded-[14px] px-3 text-[14px] tracking-normal transition-all duration-200 ease-out"
      href={item.active ? "/gallery" : "#"}
      key={item.label}
      style={{
        background: item.active ? token.active : "transparent",
        boxShadow: item.active
          ? "0 18px 34px -18px rgba(37,99,235,0.82), inset 0 1px 0 rgba(255,255,255,0.32), inset 0 -1px 0 rgba(30,64,175,0.28)"
          : "inset 0 1px 0 rgba(255,255,255,0)",
        color: item.active ? "#FFFFFF" : token.text,
        fontWeight: item.active ? 800 : 650,
      }}
      whileHover={{ x: item.active ? 0 : 3 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={(event) => {
        if (!item.active) {
          event.currentTarget.style.background = token.surfaceHover;
          event.currentTarget.style.boxShadow =
            "0 12px 24px -20px rgba(15,23,42,0.34), inset 0 1px 0 rgba(255,255,255,0.9)";
        }
      }}
      onMouseLeave={(event) => {
        if (!item.active) {
          event.currentTarget.style.background = "transparent";
          event.currentTarget.style.boxShadow =
            "inset 0 1px 0 rgba(255,255,255,0)";
        }
      }}
    >
      <Icon
        className="shrink-0 transition-colors duration-200 ease-out"
        size={18}
        strokeWidth={2.25}
        style={{ color: item.active ? "#FFFFFF" : token.icon }}
      />
      <span className="min-w-0 flex-1 truncate">{item.label}</span>
      <span
        className="text-[12px] font-bold tabular-nums"
        style={{
          color: item.active ? "rgba(255,255,255,0.76)" : token.textSubtle,
        }}
      >
        {item.count}
      </span>
    </motion.a>
  );
}

function SidebarContent({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <a
          className="flex min-h-12 items-center gap-3 rounded-[16px] px-2 transition-all duration-200 ease-out hover:-translate-y-0.5"
          href="/"
          aria-label="Hodos home"
          style={{ color: token.text }}
          onMouseEnter={(event) => {
            event.currentTarget.style.background = token.surfaceHover;
            event.currentTarget.style.boxShadow =
              "0 14px 28px -22px rgba(15,23,42,0.28)";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.background = "transparent";
            event.currentTarget.style.boxShadow = "none";
          }}
        >
          <span
            className="grid h-10 w-10 place-items-center rounded-[15px] ring-1"
            style={{
              background: token.surface,
              boxShadow:
                "0 14px 30px -22px rgba(15,23,42,0.42), inset 0 1px 0 rgba(255,255,255,0.95)",
              borderColor: token.border,
            }}
          >
            <img className="h-8 w-8 object-contain" alt="" src={logoFire} />
          </span>
          <span className="text-[17px] font-extrabold tracking-normal">
            Hodos
          </span>
        </a>

        <button
          className="mobile-only grid h-10 w-10 place-items-center rounded-[15px] border transition-all duration-200 ease-out hover:-translate-y-0.5"
          onClick={onClose}
          type="button"
          aria-label="Close menu"
          style={{
            background: token.surface,
            borderColor: token.border,
            boxShadow:
              "0 10px 20px -18px rgba(15,23,42,0.35), inset 0 1px 0 rgba(255,255,255,0.9)",
            color: token.icon,
          }}
        >
          <X size={18} />
        </button>
      </div>

      <nav className="grid gap-1.5" aria-label="Gallery navigation">
        {primaryItems.map((item) => (
          <NavItem item={item} key={item.label} />
        ))}
      </nav>

      <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border-primary-default,#E5E7EB)] to-transparent" />

      <div>
        <p
          className="mb-2.5 ml-3 text-[11px] font-extrabold uppercase tracking-[0.08em]"
          style={{ color: token.textSubtle }}
        >
          Filters
        </p>
        <nav className="grid gap-1.5" aria-label="Filter shortcuts">
          {filterItems.map((item) => (
            <NavItem item={item} key={item.label} />
          ))}
        </nav>
      </div>

      <div className="mt-auto grid gap-3">
        <motion.a
          className="flex min-h-11 items-center justify-center gap-2.5 rounded-[14px] px-4 text-[14px] font-extrabold text-white ring-1 ring-blue-700/35 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:brightness-105"
          href="/upload"
          style={{
            background: token.active,
            boxShadow:
              "0 20px 36px -20px rgba(37,99,235,0.86), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(30,64,175,0.25)",
          }}
          whileTap={{ scale: 0.98 }}
        >
          <Upload size={17} strokeWidth={2.4} />
          Upload Portfolio
        </motion.a>

        <div
          className="rounded-[18px] border p-3"
          style={{
            background: token.surface,
            borderColor: token.border,
            boxShadow:
              "0 24px 48px -36px rgba(15,23,42,0.46), 0 8px 20px -18px rgba(15,23,42,0.22), inset 0 1px 0 rgba(255,255,255,0.96)",
          }}
        >
          <button
            className="flex w-full items-center gap-3 rounded-[14px] text-left transition-all duration-200 ease-out"
            type="button"
            aria-label="Open Hodos workspace menu"
            onMouseEnter={(event) => {
              event.currentTarget.style.background = token.surfaceHover;
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.background = "transparent";
            }}
          >
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-[13px] text-white"
              style={{
                background: "linear-gradient(180deg, #1F2937 0%, #111827 100%)",
                boxShadow:
                  "0 12px 24px -18px rgba(15,23,42,0.5), inset 0 1px 0 rgba(255,255,255,0.16)",
              }}
            >
              <Sparkles size={17} />
            </span>
            <span className="min-w-0 flex-1">
              <span
                className="block truncate text-[13px] font-extrabold"
                style={{ color: token.text }}
              >
                Hodos team
              </span>
              <span
                className="block truncate text-[12px] font-semibold"
                style={{ color: token.textMuted }}
              >
                team@hodos.dev
              </span>
            </span>
            <ChevronDown
              className="shrink-0"
              size={16}
              style={{ color: token.textSubtle }}
            />
          </button>
        </div>
      </div>

      <div
        className="flex items-center justify-between rounded-[18px] border p-1"
        aria-label="Utilities"
        style={{
          background:
            "color-mix(in srgb, var(--color-background-surface-default, #FFFFFF) 78%, transparent)",
          borderColor: token.border,
          boxShadow:
            "0 14px 28px -24px rgba(15,23,42,0.32), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        {[
          { label: "Theme", icon: Moon },
          { label: "Settings", icon: Settings },
          { label: "Profile", icon: UserRound },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              className="grid h-9 w-9 place-items-center rounded-[13px] transition-all duration-200 ease-out hover:-translate-y-0.5"
              key={item.label}
              type="button"
              aria-label={item.label}
              style={{ color: token.icon }}
              onMouseEnter={(event) => {
                event.currentTarget.style.background = token.surface;
                event.currentTarget.style.boxShadow =
                  "0 10px 18px -16px rgba(15,23,42,0.32)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = "transparent";
                event.currentTarget.style.boxShadow = "none";
              }}
            >
              <Icon size={18} />
            </button>
          );
        })}
      </div>
    </>
  );
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const panelStyle = {
    background: token.sidebar,
    borderColor: token.border,
    boxShadow:
      "0 28px 80px -58px rgba(15,23,42,0.62), 0 12px 34px -30px rgba(15,23,42,0.32), inset 0 1px 0 #FFFFFF, inset -1px 0 0 #FFFFFF",
  };

  return (
    <>
      <aside
        className="desktop-sidebar sticky top-4 m-4 mr-0 hidden h-[calc(100vh-2rem)] flex-col gap-5 overflow-hidden rounded-[24px] border px-[18px] py-5 lg:flex"
        style={panelStyle}
      >
        <SidebarContent onClose={onClose} />
      </aside>

      {isOpen && (
        <button
          className="fixed inset-0 z-40 bg-slate-950/25 backdrop-blur-[2px]"
          onClick={onClose}
          type="button"
          aria-label="Close menu"
        />
      )}

      <motion.aside
        animate={{ x: isOpen ? 0 : "-105%" }}
        className="mobile-sidebar fixed left-3 top-3 z-50 flex h-[calc(100vh-1.5rem)] w-[min(304px,calc(100vw-1.5rem))] flex-col gap-5 overflow-hidden rounded-[24px] border px-[18px] py-5 lg:hidden"
        initial={false}
        style={panelStyle}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <SidebarContent onClose={onClose} />
      </motion.aside>
    </>
  );
}
