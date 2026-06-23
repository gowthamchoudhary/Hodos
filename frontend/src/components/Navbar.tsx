import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logoFire from "../../assets/logo_fire.png";

const navLinks = [
  { label: "Explore", href: "#explore" },
  { label: "Search", href: "#search" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "For Students", href: "#students" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      animate={{ opacity: 1, y: 0 }}
      className="fixed left-0 right-0 top-0 z-50 px-4 py-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        aria-label="Main navigation"
        className={`mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl px-4 transition-all duration-300 sm:px-5 lg:px-6 ${
          isScrolled
            ? "border border-white/15 bg-white/10 shadow-[0_18px_55px_rgba(0,38,120,0.18)] backdrop-blur-xl"
            : "border border-transparent bg-transparent"
        }`}
      >
        <a className="flex items-center gap-2.5" href="/" aria-label="Hodos home">
          <img className="h-8 w-8 object-contain" src={logoFire} alt="" />
          <span className="text-xl font-bold tracking-normal text-white">Hodos</span>
        </a>

        <div className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <motion.a
              className="text-sm font-medium text-white/90 transition-colors duration-200 hover:text-white"
              href={link.href}
              key={link.label}
              whileHover={{ y: -1 }}
              transition={{ duration: 0.18 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <motion.a
            className="text-sm font-medium text-white/90 transition-opacity duration-200 hover:opacity-75"
            href="#login"
            whileHover={{ y: -1 }}
            transition={{ duration: 0.18 }}
          >
            Log In
          </motion.a>
          <motion.a
            className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_35px_rgba(0,0,0,0.22)] transition-shadow duration-200 hover:shadow-[0_18px_42px_rgba(0,0,0,0.28)]"
            href="#get-started"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            Get Started
          </motion.a>
        </div>

        <motion.button
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white backdrop-blur-md lg:hidden"
          onClick={() => setIsMenuOpen((current) => !current)}
          type="button"
          whileTap={{ scale: 0.95 }}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mx-auto mt-3 max-w-7xl overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-3 shadow-[0_22px_60px_rgba(0,38,120,0.2)] backdrop-blur-xl lg:hidden"
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <a
                  className="rounded-xl px-3 py-3 text-sm font-medium text-white/90 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                  href={link.href}
                  key={link.label}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
                <a
                  className="rounded-xl px-3 py-3 text-center text-sm font-medium text-white/90 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                  href="#login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log In
                </a>
                <a
                  className="rounded-xl bg-black px-3 py-3 text-center text-sm font-semibold text-white"
                  href="#get-started"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
