import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

export function HeroContent() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
      <motion.div
        className="hero-kicker inline-flex items-center rounded-full border border-white/20 bg-white/15 px-5 py-2 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(0,72,180,0.16)] backdrop-blur-xl sm:text-base"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {"\u2728"} Discover. Learn. Grow.
      </motion.div>

      <motion.h1
        className="hero-title mt-6 max-w-5xl text-balance text-5xl font-extrabold leading-[0.95] tracking-normal text-white sm:text-6xl md:text-7xl xl:text-8xl"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ delay: 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        Discover the path
        <br />
        behind{" "}
        <span className="bg-gradient-to-r from-[#dff7ff] via-[#7ee7ff] to-[#35c8ff] bg-clip-text text-transparent">
          every career.
        </span>
      </motion.h1>

      <motion.p
        className="hero-copy mt-6 max-w-[700px] text-pretty text-base font-medium leading-8 text-white/85 sm:text-lg md:text-xl"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ delay: 0.24, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        Explore real portfolios, resumes, projects and skills that helped students and developers
        land internships and jobs.
      </motion.p>

      <motion.div
        className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ delay: 0.36, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.a
          className="hero-primary-cta inline-flex min-h-14 items-center justify-center rounded-xl bg-black px-7 text-base font-semibold text-white shadow-[0_18px_40px_rgba(0,0,0,0.24)] transition-shadow duration-200 hover:shadow-[0_22px_48px_rgba(0,0,0,0.3)]"
          href="#explore"
          style={{ color: "#ffffff" }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.18 }}
        >
          <span className="text-white">Explore Journeys {"\u2192"}</span>
        </motion.a>

        <motion.a
          className="hero-secondary-cta inline-flex min-h-14 items-center justify-center rounded-xl bg-white px-7 text-base font-semibold text-[#111827] shadow-[0_18px_40px_rgba(255,255,255,0.18)] transition-colors duration-200 hover:bg-white/90"
          href="#share"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.18 }}
        >
          Share Your Journey
        </motion.a>
      </motion.div>
    </div>
  );
}
