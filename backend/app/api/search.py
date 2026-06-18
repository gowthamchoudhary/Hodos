from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.search import SearchResponse
from app.services.search_service import search_profiles

router = APIRouter(prefix="/search", tags=["search"])


@router.get("", response_model=SearchResponse)
def search(
    role: str | None = None,
    company: str | None = None,
    experience_type: str | None = None,
    skill: str | None = None,
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
) -> SearchResponse:
    items, total = search_profiles(
        db=db,
        role=role,
        company=company,
        experience_type=experience_type,
        skill=skill,
        limit=limit,
        offset=offset,
    )
    return SearchResponse(items=items, total=total, limit=limit, offset=offset)
