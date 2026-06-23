export function App() {
  return (
    <main className="landing-page">
      <nav className="navbar" aria-label="Main navigation">
        <a className="brand" href="/">
          Hodos
        </a>

        <div className="nav-links">
          <a href="#skills">Skills</a>
          <a href="#paths">Paths</a>
          <a href="#portfolios">Portfolios</a>
        </div>

        <div className="nav-actions">
          <a className="login-link" href="#login">
            Login
          </a>
          <a className="discover-button" href="#discover">
            Discover
          </a>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-copy">
          <p className="hero-kicker">Build your career map</p>
          <h1>Show the skills, paths, and portfolios that make your work visible.</h1>
          <p className="hero-text">
            Hodos helps you organize your growth, present proof of work, and discover clearer next
            steps.
          </p>
        </div>
      </section>
    </main>
  );
}
