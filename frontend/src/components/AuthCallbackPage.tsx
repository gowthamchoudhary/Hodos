import { useEffect, useState } from "react";

function getOAuthParams() {
  const params = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));

  hashParams.forEach((value, key) => {
    if (!params.has(key)) {
      params.set(key, value);
    }
  });

  return params;
}

export function AuthCallbackPage() {
  const [message, setMessage] = useState("Finishing sign in...");

  useEffect(() => {
    const params = getOAuthParams();
    const error = params.get("error_description") || params.get("error");
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (error) {
      setMessage(error);
      return;
    }

    if (!accessToken) {
      setMessage("Sign in finished, but no session was returned. Check your Supabase redirect settings.");
      return;
    }

    localStorage.setItem("hodos_access_token", accessToken);

    if (refreshToken) {
      localStorage.setItem("hodos_refresh_token", refreshToken);
    }

    window.history.replaceState({}, document.title, "/auth/callback");
    window.location.replace("/upload");
  }, []);

  return (
    <main className="auth-callback-page">
      <section className="auth-callback-panel">
        <span className="auth-callback-loader" aria-hidden="true" />
        <p>{message}</p>
      </section>
    </main>
  );
}
