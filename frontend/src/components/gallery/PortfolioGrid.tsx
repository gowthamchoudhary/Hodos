import { AnimatePresence, motion } from "framer-motion";
import type { PortfolioProfile } from "../../lib/api";
import { EmptyState } from "./EmptyState";
import type { GalleryView } from "./GridToggle";
import { PortfolioCard } from "./PortfolioCard";

type PortfolioGridProps = {
  portfolios: PortfolioProfile[];
  view: GalleryView;
};

export function PortfolioGrid({ portfolios, view }: PortfolioGridProps) {
  if (portfolios.length === 0) {
    return <EmptyState />;
  }

  return (
    <motion.div className={view === "grid" ? "portfolio-grid" : "portfolio-list"} layout>
      <AnimatePresence mode="popLayout">
        {portfolios.map((profile, index) => (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            initial={{ opacity: 0, y: 18 }}
            key={profile.id}
            transition={{ delay: index * 0.035, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <PortfolioCard profile={profile} view={view} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
