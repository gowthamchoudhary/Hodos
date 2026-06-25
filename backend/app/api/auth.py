from typing import Any

from fastapi import APIRouter, HTTPException, status

from app.core.config import supabase
from app.schemas.auth import AuthCredentials, AuthResponse, OAuthResponse

router = APIRouter(prefix="/auth", tags=["auth"])

SUPPORTED_OAUTH_PROVIDERS = {"google", "github"}


def _read_auth_result(result: Any) -> AuthResponse:
    session = getattr(result, "session", None)
    user = getattr(result, "user", None)

    if session is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication failed. Check your credentials and try again.",
        )

    return AuthResponse(
        access_token=getattr(session, "access_token", None),
        refresh_token=getattr(session, "refresh_token", None),
        user_id=getattr(user, "id", None),
        email=getattr(user, "email", None),
        message="Authenticated successfully",
    )


@router.post("/login", response_model=AuthResponse)
def login(credentials: AuthCredentials) -> AuthResponse:
    try:
        result = supabase.auth.sign_in_with_password(credentials.model_dump())
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication failed. Check your credentials and try again.",
        ) from exc

    return _read_auth_result(result)


@router.post("/signup", response_model=AuthResponse)
def signup(credentials: AuthCredentials) -> AuthResponse:
    try:
        result = supabase.auth.sign_up(credentials.model_dump())
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not create your account. Try another email or password.",
        ) from exc

    session = getattr(result, "session", None)
    user = getattr(result, "user", None)

    return AuthResponse(
        access_token=getattr(session, "access_token", None) if session else None,
        refresh_token=getattr(session, "refresh_token", None) if session else None,
        user_id=getattr(user, "id", None),
        email=getattr(user, "email", None),
        message="Account created. Check your email if confirmation is required.",
    )


@router.get("/oauth/{provider}", response_model=OAuthResponse)
def oauth_url(provider: str, redirect_to: str | None = None) -> OAuthResponse:
    normalized_provider = provider.lower()

    if normalized_provider not in SUPPORTED_OAUTH_PROVIDERS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported OAuth provider. Use google or github.",
        )

    credentials: dict[str, Any] = {"provider": normalized_provider}

    if redirect_to:
        credentials["options"] = {"redirect_to": redirect_to}

    try:
        result = supabase.auth.sign_in_with_oauth(credentials)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Could not start {normalized_provider} OAuth sign-in.",
        ) from exc

    url = getattr(result, "url", None)

    if not url:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Could not create {normalized_provider} OAuth sign-in URL.",
        )

    return OAuthResponse(provider=normalized_provider, url=url)
