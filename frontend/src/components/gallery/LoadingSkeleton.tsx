export function LoadingSkeleton() {
  return (
    <div className="portfolio-grid" aria-label="Loading portfolios">
      {Array.from({ length: 6 }, (_, index) => (
        <div className="portfolio-card skeleton-card" key={index}>
          <div className="skeleton-avatar" />
          <div className="skeleton-line wide" />
          <div className="skeleton-line" />
          <div className="skeleton-pills">
            <span />
            <span />
            <span />
          </div>
        </div>
      ))}
    </div>
  );
}
