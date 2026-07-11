import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion } from "framer-motion";
import type { SearchFilters } from "../../lib/api";
import { PremiumButton } from "../PremiumButton";

export type FilterOptions = {
  roles: string[];
  companies: string[];
  skills: string[];
  experiences: string[];
  internships: string[];
  locations: string[];
};

type FilterPanelProps = {
  draftFilters: SearchFilters;
  inlineSearch: string;
  isOpen: boolean;
  options: FilterOptions;
  onApply: () => void;
  onClear: () => void;
  onClose: () => void;
  onDraftChange: (filters: SearchFilters) => void;
  onInlineSearchChange: (value: string) => void;
};

function FilterSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="filter-field">
      <span>{label}</span>
      <select onChange={(event) => onChange(event.target.value)} value={value || ""}>
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function PanelContent({
  draftFilters,
  inlineSearch,
  options,
  onApply,
  onClear,
  onClose,
  onDraftChange,
  onInlineSearchChange,
}: Omit<FilterPanelProps, "isOpen">) {
  return (
    <>
      <div className="filter-panel-head">
        <div>
          <span>
            <SlidersHorizontal size={17} />
          </span>
          <h2>Refine your search</h2>
        </div>
        <button className="gallery-icon-button tablet-only" onClick={onClose} type="button" aria-label="Close filters">
          <X size={18} />
        </button>
      </div>

      <label className="filter-search">
        <Search size={18} />
        <span className="sr-only">Search within results</span>
        <input
          onChange={(event) => onInlineSearchChange(event.target.value)}
          placeholder="Search within results"
          type="search"
          value={inlineSearch}
        />
      </label>

      <div className="filter-fields">
        <FilterSelect
          label="Role"
          onChange={(role) => onDraftChange({ ...draftFilters, role })}
          options={options.roles}
          value={draftFilters.role}
        />
        <FilterSelect
          label="Company"
          onChange={(company) => onDraftChange({ ...draftFilters, company })}
          options={options.companies}
          value={draftFilters.company}
        />
        <FilterSelect
          label="Skills"
          onChange={(skill) => onDraftChange({ ...draftFilters, skill })}
          options={options.skills}
          value={draftFilters.skill}
        />
        <FilterSelect
          label="Experience"
          onChange={(experience_type) => onDraftChange({ ...draftFilters, experience_type })}
          options={options.experiences}
          value={draftFilters.experience_type}
        />
        <FilterSelect
          label="Internship"
          onChange={(experience_type) => onDraftChange({ ...draftFilters, experience_type })}
          options={options.internships}
          value={options.internships.includes(draftFilters.experience_type || "") ? draftFilters.experience_type : ""}
        />
        <FilterSelect label="Location" onChange={() => undefined} options={options.locations} value="" />
      </div>

      <div className="filter-actions">
        <PremiumButton
          className="gallery-secondary-button"
          icon={false}
          onClick={onClear}
          type="button"
          variant="secondary"
        >
          Clear Filters
        </PremiumButton>
        <PremiumButton
          className="gallery-primary-button"
          icon={false}
          onClick={onApply}
          type="button"
          variant="blue"
        >
          Apply Filters
        </PremiumButton>
      </div>
    </>
  );
}

export function FilterPanel(props: FilterPanelProps) {
  return (
    <>
      <aside className="filter-panel desktop-filter">
        <PanelContent {...props} />
      </aside>

      {props.isOpen && (
        <button className="gallery-scrim filter-scrim" onClick={props.onClose} type="button" aria-label="Close filters" />
      )}

      <motion.aside
        animate={{ x: props.isOpen ? 0 : "105%" }}
        className="filter-panel drawer-filter"
        initial={false}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <PanelContent {...props} />
      </motion.aside>
    </>
  );
}
