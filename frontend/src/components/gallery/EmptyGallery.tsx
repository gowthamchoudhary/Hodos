import { motion } from "framer-motion";
import { PanelsTopLeft, Sparkles, Upload } from "lucide-react";

export function EmptyGallery() {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="empty-gallery"
      initial={{ opacity: 0, y: 14 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <div aria-hidden="true" className="empty-gallery-illustration">
        <span className="empty-gallery-panel">
          <PanelsTopLeft size={28} strokeWidth={1.7} />
        </span>
        <Sparkles className="empty-gallery-sparkle" size={20} strokeWidth={1.8} />
      </div>
      <h2>No portfolios yet</h2>
      <p>The first portfolio uploaded to Hodos will appear here.</p>
      <a className="empty-gallery-upload" href="/upload">
        <Upload aria-hidden="true" size={17} strokeWidth={2.3} />
        Upload Portfolio
      </a>
    </motion.section>
  );
}
