import largeClouds from "../assets/large_clouds.png";
import mediumClouds from "../assets/medium_clouds.png";
import smallClouds from "../assets/small_clouds.png";

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
        <div className="hero-cloud-layer" aria-hidden="true">
          <img className="hero-cloud cloud-left-large" src={largeClouds} alt="" />
          <img className="hero-cloud cloud-left-medium" src={mediumClouds} alt="" />
          <img className="hero-cloud cloud-left-small" src={smallClouds} alt="" />
          <img className="hero-cloud cloud-right-large" src={largeClouds} alt="" />
          <img className="hero-cloud cloud-right-medium" src={mediumClouds} alt="" />
          <img className="hero-cloud cloud-right-small" src={smallClouds} alt="" />
          <img className="hero-cloud cloud-bottom-left" src={largeClouds} alt="" />
          <img className="hero-cloud cloud-bottom-center" src={mediumClouds} alt="" />
          <img className="hero-cloud cloud-bottom-right" src={largeClouds} alt="" />
        </div>

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
