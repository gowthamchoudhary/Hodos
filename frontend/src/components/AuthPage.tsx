import { motion } from "framer-motion";
import { ArrowLeft, Check, LockKeyhole, Mail, Sparkles } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import logoFire from "../../assets/logo_fire.png";
import { type AuthMode, type OAuthProvider, startOAuth, submitAuth } from "../lib/api";

type AuthPageProps = {
  initialMode: AuthMode;
  onBack: () => void;
};

const authEase = [0.22, 1, 0.36, 1] as const;
const fluidBgHash =
  "#p=0.86,2.19,3.2,0.046,1,7,0,3,13.16,0.8,0.85,1,0,0,12,2,0,0,0,0,0,0,0,0,0,10,4,67";

export function AuthPage({ initialMode, onBack }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLogin = mode === "login";

  useEffect(() => {
    if (document.querySelector('script[src="https://cdn.jsdelivr.net/npm/fluid-bg"]')) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/fluid-bg";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setIsSubmitting(true);

    try {
      const result = await submitAuth(mode, email, password);

      if (result.access_token) {
        localStorage.setItem("hodos_access_token", result.access_token);
      }

      if (result.refresh_token) {
        localStorage.setItem("hodos_refresh_token", result.refresh_token);
      }

      setStatus(result.message || "You are signed in.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Authentication failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleProvider(provider: OAuthProvider) {
    setStatus("");
    setIsSubmitting(true);

    try {
      const result = await startOAuth(provider);
      window.location.href = result.url;
    } catch (error) {
      setStatus(error instanceof Error ? error.message : `Could not start ${provider} sign-in.`);
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <button className="auth-back-button" onClick={onBack} type="button">
        <ArrowLeft size={18} />
        Back
      </button>

      <motion.section
        animate={{ opacity: 1 }}
        className="auth-layout"
        initial={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: authEase }}
      >
        <motion.aside
          animate={{ opacity: 1 }}
          className="auth-left-panel"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: authEase }}
        >
          <div className="auth-purple-light" />
          {/*
            Fluid BG is loaded by the effect above and rendered as the custom element requested.
            React keeps it behind the card while the script owns the visual animation.
          */}
          <fluid-bg class="auth-fluid-bg" fixed hash={fluidBgHash} />
          <div className="auth-left-overlay" />

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="auth-glass-card"
            initial={{ opacity: 0, y: 24 }}
            transition={{ delay: 0.1, duration: 0.65, ease: authEase }}
          >
            <div className="auth-logo-row">
              <span className="auth-logo-mark">
                <img alt="Hodos" src={logoFire} />
              </span>
              <div>
                <p>Hodos</p>
                <span>Career journeys, made visible.</span>
              </div>
            </div>

            <p className="auth-left-copy">
              Build your path, collect the proof, and turn progress into a portfolio with momentum.
            </p>

            <div className="auth-progress-steps" aria-label="Onboarding progress">
              <span>
                <Check size={14} />
                Profile
              </span>
              <span>
                <Check size={14} />
                Proof
              </span>
              <span>
                <Sparkles size={14} />
                Portfolio
              </span>
            </div>
          </motion.div>
        </motion.aside>

        <section className="auth-right-panel">
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="auth-shell"
            initial={{ opacity: 0, x: 28 }}
            transition={{ delay: 0.12, duration: 0.58, ease: authEase }}
          >
            <div className="auth-panel">
              <div className="auth-badge">
                <Sparkles size={15} />
                Hodos access
              </div>

              <h1>{isLogin ? "Welcome back" : "Start your journey"}</h1>
              <p className="auth-subtitle">
                {isLogin
                  ? "Sign in to continue exploring career journeys built by real students and developers."
                  : "Create your Hodos account and begin building a portfolio that feels alive."}
              </p>

              <div className="auth-mode-switch" role="tablist" aria-label="Authentication mode">
                <button
                  aria-selected={isLogin}
                  className={isLogin ? "active" : ""}
                  onClick={() => setMode("login")}
                  role="tab"
                  type="button"
                >
                  Log in
                </button>
                <button
                  aria-selected={!isLogin}
                  className={!isLogin ? "active" : ""}
                  onClick={() => setMode("signup")}
                  role="tab"
                  type="button"
                >
                  Sign up
                </button>
              </div>

              <div className="auth-provider-grid">
                <motion.button
                  disabled={isSubmitting}
                  onClick={() => handleProvider("google")}
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FcGoogle size={21} />
                  Google
                </motion.button>
                <motion.button
                  disabled={isSubmitting}
                  onClick={() => handleProvider("github")}
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaGithub size={19} />
                  GitHub
                </motion.button>
              </div>

              <div className="auth-divider">
                <span />
                <p>or continue with email</p>
                <span />
              </div>

              <form className="auth-form" onSubmit={handleSubmit}>
                <label>
                  <span>Email</span>
                  <div className="auth-input-wrap">
                    <Mail size={18} />
                    <input
                      autoComplete="email"
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@hodos.dev"
                      required
                      type="email"
                      value={email}
                    />
                  </div>
                </label>

                <label>
                  <span>Password</span>
                  <div className="auth-input-wrap">
                    <LockKeyhole size={18} />
                    <input
                      autoComplete={isLogin ? "current-password" : "new-password"}
                      minLength={6}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="At least 6 characters"
                      required
                      type="password"
                      value={password}
                    />
                  </div>
                </label>

                <motion.button
                  className="auth-submit"
                  disabled={isSubmitting}
                  type="submit"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? "Connecting..." : isLogin ? "Log in" : "Create account"}
                </motion.button>
              </form>

              {status && <p className="auth-status">{status}</p>}
            </div>
          </motion.div>
        </section>
      </motion.section>
    </main>
  );
}
