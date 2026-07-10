import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="gallery-state"
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="gallery-state-icon">
        <AlertCircle size={28} />
      </div>
      <h2>Unable to load gallery</h2>
      <p>{message}</p>
      <motion.button className="gallery-primary-button" onClick={onRetry} type="button" whileHover={{ y: -2 }}>
        Try again
      </motion.button>
    </motion.div>
  );
}
