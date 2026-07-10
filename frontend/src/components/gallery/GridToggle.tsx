import { LayoutGrid, List } from "lucide-react";
import { motion } from "framer-motion";

export type GalleryView = "grid" | "list";

type GridToggleProps = {
  value: GalleryView;
  onChange: (value: GalleryView) => void;
};

export function GridToggle({ value, onChange }: GridToggleProps) {
  return (
    <div className="gallery-segment" role="group" aria-label="Gallery view">
      <motion.button
        aria-pressed={value === "grid"}
        className={value === "grid" ? "active" : ""}
        onClick={() => onChange("grid")}
        title="Grid view"
        type="button"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.96 }}
      >
        <LayoutGrid size={17} />
      </motion.button>
      <motion.button
        aria-pressed={value === "list"}
        className={value === "list" ? "active" : ""}
        onClick={() => onChange("list")}
        title="List view"
        type="button"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.96 }}
      >
        <List size={17} />
      </motion.button>
    </div>
  );
}
