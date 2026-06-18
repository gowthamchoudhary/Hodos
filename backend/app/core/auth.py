from typing import Any

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jwt import ExpiredSignatureError, InvalidTokenError, PyJWKClient, PyJWKClientError
from pydantic import BaseModel, EmailStr

from app.core.config import (
    SUPABASE_JWT_AUDIENCE,
    SUPABASE_JWT_ISSUER,
    SUPABASE_JWT_SECRET,
    SUPABASE_JWKS_URL,
    SUPABASE_URL,
)


class CurrentUser(BaseModel):
    id: str
    email: EmailStr


bearer_scheme = HTTPBearer(auto_error=False)


def _unauthorized(detail: str = "Could not validate credentials") -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=detail,
        headers={"WWW-Authenticate": "Bearer"},
    )


def _expected_issuer() -> str:
    if SUPABASE_JWT_ISSUER:
        return SUPABASE_JWT_ISSUER.rstrip("/")
    return f"{SUPABASE_URL.rstrip('/')}/auth/v1"


def _jwks_url() -> str:
    if SUPABASE_JWKS_URL:
        return SUPABASE_JWKS_URL
    return f"{SUPABASE_URL.rstrip('/')}/auth/v1/.well-known/jwks.json"


def _decode_jwt(token: str, key: str | Any, algorithms: list[str]) -> dict[str, Any]:
    try:
        return jwt.decode(
            token,
            key,
            algorithms=algorithms,
            audience=SUPABASE_JWT_AUDIENCE,
            issuer=_expected_issuer(),
            options={
                "require": ["exp", "iat", "sub", "aud", "email"],
            },
        )
    except ExpiredSignatureError as exc:
        raise _unauthorized("Token has expired") from exc
    except InvalidTokenError as exc:
        raise _unauthorized("Invalid authentication token") from exc


def verify_supabase_jwt(token: str) -> dict[str, Any]:
    try:
        header = jwt.get_unverified_header(token)
    except InvalidTokenError as exc:
        raise _unauthorized("Invalid authentication token") from exc

    algorithm = header.get("alg")

    if algorithm == "HS256":
        if not SUPABASE_JWT_SECRET:
            raise _unauthorized("Supabase JWT secret is not configured")
        return _decode_jwt(token, SUPABASE_JWT_SECRET, ["HS256"])

    if algorithm in {"RS256", "ES256"}:
        try:
            signing_key = PyJWKClient(_jwks_url()).get_signing_key_from_jwt(token)
        except PyJWKClientError as exc:
            raise _unauthorized("Could not load Supabase signing key") from exc
        return _decode_jwt(token, signing_key.key, [algorithm])

    raise _unauthorized("Unsupported token signing algorithm")


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> CurrentUser:
    if credentials is None or credentials.scheme.lower() != "bearer":
        raise _unauthorized("Missing bearer token")

    payload = verify_supabase_jwt(credentials.credentials)
    user_id = payload.get("sub")
    email = payload.get("email")

    if not user_id or not email:
        raise _unauthorized("Authentication token is missing required user claims")

    return CurrentUser(id=user_id, email=email)
