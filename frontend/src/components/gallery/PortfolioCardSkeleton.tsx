export function PortfolioCardSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading portfolios" className="portfolio-grid portfolio-skeleton-grid">
      {Array.from({ length: 8 }, (_, index) => (
        <article aria-hidden="true" className="portfolio-card-skeleton" key={index}>
          <div className="portfolio-skeleton-content">
            <span className="portfolio-skeleton-line portfolio-skeleton-name" />
            <span className="portfolio-skeleton-line portfolio-skeleton-role" />
            <div className="portfolio-skeleton-pills">
              <span />
              <span />
              <span />
            </div>
            <span className="portfolio-skeleton-meta" />
            <span className="portfolio-skeleton-button" />
          </div>
        </article>
      ))}
    </div>
  );
}
