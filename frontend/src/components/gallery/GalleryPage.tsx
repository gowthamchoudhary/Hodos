import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { getGalleryProfiles, type PortfolioProfile, type SearchFilters } from "../../lib/api";
import { ErrorState } from "./ErrorState";
import { FilterPanel, type FilterOptions } from "./FilterPanel";
import type { GalleryView } from "./GridToggle";
import { PortfolioCardSkeleton } from "./PortfolioCardSkeleton";
import { PortfolioGrid } from "./PortfolioGrid";
import { Sidebar } from "./Sidebar";
import type { SortMode } from "./SortDropdown";
import { TopSearchBar } from "./TopSearchBar";

const ease = [0.22, 1, 0.36, 1] as const;

function unique(values: Array<string | null | undefined>) {
  return Array.from(new Set(values.filter((value): value is string => Boolean(value?.trim())))).sort((a, b) =>
    a.localeCompare(b),
  );
}

function matchesSearch(profile: PortfolioProfile, query: string) {
  if (!query.trim()) {
    return true;
  }

  const normalizedQuery = query.trim().toLowerCase();
  const searchable = [
    profile.name,
    profile.role,
    profile.company || "",
    profile.experience_type,
    ...profile.skills.map((skill) => skill.name),
  ]
    .join(" ")
    .toLowerCase();

  return searchable.includes(normalizedQuery);
}

function sortProfiles(profiles: PortfolioProfile[], sort: SortMode) {
  const sorted = [...profiles];

  if (sort === "name") {
    return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sort === "role") {
    return sorted.sort((a, b) => a.role.localeCompare(b.role));
  }

  if (sort === "company") {
    return sorted.sort((a, b) => (a.company || "").localeCompare(b.company || ""));
  }

  return sorted;
}

export function GalleryPage() {
  const [activeFilters, setActiveFilters] = useState<SearchFilters>({});
  const [draftFilters, setDraftFilters] = useState<SearchFilters>({});
  const [error, setError] = useState("");
  const [inlineSearch, setInlineSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [portfolios, setPortfolios] = useState<PortfolioProfile[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortMode>("newest");
  const [total, setTotal] = useState(0);
  const [view, setView] = useState<GalleryView>("grid");

  async function loadProfiles(filters: SearchFilters = activeFilters) {
    setIsLoading(true);
    setError("");

    try {
      const result = await getGalleryProfiles(filters);
      setPortfolios(result.items);
      setTotal(result.total);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load gallery data.");
      setPortfolios([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadProfiles({});
  }, []);

  const options = useMemo<FilterOptions>(() => {
    const experiences = unique(portfolios.map((profile) => profile.experience_type));

    return {
      roles: unique(portfolios.map((profile) => profile.role)),
      companies: unique(portfolios.map((profile) => profile.company)),
      skills: unique(portfolios.flatMap((profile) => profile.skills.map((skill) => skill.name))),
      experiences,
      internships: experiences.filter((experience) => experience.toLowerCase().includes("intern")),
      locations: [],
    };
  }, [portfolios]);

  const visibleProfiles = useMemo(() => {
    const filtered = portfolios.filter((profile) => matchesSearch(profile, search) && matchesSearch(profile, inlineSearch));
    return sortProfiles(filtered, sort);
  }, [inlineSearch, portfolios, search, sort]);

  function applyFilters() {
    const nextFilters = Object.fromEntries(
      Object.entries(draftFilters).filter(([, value]) => Boolean(value)),
    ) as SearchFilters;

    setActiveFilters(nextFilters);
    setIsFilterOpen(false);
    void loadProfiles(nextFilters);
  }

  function clearFilters() {
    setDraftFilters({});
    setActiveFilters({});
    setInlineSearch("");
    setIsFilterOpen(false);
    void loadProfiles({});
  }

  return (
    <motion.main
      animate={{ opacity: 1 }}
      className="gallery-page"
      initial={{ opacity: 0 }}
      transition={{ duration: 0.45, ease }}
    >
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <section className="gallery-main" aria-label="Portfolio gallery">
        <TopSearchBar
          count={total}
          onFilterOpen={() => setIsFilterOpen(true)}
          onMenuOpen={() => setIsSidebarOpen(true)}
          onSearchChange={setSearch}
          onSortChange={setSort}
          onViewChange={setView}
          search={search}
          sort={sort}
          view={view}
        />

        <div className="gallery-heading">
          <div>
            <motion.h1 animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 12 }} transition={{ duration: 0.38, ease }}>
              Portfolio Gallery
            </motion.h1>
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 12 }}
              transition={{ delay: 0.06, duration: 0.38, ease }}
            >
              Discover real portfolios from students and developers.
            </motion.p>
          </div>
        </div>

        {isLoading ? (
          <PortfolioCardSkeleton />
        ) : error ? (
          <ErrorState message={error} onRetry={() => loadProfiles(activeFilters)} />
        ) : (
          <PortfolioGrid portfolios={visibleProfiles} view={view} />
        )}
      </section>

      <FilterPanel
        draftFilters={draftFilters}
        inlineSearch={inlineSearch}
        isOpen={isFilterOpen}
        onApply={applyFilters}
        onClear={clearFilters}
        onClose={() => setIsFilterOpen(false)}
        onDraftChange={setDraftFilters}
        onInlineSearchChange={setInlineSearch}
        options={options}
      />
    </motion.main>
  );
}
