from pydantic import BaseModel, EmailStr, Field


class AuthCredentials(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)


class AuthResponse(BaseModel):
    access_token: str | None = None
    refresh_token: str | None = None
    token_type: str = "bearer"
    user_id: str | None = None
    email: EmailStr | None = None
    message: str


class OAuthResponse(BaseModel):
    provider: str
    url: str
