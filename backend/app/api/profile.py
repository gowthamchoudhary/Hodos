from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.profile import ProfileCreate, ProfileResponse, ProfileUpdate
from app.services.profile_service import (
    create_profile_service,
    delete_profile_service,
    get_profile_service,
    get_profiles_service,
    update_profile_service,
)

router = APIRouter(prefix="/profiles", tags=["profiles"])


@router.post(
    "",
    response_model=ProfileResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_profile(
    profile_data: ProfileCreate,
    db: Session = Depends(get_db),
) -> ProfileResponse:
    return create_profile_service(db, profile_data)


@router.get("", response_model=list[ProfileResponse])
def get_profiles(db: Session = Depends(get_db)) -> list[ProfileResponse]:
    return get_profiles_service(db)


@router.get("/{profile_id}", response_model=ProfileResponse)
def get_profile(
    profile_id: int,
    db: Session = Depends(get_db),
) -> ProfileResponse:
    profile = get_profile_service(db, profile_id)
    if profile is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found",
        )
    return profile


@router.put("/{profile_id}", response_model=ProfileResponse)
def update_profile(
    profile_id: int,
    profile_data: ProfileUpdate,
    db: Session = Depends(get_db),
) -> ProfileResponse:
    profile = update_profile_service(db, profile_id, profile_data)
    if profile is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found",
        )
    return profile


@router.delete("/{profile_id}")
def delete_profile(
    profile_id: int,
    db: Session = Depends(get_db),
) -> dict[str, str]:
    profile = delete_profile_service(db, profile_id)
    if profile is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found",
        )
    return {"message": "Profile deleted successfully"}
