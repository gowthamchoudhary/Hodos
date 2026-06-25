import { motion } from "framer-motion";
import { ArrowLeft, LockKeyhole, Mail, Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { type AuthMode, type OAuthProvider, startOAuth, submitAuth } from "../lib/api";

type AuthPageProps = {
  initialMode: AuthMode;
  onBack: () => void;
};

const authEase = [0.22, 1, 0.36, 1] as const;

export function AuthPage({ initialMode, onBack }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLogin = mode === "login";

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
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="auth-shell"
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        transition={{ duration: 0.55, ease: authEase }}
      >
        <div className="auth-orbit auth-orbit-one" />
        <div className="auth-orbit auth-orbit-two" />

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
            <button disabled={isSubmitting} onClick={() => handleProvider("google")} type="button">
              <FcGoogle size={21} />
              Google
            </button>
            <button disabled={isSubmitting} onClick={() => handleProvider("github")} type="button">
              <FaGithub size={19} />
              GitHub
            </button>
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
      </motion.section>
    </main>
  );
}
