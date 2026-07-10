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

export type SkillResponse = {
  id: number;
  name: string;
};

export type ProfileResponse = {
  id: number;
  user_id: string;
  name: string;
  role: string;
  experience_type: string;
  company: string | null;
  portfolio_url: string | null;
  resume_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
};

export type PortfolioProfile = ProfileResponse & {
  skills: SkillResponse[];
};

export type SearchFilters = {
  role?: string;
  company?: string;
  experience_type?: string;
  skill?: string;
};

export type SearchResponse = {
  items: ProfileResponse[];
  total: number;
  limit: number;
  offset: number;
};

function getAuthHeaders() {
  const token = localStorage.getItem("hodos_access_token");

  if (!token) {
    throw new Error("Sign in to explore the gallery.");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

async function requestJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: getAuthHeaders(),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || "Could not load gallery data.");
  }

  return data as T;
}

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

export async function searchProfiles(filters: SearchFilters = {}): Promise<SearchResponse> {
  const params = new URLSearchParams({
    limit: "100",
    offset: "0",
  });

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  return requestJson<SearchResponse>(`/search?${params.toString()}`);
}

export async function getProfileSkills(profileId: number): Promise<SkillResponse[]> {
  return requestJson<SkillResponse[]>(`/profiles/${profileId}/skills`);
}

export async function getGalleryProfiles(filters: SearchFilters = {}): Promise<{
  items: PortfolioProfile[];
  total: number;
}> {
  const result = await searchProfiles(filters);
  const skillsByProfile = await Promise.all(
    result.items.map(async (profile) => {
      try {
        return await getProfileSkills(profile.id);
      } catch {
        return [];
      }
    }),
  );

  return {
    items: result.items.map((profile, index) => ({
      ...profile,
      skills: skillsByProfile[index],
    })),
    total: result.total,
  };
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
