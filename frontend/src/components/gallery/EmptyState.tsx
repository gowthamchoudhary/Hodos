import { FilePlus2, Sparkles, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { PremiumButton } from "../PremiumButton";

export function EmptyState() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="gallery-state empty-gallery-state"
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="empty-illustration" aria-hidden="true">
        <span className="empty-document">
          <Sparkles size={22} />
        </span>
      </div>
      <div className="gallery-state-icon">
        <FilePlus2 size={28} />
      </div>
      <h2>No portfolios yet</h2>
      <p>No portfolios have been shared yet.</p>
      <PremiumButton
        as="a"
        className="gallery-primary-button gallery-state-action upload-portfolio-button"
        href="/upload"
        icon={<Upload size={18} strokeWidth={2.45} />}
        variant="blue"
      >
        Upload Portfolio
      </PremiumButton>
    </motion.div>
  );
}
