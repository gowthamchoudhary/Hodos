from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.core.auth import CurrentUser, get_current_user
from app.db.database import get_db
from app.schemas.upload import ResumeUploadResponse
from app.services.storage_service import (
    InvalidFileTypeError,
    ProfileForbiddenError,
    ProfileNotFoundError,
    StorageUploadError,
    upload_resume,
)

router = APIRouter(prefix="/upload", tags=["upload"])


@router.post("/resume", response_model=ResumeUploadResponse)
async def upload_profile_resume(
    profile_id: int = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user),
) -> ResumeUploadResponse:
    try:
        resume_url = await upload_resume(db, profile_id, file, current_user.id)
    except InvalidFileTypeError as exc:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, str(exc)) from exc
    except ProfileNotFoundError as exc:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Profile not found") from exc
    except ProfileForbiddenError as exc:
        raise HTTPException(
            status.HTTP_403_FORBIDDEN,
            "You can only upload resumes for your own profile",
        ) from exc
    except StorageUploadError as exc:
        raise HTTPException(
            status.HTTP_502_BAD_GATEWAY,
            "Resume upload failed",
        ) from exc

    return ResumeUploadResponse(
        profile_id=profile_id,
        resume_url=resume_url,
        message="Resume uploaded successfully",
    )
