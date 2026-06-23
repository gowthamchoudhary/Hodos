import { Navbar } from "./components/Navbar";

export function App() {
  return (
    <main className="landing-page">
      <Navbar />

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
