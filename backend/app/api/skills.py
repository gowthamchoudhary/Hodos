from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.auth import CurrentUser, get_current_user
from app.db.database import get_db
from app.schemas.skills import SkillCreate, SkillResponse
from app.services.skills_service import (
    ProfileForbiddenError,
    ProfileNotFoundError,
    SkillAssignmentExistsError,
    add_skill_to_profile,
    get_profile_skills,
    remove_skill_from_profile,
)

router = APIRouter(prefix="/profiles/{profile_id}/skills", tags=["skills"])


@router.post("", response_model=SkillResponse, status_code=status.HTTP_201_CREATED)
def add_profile_skill(
    profile_id: int,
    skill_data: SkillCreate,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user),
) -> SkillResponse:
    try:
        return add_skill_to_profile(db, profile_id, skill_data, current_user.id)
    except ProfileNotFoundError as exc:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Profile not found") from exc
    except ProfileForbiddenError as exc:
        raise HTTPException(
            status.HTTP_403_FORBIDDEN,
            "You can only add skills to your own profile",
        ) from exc
    except SkillAssignmentExistsError as exc:
        raise HTTPException(
            status.HTTP_409_CONFLICT,
            "Skill is already assigned to this profile",
        ) from exc


@router.get("", response_model=list[SkillResponse])
def list_profile_skills(
    profile_id: int,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user),
) -> list[SkillResponse]:
    try:
        return get_profile_skills(db, profile_id, current_user.id)
    except ProfileNotFoundError as exc:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Profile not found") from exc
    except ProfileForbiddenError as exc:
        raise HTTPException(
            status.HTTP_403_FORBIDDEN,
            "You do not have permission to access this profile",
        ) from exc


@router.delete("/{skill_id}")
def delete_profile_skill(
    profile_id: int,
    skill_id: int,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user),
) -> dict[str, str]:
    try:
        remove_skill_from_profile(db, profile_id, skill_id, current_user.id)
    except ProfileNotFoundError as exc:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Profile skill not found") from exc
    except ProfileForbiddenError as exc:
        raise HTTPException(
            status.HTTP_403_FORBIDDEN,
            "You can only remove skills from your own profile",
        ) from exc

    return {"message": "Skill removed from profile successfully"}
