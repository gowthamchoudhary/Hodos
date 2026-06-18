from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.profile import Profile, ProfileSkill, Skill


def search_profiles(
    db: Session,
    user_id: str,
    role: str | None = None,
    company: str | None = None,
    experience_type: str | None = None,
    skill: str | None = None,
    limit: int = 20,
    offset: int = 0,
) -> tuple[list[Profile], int]:
    query = db.query(Profile).filter(Profile.user_id == user_id)

    if skill:
        query = (
            query.join(ProfileSkill, ProfileSkill.profile_id == Profile.id)
            .join(Skill, Skill.id == ProfileSkill.skill_id)
            .filter(Skill.name.ilike(skill.strip()))
        )

    if role:
        query = query.filter(Profile.role.ilike(f"%{role.strip()}%"))

    if company:
        query = query.filter(Profile.company.ilike(f"%{company.strip()}%"))

    if experience_type:
        query = query.filter(Profile.experience_type.ilike(f"%{experience_type.strip()}%"))

    total = query.with_entities(func.count(func.distinct(Profile.id))).scalar() or 0
    items = (
        query.distinct()
        .order_by(Profile.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )
    return items, total
