from pydantic import BaseModel, ConfigDict


class ProfileCreate(BaseModel):
    name: str
    role: str
    experience_type: str
    company: str | None = None
    portfolio_url: str | None = None
    github_url: str | None = None
    linkedin_url: str | None = None


class ProfileUpdate(BaseModel):
    name: str | None = None
    role: str | None = None
    experience_type: str | None = None
    company: str | None = None
    portfolio_url: str | None = None
    github_url: str | None = None
    linkedin_url: str | None = None


class ProfileResponse(BaseModel):
    id: int
    user_id: str
    name: str
    role: str
    experience_type: str
    company: str | None
    portfolio_url: str | None
    resume_url: str | None
    github_url: str | None
    linkedin_url: str | None

    model_config = ConfigDict(from_attributes=True)
