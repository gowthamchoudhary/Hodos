from sqlalchemy.orm import Session

from app.crud import profile as profile_crud
from app.models.profile import Profile
from app.schemas.profile import ProfileCreate, ProfileUpdate


def create_profile_service(db: Session, profile_data: ProfileCreate) -> Profile:
    # Future profile workflows can be added here:
    # resume parsing, Firecrawl enrichment, scoring, and AI recommendations.
    return profile_crud.create_profile(db, profile_data)


def get_profile_service(db: Session, profile_id: int) -> Profile | None:
    return profile_crud.get_profile(db, profile_id)


def get_profiles_service(db: Session) -> list[Profile]:
    return profile_crud.get_profiles(db)


def update_profile_service(
    db: Session,
    profile_id: int,
    profile_data: ProfileUpdate,
) -> Profile | None:
    return profile_crud.update_profile(db, profile_id, profile_data)


def delete_profile_service(db: Session, profile_id: int) -> Profile | None:
    return profile_crud.delete_profile(db, profile_id)
