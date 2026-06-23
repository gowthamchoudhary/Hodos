import { HeroContent } from "./components/HeroContent";
import { HeroCards } from "./components/HeroCards";
import { Navbar } from "./components/Navbar";

export function App() {
  return (
    <main className="landing-page">
      <Navbar />

      <section className="hero-section">
        <HeroContent />
        <HeroCards />
      </section>
    </main>
  );
}
