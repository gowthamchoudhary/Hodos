from sqlalchemy.orm import Session

from app.crud import profile as profile_crud
from app.models.profile import Profile
from app.schemas.profile import ProfileCreate, ProfileUpdate


class ProfileForbiddenError(Exception):
    pass


def create_profile_service(
    db: Session,
    profile_data: ProfileCreate,
    user_id: str,
) -> Profile:
    # Future profile workflows can be added here:
    # resume parsing, Firecrawl enrichment, scoring, and AI recommendations.
    return profile_crud.create_profile(db, profile_data, user_id)


def get_profile_service(db: Session, profile_id: int) -> Profile | None:
    return profile_crud.get_profile(db, profile_id)


def get_profiles_service(db: Session, user_id: str) -> list[Profile]:
    return profile_crud.get_profiles(db, user_id)


def get_owned_profile_service(
    db: Session,
    profile_id: int,
    user_id: str,
) -> Profile | None:
    profile = profile_crud.get_profile(db, profile_id)
    if profile is None:
        return None
    if profile.user_id != user_id:
        raise ProfileForbiddenError
    return profile


def update_profile_service(
    db: Session,
    profile_id: int,
    profile_data: ProfileUpdate,
    user_id: str,
) -> Profile | None:
    get_owned_profile_service(db, profile_id, user_id)
    return profile_crud.update_profile(db, profile_id, profile_data)


def delete_profile_service(db: Session, profile_id: int, user_id: str) -> Profile | None:
    get_owned_profile_service(db, profile_id, user_id)
    return profile_crud.delete_profile(db, profile_id)
