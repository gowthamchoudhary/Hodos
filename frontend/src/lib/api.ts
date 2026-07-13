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
  /** Optional gallery enrichment returned by newer backend versions. */
  headline?: string | null;
  badges?: string[] | null;
  status_badges?: string[] | null;
  location?: string | null;
  current_company?: string | null;
  experience_level?: string | null;
  project_count?: number | null;
  projects_count?: number | null;
  skills_count?: number | null;
  experience_years?: number | string | null;
  years_of_experience?: number | string | null;
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

export type GalleryResponse = {
  items: PortfolioProfile[];
  total: number;
  limit: number;
  offset: number;
};

export type ProfilePayload = {
  name: string;
  role: string;
  experience_type: string;
  company?: string | null;
  portfolio_url?: string | null;
  github_url?: string | null;
  linkedin_url?: string | null;
};

export type ResumeUploadResponse = {
  profile_id: number;
  resume_url: string;
  message: string;
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

export async function createProfile(payload: ProfilePayload): Promise<ProfileResponse> {
  const response = await fetch(`${API_BASE_URL}/profiles`, {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    method: "POST",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || "Could not upload your portfolio.");
  }

  return data as ProfileResponse;
}

export async function getProfileSkills(profileId: number): Promise<SkillResponse[]> {
  return requestJson<SkillResponse[]>(`/profiles/${profileId}/skills`);
}

export async function uploadProfileResume(profileId: number, file: File): Promise<ResumeUploadResponse> {
  const formData = new FormData();
  formData.set("profile_id", String(profileId));
  formData.set("file", file);

  const response = await fetch(`${API_BASE_URL}/upload/resume`, {
    body: formData,
    headers: getAuthHeaders(),
    method: "POST",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || "Profile saved, but the resume upload failed.");
  }

  return data as ResumeUploadResponse;
}

export async function getGalleryProfiles(filters: SearchFilters = {}): Promise<{
  items: PortfolioProfile[];
  total: number;
}> {
  const params = new URLSearchParams({
    limit: "100",
    offset: "0",
  });

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  const response = await fetch(`${API_BASE_URL}/gallery?${params.toString()}`);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || "Could not load gallery data.");
  }

  return data as GalleryResponse;
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
