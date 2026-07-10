import { FilePlus2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

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
      <motion.a className="gallery-primary-button" href="/upload" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
        Upload Portfolio
      </motion.a>
    </motion.div>
  );
}
