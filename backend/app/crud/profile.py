from sqlalchemy.orm import Session

from app.models.profile import Profile
from app.schemas.profile import ProfileCreate, ProfileUpdate


def create_profile(db: Session, profile_data: ProfileCreate, user_id: str) -> Profile:
    profile = Profile(**profile_data.model_dump(), user_id=user_id)
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return profile


def get_profile(db: Session, profile_id: int) -> Profile | None:
    return db.get(Profile, profile_id)


def get_profiles(db: Session, user_id: str) -> list[Profile]:
    return (
        db.query(Profile)
        .filter(Profile.user_id == user_id)
        .order_by(Profile.created_at.desc())
        .all()
    )


def update_profile(
    db: Session,
    profile_id: int,
    profile_data: ProfileUpdate,
) -> Profile | None:
    profile = get_profile(db, profile_id)
    if profile is None:
        return None

    for field, value in profile_data.model_dump(exclude_unset=True).items():
        setattr(profile, field, value)

    db.commit()
    db.refresh(profile)
    return profile


def delete_profile(db: Session, profile_id: int) -> Profile | None:
    profile = get_profile(db, profile_id)
    if profile is None:
        return None

    db.delete(profile)
    db.commit()
    return profile
