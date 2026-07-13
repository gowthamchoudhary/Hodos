from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.profile import Profile, ProfileSkill, Skill


def list_gallery_profiles(
    db: Session,
    role: str | None = None,
    company: str | None = None,
    experience_type: str | None = None,
    skill: str | None = None,
    limit: int = 20,
    offset: int = 0,
) -> tuple[list[Profile], dict[int, list[Skill]], int]:
    query = db.query(Profile)

    if skill:
        query = (
            query.join(ProfileSkill, ProfileSkill.profile_id == Profile.id)
            .join(Skill, Skill.id == ProfileSkill.skill_id)
            .filter(Skill.name.ilike(f"%{skill.strip()}%"))
        )

    if role:
        query = query.filter(Profile.role.ilike(f"%{role.strip()}%"))

    if company:
        query = query.filter(Profile.company.ilike(f"%{company.strip()}%"))

    if experience_type:
        query = query.filter(Profile.experience_type.ilike(f"%{experience_type.strip()}%"))

    total = query.with_entities(func.count(func.distinct(Profile.id))).scalar() or 0
    profiles = (
        query.distinct()
        .order_by(Profile.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )

    skills_by_profile = _get_skills_by_profile(db, [profile.id for profile in profiles])
    return profiles, skills_by_profile, total


def _get_skills_by_profile(db: Session, profile_ids: list[int]) -> dict[int, list[Skill]]:
    if not profile_ids:
        return {}

    rows = (
        db.query(ProfileSkill.profile_id, Skill)
        .join(Skill, Skill.id == ProfileSkill.skill_id)
        .filter(ProfileSkill.profile_id.in_(profile_ids))
        .order_by(Skill.name.asc())
        .all()
    )

    skills_by_profile: dict[int, list[Skill]] = {profile_id: [] for profile_id in profile_ids}
    for profile_id, skill in rows:
        skills_by_profile.setdefault(profile_id, []).append(skill)

    return skills_by_profile
