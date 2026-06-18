from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.upload import ResumeUploadResponse
from app.services.storage_service import (
    InvalidFileTypeError,
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
) -> ResumeUploadResponse:
    try:
        resume_url = await upload_resume(db, profile_id, file)
    except InvalidFileTypeError as exc:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, str(exc)) from exc
    except ProfileNotFoundError as exc:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Profile not found") from exc
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
