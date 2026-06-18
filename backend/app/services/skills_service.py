from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.profile import Profile, ProfileSkill, Skill
from app.schemas.skills import SkillCreate


class ProfileNotFoundError(Exception):
    pass


class SkillAssignmentExistsError(Exception):
    pass


def _normalize_skill_name(name: str) -> str:
    return " ".join(name.strip().split())


def add_skill_to_profile(
    db: Session,
    profile_id: int,
    skill_data: SkillCreate,
) -> Skill:
    profile = db.get(Profile, profile_id)
    if profile is None:
        raise ProfileNotFoundError

    skill_name = _normalize_skill_name(skill_data.name)
    skill = db.query(Skill).filter(Skill.name.ilike(skill_name)).first()
    if skill is None:
        skill = Skill(name=skill_name)
        db.add(skill)
        db.flush()

    existing_assignment = db.get(
        ProfileSkill,
        {"profile_id": profile_id, "skill_id": skill.id},
    )
    if existing_assignment is not None:
        db.rollback()
        raise SkillAssignmentExistsError

    db.add(ProfileSkill(profile_id=profile_id, skill_id=skill.id))
    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise SkillAssignmentExistsError from exc

    db.refresh(skill)
    return skill


def get_profile_skills(db: Session, profile_id: int) -> list[Skill]:
    profile = db.get(Profile, profile_id)
    if profile is None:
        raise ProfileNotFoundError

    return (
        db.query(Skill)
        .join(ProfileSkill, ProfileSkill.skill_id == Skill.id)
        .filter(ProfileSkill.profile_id == profile_id)
        .order_by(Skill.name.asc())
        .all()
    )


def remove_skill_from_profile(
    db: Session,
    profile_id: int,
    skill_id: int,
) -> None:
    profile = db.get(Profile, profile_id)
    if profile is None:
        raise ProfileNotFoundError

    assignment = db.get(
        ProfileSkill,
        {"profile_id": profile_id, "skill_id": skill_id},
    )
    if assignment is None:
        raise ProfileNotFoundError

    db.delete(assignment)
    db.commit()
