from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.gallery import GalleryProfileResponse, GalleryResponse
from app.services.gallery_service import list_gallery_profiles

router = APIRouter(prefix="/gallery", tags=["gallery"])


@router.get("", response_model=GalleryResponse)
def gallery(
    role: str | None = None,
    company: str | None = None,
    experience_type: str | None = None,
    skill: str | None = None,
    limit: int = Query(100, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
) -> GalleryResponse:
    profiles, skills_by_profile, total = list_gallery_profiles(
        db=db,
        role=role,
        company=company,
        experience_type=experience_type,
        skill=skill,
        limit=limit,
        offset=offset,
    )

    return GalleryResponse(
        items=[
            GalleryProfileResponse.model_validate(
                {
                    **profile.__dict__,
                    "skills": skills_by_profile.get(profile.id, []),
                },
            )
            for profile in profiles
        ],
        total=total,
        limit=limit,
        offset=offset,
    )
