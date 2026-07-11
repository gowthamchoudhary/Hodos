import { Filter, Menu, Search } from "lucide-react";
import { motion } from "framer-motion";
import { GridToggle, type GalleryView } from "./GridToggle";
import { SortDropdown, type SortMode } from "./SortDropdown";

type TopSearchBarProps = {
  count: number;
  search: string;
  sort: SortMode;
  view: GalleryView;
  onFilterOpen: () => void;
  onMenuOpen: () => void;
  onSearchChange: (value: string) => void;
  onSortChange: (value: SortMode) => void;
  onViewChange: (value: GalleryView) => void;
};

export function TopSearchBar({
  count,
  search,
  sort,
  view,
  onFilterOpen,
  onMenuOpen,
  onSearchChange,
  onSortChange,
  onViewChange,
}: TopSearchBarProps) {
  return (
    <header className="gallery-topbar">
      <button className="gallery-icon-button sidebar-toggle" onClick={onMenuOpen} type="button" aria-label="Open menu">
        <Menu size={19} />
      </button>

      <label className="gallery-search">
        <Search size={20} />
        <span className="sr-only">Search portfolios</span>
        <input
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search portfolios, skills, companies, projects..."
          type="search"
          value={search}
        />
        <kbd>Ctrl K</kbd>
      </label>

      <div className="gallery-topbar-actions">
        <GridToggle onChange={onViewChange} value={view} />
        <SortDropdown onChange={onSortChange} value={sort} />
        <span className="portfolio-count" aria-label={`${count} portfolios`}>
          {count}
        </span>
        <motion.button
          className="gallery-icon-button filter-toggle"
          onClick={onFilterOpen}
          type="button"
          aria-label="Open filters"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.96 }}
        >
          <Filter size={18} />
        </motion.button>
      </div>
    </header>
  );
}
