import { useEffect, useState } from "react";
import { exchangeOAuthCode, type AuthResponse } from "../lib/api";

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
    let isMounted = true;

    function finishSignIn(result: AuthResponse) {
      if (!result.access_token) {
        throw new Error("Sign in finished, but no session was returned. Check your Supabase redirect settings.");
      }

      localStorage.setItem("hodos_access_token", result.access_token);

      if (result.refresh_token) {
        localStorage.setItem("hodos_refresh_token", result.refresh_token);
      }

      window.history.replaceState({}, document.title, "/auth/callback");
      window.location.replace("/upload");
    }

    async function handleCallback() {
      const params = getOAuthParams();
      const error = params.get("error_description") || params.get("error");
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      const code = params.get("code");

      if (error) {
        setMessage(error);
        return;
      }

      try {
        if (accessToken) {
          finishSignIn({
            access_token: accessToken,
            refresh_token: refreshToken,
            token_type: "bearer",
            message: "Authenticated successfully",
          });
          return;
        }

        if (code) {
          const result = await exchangeOAuthCode(code);
          finishSignIn(result);
          return;
        }

        throw new Error("Sign in finished, but no session was returned. Check your Supabase redirect settings.");
      } catch (callbackError) {
        if (isMounted) {
          setMessage(callbackError instanceof Error ? callbackError.message : "Could not finish sign in.");
        }
      }
    }

    handleCallback();

    return () => {
      isMounted = false;
    };
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
