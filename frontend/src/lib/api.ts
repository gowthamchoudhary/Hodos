export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "https://hodos-2v13.onrender.com";

export type AuthMode = "login" | "signup";

export type AuthResponse = {
  access_token?: string | null;
  refresh_token?: string | null;
  token_type: string;
  user_id?: string | null;
  email?: string | null;
  message: string;
};

export type OAuthProvider = "google" | "github";

export type OAuthResponse = {
  provider: OAuthProvider;
  url: string;
};

export async function submitAuth(mode: AuthMode, email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/${mode}`, {
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || "Authentication failed. Please try again.");
  }

  return data as AuthResponse;
}

export async function startOAuth(provider: OAuthProvider): Promise<OAuthResponse> {
  const redirectTo = `${window.location.origin}/`;
  const response = await fetch(
    `${API_BASE_URL}/auth/oauth/${provider}?redirect_to=${encodeURIComponent(redirectTo)}`,
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || `Could not start ${provider} sign-in.`);
  }

  return data as OAuthResponse;
}
