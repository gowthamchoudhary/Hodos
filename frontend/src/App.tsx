import { useMemo, useState, type CSSProperties } from "react";
import { HeroContent } from "./components/HeroContent";
import { HeroCards } from "./components/HeroCards";
import { Navbar } from "./components/Navbar";

type Star = {
  id: number;
  left: string;
  top: string;
  size: string;
  opacity: number;
  duration: string;
  delay: string;
};

function StarField() {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: 220 }, (_, index) => {
        const size = 1 + Math.random() * 2.4;

        return {
          id: index,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 74}%`,
          size: `${size}px`,
          opacity: 0.35 + Math.random() * 0.65,
          duration: `${2.6 + Math.random() * 4.8}s`,
          delay: `${Math.random() * 5.5}s`,
        };
      }),
    [],
  );

  return (
    <div aria-hidden="true" className="hero-stars">
      {stars.map((star) => (
        <span
          className="hero-star"
          key={star.id}
          style={{
            "--star-delay": star.delay,
            "--star-duration": star.duration,
            "--star-opacity": star.opacity,
            height: star.size,
            left: star.left,
            top: star.top,
            width: star.size,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

export function App() {
  const [isNightMode, setIsNightMode] = useState(false);

  return (
    <main className={`landing-page ${isNightMode ? "night-mode" : "day-mode"}`}>
      <Navbar isNightMode={isNightMode} onThemeToggle={() => setIsNightMode((current) => !current)} />

      <section className="hero-section">
        <StarField />
        <HeroContent />
        <HeroCards />
      </section>
    </main>
  );
}
